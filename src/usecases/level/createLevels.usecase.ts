import { ILogger } from '../../domain/logger/logger.interface';
import { LevelService } from '../../infrastructure/repositories/level/level.service';
import { Inject } from '@nestjs/common';
import { CreateLevelDto } from '../../infrastructure/controllers/level/dto/create-level-dto';

export class CreateLevelsUseCase {
  constructor(
    @Inject('ILogger') private readonly logger: ILogger,
    private readonly levelService: LevelService,
  ) {}

  async execute(levels: CreateLevelDto[]): Promise<void> {
    this.logger.log('createLevelsUseCase execute', 'Inserting bulk levels');
    await this.levelService.createLevels(levels);
    this.logger.log(
      'createLevelsUseCase execute',
      'Bulk level have been inserted',
    );
  }
}
