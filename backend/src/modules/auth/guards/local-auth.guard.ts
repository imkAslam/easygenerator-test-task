import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  // canActivate(context: ExecutionContext) {
  //   return super.canActivate(context);
  // }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest(err: any, user: any, info: any) {
    if (info && info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException(`Token is expired`);
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
