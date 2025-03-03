import { Categorie } from "src/categorie/categorie.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produit {
 @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nom: string;

    @Column()
    description: string;

    @Column()
    prix: number;

    @Column()
    quantite: number;

//     @ManyToOne(() => Categorie, categorie => categorie.produits)
//   categorie: Categorie;

    @ManyToOne(() => Categorie, categorie => categorie.produits, { onDelete: "CASCADE" })
    categorie: Categorie;
}