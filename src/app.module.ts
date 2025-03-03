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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables partout dans l'application
    }),
    TypeOrmModule.forRoot({

      // pour utiliser mysql database avec xammp

      // type: 'mysql',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,

      
      // pour utiliser sqlite database

      type: 'sqlite',
      database: process.env.DB_NAME,
     

      // pour utiliser postgreSQL

      // type: 'postgres',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,

      

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
