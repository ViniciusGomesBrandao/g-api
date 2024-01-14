import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class GetPdfReportDto{
    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({
        example: "1"
    })
    categoryID: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "00000000000"
    })
    @IsString()
    doc: string;
}