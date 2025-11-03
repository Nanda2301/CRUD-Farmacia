import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: "tb_fornecedores" })
export class Fornecedor {

    @PrimaryGeneratedColumn()
    id_fornecedor: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 18, nullable: false, unique: true })
    cnpj: string;

    @IsString()
    @Column({ length: 20, nullable: true })
    telefone: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    email: string;

    @IsString()
    @Column({ length: 255, nullable: true })
    endereco: string;

    @OneToMany(() => Produto, (produto) => produto.fornecedor)
    produtos: Produto[];
}