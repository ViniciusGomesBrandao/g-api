import { Injectable } from '@nestjs/common';

interface IOutput {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable()
export class BigdatacorpService {
  private _host: string = `${process.env._BIGDATACORP_ENVIRONMENT_URL}`;
  private _username: string = `${process.env._BIGDATACORP_ENVIRONMENT_USERNAME}`;
  private _password: string = `${process.env._BIGDATACORP_ENVIRONMENT_PASSWORD}`;
  private _expiration_minute: number = 1440; //24H
  private _tz: string = 'America/Sao_Paulo';
  private _origin: string = 'bigdatacorp';
}
