import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieController } from './categorie/categorie.controller';
import { CategorieModule } from './categorie/categorie.module';
import { Categorie } from './categorie/categorie.entity';
import { Produit } from './auth/produit.entity';
import { ProduitModule } from './produit/produit.module';
import { ProduitController } from './produit/produit.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({

      // pour utliser mysql database avec xammp

      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'users',

      
      // pour utliser sqlite database

      type: 'sqlite',
      database: 'db.sqlite',


      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      }),
    AuthModule,
    ProduitModule,
    CategorieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
