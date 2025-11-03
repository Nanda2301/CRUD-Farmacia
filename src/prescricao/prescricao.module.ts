import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Prescricao } from "./entities/prescricao.entity";
import { PrescricaoService } from "./services/prescricao.service";
import { PrescricaoController } from "./controllers/prescricao..controller";

@Module({
    imports: [TypeOrmModule.forFeature([Prescricao])],
    providers: [PrescricaoService],
    controllers: [PrescricaoController],
    exports: [TypeOrmModule]
})
export class PrescricaoModule {}