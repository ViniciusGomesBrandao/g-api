
import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { DefaultFilterDto } from "./default-filters.dto";


export class GetCertificateNothingListedDto extends DefaultFilterDto {

    @IsString()
    @IsOptional()
    court?: string          // Tribunal TRF1, TRF2, TRF3, TRF4, TRF5

    @IsString()
    @IsOptional()
    state?: string          // Qualquer sigla de unidade da federação brasileira

    @IsString()
    @IsOptional()
    op?: string             // CIVIL, CRIMINAL, ELEITORAL
}

