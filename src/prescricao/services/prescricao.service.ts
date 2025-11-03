import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Prescricao } from "../entities/prescricao.entity";

@Injectable()
export class PrescricaoService {
    constructor(
        @InjectRepository(Prescricao)
        private prescricaoRepository: Repository<Prescricao>
    ) { }

    async findAll(): Promise<Prescricao[]> {
        return await this.prescricaoRepository.find({
            relations: ['cliente', 'produto']
        });
    }

    async findById(id_prescricao: number): Promise<Prescricao> {
        const prescricao = await this.prescricaoRepository.findOne({
            where: {
                id_prescricao
            },
            relations: ['cliente', 'produto']
        });

        if (!prescricao)
            throw new HttpException('Prescrição não encontrada!', HttpStatus.NOT_FOUND);

        return prescricao;
    }

    async findByCliente(id_cliente: number): Promise<Prescricao[]> {
        return await this.prescricaoRepository.find({
            where: {
                cliente: { id_cliente }
            },
            relations: ['cliente', 'produto']
        });
    }

    async create(prescricao: Prescricao): Promise<Prescricao> {
        return await this.prescricaoRepository.save(prescricao);
    }

    async update(prescricao: Prescricao): Promise<Prescricao> {
        const buscaPrescricao = await this.findById(prescricao.id_prescricao);

        if (!buscaPrescricao || !prescricao.id_prescricao)
            throw new HttpException('Prescrição não encontrada!', HttpStatus.NOT_FOUND);

        return await this.prescricaoRepository.save(prescricao);
    }

    async delete(id_prescricao: number): Promise<void> {
        const buscaPrescricao = await this.findById(id_prescricao);

        if (!buscaPrescricao)
            throw new HttpException('Prescrição não encontrada!', HttpStatus.NOT_FOUND);

        await this.prescricaoRepository.delete(id_prescricao);
    }
}