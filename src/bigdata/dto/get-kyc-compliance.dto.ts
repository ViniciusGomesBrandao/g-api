
import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { DefaultFilterDto } from "./default-filters.dto";


export class GetKYCComplianceDto extends DefaultFilterDto {

    @IsString()
    @IsOptional()
    minmatch?: string             // Valor inteiro que permite a definição do percentual de similaridade entre o nome da pessoa consultada e o nome presente no registro de sanção a partir do qual o registro será considerado como uma sanção ativa
}

