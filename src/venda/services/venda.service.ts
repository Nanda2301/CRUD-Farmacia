import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Venda } from "../entities/venda.entity";
import { ItemVenda } from "../entities/itemvenda.entity";
import { ProdutoService } from "../../produto/services/produto.service";

@Injectable()
export class VendaService {
    constructor(
        @InjectRepository(Venda)
        private vendaRepository: Repository<Venda>,
        @InjectRepository(ItemVenda)
        private itemVendaRepository: Repository<ItemVenda>,
        private produtoService: ProdutoService
    ) { }

    async findAll(): Promise<Venda[]> {
        return await this.vendaRepository.find({
            relations: ['cliente', 'funcionario', 'itens', 'itens.produto']
        });
    }

    async findById(id_venda: number): Promise<Venda> {
        const venda = await this.vendaRepository.findOne({
            where: {
                id_venda
            },
            relations: ['cliente', 'funcionario', 'itens', 'itens.produto']
        });

        if (!venda)
            throw new HttpException('Venda não encontrada!', HttpStatus.NOT_FOUND);

        return venda;
    }

    async findByCliente(id_cliente: number): Promise<Venda[]> {
        return await this.vendaRepository.find({
            where: {
                cliente: { id_cliente }
            },
            relations: ['cliente', 'funcionario', 'itens', 'itens.produto']
        });
    }

    async create(venda: Venda): Promise<Venda> {
        // Valida estoque antes de criar a venda
        for (const item of venda.itens) {
            const produto = await this.produtoService.findById(item.produto.id_produto);
            
            if (produto.quantidade_estoque < item.quantidade) {
                throw new HttpException(
                    `Estoque insuficiente para o produto: ${produto.nome}`,
                    HttpStatus.BAD_REQUEST
                );
            }
        }

        // Calcula o valor total
        venda.valor_total = venda.itens.reduce((total, item) => {
            item.subtotal = item.quantidade * item.preco_unitario;
            return total + item.subtotal;
        }, 0);

        // Salva as vendas
        const vendaSalva = await this.vendaRepository.save(venda);

        // Isso vai atualizar o estoque
        for (const item of vendaSalva.itens) {
            const produto = await this.produtoService.findById(item.produto.id_produto);
            produto.quantidade_estoque -= item.quantidade;
            await this.produtoService.update(produto);
        }

        return vendaSalva;
    }

    async update(venda: Venda): Promise<Venda> {
        const buscaVenda = await this.findById(venda.id_venda);

        if (!buscaVenda || !venda.id_venda)
            throw new HttpException('Venda não encontrada!', HttpStatus.NOT_FOUND);

        return await this.vendaRepository.save(venda);
    }

    async delete(id_venda: number): Promise<void> {
        const buscaVenda = await this.findById(id_venda);

        if (!buscaVenda)
            throw new HttpException('Venda não encontrada!', HttpStatus.NOT_FOUND);

        await this.vendaRepository.delete(id_venda);
    }
}