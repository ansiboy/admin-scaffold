import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './controllers/home';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [AppService],
})
export class AppModule {

  static serverOptions = {};
}
