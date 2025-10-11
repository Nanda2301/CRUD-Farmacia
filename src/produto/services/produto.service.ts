import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: ['categoria', 'fornecedor']
        });
    }

    async findById(id_produto: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: {
                id_produto
            },
            relations: ['categoria', 'fornecedor']
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: ['categoria', 'fornecedor']
        });
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        const buscaProduto = await this.findById(produto.id_produto);

        if (!buscaProduto || !produto.id_produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.save(produto);
    }

    async delete(id_produto: number): Promise<void> {
        const buscaProduto = await this.findById(id_produto);

        if (!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        await this.produtoRepository.delete(id_produto);
    }
}