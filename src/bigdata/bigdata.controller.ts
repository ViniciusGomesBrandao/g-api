import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BigDataService } from './bigdata.service';
import { FormDataRequest } from 'nestjs-form-data';
import { GetRegistrationDto } from './dto/get-registration.dto';
import { HttpStatusCode } from 'axios';
import { GetDomainsDto } from './dto/get-domains.dto';
import { GetBasicRegistrationDataDto } from './dto/get-basic-registration-data.dto';
import { GetClassCouncilsDto } from './dto/get-class-councils.dto';
import { GetProfessionalDataDto } from './dto/get-professional-data.dto';
import { GetPublicServantsDto } from './dto/get-public-servants.dto';
import { GetExposureProfileMediaDto } from './dto/get-exposure-profile-media.dto';
import { GetKYCComplianceDto } from './dto/get-kyc-compliance.dto';
import { GetKYCNewsDto } from './dto/get-kyc-news.dto';
import { GetElectoralDonationsDto } from './dto/get-electoral-donations.dto';
import { GetElectoralCandidatesDto } from './dto/get-electoral-candidates.dto';
import { GetPresenceAppsPlatformsDto } from './dto/get-presence-apps-platforms.dto';
import { GetOnlineAdsDto } from './dto/get-online-ads.dto';
import { GetCertificateNothingListedDto } from './dto/get-certificate-nothing-listed.dto';
import { GetPGFNCertificateDto } from './dto/get-pgfn-certificate.dto';
import { GetCentralBankAdministrativeSanctionsDto } from './dto/get-central-bank-administrative-sanctions.dto';
import { GetCriminalBackgroundCertificatePFDto } from './dto/get-criminal-background-certificate-PF.dto';
import { GetCriminalBackgroundCertificatePCDto } from './dto/get-criminal-background-certificate-PC.dto';
import { GetNegativeCertificateStateDebtsDto } from './dto/get-negative-certificate-state-debts.dto';

@Controller('bigdata')
export class BigDataController {
  constructor(
    private bigdataService: BigDataService
  ) {

  }

  @Get('registration')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getRegistrationData(@Body() getRegistrationDto: GetRegistrationDto) {
    return await this.bigdataService.getRegistration(getRegistrationDto)
  }

  @Get('domain')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getDomains(@Body() getDomainsDto: GetDomainsDto) {
    return await this.bigdataService.getDomains(getDomainsDto)
  }

  @Get('basicRegistration')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getBasicRegistrationData(@Body() getBasicRegistrationDataDto: GetBasicRegistrationDataDto) {
    return await this.bigdataService.getBasicRegistrationData(getBasicRegistrationDataDto)
  }

  @Get('classCouncils')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getClassCouncils(@Body() getClassCouncilsDto: GetClassCouncilsDto) {
    return await this.bigdataService.getClassCouncils(getClassCouncilsDto)
  }

  @Get('professional')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getProfessionalData(@Body() getProfessionalDataDto: GetProfessionalDataDto) {
    return await this.bigdataService.getProfessionalData(getProfessionalDataDto)
  }

  @Get('publicServants')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getPublicServants(@Body() getPublicServantsDto: GetPublicServantsDto) {
    return await this.bigdataService.getPublicServants(getPublicServantsDto)
  }

  @Get('exposureProfileMedia')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getExposureProfileMedia(@Body() getExposureProfileMediaDto: GetExposureProfileMediaDto) {
    return await this.bigdataService.getExposureProfileMedia(getExposureProfileMediaDto)
  }

  @Get('kycCompliance')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getKYCCompliance(@Body() getKYCComplianceDto: GetKYCComplianceDto) {
    return await this.bigdataService.getKYCCompliance(getKYCComplianceDto)
  }

  @Get('kycNews')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getKYCNews(@Body() getKYCNewsDto: GetKYCNewsDto) {
    return await this.bigdataService.getKYCNews(getKYCNewsDto)
  }

  @Get('electoralDonations')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getElectoralDonations(@Body() getElectoralDonationsDto: GetElectoralDonationsDto) {
    return await this.bigdataService.getElectoralDonations(getElectoralDonationsDto)
  }

  @Get('electoralCandidates')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getElectoralCandidates(@Body() getElectoralCandidatesDto: GetElectoralCandidatesDto) {
    return await this.bigdataService.getElectoralCandidates(getElectoralCandidatesDto)
  }

  @Get('presenceAppsPlatforms')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getPresenceAppsPlatforms(@Body() getPresenceAppsPlatformsDto: GetPresenceAppsPlatformsDto) {
    return await this.bigdataService.getPresenceAppsPlatforms(getPresenceAppsPlatformsDto)
  }

  @Get('onlineAds')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getOnlineAds(@Body() getOnlineAdsDto: GetOnlineAdsDto) {
    return await this.bigdataService.getOnlineAds(getOnlineAdsDto)
  }

  @Get('certificateNothingListed')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getCertificateNothingListed(@Body() getCertificateNothingListedDto: GetCertificateNothingListedDto) {
    return await this.bigdataService.getCertificateNothingListed(getCertificateNothingListedDto)
  }

  @Get('pgfnCertificate')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getPGFNCertificate(@Body() getPGFNCertificateDto: GetPGFNCertificateDto) {
    return await this.bigdataService.getPGFNCertificate(getPGFNCertificateDto)
  }

  @Get('centralBankAdministrativeSanctions')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getCentralBankAdministrativeSanctions(@Body() getCentralBankAdministrativeSanctionsDto: GetCentralBankAdministrativeSanctionsDto) {
    return await this.bigdataService.getCentralBankAdministrativeSanctions(getCentralBankAdministrativeSanctionsDto)
  }

  @Get('criminalBackgroundCertificatePF')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getCriminalBackgroundCertificatePF(@Body() getCriminalBackgroundCertificatePFDto: GetCriminalBackgroundCertificatePFDto) {
    return await this.bigdataService.getCriminalBackgroundCertificatePF(getCriminalBackgroundCertificatePFDto)
  }

  @Get('criminalBackgroundCertificatePC')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getCriminalBackgroundCertificatePC(@Body() getCriminalBackgroundCertificatePCDto: GetCriminalBackgroundCertificatePCDto) {
    return await this.bigdataService.getCriminalBackgroundCertificatePC(getCriminalBackgroundCertificatePCDto)
  }

  @Get('negativeCertificateStateDebts')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async getNegativeCertificateStateDebts(@Body() getNegativeCertificateStateDebtsDto: GetNegativeCertificateStateDebtsDto) {
    return await this.bigdataService.getNegativeCertificateStateDebts(getNegativeCertificateStateDebtsDto)
  }

  
}
