
import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { DefaultFilterDto } from "./default-filters.dto";


export class GetPGFNCertificateDto extends DefaultFilterDto {

    @IsString()
    @IsOptional()
    type?: string           // Tipo da consulta PGFN, podendo ser list (por padrão) ou status.
    
}

