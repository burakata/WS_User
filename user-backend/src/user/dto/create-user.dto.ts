
import { IsEmail, IsNotEmpty, IsDate } from 'class-validator';

export class CreateUserDTO {

    @IsNotEmpty()
     name: string;

    @IsEmail()
     email: string;

    @IsDate()
     birth_date: Date;

    record_date: Date;
    update_date: Date;
  } 
