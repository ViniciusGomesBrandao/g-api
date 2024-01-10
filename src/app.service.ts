import { BigdatacorpService } from '@app/bigdatacorp';
import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import { IOutput } from './_helpers/default-returns';
@Injectable()
export class AppService {
  constructor(

  ) {

  }
  async getHello(): Promise<IOutput> {
    let output: IOutput;
    try {

      const html = '<h1>Hello, PDF!</h1>'; // Seu HTML aqui
      const pdfOptions = { format: 'Letter' }; // Opções para o PDF
      const pdfBuffer = await this.generatePdfBuffer(html, pdfOptions);
      
      output = {
        success: true,
        message: "PDF gerado com sucesso!",
        data: pdfBuffer
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }


  private async generatePdfBuffer(html: string, options: object): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      pdf.create(html, options).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }
}
