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

  findAll(): Promise<Categorie[]> {
    return this.categorieRepository.find();
  }

  async findOne(id: number): Promise<Categorie> {
    const categorie = await this.categorieRepository.findOne({ where: { id } });
    if (!categorie) {
      throw new NotFoundException(`Catégorie avec l'id ${id} non trouvée.`);
    }
    return categorie;
  }

  create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const newCategorie = this.categorieRepository.create(createCategorieDto);
    return this.categorieRepository.save(newCategorie);
  }

  async update(id: number, updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
    await this.categorieRepository.update(id, updateCategorieDto);
    return this.findOne(id); // Récupérer la version mise à jour
  }

  async remove(id: number): Promise<void> {
    const result = await this.categorieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Catégorie avec l'id ${id} non trouvée.`);
    }
  }
}
