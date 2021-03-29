import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RoulettesController } from './roulettes.controller';
import { RoulettesRepository } from './roulettes.repository';
import { RoulettesService } from './roulettes.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [RoulettesController],
  providers: [RoulettesService, RoulettesRepository],
})
export class RoulettesModule {}
