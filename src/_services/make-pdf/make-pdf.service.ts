import { Injectable } from '@nestjs/common';
import { IOutput } from 'src/_helpers/default-returns';
import * as  puppeteer from 'puppeteer'
@Injectable()
export class MakePdfService {
  async makePdf(config: MakePdfConfigs): Promise<IOutput> {
    let output: IOutput;
    try {

      const browser = await puppeteer.launch({
        headless: 'new',
      });

      const page = await browser.newPage();

      await page.setContent(`<!DOCTYPE html>
            <html lang="en">
            
            <head>
              <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"> -->
              <style>
                body {
                  /* CSS Variables that may have been missed get put on body */
                  --bs-gutter-x: 1.5rem;
                  --bs-gutter-y: 0;
                }
            
                * {
                  box-sizing: border-box;
                }
            
                :root {
                  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                  --bs-body-font-family: var(--bs-font-sans-serif);
                  --bs-body-font-size: 1rem;
                  --bs-body-font-weight: 400;
                  --bs-body-line-height: 1.5;
                  --bs-body-color: #212529;
                  --bs-body-bg: #fff;
                  --bs-border-radius-xxl: 2rem;
                  --bs-border-radius-2xl: var(--bs-border-radius-xxl);
                }
            
                @media (prefers-reduced-motion: no-preference) {
                  :root {
                    scroll-behavior: smooth;
                  }
                }
            
                body {
                  margin: 0;
                  font-family: var(--bs-body-font-family);
                  font-size: var(--bs-body-font-size);
                  font-weight: var(--bs-body-font-weight);
                  line-height: var(--bs-body-line-height);
                  color: var(--bs-body-color);
                  text-align: var(--bs-body-text-align);
                  background-color: var(--bs-body-bg);
                  -webkit-text-size-adjust: 100%;
                  -webkit-tap-highlight-color: transparent;
                }
            
                *,
                :after,
                :before {
                  box-sizing: border-box;
                }
            
                .p-5 {
                  padding: 3rem !important;
                }
            
                .page {
                  page-break-before: always !important;
                }
            
                .row {
                  --bs-gutter-x: 1.5rem;
                  --bs-gutter-y: 0;
                  display: flex;
                  flex-wrap: wrap;
                  margin-top: calc(-1 * var(--bs-gutter-y));
                  margin-right: calc(-.5 * var(--bs-gutter-x));
                  margin-left: calc(-.5 * var(--bs-gutter-x));
                }
            
                .w-100 {
                  width: 100% !important;
                }
            
                .justify-content-between {
                  justify-content: space-between !important;
                }
            
                .m-0 {
                  margin: 0 !important;
                }
            
                .mt-3 {
                  margin-top: 1rem !important;
                }
            
                .mt-2 {
                  margin-top: .5rem !important;
                }
            
                .mt-1 {
                  margin-top: .25rem !important;
                }
            
                .mt-4 {
                  margin-top: 1.5rem !important;
                }
            
                .px-3 {
                  padding-right: 1rem !important;
                  padding-left: 1rem !important;
                }
            
                .mt-5 {
                  margin-top: 3rem !important;
                }
            
                .px-1 {
                  padding-right: .25rem !important;
                  padding-left: .25rem !important;
                }
            
                .row>* {
                  flex-shrink: 0;
                  width: 100%;
                  max-width: 100%;
                  padding-right: calc(var(--bs-gutter-x) * .5);
                  padding-left: calc(var(--bs-gutter-x) * .5);
                  margin-top: var(--bs-gutter-y);
                }
            
                .col-auto {
                  flex: 0 0 auto;
                  width: auto;
                }
            
                .col-12 {
                  flex: 0 0 auto;
                  width: 100%;
                }
            
                .p-0 {
                  padding: 0 !important;
                }
            
                .col-4 {
                  flex: 0 0 auto;
                  width: 33.33333333%;
                }
            
                .p-2 {
                  padding: .5rem !important;
                }
            
                .border-side {
                  border: solid gray 1px;
                }
            
                .col-6 {
                  flex: 0 0 auto;
                  width: 50%;
                }
            
                .p-4 {
                  padding: 1.5rem !important;
                }
            
                .nt-found {
                  border: solid gray 1px;
                  background-color: #f5f5f5;
                }
            
                .col-3 {
                  flex: 0 0 auto;
                  width: 25%;
                }
            
                button {
                  border-radius: 0;
                }
            
                button {
                  margin: 0;
                  font-family: inherit;
                  font-size: inherit;
                  line-height: inherit;
                }
            
                button {
                  text-transform: none;
                }
            
                button {
                  -webkit-appearance: button;
                }
            
                button:not(:disabled) {
                  cursor: pointer;
                }
            
                .fs-7 {
                  font-size: 0.75rem !important;
                }
            
                .fs-2 {
                  font-size: calc(1.325rem + .9vw) !important;
                }
            
                .fw-bold {
                  font-weight: 700 !important;
                }
            
                @media (min-width: 1200px) {
                  .fs-2 {
                    font-size: 2rem !important;
                  }
                }
            
                .fs-2 {
                  font-size: calc(1.325rem + .9vw) !important;
                }
            
                .fw-bold {
                  font-weight: 700 !important;
                }
            
                @media (min-width: 1200px) {
                  .fs-2 {
                    font-size: 2rem !important;
                  }
                }
            
                .fs-5 {
                  font-size: 1.25rem !important;
                }
            
                .fs-5 {
                  font-size: 1.25rem !important;
                }
            
                table {
                  caption-side: bottom;
                  border-collapse: collapse;
                }
            
                #customers {
                  font-family: Arial, Helvetica, sans-serif;
                  border-collapse: collapse;
                  width: 100%;
                }
            
                .fs-3 {
                  font-size: calc(1.3rem + .6vw) !important;
                }
            
                @media (min-width: 1200px) {
                  .fs-3 {
                    font-size: 1.75rem !important;
                  }
                }
            
                .h-100 {
                  height: 100% !important;
                }
            
                .justify-content-center {
                  justify-content: center !important;
                }
            
                .align-content-center {
                  align-content: center !important;
                }
            
                .fs-4 {
                  font-size: calc(1.275rem + .3vw) !important;
                }
            
                @media (min-width: 1200px) {
                  .fs-4 {
                    font-size: 1.5rem !important;
                  }
                }
            
                img {
                  vertical-align: middle;
                }
            
                tbody {
                  border-color: inherit;
                  border-style: solid;
                  border-width: 0;
                }
            
                .lh-1 {
                  line-height: 1 !important;
                }
            
                .lh-1 {
                  line-height: 1;
                }
            
                svg {
                  vertical-align: middle;
                }
            
                tr {
                  border-color: inherit;
                  border-style: solid;
                  border-width: 0;
                }
            
                #customers tr:nth-child(2n) {
                  background-color: #f5f5f5;
                }
            
                .fs-6 {
                  font-size: 1rem !important;
                }
            
                th {
                  text-align: inherit;
                  text-align: -webkit-match-parent;
                }
            
                th {
                  border-color: inherit;
                  border-style: solid;
                  border-width: 0;
                }
            
                #customers th {
                  border: 0px solid #ddd;
                  padding: 8px;
                }
            
                #customers th {
                  padding-top: 12px;
                  padding-bottom: 12px;
                  text-align: left;
                  background-color: white;
                  color: black;
                }
            
                td {
                  border-color: inherit;
                  border-style: solid;
                  border-width: 0;
                }
            
                #customers td {
                  border: 0px solid #ddd;
                  padding: 8px;
                }
            
                .t-r {
                  text-align: right !important;
                }
              </style>
            </head>
            
            <body>${config.content}</body>

            </html>`);

      const pdf = await page.pdf({
        ...config.format ? {
          format: config.format
        } : undefined,
        ...config.path ? {
          path: config.path
        } : undefined
      });

      await browser.close();

      output = {
        success: true,
        message: "PDF gerado com sucesso!",
        data: pdf
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async makePersonalInformation(data: any): Promise<IOutput> {
    let output: IOutput;
    try {

      let registrationData = data.getRegistrationData.data.Result[0].RegistrationData;
      let telephoneData = data.getTelephones.data.Result[0].ExtendedPhones;
      let relationshipsData = data.getPersonalRelationships.data.Result[0].RelatedPeople;
      // console.log(data.getRegistrationData.data.Result[0])
      // MAKE TELEPHONES
      let telephones: string = "";
      if (telephoneData.hasOwnProperty('Phones')) {
        await Promise.all(telephoneData.Phones.map((phones: any) => {
          telephones = `${telephones}
            <tr>    
                <td class="fs-7">${phones.Number}</td>
                <td class="fs-7">${phones.Type}</td>
            </tr>`
        }));
      }


      //MAKE RELASHIHIP
      let relationships: string = "";
      if (relationshipsData.hasOwnProperty('PersonalRelationships')) {
        // console.log("TESTE");
        await Promise.all(relationshipsData.PersonalRelationships.map((relationship: any) => {
          relationships = `${relationships}
                    <tr>    
                        <td class="fs-7">${relationship.RelatedEntityName}</td>
                        <td class="fs-7">${relationship.RelatedEntityTaxIdNumber}</td>
                        <td class="fs-7">${this.translateRelationships(relationship.RelationshipType)}</td>
                    </tr>
                    `
        }));
      }
      // console.log(relationships)

      let page = `
        <div class="content page p-5">
            <div class="row w-100 m-0 justify-content-between">
              <div class="col-auto">
                <span class="text-default fs-7">Análise de <span class="fw-bold">${registrationData.BasicData.Name ? registrationData.BasicData.Name : ''}</span> | CPF
                ${registrationData.BasicData.TaxIdNumber ? registrationData.BasicData.TaxIdNumber : ''}</span>
              </div>
              <div class="col-auto">
        
              </div>
            </div>
            <div class="row w-100 m-0 mt-3">
              <div class="col-auto">
                <span class="text-default fs-2 fw-bold">
                  Informações pessoais
                </span>
              </div>
            </div>
            <div class="row w-100 m-0 mt-2">
              <div class="col-auto">
                <span class="text-default fs-7">
                  Dados básicos, relacionamentos e histórico de telefones.
                </span>
              </div>
            </div>
            <div class="row w-100 m-0 mt-3">
              <div class="col-auto">
                <span class="text-default fs-5 fw-bold">
                  Dados básicos
                </span>
              </div>
            </div>
            <div class="row w-100 m-0 mt-2">
              <div class="col-12 p-0">
                <table class="w-100" id="customers">
                  <tr>
                    <th>${registrationData.BasicData.Name ? registrationData.BasicData.Name : ''}</th>
                    <th></th>
        
                  </tr>
                  <tr>
                    <td class="fs-7">CPF</td>
                    <td class="fs-7 t-r">${registrationData.BasicData.TaxIdNumber ? registrationData.BasicData.TaxIdNumber : ''}</td>
        
                  </tr>
                  <tr>
                    <td class="fs-7">Nome</td>
                    <td class="fs-7 t-r">${registrationData.BasicData.Name ? registrationData.BasicData.Name : ''}</td>
                  </tr>
                  <tr>
                    <td class="fs-7">Status</td>
                    <td class="fs-7 t-r">${registrationData.BasicData.TaxIdStatus ? registrationData.BasicData.TaxIdStatus : ''}</td>
                  </tr>
                  <tr>
                    <td class="fs-7">Data de nascimento</td>
                    <td class="fs-7 t-r">${registrationData.BasicData.BirthDate ? this.formatarData(new Date(registrationData.BasicData.BirthDate)) : ''}</td>
                  </tr>
                  <tr>
                    <td class="fs-7">Gênero</td>
                    <td class="fs-7 t-r">${registrationData.BasicData.Gender ? registrationData.BasicData.Gender : ''}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="row w-100 m-0 mt-1">
              <div class="col-auto">
                <span class="text-default fs-7">
                  Nome e CPF conferem com dados da receita. Fonte: Receita Federal.
                </span>
              </div>
            </div>
            <div class="row w-100 m-0 mt-4">
              <div class="col-auto">
                <span class="text-default fs-5 fw-bold">
                  Relacionamentos
                </span>
              </div>
            </div>
            ${relationships != '' ? `
                <div class="row w-100 m-0 mt-2">
                    <div class="col-12 p-0">
                    <table class="w-100" id="customers">
                        <tr>
                        <th>NOME</th>
                        <th>DOCUMENTO</th>
                        <th>RELACIONAMENTO</th>
                        </tr>  
                    ${relationships}
                    </table>
                    </div>
                    </div>` : `
                    <div class="row w-100 m-0 mt-3 px-3">
                        <div class="col-12 nt-found p-4">
                        <div class="row w-100 h-100 align-content-center justify-content-center">
                            <div class="col-auto">
                            <span class="text-default fs-6 fw-bold">
                                Nenhum registro encontrado
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>`
        }
              
            <div class="row w-100 m-0 mt-4">
              <div class="col-auto">
                <span class="text-default fs-5 fw-bold">
                  Histórico de telefones
                </span>
              </div>
            </div>
                  ${telephones != '' ? `
                    <div class="row w-100 m-0 mt-2">
                        <div class="col-12 p-0">
                            <table class="w-100" id="customers">
                            <tr>
                                <th>TELEFONE</th>
                                <th>TIPO</th>
                            </tr> 
                        ${telephones}
                        </table>
                        </div>
                    </div>` : `
                    <div class="row w-100 m-0 mt-3 px-3">
                        <div class="col-12 nt-found p-4">
                        <div class="row w-100 h-100 align-content-center justify-content-center">
                            <div class="col-auto">
                            <span class="text-default fs-6 fw-bold">
                                Nenhum registro encontrado
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>`
        }
                </table>
              </div>
            </div>
          </div>`
      output = {
        success: true,
        message: "Html gerado com sucesso!",
        data: page
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async makeFinancialInformation(data: any): Promise<IOutput> {
    let output: IOutput;
    // console.log(data);

    try {
      const financialRisk = data.getFinancialRisk.data.Result[0].FinancialRisk;
      let page = `<div class="content page p-5">
          <div class="row w-100 m-0 justify-content-between">
            <div class="col-auto">
             
            </div>
            <div class="col-auto">
      
            </div>
          </div>
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Restrição financeira
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3 px-3">
            <div class="col-4 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Score</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                  ${financialRisk.FinancialRiskScore ? financialRisk.FinancialRiskScore : ''} 
                  ${financialRisk.FinancialRiskLevel ? financialRisk.FinancialRiskLevel : ''} 
                  </span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">
                  ${financialRisk.FinancialRiskLevel ? this.formatFinancialRisk(financialRisk.FinancialRiskLevel) : ''} 
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-7 fw-bold">
                Documento consultado ${financialRisk.CurrentConsecutiveCollectionMonths ? financialRisk.CurrentConsecutiveCollectionMonths : ''}  vezes nos últimos 3 meses.
              </span>
            </div>
          </div> 
        </div>`
      output = {
        success: true,
        message: "Html gerado com sucesso!",
        data: page
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async makeJudicialBackground(data: any): Promise<IOutput> {
    let output: IOutput;
    try {

      let judicialData = data.getJudicialAdministrativeProceedings.data.Result[0].Processes;

      let lawsuit: string = "";
      if (judicialData.hasOwnProperty('Lawsuits')) {
        console.log(judicialData)
        await Promise.all(judicialData.Lawsuits.map((process: any) => {
          lawsuit = `${lawsuit}
          <div class="row w-100 m-0 mt-3">
            <div class="col-12 p-0">
              <table class="w-100" id="customers">
                <tr>
                  <td class="fs-7 fw-bold">
                    Habeas Corpus
                  </td>
                </tr>
                <tr>
                  <td class="fs-7">Nº do processo</td>
                  <td class="fs-7 t-r">${process.Number ? process.Number : ''}</td>
      
                </tr>
                <tr>
                  <td class="fs-7">Nome da corte</td>
                  <td class="fs-7 t-r">${process.JudgingBody ? process.JudgingBody : ''}</td>
                </tr>
                <tr>
                  <td class="fs-7">Data</td>
                  <td class="fs-7 t-r">${process.RedistributionDate ? this.formatarData(new Date(process.RedistributionDate)) : ''}</td>
                </tr>
                <tr>
                  <td class="fs-7">Assunto principal</td>
                  <td class="fs-7 t-r">${process.MainSubject ? process.MainSubject : ''}</td>
                </tr>
                <tr>
                  <td class="fs-7">Classificação</td>
                  <td class="fs-7 t-r">${process.CourtType ? process.CourtType : ''}, ${process.Status ? process.Status : ''}</td>
                </tr>
                <tr>
                  <td class="fs-7">Situação</td>
                  <td class="fs-7 t-r">${process.CourtType ? process.CourtType : ''}</td>
                </tr>
              </table>
            </div>
          </div>`;
        }));
      }

      // console.log(data.getRegistrationData.data.Result[0])
      // console.log(relationships)

      let page = `
        <div class="content page p-5">
          <div class="row w-100 m-0 justify-content-between">
            <div class="col-auto">
            </div>
            <div class="col-auto">
              <!-- LOGO -->
            </div>
          </div>
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Antecedentes judiciais
              </span>
            </div>
          </div>
          <div class="row w-100 m-0">
            <div class="col-auto">
              <span class="text-default fs-7">
                ${judicialData.TotalLawsuits} processos encontrados:
              </span>
            </div>
          </div>
          ${lawsuit != '' ? `${lawsuit}` : `
            <div class="row w-100 m-0 mt-3 px-3">
                <div class="col-12 nt-found p-4">
                  <div class="row w-100 h-100 align-content-center justify-content-center">
                      <div class="col-auto">
                        <span class="text-default fs-6 fw-bold">
                            Nenhum registro encontrado
                        </span>
                      </div>
                  </div>
                </div>
            </div>`
          }
        </div>`
      output = {
        success: true,
        message: "Html gerado com sucesso!",
        data: page
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async makeFinancialRestriction(data: any): Promise<IOutput> {
    let output: IOutput;
    try {
      const financialRestrictionData = data.getFinancialInformation.data.Result[0].FinantialData;
      let statements: string = "";
      if (financialRestrictionData.hasOwnProperty('TaxReturns')) {
        await Promise.all(financialRestrictionData.TaxReturns.map((statement: any) => {
          statements = `${statements}
            <div class="row w-100 m-0 mt-3">
              <div class="col-12">
                <table class="w-100" id="customers">
                  <tr>
                    <th class="fs-7">ANO</th>
                    <th class="fs-7">SITUAÇÃO</th>
                    <th class="fs-7">BANCO</th>
                    <th class="fs-7">AGÊNCIA</th>
                  </tr>
                  <tr>
                    <td class="fs-7">${statement.Year}</td>
                    <td class="fs-7">${statement.Status}</td>
                    <td class="fs-7">${statement.Bank}</td>
                    <td class="fs-7">${statement.Branch}</td>
                  </tr>
                </table>
              </div>
            </div>`
        }));
      }
      // console.log(data.getRegistrationData.data.Result[0])

      // console.log(relationships)

      let page = `<div class="content page p-5">
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Informações financeiras
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3 px-3">
            <div class="col-6 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Informações financeiras</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    ${this.formatWage(financialRestrictionData.IncomeEstimates.BIGDATA_V2)}
                  </span>
                </div>
              </div>
      
            </div>
            <div class="col-6 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Estimativa de patrimônio</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    ${this.formatPatrimony(financialRestrictionData.TotalAssets)}
                  </span>
                </div>
              </div>
      
            </div>
      
          </div>
          <div class="row w-100 m-0 mt-5">
            <div class="col-auto">
              <span class="text-default fs-3 fw-bold">
                Declarações de Imposto de Renda de Pessoa Física
              </span>
            </div>
          </div>
          ${statements != '' ? `${statements}` : `
            <div class="row w-100 m-0 mt-3 px-3">
                <div class="col-12 nt-found p-4">
                  <div class="row w-100 h-100 align-content-center justify-content-center">
                      <div class="col-auto">
                        <span class="text-default fs-6 fw-bold">
                            Nenhum registro encontrado
                        </span>
                      </div>
                  </div>
                </div>
            </div>`
          }
        </div>`
      output = {
        success: true,
        message: "Html gerado com sucesso!",
        data: page
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async makeProfessionalHistory(data: any): Promise<IOutput> {
    let output: IOutput;
    try {
      const historyData = data.getProfessionalData.data.Result[0].ProfessionData;
      let history: string = "";
      if (historyData.hasOwnProperty('Professions')) {
        await Promise.all(historyData.Professions.map((item: any) => {
          history = `${history}
            <div class="row w-100 m-0 mt-3">
              <div class="col-12">
                <table class="w-100" id="customers">
                  <tr>
                    <th class="fs-7">EMPRESA</th>
                    <th class="fs-7">SETOR</th>
                    <th class="fs-7">NÍVEL</th>
                    <th class="fs-7">ÁREA</th>
                    <th class="fs-7">DATA DE INÍCIO</th>
                    <th class="fs-7">DATA DE TÉRMINO</th>
                  </tr>
                  <tr>
                    <td class="fs-7">${item.CompanyName}</td>
                    <td class="fs-7">${item.Sector}</td>
                    <td class="fs-7">${this.formatLevelEmployment(item.Level)}</td>
                    <td class="fs-7">${item.Area == "UNKNOWN" ? 'DESCONHECIDO' : item.Area}</td>
                    <td class="fs-7">${this.formatarData(new Date(item.StartDate))}</td>
                    <td class="fs-7">${this.formatarData(new Date(item.EndDate))}</td>
                  </tr>
                </table>
              </div>
            </div>`
        }));
      }
      // console.log(data.getRegistrationData.data.Result[0])

      // console.log(relationships)

      let page = `<div class="content page p-5">
      <div class="row w-100 m-0 mt-3">
        <div class="col-auto">
          <span class="text-default fs-2 fw-bold">
            Histórico profissional
          </span>
        </div>
      </div>
      ${history != "" ? history : `<div class="row w-100 m-0 mt-3 px-3">
      <div class="col-12 nt-found p-4">
        <div class="row w-100 h-100 align-content-center justify-content-center">
          <div class="col-auto">
            <span class="text-default fs-6 fw-bold">
              Nenhum registro profissional encontrado
            </span>
          </div>
        </div>
      </div>
    </div>`}
      
    </div>`
      output = {
        success: true,
        message: "Html gerado com sucesso!",
        data: page
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  formatarData(data: Date) {
    // Obtém o dia, mês e ano da data

    var dia: any = data.getDate() + 1;
    var mes: any = data.getMonth() + 1; // Mês é baseado em zero, então adicionamos 1
    var ano: any = data.getFullYear();

    // Adiciona zero à esquerda se o dia ou mês for menor que 10
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;

    // Retorna a data formatada no formato dd/mm/yyyy
    return dia + '/' + mes + '/' + ano;
  }

  formatFinancialRisk(params: string) {
    let response: string = "";
    switch (params) {
      case "A":
        response = "Baixo risco de inadimplência";
        break;
      case "B":
        response = "Baixo risco de inadimplência";
        break;
      case "C":
        response = "Risco médio de inadimplência";
        break;
      case "D":
        response = "Risco médio de inadimplência";
        break;

      default:
        response = "Alto risco de inadimplência";
        break;
    }
    return response;
  }

  translateRelationships(param: string): string {
    let response: string = "";
    switch (param) {
      case "MOTHER":
        response = "Mãe";
        break;
      case "FATHER":
        response = "Pai";
        break;
      case "BROTHER":
        response = "Irmão";
        break;
      case "GRANDPARENT":
        response = "Avó/Avô";
        break;
      case "UNCLE":
        response = "Tio";
        break;
      case "NEIGHBOR":
        response = "Vizinho";
        break;
      default:
        response = param
        break;
    }
    return response;
  }

  formatWage(param: string) {
    return `${param.split(" SM")[0]} salários mínimos`;
  }

  formatPatrimony(param: string) {
    return `${param.split("K")[0]} Mil`;
  }

  formatLevelEmployment(param: string){
    let response: string = "";
    switch (param) {
      case "EMPLOYEE":
        response = "Funcionário(a)";
        break;
      case "EMPLOYER":
        response = "Empregador(a)";
        break;

      default:
        response = param;
        break;
    }
    return response;
  }

  // formatDocument()
}


export interface MakePdfConfigs {
  content: string,
  format?: 'letter' | 'legal' | 'tabloid' | 'ledger' | 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6',
  path?: string
}