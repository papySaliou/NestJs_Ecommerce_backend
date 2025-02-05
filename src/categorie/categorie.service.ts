import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './categorie.entity';
import { CreateCategorieDto } from './dto/createCategorieDto';
import { UpdateCategorieDto } from './dto/updateCategorieDto';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async findAll(): Promise<Categorie[]> {
    return await this.categorieRepository.find();
  }

  async findOne(id: number): Promise<Categorie> {
    const categorie = await this.categorieRepository.findOne({ where: { id } });
    if (!categorie) {
      throw new NotFoundException(`Catégorie avec l'ID ${id} non trouvée.`);
    }
    return categorie;
  }

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const newCategorie = this.categorieRepository.create(createCategorieDto);
    return await this.categorieRepository.save(newCategorie);
  }

  async update(id: number, updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
    const existingCategorie = await this.findOne(id); // Vérifier si la catégorie existe
    await this.categorieRepository.update(id, updateCategorieDto);
    return { ...existingCategorie, ...updateCategorieDto }; // Retourner la version mise à jour
  }

  async remove(id: number): Promise<{ message: string }> {
    const categorie = await this.findOne(id); // Vérifier si la catégorie existe
    await this.categorieRepository.delete(id);
    return { message: `Catégorie avec l'ID ${id} supprimée avec succès.` };
  }
}
