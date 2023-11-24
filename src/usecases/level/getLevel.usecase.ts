import { Inject } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import { LevelService } from '../../infrastructure/repositories/level/level.service';
import { Level } from '../../infrastructure/entities/level.entity';

export class GetLevelUseCase {
  constructor(
    @Inject('ILogger') private readonly logger: ILogger,
    private readonly levelService: LevelService,
  ) {}

  async execute(id: string): Promise<Level> {
    this.logger.log('GetLevelUseCase execute', `Getting level with id ${id}`);
    const level = await this.levelService.findOne(id);
    this.logger.log(
      'GetLevelUseCase execute',
      `Level with id ${id} have been retrieved`,
    );
    return level;
  }
}
