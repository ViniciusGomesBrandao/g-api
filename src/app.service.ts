import { BigdatacorpService } from '@app/bigdatacorp';
import { Injectable } from '@nestjs/common';
import { IOutput } from './_helpers/default-returns';
// const puppeteer = require('puppeteer');
import * as  puppeteer from 'puppeteer'
@Injectable()
export class AppService {
  constructor(

  ) {

  }
  async getHello(): Promise<IOutput> {
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
            background-color: #f5f5f5 !important;
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
      
      <body>
        <div class="content page p-5">
          <div class="row w-100 m-0 justify-content-between">
            <div class="col-auto">
              <span class="text-default fs-7">Análise de <span class="fw-bold">Tatilane Franco Alves</span> | CPF
                002.500.762-92</span>
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
                  <th>Tatilane Franco Alves</th>
                  <th></th>
      
                </tr>
                <tr>
                  <td class="fs-7">CPF</td>
                  <td class="fs-7 t-r">002.500.762-92</td>
      
                </tr>
                <tr>
                  <td class="fs-7">Nome</td>
                  <td class="fs-7 t-r">Tatilane Franco Alves</td>
                </tr>
                <tr>
                  <td class="fs-7">Status</td>
                  <td class="fs-7 t-r">Regular</td>
                </tr>
                <tr>
                  <td class="fs-7">Data de nascimento</td>
                  <td class="fs-7 t-r">29/11/1988</td>
                </tr>
                <tr>
                  <td class="fs-7">Gênero</td>
                  <td class="fs-7 t-r">Feminino</td>
                </tr>
                <tr>
                  <td class="fs-7">Nacionalidade</td>
                  <td class="fs-7 t-r">Brasileira</td>
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
          <div class="row w-100 m-0 mt-2">
            <div class="col-12 p-0">
              <table class="w-100" id="customers">
                <tr>
                  <th>NOME</th>
                  <th>DOCUMENTO</th>
                  <th>RELACIONAMENTO</th>
                </tr>
                <tr>
                  <td class="fs-7">Maria Franco Pinto</td>
                  <td class="fs-7">589.629.132-91</td>
                  <td class="fs-7">Mãe</td>
                </tr>
                <tr>
                  <td class="fs-7">Eduardo Pereira Alves</td>
                  <td class="fs-7">078.694.365-34</td>
                  <td class="fs-7">Pai</td>
                </tr>
                <tr>
                  <td class="fs-7">Tailane Franco Alves</td>
                  <td class="fs-7">019.756.072-52</td>
                  <td class="fs-7">Irmão</td>
                </tr>
                <tr>
                  <td class="fs-7">Tailane Franco Alves</td>
                  <td class="fs-7">912.699.622-72</td>
                  <td class="fs-7">Irmão</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="row w-100 m-0 mt-4">
            <div class="col-auto">
              <span class="text-default fs-5 fw-bold">
                Histórico de telefones
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-2">
            <div class="col-12 p-0">
              <table class="w-100" id="customers">
                <tr>
                  <th>TELEFONE</th>
                  <th>TIPO</th>
                  <th>REGISTRO</th>
                </tr>
                <tr>
                  <td class="fs-7">(92) 98141-9876</td>
                  <td class="fs-7">Celular</td>
                  <td class="fs-7">Antigo</td>
                </tr>
                <tr>
                  <td class="fs-7">(92) 3324-1060</td>
                  <td class="fs-7">Casa</td>
                  <td class="fs-7">Antigo</td>
                </tr>
                <tr>
                  <td class="fs-7">(11) 4824-4516</td>
                  <td class="fs-7">Trabalho</td>
                  <td class="fs-7">Antigo</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="content page p-5">
          <div class="row w-100 m-0 justify-content-between">
            <div class="col-auto">
              <span class="text-default fs-7">Análise de <span class="fw-bold">Tatilane Franco Alves</span> | CPF
                002.500.762-92</span>
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
                    39 F
                  </span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Alto risco de inadimplência
                  </span>
                </div>
              </div>
            </div>
            <div class="col-4 border-side">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Débitos e protestos</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    R$ 5.434,34
                  </span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">3 registros encontrados
                  </span>
                </div>
              </div>
            </div>
            <div class="col-4 border-side">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Cheques devolvidos</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    R$ 0,00
                  </span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">0 registros encontrados
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-7 fw-bold">
                Documento consultado 0 vezes nos últimos 3 meses.
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-3 fw-bold">
                Lista de débitos
      
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-2">
            <div class="col-12 p-0">
              <table class="w-100" id="customers">
                <tr>
                  <th class="fs-7">VALOR</th>
                  <th class="fs-7">EMPRESA</th>
                  <th class="fs-7">CIDADE</th>
                  <th class="fs-7">VENCIMENTO</th>
                </tr>
                <tr>
                  <td class="fs-7">R$ 146,39</td>
                  <td class="fs-7">Itau Unibanco Holding Sa</td>
                  <td class="fs-7">Sao Paulo / SP</td>
                  <td class="fs-7">10/10/2022</td>
                </tr>
              </table>
            </div>
          </div>
      
        </div>
        <div class="content page p-5">
          <div class="row w-100 m-0 justify-content-between">
            <div class="col-auto">
              <span class="text-default fs-7">Análise de <span class="fw-bold">Tatilane Franco Alves</span> | CPF
                002.500.762-92</span>
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
                10 processos encontrados:
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-2">
            <div class="col-12 p-0">
              <table class="w-100" id="customers">
                <tr>
                  <td class="fs-7 fw-bold">
                    Habeas Corpus
                  </td>
                </tr>
                <tr>
                  <td class="fs-7">Nº do processo</td>
                  <td class="fs-7 t-r">06299581320188060000</td>
      
                </tr>
                <tr>
                  <td class="fs-7">Nome da corte</td>
                  <td class="fs-7 t-r">Tribunal De Justiça Do Ceará (Tjce)</td>
                </tr>
                <tr>
                  <td class="fs-7">Data</td>
                  <td class="fs-7 t-r">28/08/2020</td>
                </tr>
                <tr>
                  <td class="fs-7">Assunto principal</td>
                  <td class="fs-7 t-r">Estelionato</td>
                </tr>
                <tr>
                  <td class="fs-7">Classificação</td>
                  <td class="fs-7 t-r">Criminal, Ativo</td>
                </tr>
                <tr>
                  <td class="fs-7">Situação</td>
                  <td class="fs-7 t-r">Arquivado</td>
                </tr>
                <tr>
                  <td class="fs-7">Partes envolvidas</td>
                  <td class="fs-7 t-r"><span class="fw-bold">Tatilane Franco Alves (Interno)</span><br>Hemerson Rodrigues
                    Moreira (Interno)
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="content page p-5">
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Restrição financeira
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
                    0 a 1 salários mínimos
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
                    Menor que 100 mil
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
                  <td class="fs-7">2018</td>
                  <td class="fs-7">Sua Declaracao Nao Consta Na Base De Dados Da Receita Federal</td>
                  <td class="fs-7"></td>
                  <td class="fs-7">0000</td>
                </tr>
              </table>
            </div>
          </div>
      
        </div>
        <div class="content page p-5">
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Histórico profissional
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3 px-3">
            <div class="col-12 nt-found p-4">
              <div class="row w-100 h-100 align-content-center justify-content-center">
                <div class="col-auto">
                  <span class="text-default fs-6 fw-bold">
                    Nenhum registro profissional encontrado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div class="content page p-5">
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Relacionamentos econômicos
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-4">
            <div class="col-auto">
              <span class="text-default fs-4 fw-bold">
                Participações societárias
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-2 px-3">
            <div class="col-12 nt-found p-4">
              <div class="row w-100 h-100 align-content-center justify-content-center">
                <div class="col-auto">
                  <span class="text-default fs-6 fw-bold">
                    Nenhum registro profissional encontrado
                  </span>
                </div>
              </div>
            </div>
          </div>
      
          <div class="row w-100 m-0 mt-4">
            <div class="col-auto">
              <span class="text-default fs-4 fw-bold">
                Lista de relacionamentos
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-2 px-3">
            <div class="col-12 nt-found p-4">
              <div class="row w-100 h-100 align-content-center justify-content-center">
                <div class="col-auto">
                  <span class="text-default fs-6 fw-bold">
                    Nenhum registro profissional encontrado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content page p-5">
          <div class="row w-100 m-0 justify-content-between">
            <div class="col-auto">
      
            </div>
            <div class="col-auto">
      
            </div>
          </div>
          <div class="row w-100 m-0 mt-3">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Servidores públicos
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-3 px-3">
            <div class="col-3 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Total de profissões encontradas</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    0
                  </span>
                </div>
              </div>
      
            </div>
            <div class="col-3 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Profissões atualmente em exercício</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    0
                  </span>
                </div>
              </div>
      
            </div>
            <div class="col-3 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Renda total identificada</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    R$ 0,00
                  </span>
                </div>
              </div>
      
            </div>
            <div class="col-3 border-side p-2">
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-7">Atualmente no serviço público?</span>
                </div>
              </div>
              <div class="row w-100 m-0">
                <div class="col-auto p-0 lh-1">
                  <span class="text-default fs-2 fw-bold">
                    Não
                  </span>
                </div>
              </div>
      
            </div>
      
          </div>
          <div class="row w-100 m-0 mt-4">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Lista de profissões encontradas
              </span>
            </div>
          </div>
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
          </div>
      
      
        </div>
        <div class="content page p-5">
          <div class="row w-100 m-0 mt-3 px-1">
            <div class="col-auto">
              <span class="text-default fs-2 fw-bold">
                Endereços
              </span>
            </div>
          </div>
          <div class="row w-100 m-0 mt-2 px-3">
            <div class="col-12 p-0">
              <table class="w-100" id="customers">
                <tr>
                  <th>ENDEREÇO</th>
                  <th>CEP</th>
                  <th>TIPO</th>
                </tr>
                <tr>
                  <td class="fs-7">R Camanau, 5, Centro - Presidente Figueiredo, AM</td>
                  <td class="fs-7">69735-000</td>
                  <td class="fs-7">Casa</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </body>
      
      </html>`);

      const pdf = await page.pdf({format: 'A4' });

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


}
