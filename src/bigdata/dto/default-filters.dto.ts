import { Role, Status } from "@prisma/client";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsOptional, IsPhoneNumber, IsNumber } from "class-validator";


export class DefaultFilterDto {

    //Pelo o menos algum destes deve estar preenchido

    // @IsNotEmpty({
    //     message: "Documento inválido!"
    // })
    @IsOptional()
    @IsString()
    doc?: string;                 // CPF

    @IsOptional()
    @IsString()
    name?: string;                // Nome

    @IsOptional()
    @IsPhoneNumber()
    @IsString()
    phone?: string[];             // Telefones 

    @IsEmail({}, {
        message: "E-mail inválido!"
    })
    @IsOptional()
    @IsString()
    email: string;                //Emails

    @IsString()
    @IsOptional()
    classnumber?: string;         // Número de registro em conselho de classe

    @IsString()
    @IsOptional()
    domain?: string;              // Domínio (url do site)


    //Opcionais
    @IsString()
    @IsOptional()
    zipcode?: string;             // CEP
    
    @IsString()
    @IsOptional()
    classorganization?: string;   // Nome do conselho de classe

    @IsString()
    @IsOptional()
    nit?: string;                 // NIT

    @IsString()
    @IsOptional()
    profession?: string;          // Profissão

    @IsString()
    @IsOptional()
    cnae?: string;                // Atividade Econômica

    @IsString()
    @IsOptional()
    addressmain?: string;         // Logradouro

    @IsString()
    @IsOptional()
    doornumber?: string;          // Número da porta

    @IsString()
    @IsOptional()
    neighborhood?: string;        // Bairro

    @IsString()
    @IsOptional()
    city?: string;                // Cidade

    @IsString()
    @IsOptional()
    state?: string;               // Estado

    @IsString()
    @IsOptional()
    latitude?: string;            // Latitude

    @IsString()
    @IsOptional()
    longitude?: string;           // Longitude

    @IsString()
    @IsOptional()
    mothername?: string;          // Nome da mãe

    @IsString()
    @IsOptional()
    docnumbermask?: string;       // Documento mascarado

    @IsString()
    @IsOptional()
    birthdate?: string;           // Data de nascimento

    @IsString()
    @IsOptional()
    dateformat?: string;          // Formato da data de nascimento

    @IsNumber()
    @IsOptional()
    limit?: string;                // Limite de entidades retornadas. Usado para casos de chamadas de chave fraca.


}

//how to custom message is nestjs using decorator from class-validator?