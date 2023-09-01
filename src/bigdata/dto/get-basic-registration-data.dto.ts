import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { DefaultFilterDto } from "./default-filters.dto";


export class GetBasicRegistrationDataDto extends DefaultFilterDto {

    @IsString()
    @IsOptional()
    name?: string                  // Possibilita a comparação de um nome informado na entrada com o nome encontrado na base, e o retorno do percentual de similaridade entre os dois.

    @IsString()
    @IsOptional()
    mothername?: string            // Possibilita a comparação de um nome da mãe informado na entrada com o nome da mãe encontrado na base, e o retorno do percentual de similaridade entre os dois.
}

