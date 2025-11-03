import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Venda } from "../entities/venda.entity";
import { VendaService } from "../services/venda.service";

@ApiTags('Venda')
@Controller("/vendas")
export class VendaController {
    constructor(private readonly vendaService: VendaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Venda[]> {
        return this.vendaService.findAll();
    }

    @Get('/:id_venda')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_venda', ParseIntPipe) id_venda: number): Promise<Venda> {
        return this.vendaService.findById(id_venda);
    }

    @Get('/cliente/:id_cliente')
    @HttpCode(HttpStatus.OK)
    findByCliente(@Param('id_cliente', ParseIntPipe) id_cliente: number): Promise<Venda[]> {
        return this.vendaService.findByCliente(id_cliente);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() venda: Venda): Promise<Venda> {
        return this.vendaService.create(venda);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() venda: Venda): Promise<Venda> {
        return this.vendaService.update(venda);
    }

    @Delete('/:id_venda')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id_venda', ParseIntPipe) id_venda: number) {
        return this.vendaService.delete(id_venda);
    }
}