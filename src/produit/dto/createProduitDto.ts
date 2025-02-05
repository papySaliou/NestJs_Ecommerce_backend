import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProduitDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  prix: number;

  @IsNumber()
  @IsNotEmpty()
  quantite: number;

  @IsNumber()
  @IsNotEmpty()
  categorieId: number;
}
