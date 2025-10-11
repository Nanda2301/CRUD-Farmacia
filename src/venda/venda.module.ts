import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Venda } from "./entities/venda.entity";
import { ItemVenda } from "./entities/itemvenda.entity";
import { VendaService } from "./services/venda.service";
import { VendaController } from "./controllers/venda.controller";
import { ProdutoModule } from "../produto/produto.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Venda, ItemVenda]),
        ProdutoModule
    ],
    providers: [VendaService],
    controllers: [VendaController],
    exports: [TypeOrmModule]
})
export class VendaModule {}