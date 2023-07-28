import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const ret = context.switchToHttp().getRequest();

    return next
      .handle()
      .pipe(
        tap(() => console.log(`
        -----------------------------------------------------------------------------------
          Request: ${context.getClass().name} :: ${ret.originalUrl})\n
          Handler: ${context.getHandler().name}\n
          Query: ${JSON.stringify(ret.query)}\n
          Body: ${JSON.stringify(ret.body)}\n
          Params: ${JSON.stringify(ret.params)}
          -----------------------------------------------------------------------------------
        `)),
      );
  }
}