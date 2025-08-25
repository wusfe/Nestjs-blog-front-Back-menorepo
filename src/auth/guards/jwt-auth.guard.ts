    import { ExecutionContext, Injectable } from '@nestjs/common';
    import { AuthGuard } from '@nestjs/passport';

    @Injectable()
    export class JwtAuthGuard extends AuthGuard('jwt') {

        handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {

             // 这里后先执行2
            console.log(user, 1);
            // console.log(info);
            // console.log(context)
            // console.log(status)
            const req = context.switchToHttp().getRequest();
            req.zz = user; // 挂到其他属性上
            return user
            
        }
    } 