import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as _ from 'lodash';
interface IOutput {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable()
export class BigdatacorpService {
  // private _host: string = `${process.env._BIGDATACORP_ENVIRONMENT_URL}`;
  private _host: string = `https://plataforma.bigdatacorp.com.br`;
  private _username: string = `diligence`;
  private _password: string = `Np$KKRz5Lf5k!M38`;
  private _expiration_minute: number = 24; //24H
  private _tz: string = 'America/Sao_Paulo';
  private _origin: string = 'bigdatacorp';

  async requestApi(_params: any) {
    let output: any;
    try {
      if (!_params) {
        throw new Error("Axios: invalid parameters");
      }

      let _uri: string, _method: string, _port: string, _data: any = {}, _headers: any;

      if (_.has(_params, "_uri")) {
        _uri = _params._uri;
      }
      if (_.has(_params, "_method")) {
        _method = _params._method;
      }
      if (_.has(_params, "_data")) {
        _data = { data: _params._data };
      }
      if (_.has(_params, "_headers")) {
        _headers = _params._headers;
      } else {
        _headers = { 'Content-Type': 'application/json' }
      }

      let config = {
        method: _method,
        url: `${this._host}${_uri}`,
        headers: _headers,
        ..._data
      };
      console.log(config);

      output = await axios(config)
        .then(function (response) {
          console.log(response)
          return response.data;
        })
        .catch(function (error) {
          console.log(error.response)
          throw new Error(error);
        });
    } catch (e: any) {
      console.log('######requestApi: ', e);
      output = false;
    }
    return output;
  }

  async getTokenJwt() {
    let output: IOutput

    try {
      let config = {
        method: "POST",
        url: `${this._host}/tokens/gerar`,
        headers: {

        },
        data: {
          "login": this._username,
          "password": this._password,
          "expires": 0.5
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });

      if (!outputReq.success) {
        throw new Error(outputReq.message);
      }
      output = {
        success: true,
        message: "Token gerado com sucesso!",
        data: outputReq
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  // Obter informacoes pertinentes a procedimentos de cadastro de pessoas
  async getRegistrationData(params: getRegistrationDataParams): Promise<IOutput> {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "registration_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Obter informações dos sites e domínios que estão associados com a entidade consultada
  async getDomains(params: getDomainsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": `domains`,
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna conjunto mais simples de informações de todos os datasets
  async getBasicRegistrationData(params: getBasicRegistrationDataParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "basic_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações de participação da pessoa em entidades classistas ou associações profissionais relevantes.
  async getClassCouncils(params: getClassCouncilsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "class_organization",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações agregadas relacionadas com o histórico de trabalho e/ou o trabalho atual da pessoa
  async getProfessionalData(params: getProfessionalDataParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "occupation_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações agregadas e detalhadas dos funcionários públicos
  async getPublicServants(params: getPublicServantsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "profession_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações sobre diferentes programas de benefícios entregues pelos governos aos seus cidadãos
  async getBenefitsSocialAssistance(params: getBenefitsSocialAssistanceParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "social_assistance",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações capturadas de fontes de notícias públicas da internet
  async getExposureProfileMedia(params: getExposureProfileMediaParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${params.keywords ? `keywords{${params.keywords}},` : ''}${this.makeDefaultParams(params)}`,
          "Datasets": "media_profile_and_exposure",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Engloba informações necessárias para atender a requisitos regulatórios e/ou legais relacionados com processos de know-your-client
  async getKYCCompliance(params: getKYCComplianceParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },

        data: {
          "q": `${params.minmatch ? `minmatch{${params.minmatch}},` : ''}${this.makeDefaultParams(params)}`,
          "Datasets": "kyc",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna notícias relevantes que dão suporte a requisitos regulatórios e/ou legais relacionados principalmente com processos de KYC e PLD
  async getKYCNews(params: getKYCNewsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "kyc_dtec_flex_news",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações detalhadas sobre as doações realizadas para campanhas eleitorais pela entidade consultada
  async getElectoralDonations(params: getElectoralDonationsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "electoral_donors",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // informações detalhadas da participação dos indivíduos em eleições, atuais e históricas.
  async getElectoralCandidates(params: getElectoralCandidatesParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "election_candidate_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // identificar a presença da entidade consultada em diferentes plataformas e aplicativos relevantes no universo online
  async getPresenceAppsPlatforms(params: getPresenceAppsPlatformsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "apps_networks_and_platforms",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Traz informações relacionadas com a totalidade dos anúncios postados pelo indivíduo consultado nos principais marketplaces e portais de anúncios da internet.
  async getOnlineAds(params: getOnlineAdsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "online_ads",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna o resultado da emissão das certidões de Nada Consta disponíveis nos sites dos diferentes tribunais regionais federais
  async getCertificateNothingListed(params: getCertificateNothingListedParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${params.court ? `court{${params.court}},` : ''}${params.state ? `state{${params.state}},` : ''}${params.op ? `op{${params.op}},` : ''}${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_nada_consta_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna o resultado da emissão de Certidão de Débitos Relativos a Créditos Tributários Federais e à Dívida Ativa da União
  async getPGFNCertificate(params: getPGFNCertificateParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${params.type ? `court{${params.type}},` : ''}${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_pgfn_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna os dados extraídos da consulta pública de pessoas sancionadas pelo BC por alguma razão
  async getCentralBankAdministrativeSanctions(params: getCentralBankAdministrativeSanctionsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_administrative_sanctions_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna os dados referentes a emissão de uma certidão de antecedentes criminais junto a Polícia Federal Brasileira
  async getCriminalBackgroundCertificatePF(params: getCriminalBackgroundCertificateParamsPF) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_pf_antecedente_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna os dados referentes à emissão de uma Certidão de Antecedentes Criminais junto à Polícia Civil do Estado consultado
  async getCriminalBackgroundCertificatePC(params: getCriminalBackgroundCertificateParamsPC) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${params.rg ? `rg{${params.rg}},` : ''}${params.mothername ? `mothername{${params.mothername}},` : ''}${params.fathername ? `fathername{${params.fathername}},` : ''}${params.rgissuingagency ? `rgissuingagency{${params.rgissuingagency}},` : ''}${params.rgissuinguf ? `rgissuinguf{${params.rgissuinguf}},` : ''}${params.rgexpeditiondate ? `rgexpeditiondate{${params.rgexpeditiondate}},` : ''}${params.dateformat ? `dateformat{${params.dateformat}},` : ''}${params.placeofbirth ? `placeofbirth{${params.placeofbirth}},` : ''}${params.addresscore ? `addresscore{${params.addresscore}},` : ''}${params.addressnumber ? `addressnumber{${params.addressnumber}},` : ''}${params.neighborhood ? `neighborhood{${params.neighborhood}},` : ''}${params.city ? `city{${params.city}},` : ''}${params.zipcode ? `zipcode{${params.zipcode}},` : ''}${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_pc_antecedente_by_state_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna, quando não existem débitos estaduais associados à entidade sendo consultada, uma certidão que comprova a não existência de débitos.
  async getNegativeCertificateStateDebts(params: getNegativeCertificateStateDebtsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${params.addresscore ? `addresscore{${params.addresscore}},` : ''}${params.addressnumber ? `addressnumber{${params.addressnumber}},` : ''}${params.uf ? `uf{${params.uf}},` : ''}${params.addresstypology ? `addresstypology{${params.addresstypology}},` : ''}${params.neighborhood ? `neighborhood{${params.neighborhood}},` : ''}${params.zipcode ? `zipcode{${params.zipcode}},` : ''}${params.city ? `city{${params.city}},` : ''}${params.state ? `state{${params.state}},` : ''}${this.makeDefaultParams(params)}
          `,
          "Datasets": "ondemand_cert_debt_absence_by_state_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna, quando não existem débitos trabalhistas associados a entidade sendo consultada, uma certidão que comprova a não existência desses débitos.
  async getNegativeCertificateLaborDebts(params: getNegativeCertificateLaborDebtsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_cert_labor_debt_absence_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna, quando não existem protestos de títulos contra a entidade consultada, uma certidão confirmando esse fato, emitida pelo Instituto de Estudos de Protesto de Títulos do Brasil
  async getNegativeProtestCertificate(params: getNegativeProtestCertificateParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_query_pesquisaprotesto_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna dados de um documento de acesso público atestado pelo Ibama
  async getCertificateRegularityIbama(params: getCertificateRegularityIbamaParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_regularity_certificate_ibama_person",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // Retorna informações agregadas de pessoas relacionadas a entidade consultada, de acordo com o tipo de relacionamento entre elas.
  async getCirclesRelatives(params: getCirclesRelativesParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "circles_relatives",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retornam informações agregadas de pessoas relacionadas a entidade consultada, de acordo com o tipo de relacionamento entre elas
  async getCirclesMembers(params: getCirclesMembersParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "circles_partners",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna a lista de entidades relacionadas com o indivíduo consultado em um escopo econômico, que inclui tipos de relacionamento
  async getEconomicRelationships(params: getEconomicRelationshipsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "business_relationships",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações, tanto atuais quanto históricas, do envolvimento da entidade consultada em ações judiciais de todos os tipos (civil, trabalhista, criminal, etc.)
  async getJudicialAdministrativeProceedings(params: getJudicialAdministrativeProceedingsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${params.returnupdates ? `returnupdates{${params.returnupdates}},` : ''}${params.returncvmprocesses ? `returncvmprocesses{${params.returncvmprocesses}},` : ''}${params.updateslimit ? `updateslimit{${params.updateslimit}},` : ''}${this.makeDefaultParams(params)}`,
          "Datasets": "processes",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações, tanto atuais quanto históricas, do envolvimento da entidade consultada em ações judiciais de todos os tipos (civil, trabalhista, criminal, etc.)
  async getJudicialAdministrativeProceedingsFirstLevelRelatives(params: getJudicialAdministrativeProceedingsFirstLevelRelativesParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "first_level_relatives_lawsuit_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // traz informações relevantes a respeito do comportamento de crédito de uma empresa no mercado.
  async getQuodBusinessCreditScore(params: getQuodBusinessCreditScoreParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/marketplace`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "partner_quod_credit_score_company",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna dados agregados sobre os processos judiciais nos quais a entidade consultada está envolvida.
  async getDataDistributionLegalProceedings(params: getDataDistributionLegalProceedingsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "lawsuits_distribution_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações agregadas de pessoas relacionadas a entidade consultada
  async getRelativesFirstDegree(params: getRelativesFirstDegreeParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "circles_first_level_relatives",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // traz informações detalhadas sobre as doações realizadas para campanhas eleitorais pela entidade consultada
  async getCompanyElectoralDonations(params: getCompanyElectoralDonationsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "electoral_donors",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna o conjunto mais simples de informações dentre todos os datasets
  async getCompanyBasicRegistrationData(params: getCompanyBasicRegistrationDataParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "basic_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "Informações consultadas com sucesso!",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações capturadas de fontes de notícias públicas da internet
  async getCompanyExposureProfileMedia(params: getCompanyExposureProfileMediaParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "media_profile_and_exposure",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna notícias relevantes que dão suporte aos requisitos regulatórios e/ou legais relacionados
  async getCompanyKYCNews(params: getCompanyKYCNewsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "kyc_dtec_flex_news",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações necessárias para atender a requisitos regulatórios e/ou legais relacionados com processos de know-your-client.
  async getCompanyKYCCompliance(params: getCompanyKYCComplianceParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "kyc",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações análogas ao dataset de KYC e Compliance tradicional, mas com um foco nos registros específicos dos diferentes sócios da empresa consultada
  async getCompanyPartnerKYCCompliance(params: getCompanyPartnerKYCComplianceParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "owners_kyc",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorn dados agregados sobre os processos judiciais nos quais a entidade consultada está envolvida.
  async getCompanyDataDistributionLegalProceedings(params: getCompanyDataDistributionLegalProceedingsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "lawsuits_distribution_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações, tanto atuais quanto históricas, do envolvimento da entidade consultada em ações judiciais de todos os tipos
  async getCompanyJudicialAdministrativeProceedings(params: getCompanyJudicialAdministrativeProceedingsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "processes",
          "Limit": params.limit
        }
      };
      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {
        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações sobre outras entidades, sejam elas pessoas ou empresas, que estão relacionadas com a empresa consultada
  async getCompanyRelationships(params: getCompanyRelationshipsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "relationships",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações sobre marcas e patentes relacionadas ao CPF consultado, sendo uma lista de marcas e outra lista de patentes.
  async getIndustrialProperties(params: getIndustrialPropertiesParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "industrial_property",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações análogas ao dataset de KYC e Compliance do indivíduo, mas trazendo os dados de todos os famíliares de primeiro nível do CPF consultado
  async getKYCFirstLevelFamilyCompliance(params: getKYCFirstLevelFamilyComplianceParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "first_level_relatives_kyc",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorn informações que indicam a presença ou passagem de um indivíduo por algum processo de cobrança de dívida. 
  async getAttendanceBilling(params: getAttendanceBillingParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "collections",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna um flag que diz se pessoa tem uma probabilidade alta (acima de 70%) de estar inadimplente com algum compromisso financeiro ou de estar negativada em algum serviço de proteção ao crédito
  async getNegativeProbability(params: getNegativeProbabilityParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/pessoas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "indebtedness_question",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações de dados cadastrais de fundos de investimento e outros detalhes, quando disponíveis, de empresas cadastradas no CVM 
  async getInvestmentFundData(params: getInvestmentFundDataParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "investment_fund_data",
          "Limit": params.limit
        }
      };
      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna uma lista de sócios relacionados ao CNPJ consultado contendo informações detalhadas sobre as doações realizadas para campanhas eleitorais
  async getElectoralDonationsMembers(params: getElectoralDonationsMembersParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "owners_electoral_donors",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // fornece uma visão temporal da evolução de uma empresa, mostrando a evolução ao longo do tempo de informações como capital da empresa
  async getCompanyEvolution(params: getCompanyEvolutionParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "company_evolution",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações relacionadas com as diferentes licenças e autorizações
  async getLicensesAuthorizations(params: getLicensesAuthorizationsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "licenses_and_authorizations",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // traz informações de balanço patrimonial e outros detalhes coletados a partir das informações registradas pelas empresas de capital aberto
  async getFinancialMarket(params: getFinancialMarketParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "financial_market",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // traz informações sobre contratos e licitações de políticos/partidos com prestadores/fornecedores de serviços eleitorais.
  async getElectoralServiceProviders(params: getElectoralServiceProvidersParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "financial_market",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações sobre marcas e patentes relacionadas ao CNPJ consultado
  async getIndustrialPropertiesCompanies(params: getIndustrialPropertiesCompaniesParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "industrial_property",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações dos sites e domínios que estão associados com a entidade consultada,
  async getSiteData(params: getSiteDataParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "domains",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  //retorna os e-mails que estão associados com as pessoas relacionadas a entidade consultada
  async getEmailsPeopleRelatedCompany(params: getEmailsPeopleRelatedCompanyParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "related_people_emails",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {
        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // traz informações sobre a presença da empresa em diferentes marketplaces de venda de produtos pela internet
  async getMarkets(params: getMarketsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "marketplace_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações análogas aos dados contidos no dataset de Processos Judiciais
  async getPartnersJudicialProceedings(params: getPartnersJudicialProceedingsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "owners_lawsuits",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retornam informações agrupadas e agregadas do grupo econômico relacionado com a empresa principal sendo consultada
  async getExtendedSecondLevelEconomicGroup(params: getExtendedSecondLevelEconomicGroupParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "economic_group_second_level_extended",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retornam informações agrupadas e agregadas do grupo econômico relacionado com a empresa principal sendo consultada
  async getCompleteEconomicGroup(params: getCompleteEconomicGroupParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "economic_group_full",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  async getSocialConscience(params: getSocialConscienceParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "social_conscience",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // traz informações sobre a reputação da empresa em diferentes plataformas e sites de avaliação de serviço
  async getCompanyRatingsReputation(params: getCompanyRatingsReputationParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/empresas`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "reputations_and_reviews",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna informações detalhadas sobre um processo em específico, como movimentações, partes envolvidas, corte, júri e decisões, por exemplo.
  async getBasicDataLegalProceedings(params: getBasicDataLegalProceedingsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/processos`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "basic_data",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna os dados referentes a emissão da certidão de regularidade do empregador frente ao FGTS
  async getFGTSCertificate(params: getFGTSCertificateParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_fgts_company",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna os dados referentes a emissão da certidão de débitos relativos a tributos federais e à dívida ativa da união de imóvel Rural
  async getIRTCertificate(params: getIRTCertificateParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_irt_certificate_company",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna, quando não existem débito estadual associados a entidade sendo consultada
  async getClearanceCertificateStateDebts(params: getClearanceCertificateStateDebtsParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_cert_debt_absence_by_state_company",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  // retorna, quando não existem débitos trabalhistas associados a entidade sendo consultada
  async getNegativeCertificateLaborDebtsCompany(params: getNegativeCertificateLaborDebtsCompanyParams) {
    let output: IOutput;
    try {
      let tokenData = await this.getTokenJwt();
      let config = {
        method: "POST",
        url: `${this._host}/ondemand`,
        headers: {
          "AccessToken": tokenData.data.token,
          "TokenId": tokenData.data.tokenID,
        },
        data: {
          "q": `${this.makeDefaultParams(params)}`,
          "Datasets": "ondemand_cert_labor_debt_absence_company",
          "Limit": params.limit
        }
      };

      let outputReq = await axios(config).then(function (response) {

        return response.data;
      }).catch(function (error) {

        throw new Error(error);
      });
      output = {
        success: true,
        message: "",
        data: outputReq
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }

    return output;
  }

  makeDefaultParams(params: any) {
    let query = `${params.doc ? `doc{${params.doc}},` : ''}${params.name ? `name{${params.name}},` : ''}${params.phone ? `phone{${params.phone}},` : ''}${params.email ? `email{${params.email}},` : ''}${params.classnumber ? `classnumber{${params.classnumber}},` : ''}${params.domain ? `domain{${params.domain}},` : ''}${params.zipcode ? `zipcode{${params.zipcode}},` : ''}${params.classorganization ? `classorganization{${params.classorganization}},` : ''}${params.nit ? `nit{${params.nit}},` : ''}${params.profession ? `profession{${params.profession}},` : ''}${params.cnae ? `cnae{${params.cnae}},` : ''}${params.addressmain ? `addressmain{${params.addressmain}},` : ''}${params.doornumber ? `doornumber{${params.doornumber}},` : ''}${params.neighborhood ? `neighborhood{${params.neighborhood}},` : ''}${params.city ? `city{${params.city}},` : ''}${params.state ? `state{${params.state}},` : ''}${params.latitude ? `latitude{${params.latitude}},` : ''}${params.longitude ? `longitude{${params.longitude}},` : ''}${params.mothername ? `mothername{${params.mothername}},` : ''}${params.docnumbermask ? `docnumbermask{${params.docnumbermask}},` : ''}${params.birthdate ? `birthdate{${params.birthdate}},` : ''}${params.dateformat ? `dateformat{${params.dateformat}},` : ''}`;
    console.log(query);
    return query;
  }

}

export interface defaultFilterKeys {

  //Pelo o menos algum destes deve estar preenchido
  doc?: string,                 // CPF ou CPJN
  name?: string,                // Nome
  phone?: string[],             // Telefones 
  email?: string[],             // Emails
  classnumber?: string,         // Número de registro em conselho de classe
  domain?: string,              // Domínio (url do site)

  //Opcionais
  zipcode?: string,             // CEP
  classorganization?: string,   // Nome do conselho de classe
  nit?: string,                 // NIT
  profession?: string,          // Profissão
  cnae?: string,                // Atividade Econômica
  addressmain?: string,         // Logradouro
  doornumber?: string,          // Número da porta
  neighborhood?: string,        // Bairro
  city?: string,                // Cidade
  state?: string,               // Estado
  latitude?: string,            // Latitude
  longitude?: string,           // Longitude
  mothername?: string,          // Nome da mãe
  docnumbermask?: string,       // Documento mascarado
  birthdate?: string,           // Data de nascimento
  dateformat?: string,          // Formato da data de nascimento
  limit?: number,                // Limite de entidades retornadas. Usado para casos de chamadas de chave fraca.
}

export interface getRegistrationDataParams extends defaultFilterKeys {

}

export interface getDomainsParams extends defaultFilterKeys {

}

export interface getBasicRegistrationDataParams extends defaultFilterKeys {
  name?: string                  // Possibilita a comparação de um nome informado na entrada com o nome encontrado na base, e o retorno do percentual de similaridade entre os dois.
  mothername?: string            // Possibilita a comparação de um nome da mãe informado na entrada com o nome da mãe encontrado na base, e o retorno do percentual de similaridade entre os dois.
}

export interface getClassCouncilsParams extends defaultFilterKeys {

}

export interface getProfessionalDataParams extends defaultFilterKeys {

}

export interface getBenefitsSocialAssistanceParams extends defaultFilterKeys {

}

export interface getPublicServantsParams extends defaultFilterKeys {

}

export interface getExposureProfileMediaParams extends defaultFilterKeys {
  keywords?: string              // Permite a filtragem dos conteúdos retornados com base em um conjunto de palavras-chave definido pelo usuário.
}

export interface getKYCComplianceParams extends defaultFilterKeys {
  minmatch?: string             // Valor inteiro que permite a definição do percentual de similaridade entre o nome da pessoa consultada e o nome presente no registro de sanção a partir do qual o registro será considerado como uma sanção ativa
}

export interface getKYCNewsParams extends defaultFilterKeys {

}

export interface getElectoralDonationsParams extends defaultFilterKeys {

}

export interface getElectoralCandidatesParams extends defaultFilterKeys {

}

export interface getPresenceAppsPlatformsParams extends defaultFilterKeys {

}

export interface getOnlineAdsParams extends defaultFilterKeys {

}

export interface getCentralBankAdministrativeSanctionsParams extends defaultFilterKeys {

}

export interface getCertificateNothingListedParams extends defaultFilterKeys {
  court?: string          // Tribunal TRF1, TRF2, TRF3, TRF4, TRF5
  state?: string          // Qualquer sigla de unidade da federação brasileira
  op?: string             // CIVIL, CRIMINAL, ELEITORAL

}

export interface getPGFNCertificateParams extends defaultFilterKeys {
  type?: string           // Tipo da consulta PGFN, podendo ser list (por padrão) ou status.
}

export interface getCriminalBackgroundCertificateParamsPF extends defaultFilterKeys {

}

export interface getCriminalBackgroundCertificateParamsPC extends defaultFilterKeys {
  uf: string                    // Unidade Federativa BA CE ES MG MS MT PA PE RJ RR RS SE SP
  rg?: string                   // Identidade
  mothername?: string           // Nome da mãe
  fathername?: string           // Nome do pai
  rgissuingagency?: string      // Agência emissora de documento de identidade
  rgissuinguf?: string          // Unidade Federativa da agência emissora de documento de identidade
  rgexpeditiondate?: string     // Data de emissão do documento de identidade
  dateformat?: string           // Formato da data de emissão informada
  placeofbirth?: string         // Local de nascença
  addresscore?: string          // Endereço
  addressnumber?: string        // Número de endereço
  neighborhood?: string         // Bairro
  city?: string                 // Cidade
  zipcode?: string              // CEP
}

export interface getNegativeCertificateStateDebtsParams extends defaultFilterKeys {
  addresscore?: string            // Nome da rua
  addressnumber?: string          // Número do endereço
  uf?: string                     // Unidade Federativa (UF). Ex.: SP, RJ, etc.
  addresstypology?: string        // Tipologia do endereço. Ex.: Rua, Avenida, etc.
  neighborhood?: string           // Bairro
  zipcode?: string                // CEP
  city?: string                   // Cidade
  state?: string                  // Estado
}

export interface getNegativeCertificateLaborDebtsParams extends defaultFilterKeys {

}

export interface getNegativeProtestCertificateParams extends defaultFilterKeys {

}

export interface getCertificateRegularityIbamaParams extends defaultFilterKeys {

}

export interface getCirclesRelativesParams extends defaultFilterKeys {

}

export interface getCirclesMembersParams extends defaultFilterKeys {

}
export interface getEconomicRelationshipsParams extends defaultFilterKeys {

}

export interface getJudicialAdministrativeProceedingsParams extends defaultFilterKeys {
  returnupdates?: string                // Indica se as listas de updates dos processos devem ser retornados. Caso seja definido como "false", irá reduzir consideravelmente o tamanho do resultado, aprimorando a performance da consulta.
  returncvmprocesses?: string           // Se este parâmetro for definido como "true" e forem encontrados processos cuja corte seja a CVM, os processos serão adicionados ao início da lista de lawsuits. Os processos da CVM possuem um numeração diferente e alguns dos campos, como CourtLevel e CoutType, não são retornados.
  updateslimit?: string                 // Número que determina o limite máximo de retorno das atualizações dos processos judiciais. Se for definido, apenas as atualizações mais recentes são retornados, de acordo com este limite.
}

export interface getJudicialAdministrativeProceedingsFirstLevelRelativesParams extends defaultFilterKeys {

}

export interface getQuodBusinessCreditScoreParams extends defaultFilterKeys {
  doc: string                           // CNPJ
}

export interface getDataDistributionLegalProceedingsParams extends defaultFilterKeys {

}

export interface getRelativesFirstDegreeParams extends defaultFilterKeys {

}

export interface getCompanyElectoralDonationsParams extends defaultFilterKeys {

}

export interface getCompanyBasicRegistrationDataParams extends defaultFilterKeys {

}

export interface getCompanyExposureProfileMediaParams extends defaultFilterKeys {

}

export interface getCompanyKYCNewsParams extends defaultFilterKeys {

}

export interface getCompanyKYCComplianceParams extends defaultFilterKeys {

}

export interface getCompanyPartnerKYCComplianceParams extends defaultFilterKeys {
  minmatch?: number //Esse dataset suporta um parametro opcional chamado minmatch, que permite a definição do percentual de similaridade entre o nome da pessoa consultada e o nome presente no registro de sanção a partir do qual o registro será considerado como uma sanção ativa. Atenção! O parâmetro minmatch altera apenas a regra de cálculo do flag "IsCurrentlySanctioned", e não influencia a quantidade de registros retornados na lista detalhada de sanções nem na lista PEP.
}

export interface getCompanyDataDistributionLegalProceedingsParams extends defaultFilterKeys {

}

export interface getCompanyJudicialAdministrativeProceedingsParams extends defaultFilterKeys {
  returnupdates?: boolean        // Indica se as listas de updates dos processos devem ser retornados. Caso seja definido como "false", irá reduzir consideravelmente o tamanho do resultado, aprimorando a performance da consulta.
  returncvmprocesses?: boolean   // Se este parâmetro for definido como "true" e forem encontrados processos cuja corte seja a CVM, os processos serão adicionados ao início da lista de lawsuits. Os processos da CVM possuem um numeração diferente e alguns dos campos, como CourtLevel e CoutType, não são retornados.
  updateslimit?: number          // Número que determina o limite máximo de retorno das atualizações dos processos judiciais. Se for definido, apenas as atualizações mais recentes são retornados, de acordo com este limite.
}

export interface getCompanyRelationshipsParams extends defaultFilterKeys {

}

export interface getIndustrialPropertiesParams extends defaultFilterKeys {

}

export interface getKYCFirstLevelFamilyComplianceParams extends defaultFilterKeys {
  minmatch?: number              // Valor inteiro que permite a definição do percentual de similaridade entre o nome da pessoa consultada e o nome presente no registro de sanção a partir do qual o registro será considerado como uma sanção ativa
}

export interface getAttendanceBillingParams extends defaultFilterKeys {

}

export interface getNegativeProbabilityParams extends defaultFilterKeys {

}

export interface getInvestmentFundDataParams extends defaultFilterKeys {
  all?: boolean                    // Permite que sejam retornadas todas as movimentações capturadas para o CNPJ fornecido. É importante ressaltar que esse campo pode ter grande impacto no tempo de resposta do dataset. Caso não seja colocado, o dataset assume o valor como falso
}

export interface getElectoralDonationsMembersParams extends defaultFilterKeys {

}

export interface getCompanyEvolutionParams extends defaultFilterKeys {

}

export interface getLicensesAuthorizationsParams extends defaultFilterKeys {

}

export interface getFinancialMarketParams extends defaultFilterKeys {

}

export interface getElectoralServiceProvidersParams extends defaultFilterKeys {

}

export interface getIndustrialPropertiesCompaniesParams extends defaultFilterKeys {

}

export interface getSiteDataParams extends defaultFilterKeys {

}

export interface getEmailsPeopleRelatedCompanyParams extends defaultFilterKeys {
  relationshiptype?: string                //Este dataset suporta um parâmetro opcional, chamado relationshiptype, que permite só recuperar contatos de pessoas que tenham o tipo de relacionamento especificado.
}

export interface getMarketsParams extends defaultFilterKeys {

}

export interface getPartnersJudicialProceedingsParams extends defaultFilterKeys {

}

export interface getExtendedSecondLevelEconomicGroupParams extends defaultFilterKeys {

}

export interface getCompleteEconomicGroupParams extends defaultFilterKeys {

}

export interface getSocialConscienceParams extends defaultFilterKeys {

}

export interface getCompanyRatingsReputationParams extends defaultFilterKeys { }

export interface getBasicDataLegalProceedingsParams extends defaultFilterKeys {
  processnumber: string                   // Número do processo a consultar

}

export interface getFGTSCertificateParams extends defaultFilterKeys {

}

export interface getIRTCertificateParams extends defaultFilterKeys {
  nirf: string
}

export interface getClearanceCertificateStateDebtsParams extends defaultFilterKeys {

}

export interface getNegativeCertificateLaborDebtsCompanyParams extends defaultFilterKeys {

}