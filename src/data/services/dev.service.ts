import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Fornecedor } from "../../fornecedor/entities/fornecedor.entity";
import { Venda } from "../../venda/entities/venda.entity";
import { Prescricao } from "../../prescricao/entities/prescricao.entity";
import { Estoque } from "../../estoque/entities/estoque.entity";
import { ItemVenda } from "../../venda/entities/itemvenda.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'db_farmacia',
            entities: [
                Produto,
                Funcionario,
                Cliente,
                Categoria,
                Fornecedor,
                Venda,
                ItemVenda,
                Prescricao,
                Estoque
            ],
            synchronize: true,
        };
    }
}