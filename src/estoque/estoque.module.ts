import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estoque } from "./entities/estoque.entity";
import { EstoqueService } from "./services/estoque.service";
import { EstoqueController } from "./controllers/estoque.controller";
import { ProdutoModule } from "../produto/produto.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Estoque]),
        ProdutoModule
    ],
    providers: [EstoqueService],
    controllers: [EstoqueController],
    exports: [TypeOrmModule]
})
export class EstoqueModule {}