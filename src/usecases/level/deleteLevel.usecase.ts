import { Inject } from '@nestjs/common';
import { ILogger } from '../../domain/logger/logger.interface';
import { LevelService } from '../../infrastructure/repositories/level/level.service';
import { Level } from '../../infrastructure/entities/level.entity';

export class DeleteLevelUseCase {
  constructor(
    @Inject('ILogger') private readonly logger: ILogger,
    private readonly levelService: LevelService,
  ) {}

  async execute(id: string): Promise<Level> {
    this.logger.log('DeleteLevelUseCase execute', 'Deleting level');
    const deletedLevel = await this.levelService.delete(id);
    this.logger.log(
      'DeleteLevelUseCase execute',
      `Level with id ${id} have been deleted`,
    );
    return deletedLevel;
  }
}
