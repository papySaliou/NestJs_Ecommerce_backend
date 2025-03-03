import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitsModule } from './produit/produits.module';
import { CategorieController } from './categorie/categorie.controller';
import { CategorieModule } from './categorie/categorie.module';
import { ProduitsController } from './produit/produits.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables partout dans l'application
    }),
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
      // database: 'db.sqlite',

      // type: 'sqlite',
      database: process.env.DB_NOM,

      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      }),
    AuthModule,
    ProduitsModule,
    CategorieModule,
  ],
  controllers: [AppController, CategorieController,ProduitsController],
  providers: [AppService],
})
export class AppModule {}
