import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class LoginDto {

    @IsEmail()
    @ApiProperty() 
    @IsNotEmpty() 
    email: string;

    @IsNotEmpty() 
    @ApiProperty() 
    password: string;

}