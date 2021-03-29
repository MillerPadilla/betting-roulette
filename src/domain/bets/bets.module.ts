import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoulettesRepository } from '../roulettes/roulettes.repository';
import { UsersRepository } from '../users/users.repository';
import { BetsController } from './bets.controller';
import { BetsRepository } from './bets.repository';
import { BetsService } from './bets.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [BetsController],
  providers: [
    BetsService,
    BetsRepository,
    RoulettesRepository,
    UsersRepository,
  ],
})
export class BetsModule {}
