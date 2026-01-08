import { Controller, Get, Param, Post, Delete, Body, Put, NotFoundException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' }
  ];

  @Get('')
  getUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id === '1') {
      throw new ForbiddenException('Access denied');
    }
    return user;
  }

  @Post('')
  createUser(@Body() body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(position, 1);
    return {
      message: 'User deleted',
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }
    const currentData = this.users[position];
    const email = changes?.email;
    if (email && email.includes('@')) {
      throw new UnprocessableEntityException('Invalid email');
    }
    const updatedUser = { ...currentData, ...changes };
    this.users[position] = updatedUser;
    return updatedUser;
  }
}
