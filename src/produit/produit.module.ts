import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produit } from './produit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieModule } from 'src/categorie/categorie.module';  // Réactiver l'importation de CategorieModule
import { Categorie } from 'src/categorie/categorie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produit,Categorie]),
    CategorieModule,  // Permet à ProduitModule d'utiliser CategorieService
  ],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
