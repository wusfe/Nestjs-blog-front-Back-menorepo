import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { FilesService } from 'src/files/files.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
/**
 * 1. 如果要把自己给被人用，则必须 Injectable
 * 2. 如果要引用其他的模块，则必须 Injectable
 * 3. 你如果
 */
export class LogRequestInterceptor implements NestInterceptor {
  constructor(
    private readonly usersService: UsersService, 
    private readonly filesService: FilesService,
    private readonly postsService: PostsService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log(this.filesService, 'xxx');
    // console.log(this.usersService, 'xxxX');
    console.log(this.usersService, 'xxxxx');
    
    
    // 执行前逻辑
    const req = context.switchToHttp().getRequest();
    console.log(`[Interceptor] Incoming request: ${req.method} ${req.url}`);
    console.log(`[Interceptor] Body:`, req.body);
    console.log(1);
    
    // 继续执行控制器方法
    return next.handle();
  }
}



export class ZV {
  constructor() {}


  getZv(){

  }
}