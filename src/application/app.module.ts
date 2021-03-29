import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/domain/users/users.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    InfrastructureModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
