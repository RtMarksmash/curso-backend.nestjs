import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';

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
      return { message: 'User not found' };
    }
    return user;
  }

  @Post('')
  createUser(@Body() newUser: User) {
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return { message: 'User not found' };
    }
    this.users.splice(position, 1);
    return {
      message: 'User deleted'
    };
  }

}
