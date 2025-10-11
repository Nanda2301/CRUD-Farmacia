import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: "tb_categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id_categoria: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsString()
    @Column({ length: 500, nullable: true })
    descricao: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[];
}