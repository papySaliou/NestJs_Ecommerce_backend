import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    NotFoundException 
  } from '@nestjs/common';
  import { ProduitService } from './produit.service';
  import { Produit } from './produit.entity';
  import { CreateProduitDto } from './dto/createProduitDto';
  import { UpdateProduitDto } from './dto/updateProduitDto';
  
  @Controller('produits')
  export class ProduitController {
    constructor(private readonly produitService: ProduitService) {}
  
    @Get()
    async findAll(): Promise<Produit[]> {
      return await this.produitService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Produit> {
      const produit = await this.produitService.findOne(parseInt(id));
      if (!produit) {
        throw new NotFoundException(`Produit avec l'ID ${id} introuvable`);
      }
      return produit;
    }
  
    @Post()
    async create(@Body() createProduitDto: CreateProduitDto): Promise<Produit> {
      return await this.produitService.create(createProduitDto);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProduitDto: UpdateProduitDto
    ): Promise<Produit> {
      return await this.produitService.update(parseInt(id), updateProduitDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
      return await this.produitService.remove(parseInt(id));
    }
  }
  