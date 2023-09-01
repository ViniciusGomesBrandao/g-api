

import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { DefaultFilterDto } from "./default-filters.dto";


export class GetCriminalBackgroundCertificatePCDto extends DefaultFilterDto {

    @IsString()
    @IsOptional()
    uf: string                    // Unidade Federativa BA CE ES MG MS MT PA PE RJ RR RS SE SP

    @IsString()
    @IsOptional()
    rg?: string                   // Identidade

    @IsString()
    @IsOptional()
    mothername?: string           // Nome da mãe

    @IsString()
    @IsOptional()
    fathername?: string           // Nome do pai

    @IsString()
    @IsOptional()
    rgissuingagency?: string      // Agência emissora de documento de identidade

    @IsString()
    @IsOptional()
    rgissuinguf?: string          // Unidade Federativa da agência emissora de documento de identidade

    @IsString()
    @IsOptional()
    rgexpeditiondate?: string     // Data de emissão do documento de identidade

    @IsString()
    @IsNotEmpty()
    dateformat?: string           // Formato da data de emissão informada

    @IsString()
    @IsNotEmpty()
    placeofbirth?: string         // Local de nascença

    @IsString()
    @IsNotEmpty()
    addresscore?: string          // Endereço

    @IsString()
    @IsNotEmpty()
    addressnumber?: string        // Número de endereço

    @IsString()
    @IsNotEmpty()
    neighborhood?: string         // Bairro

    @IsString()
    @IsNotEmpty()
    city?: string                 // Cidade

    @IsString()
    @IsNotEmpty()
    zipcode?: string              // CEP
}

