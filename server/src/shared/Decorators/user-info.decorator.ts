import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../../entities/User.entity';

export const UserInfo = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
