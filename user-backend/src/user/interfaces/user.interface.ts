import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsDate } from 'class-validator';

export class User extends Document {

  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email: string;
  
  @IsDate()
  birth_date: Date;
  
  record_date: Date;
  update_date: Date;
}