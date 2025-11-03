import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Produto } from "../../produto/entities/produto.entity";
@Entity({ name: "tb_prescricoes" })
export class Prescricao {

    @PrimaryGeneratedColumn()
    id_prescricao: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    nome_medico: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 20, nullable: false })
    crm: string;

    @Column({ type: "date", nullable: false })
    data_prescricao: Date;

    @IsString()
    @Column({ length: 500, nullable: true })
    observacoes: string;

    @ManyToOne(() => Cliente, { onDelete: "CASCADE" })
    cliente: Cliente;

    @ManyToOne(() => Produto, { onDelete: "CASCADE" })
    produto: Produto;
}