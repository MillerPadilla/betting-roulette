import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoulettesModule } from '../roulettes/roulettes.module';
import { UsersModule } from '../users/users.module';
import { BetsController } from './bets.controller';
import { BetsRepository } from './bets.repository';
import { BetsService } from './bets.service';

@Module({
  imports: [InfrastructureModule, RoulettesModule, UsersModule],
  controllers: [BetsController],
  providers: [BetsService, BetsRepository],
  exports: [BetsRepository],
})
export class BetsModule {}
