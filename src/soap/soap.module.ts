import { Module } from '@nestjs/common';
import { SoapService } from './soap.service';
import { SoapController } from './soap.controller';

@Module({
  controllers: [SoapController],
  providers: [SoapService],
})
export class SoapModule {}
