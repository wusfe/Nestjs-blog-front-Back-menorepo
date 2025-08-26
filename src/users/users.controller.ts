import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { LogRequestInterceptor, ZV } from './inter';
// 参数选择器
// 这里是装饰器，装饰器是一个函数
// 装饰器的参数是一个函数，函数的参数是一个对象，对象中有三个属性
// target: 类的原型对象
// key: 方法名
// descriptor: 方法的描述符对象
const Validate: any = () => {
  return function (target, key, descriptor) {
    console.log(target, key, descriptor, '11111111');
    descriptor.value = () => {
      return 'zzzz';
    };
  };
};
const Rk: any = (a, b, c) => {
  return function (...args) {
    // console.log(args);
    //   console.log('zxc');

    // console.log(args[0][`__paramRules__:${String(args[1])}`]);
    console.log(args[0][args[1]].value, '1');

    // args[0][args[1]].push(1)
    return 1;
  };
};
class Z {
  // @Validate()
  a(@Rk() k: any) {
    return k;
  }
}

console.log(new Z().a(2), 'call');

@Injectable()
class Kk {
  canactivate(
    context: any,
  ): boolean | Promise<boolean> | import('rxjs').Observable<boolean> {
    console.log(11);

    return false;
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    // 注意：这里的dto参数，这里会自动将请求的body参数映射到dto对象中，如果校验不通过，是不会进入这个路由的

    console.log(dto instanceof CreateUserDto, dto);

    const user = await this.usersService.createUser(dto);
    return { id: user.id, username: user.username, email: user.email };
  }

  @UseGuards(JwtAuthGuard) // 不行的
  // @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    // 这里最后执行-3
    console.log(req.zz, '3');

    const user = await this.usersService.findById(req.user.userId);
    return { id: user.id, username: user.username, email: user.email };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Req() req: any, @Body() dto: CreateUserDto) {
    //  console.log( req.user, 'xx'); // 也可以

    let { passwordHash, ...opts } = await this.usersService.updateUser(
      req.zz.userId,
      dto,
    );

    return {
      ...opts,
    };
  }

  //删除
  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Req() req: any) {
    return this.usersService.remove(req.zz.userId)
  }

  @UseInterceptors(LogRequestInterceptor)
  @Get('test')
  async test(@Req() req: any) {
    console.log('is a test ');

    return {
      success: 'ok',
    };
  }
}
