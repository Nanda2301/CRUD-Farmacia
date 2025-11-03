import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Fornecedor } from "../entities/fornecedor.entity";
import { FornecedorService } from "../services/fornecedor.service";

@ApiTags('Fornecedor')
@Controller("/fornecedores")
export class FornecedorController {
    constructor(private readonly fornecedorService: FornecedorService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Fornecedor[]> {
        return this.fornecedorService.findAll();
    }

    @Get('/:id_fornecedor')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_fornecedor', ParseIntPipe) id_fornecedor: number): Promise<Fornecedor> {
        return this.fornecedorService.findById(id_fornecedor);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Fornecedor[]> {
        return this.fornecedorService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() fornecedor: Fornecedor): Promise<Fornecedor> {
        return this.fornecedorService.create(fornecedor);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() fornecedor: Fornecedor): Promise<Fornecedor> {
        return this.fornecedorService.update(fornecedor);
    }

    @Delete('/:id_fornecedor')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id_fornecedor', ParseIntPipe) id_fornecedor: number) {
        return this.fornecedorService.delete(id_fornecedor);
    }
}