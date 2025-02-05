import { Categorie } from "src/categorie/categorie.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Produit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    description: string;

    @Column("decimal")
    prix: number;

    @Column()
    quantite: number;

    @ManyToOne(() => Categorie, categorie => categorie.produits, { onDelete: "CASCADE" })
    categorie: Categorie;
}
