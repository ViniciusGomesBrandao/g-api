import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/_helpers/pagination.dto";

export class SearchModulesDto extends PaginationDto{
    @IsOptional()
    @IsString()
    @ApiProperty({
        example: "Teste",
        required: false,
        
        description: "Term usaded for serch modules in database"
    })
    search?: string;
}