import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataLayerService } from './dataLayer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DataLayerService],
})
export class AppModule {}
