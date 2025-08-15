import { Controller, Get, Query, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SoapService } from './soap.service';

@Controller('example-soap')
export class SoapController {
  constructor(private readonly soapService: SoapService) { }

  @Get('number-to-words')
  async numberToWords(@Query('number') number: BigInteger) {

    if (isNaN(Number(number))) {
      throw new BadRequestException('Debe enviar un número válido');
    }
    if ((Number(number) < 0) || (Number(number) > 999999999)) {
      throw new BadRequestException('Debe enviar un número entre 0 y 999,999,999');
    }
    try {
      return await this.soapService.callSoapMethod('NumberToDollars', { ubiNum: number });
    } catch (error) {
      throw new InternalServerErrorException('Error al convertir el número a letras ' + error.message);
    }
  }

  @Get('number-to-dollar')
  async numberToDollar(@Query('number') number: BigInteger) {

    if (isNaN(Number(number))) {
      throw new BadRequestException('Debe enviar un número válido');
    }

    if ((Number(number) < 0) || (Number(number) > 999999999)) {
      throw new BadRequestException('Debe enviar un número entre 0 y 999,999,999');
    }
    try {
      return await this.soapService.callSoapMethod('NumberToDollars', { dNum: number });
    } catch (error) {
      throw new InternalServerErrorException('Error al convertir el número a dólares ' + error.message);
    }
  }
}
