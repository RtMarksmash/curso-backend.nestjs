import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';
import { Env } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly configservice: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('my-test')
  getMyTest() {
    return this.usersService.findAll();
  }
}
