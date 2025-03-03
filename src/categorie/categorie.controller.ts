import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Categorie } from './categorie.entity';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/createCategorieDto';
import { UpdateCategorieDto } from './dto/updateCategorieDto';

@Controller('categories')
export class CategorieController {
  constructor(private categorieService: CategorieService) {}

  @Get()
  findAll(): Promise<Categorie[]> {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categorie> {
    return this.categorieService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return this.categorieService.create(createCategorieDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto
  ): Promise<Categorie> {
    return this.categorieService.update(parseInt(id), updateCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categorieService.remove(parseInt(id));
  }
}
