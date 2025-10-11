import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Fornecedor } from "../entities/fornecedor.entity";

@Injectable()
export class FornecedorService {
    constructor(
        @InjectRepository(Fornecedor)
        private fornecedorRepository: Repository<Fornecedor>
    ) { }

    async findAll(): Promise<Fornecedor[]> {
        return await this.fornecedorRepository.find({
            relations: ['produtos']
        });
    }

    async findById(id_fornecedor: number): Promise<Fornecedor> {
        const fornecedor = await this.fornecedorRepository.findOne({
            where: {
                id_fornecedor
            },
            relations: ['produtos']
        });

        if (!fornecedor)
            throw new HttpException('Fornecedor não encontrado!', HttpStatus.NOT_FOUND);

        return fornecedor;
    }

    async findByNome(nome: string): Promise<Fornecedor[]> {
        return await this.fornecedorRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: ['produtos']
        });
    }

    async create(fornecedor: Fornecedor): Promise<Fornecedor> {
        return await this.fornecedorRepository.save(fornecedor);
    }

    async update(fornecedor: Fornecedor): Promise<Fornecedor> {
        const buscaFornecedor = await this.findById(fornecedor.id_fornecedor);

        if (!buscaFornecedor || !fornecedor.id_fornecedor)
            throw new HttpException('Fornecedor não encontrado!', HttpStatus.NOT_FOUND);

        return await this.fornecedorRepository.save(fornecedor);
    }

    async delete(id_fornecedor: number): Promise<void> {
        const buscaFornecedor = await this.findById(id_fornecedor);

        if (!buscaFornecedor)
            throw new HttpException('Fornecedor não encontrado!', HttpStatus.NOT_FOUND);

        await this.fornecedorRepository.delete(id_fornecedor);
    }
}