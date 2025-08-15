import { Injectable, Logger,InternalServerErrorException } from '@nestjs/common';
import * as soap from 'soap';

@Injectable()
export class SoapService {
  private readonly logger = new Logger(SoapService.name);
  private wsdlUrl = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL';

  async callSoapMethod(method: string, args: any): Promise<any> {
    try {
      const client = await soap.createClientAsync(this.wsdlUrl);
      this.logger.log(`SOAP client created for ${this.wsdlUrl}`);

      if (!client[`${method}Async`]) {
        throw new Error(`Method ${method} not found in SOAP service`);
      }

      const [result] = await client[`${method}Async`](args);
      return result;
    } catch (error) {
      this.logger.error(`Error calling SOAP method: ${error.message}`);

      throw error;
    }
  }
}
