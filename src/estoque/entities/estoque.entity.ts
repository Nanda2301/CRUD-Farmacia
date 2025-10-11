import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";

@Entity({ name: "tb_movimentacoes_estoque" })
export class Estoque {

    @PrimaryGeneratedColumn()
    id_movimentacao: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 20, nullable: false })
    tipo_movimentacao: string;

    @IsNotEmpty()
    @IsNumber()
    @Column({ nullable: false })
    quantidade: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_movimentacao: Date;

    @IsString()
    @Column({ length: 500, nullable: true })
    observacao: string;

    @ManyToOne(() => Produto, { onDelete: "CASCADE" })
    produto: Produto;

    @ManyToOne(() => Funcionario, { onDelete: "SET NULL" })
    funcionario: Funcionario;
}