import { forwardRef, Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { BetsModule } from '../bets/bets.module';
import { RoulettesController } from './roulettes.controller';
import { RoulettesRepository } from './roulettes.repository';
import { RoulettesService } from './roulettes.service';

@Module({
  imports: [InfrastructureModule, forwardRef(() => BetsModule)],
  controllers: [RoulettesController],
  providers: [RoulettesService, RoulettesRepository],
  exports: [RoulettesRepository],
})
export class RoulettesModule {}
