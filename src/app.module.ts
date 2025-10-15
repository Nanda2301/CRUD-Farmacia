import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { ProdutoModule } from "./produto/produto.module";
import { FuncionarioModule } from "./funcionario/funcionario.module";
import { ClienteModule } from "./cliente/cliente.module";
import { AuthModule } from "./auth/auth.module";
import { CategoriaModule } from "./Categoria/categoria.module";
import { FornecedorModule } from "./fornecedor/fornecedor.module";
import { VendaModule } from "./venda/venda.module";
import { PrescricaoModule } from "./prescricao/prescricao.module";
import { EstoqueModule } from "./estoque/estoque.module";
import { DevService } from "./data/services/dev.service";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DevService,
        }),
        ProdutoModule,
        FuncionarioModule,
        ClienteModule,
        AuthModule,
        CategoriaModule,
        FornecedorModule,
        VendaModule,
        PrescricaoModule,
        EstoqueModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}