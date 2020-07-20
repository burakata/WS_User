/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete }
    from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { validate } from 'class-validator';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // Add User
    @Post('/user')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {

        try {

            const tempData = new CreateUserDTO();
            tempData.name = createUserDTO.name;
            tempData.email = createUserDTO.email;
            tempData.birth_date = createUserDTO.birth_date;

            validate(tempData).then(errors => {
                if (errors.length > 0) {
                    console.log("validation failed. errors: ", errors);
                }
            });

            const newUser = await this.userService.addUser(createUserDTO);

            return res.status(HttpStatus.OK).json({
                message: 'User has been created successfully!',
                user: newUser,
            });
        }
        catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Create user error!',
                detail: error
            });
        }
    }

    // Get User
    @Get('user/:id')
    async getUser(@Res() res, @Param('id', new ValidateObjectId()) id) {
        const user = await this.userService.getUser(id);

        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        return res.status(HttpStatus.OK).json(user);
    }

    // Get Users
    @Get('users')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    // Edit User
    @Put('/edit')
    async editUser(
        @Res() res,
        @Query('userID', new ValidateObjectId()) userId,
        @Body() createUserDTO: CreateUserDTO,
    ) {

        try {
            const editedUser = await this.userService.editUser(userId, createUserDTO);
            if (!editedUser) {
                throw new NotFoundException('User does not exist!');
            }
            return res.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user: editedUser,
            });

        }
        catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Edit user error!',
                detail: error
            });
        }

    }

    // Delete User
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID', new ValidateObjectId()) userId) {
        const deletedUser = await this.userService.deleteUser(userId);

        try {
            if (!deletedUser) {
                throw new NotFoundException('User does not exist!');
            }
            return res.status(HttpStatus.OK).json({
                message: 'User has been deleted!',
                user: deletedUser,
            });
        }
        catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Delete user error!',
                detail: error
            });
        }

    }
}