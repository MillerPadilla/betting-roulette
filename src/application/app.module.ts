import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BetsModule } from 'src/domain/bets/bets.module';
import { RoulettesModule } from 'src/domain/roulettes/roulettes.module';
import { UsersModule } from 'src/domain/users/users.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthMiddleware } from 'src/infrastructure/middlewares/auth.middleware';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    RoulettesModule,
    BetsModule,
    InfrastructureModule,
  ],
  controllers: [HealthController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('api/users/(.*)').forRoutes('*');
  }
}
