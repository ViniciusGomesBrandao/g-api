import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Categoria Teste",
        required: true
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Categoria destinada para teste",
        required: true
    })
    description: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        example: "1.90",
        required: true
    })
    custom_value: number;

    @IsArray()
    @ApiProperty({
        example: [1, 2],
        required: false,
        description: "ID dos modulos a serem adicionados na categoria"
    })
    modules?: number[]
}
