import { ILogger } from '../../domain/logger/logger.interface';
import { LevelService } from '../../infrastructure/repositories/level/level.service';
import {
  CreateLevelDto,
  CreateLevelsDto,
} from '../../infrastructure/controllers/level/dto/create-level-dto';
import { Inject } from '@nestjs/common';

export class CreateLevelUseCase {
  constructor(
    @Inject('ILogger') private readonly logger: ILogger,
    private readonly levelService: LevelService,
  ) {}

  async execute(level: CreateLevelDto): Promise<void> {
    this.logger.log('createLevelUseCase execute', 'Creating new level');
    await this.levelService.createLevel(level);
    this.logger.log(
      'createLevelUseCase execute',
      'New level have been inserted',
    );
  }
}
