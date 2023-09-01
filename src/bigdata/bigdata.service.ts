import { Injectable } from '@nestjs/common';
import { GetRegistrationDto } from './dto/get-registration.dto';
import { BigdatacorpService } from '@app/bigdatacorp';
import { IOutput } from 'src/_helpers/default-returns';



@Injectable()
export class BigDataService {
  
  constructor(
    private bigDataCorpService: BigdatacorpService
  ){

  }
  async getRegistration(params) : Promise<IOutput>{
    return await this.bigDataCorpService.getRegistrationData(params);
  }

  async getDomains(params) : Promise<IOutput>{
    return await this.bigDataCorpService.getDomains(params);
  }

  async getBasicRegistrationData(params) : Promise<IOutput>{
    return await this.bigDataCorpService.getBasicRegistrationData(params);
  }

  async getClassCouncils(params) : Promise<IOutput> {
    return await this.bigDataCorpService.getClassCouncils(params);
  }
  
  async getProfessionalData(params) : Promise<IOutput> {
    return await this.bigDataCorpService.getProfessionalData(params);
  }

  async getPublicServants(params) : Promise<IOutput> {
    return await this.bigDataCorpService.getPublicServants(params);
  }

  async getExposureProfileMedia(params) : Promise<IOutput> {
    return await this.bigDataCorpService.getExposureProfileMedia(params);
  }

  async getKYCCompliance(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getKYCCompliance(params);
  }

  async getKYCNews(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getKYCNews(params);
  }

  async getElectoralDonations(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getElectoralDonations(params)
  }

  async getElectoralCandidates(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getElectoralCandidates(params);
  }

  async getPresenceAppsPlatforms(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getPresenceAppsPlatforms(params);
  }

  async getOnlineAds(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getOnlineAds(params)
  }

  async getCertificateNothingListed(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getCertificateNothingListed(params);
  }

  async getPGFNCertificate(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getPGFNCertificate(params);
  }

  async getCentralBankAdministrativeSanctions(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getCentralBankAdministrativeSanctions(params);
  }

  async getCriminalBackgroundCertificatePF(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getCriminalBackgroundCertificatePF(params);
  }

  async getCriminalBackgroundCertificatePC(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getCriminalBackgroundCertificatePC(params);
  }

  async getNegativeCertificateStateDebts(params) : Promise <IOutput> {
    return await this.bigDataCorpService.getNegativeCertificateStateDebts(params);
  }
}
