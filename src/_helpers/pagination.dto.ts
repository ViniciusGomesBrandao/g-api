import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @IsNumberString()
    @ApiProperty({
        required: false,
    })
    limit?: number;

    @IsOptional()
    @ApiProperty({
        required: false,
    })
    @IsNumberString()
    page?: number;
}