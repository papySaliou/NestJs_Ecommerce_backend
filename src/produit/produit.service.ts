import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Produit } from './produit.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateProduitDto, UpdateProduitDto } from './dto/produit.dto';
import { Categorie } from '../categorie/categorie.entity';
import { CreateProduitDto } from './dto/createProduitDto';
import { UpdateProduitDto } from './dto/updateProduitDto';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private produitsRepository: Repository<Produit>,
    @InjectRepository(Categorie)
    private categoriesRepository: Repository<Categorie>,
  ) {}

  async findAll(): Promise<Produit[]> {
    return this.produitsRepository.find({ relations: ['categorie'] });
  }

  async findOne(id: number): Promise<Produit> {
    const produit = await this.produitsRepository.findOne({
      where: { id },
      relations: ['categorie'],
    });
    if (!produit) {
      throw new NotFoundException(`Produit avec l'ID ${id} introuvable`);
    }
    return produit;
  }

  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    const { nom, description, prix, quantite, categorieId } = createProduitDto;
    
    // Vérification si la catégorie existe
    const categorie = await this.categoriesRepository.findOne({
      where: { id: categorieId },
    });

    if (!categorie) {
      throw new NotFoundException(`Catégorie avec l'ID ${categorieId} introuvable`);
    }

    const produit = this.produitsRepository.create({
      nom,
      description,
      prix,
      quantite,
      categorie,
    });

    return this.produitsRepository.save(produit);
  }

  async update(id: number, updateProduitDto: UpdateProduitDto): Promise<Produit> {
    const produit = await this.findOne(id); // Vérifie si le produit existe

    // Mise à jour des champs
    Object.assign(produit, updateProduitDto);

    return this.produitsRepository.save(produit);
  }

  async remove(id: number): Promise<{ message: string }> {
    const produit = await this.findOne(id);
    await this.produitsRepository.remove(produit);
    return { message: `Produit avec l'ID ${id} supprimé avec succès` };
  }
}
