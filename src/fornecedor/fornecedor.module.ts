import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fornecedor } from "./entities/fornecedor.entity";
import { FornecedorService } from "./services/fornecedor.service";
import { FornecedorController } from "./controllers/fornecedor.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Fornecedor])],
    providers: [FornecedorService],
    controllers: [FornecedorController],
    exports: [TypeOrmModule]
})
export class FornecedorModule {}