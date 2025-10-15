import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../Categoria/entities/categoria.entity";
import { Fornecedor } from "../../fornecedor/entities/fornecedor.entity";
import { ItemVenda } from "../../venda/entities/itemvenda.entity";

@Entity({ name: "tb_produtos" })
export class Produto {

    @PrimaryGeneratedColumn()
    id_produto: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    fabricante: string;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    preco: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ nullable: false })
    quantidade_estoque: number;

    @Column({ type: "date", nullable: false })
    data_validade: Date;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 50, nullable: false, unique: true })
    codigo_barras: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 50, nullable: false })
    tipo: string;

    @IsString()
    @Column({ length: 500, nullable: true })
    descricao: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
    categoria: Categoria;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.produtos, { onDelete: "SET NULL" })
    fornecedor: Fornecedor;

    @OneToMany(() => ItemVenda, (itemVenda) => itemVenda.produto)
    itensVenda: ItemVenda[];
}