import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Venda } from "./venda.entity";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: "tb_itens_venda" })
export class ItemVenda {

    @PrimaryGeneratedColumn()
    id_item_venda: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ nullable: false })
    quantidade: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    preco_unitario: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    subtotal: number;

    @ManyToOne(() => Venda, (venda) => venda.itens, { onDelete: "CASCADE" })
    venda: Venda;

    @ManyToOne(() => Produto, (produto) => produto.itensVenda, { onDelete: "CASCADE" })
    produto: Produto;
}