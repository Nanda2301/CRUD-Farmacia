import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estoque } from "../entities/estoque.entity";
import { ProdutoService } from "../../produto/services/produto.service";

@Injectable()
export class EstoqueService {
    constructor(
        @InjectRepository(Estoque)
        private estoqueRepository: Repository<Estoque>,
        private produtoService: ProdutoService
    ) { }

    async findAll(): Promise<Estoque[]> {
        return await this.estoqueRepository.find({
            relations: ['produto', 'funcionario']
        });
    }

    async findById(id_movimentacao: number): Promise<Estoque> {
        const estoque = await this.estoqueRepository.findOne({
            where: {
                id_movimentacao
            },
            relations: ['produto', 'funcionario']
        });

        if (!estoque)
            throw new HttpException('Movimentação não encontrada!', HttpStatus.NOT_FOUND);

        return estoque;
    }

    async findByProduto(id_produto: number): Promise<Estoque[]> {
        return await this.estoqueRepository.find({
            where: {
                produto: { id_produto }
            },
            relations: ['produto', 'funcionario'],
            order: {
                data_movimentacao: 'DESC'
            }
        });
    }

    async create(estoque: Estoque): Promise<Estoque> {
        const produto = await this.produtoService.findById(estoque.produto.id_produto);

        // Atualiza o estoque do produto
        if (estoque.tipo_movimentacao === 'ENTRADA') {
            produto.quantidade_estoque += estoque.quantidade;
        } else if (estoque.tipo_movimentacao === 'SAIDA') {
            if (produto.quantidade_estoque < estoque.quantidade) {
                throw new HttpException('Estoque insuficiente!', HttpStatus.BAD_REQUEST);
            }
            produto.quantidade_estoque -= estoque.quantidade;
        }

        await this.produtoService.update(produto);
        return await this.estoqueRepository.save(estoque);
    }

    async update(estoque: Estoque): Promise<Estoque> {
        const buscaEstoque = await this.findById(estoque.id_movimentacao);

        if (!buscaEstoque || !estoque.id_movimentacao)
            throw new HttpException('Movimentação não encontrada!', HttpStatus.NOT_FOUND);

        return await this.estoqueRepository.save(estoque);
    }

    async delete(id_movimentacao: number): Promise<void> {
        const buscaEstoque = await this.findById(id_movimentacao);

        if (!buscaEstoque)
            throw new HttpException('Movimentação não encontrada!', HttpStatus.NOT_FOUND);

        await this.estoqueRepository.delete(id_movimentacao);
    }
}