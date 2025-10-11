import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";
import { ItemVenda } from "./itemvenda.entity";

@Entity({ name: "tb_vendas" })
export class Venda {

    @PrimaryGeneratedColumn()
    id_venda: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_venda: Date;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    valor_total: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 50, nullable: false })
    forma_pagamento: string;

    @IsString()
    @Column({ length: 20, nullable: false, default: "CONCLUIDA" })
    status: string;

    @ManyToOne(() => Cliente, { onDelete: "SET NULL" })
    cliente: Cliente;

    @ManyToOne(() => Funcionario, { onDelete: "SET NULL" })
    funcionario: Funcionario;

    @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.venda, { cascade: true })
    itens: ItemVenda[];
}