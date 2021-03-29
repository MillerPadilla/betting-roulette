import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoulettesModule } from 'src/domain/roulettes/roulettes.module';
import { UsersModule } from 'src/domain/users/users.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    RoulettesModule,
    InfrastructureModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
