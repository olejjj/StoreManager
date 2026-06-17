import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Nazwa pliku, który się utworzy
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Gdzie Nest ma szukać naszych tabel
      synchronize: true, // Automatycznie tworzy tabele na podstawie kodu
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}