import { Produit } from "src/auth/produit.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Categorie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    // @Column()
    // description: string;

    // @Column()
    // image: string;  

    // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    // dateAjout: Date;
    @OneToMany(() => Produit, produit => produit.categorie)
    produits: Produit[];
}
