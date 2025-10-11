import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Prescricao } from "../entities/prescricao.entity";
import { PrescricaoService } from "../services/prescricao.service";

@ApiTags('Prescricao')
@Controller("/prescricoes")
export class PrescricaoController {
    constructor(private readonly prescricaoService: PrescricaoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Prescricao[]> {
        return this.prescricaoService.findAll();
    }

    @Get('/:id_prescricao')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_prescricao', ParseIntPipe) id_prescricao: number): Promise<Prescricao> {
        return this.prescricaoService.findById(id_prescricao);
    }

    @Get('/cliente/:id_cliente')
    @HttpCode(HttpStatus.OK)
    findByCliente(@Param('id_cliente', ParseIntPipe) id_cliente: number): Promise<Prescricao[]> {
        return this.prescricaoService.findByCliente(id_cliente);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() prescricao: Prescricao): Promise<Prescricao> {
        return this.prescricaoService.create(prescricao);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() prescricao: Prescricao): Promise<Prescricao> {
        return this.prescricaoService.update(prescricao);
    }

    @Delete('/:id_prescricao')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id_prescricao', ParseIntPipe) id_prescricao: number) {
        return this.prescricaoService.delete(id_prescricao);
    }
}