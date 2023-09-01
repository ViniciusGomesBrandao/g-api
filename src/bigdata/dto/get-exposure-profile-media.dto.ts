import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { DefaultFilterDto } from "./default-filters.dto";


export class GetExposureProfileMediaDto extends DefaultFilterDto {

    @IsString()
    @IsOptional()
    keywords?: string              // Permite a filtragem dos conteúdos retornados com base em um conjunto de palavras-chave definido pelo usuário.
}

