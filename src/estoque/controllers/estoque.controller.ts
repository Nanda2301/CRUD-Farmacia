import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Estoque } from "../entities/estoque.entity";
import { EstoqueService } from "../services/estoque.service";

@ApiTags('Estoque')
@Controller("/estoque")
export class EstoqueController {
    constructor(private readonly estoqueService: EstoqueService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Estoque[]> {
        return this.estoqueService.findAll();
    }

    @Get('/:id_movimentacao')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_movimentacao', ParseIntPipe) id_movimentacao: number): Promise<Estoque> {
        return this.estoqueService.findById(id_movimentacao);
    }

    @Get('/produto/:id_produto')
    @HttpCode(HttpStatus.OK)
    findByProduto(@Param('id_produto', ParseIntPipe) id_produto: number): Promise<Estoque[]> {
        return this.estoqueService.findByProduto(id_produto);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() estoque: Estoque): Promise<Estoque> {
        return this.estoqueService.create(estoque);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() estoque: Estoque): Promise<Estoque> {
        return this.estoqueService.update(estoque);
    }

    @Delete('/:id_movimentacao')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id_movimentacao', ParseIntPipe) id_movimentacao: number) {
        return this.estoqueService.delete(id_movimentacao);
    }
}