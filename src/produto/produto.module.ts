import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { Categoria } from "../Categoria/entities/categoria.entity";
import { Fornecedor } from "../fornecedor/entities/fornecedor.entity";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria, Fornecedor])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
