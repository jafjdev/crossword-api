import { Inject } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import { LevelService } from '../../infrastructure/repositories/level/level.service';
import { QueryLevelDto } from '../../infrastructure/controllers/level/dto/query-level-dto';
import { Level } from '../../infrastructure/entities/level.entity';

export class GetLevelsUseCase {
  constructor(
    @Inject('ILogger') private readonly logger: ILogger,
    private readonly levelService: LevelService,
  ) {}

  async execute(query: QueryLevelDto): Promise<Level[]> {
    this.logger.log(
      'GetLevelsUseCase execute',
      `Getting levels with query ${JSON.stringify(query)}`,
    );
    const levels = await this.levelService.findAll(query);
    this.logger.log(
      'GetLevelsUseCase execute',
      `Levels retrieved successfully`,
    );
    return levels;
  }
}
