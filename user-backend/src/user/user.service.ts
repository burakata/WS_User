/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { validate, validateOrReject } from 'class-validator';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    newUser.record_date = new Date();
    newUser.update_date = null;
    
    validate(newUser).catch(errors => {
        if (errors.length > 0) {
            console.log("validation failed. errors: ", errors);
        } else {
            console.log("validation succeed", errors);
        }
    });

    validateOrReject(newUser).catch(errors => {
        console.log("Promise rejected (validation failed). Errors: ", errors);
    });


    return newUser.save();
  }  

  async getUser(userID): Promise<User> {
    const user = await this.userModel
      .findById(userID)
      .exec();
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async editUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
    
    const usr = this.getUser(userID);

    createUserDTO.record_date = (await usr).record_date;
    createUserDTO.update_date = new Date();

    const editedUser = await this.userModel
      .findByIdAndUpdate(userID, createUserDTO, { new: true });
    return editedUser;
  }

  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel
      .findByIdAndRemove(userID);
    return deletedUser;
  }

} 