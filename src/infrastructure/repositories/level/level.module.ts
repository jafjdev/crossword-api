import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  Level,
  LEVELS_COLLECTION,
  LevelSchema,
} from '../../entities/level.entity';
import { LevelController } from '../../controllers/level/level.controller';
import { LevelService } from './level.service';
import { CreateLevelUseCase } from '../../../usecases/level/createLevel.usecase';
import { LoggerService } from '../../logger/logger.service';
import { LoggerModule } from '../../logger/logger.module';
import { DeleteLevelUseCase } from '../../../usecases/level/deleteLevel.usecase';
import { GetLevelUseCase } from '../../../usecases/level/getLevel.usecase';
import { GetLevelsUseCase } from '../../../usecases/level/getLevels.usecase';

@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([
      {
        collection: LEVELS_COLLECTION,
        name: Level.name,
        schema: LevelSchema,
      },
    ]),
  ],
  controllers: [LevelController],
  providers: [
    LevelService,
    CreateLevelUseCase,
    DeleteLevelUseCase,
    GetLevelUseCase,
    GetLevelsUseCase,
    LoggerService,
  ],
  exports: [
    LevelService,
    CreateLevelUseCase,
    DeleteLevelUseCase,
    GetLevelUseCase,
    GetLevelsUseCase,
    LoggerService,
  ],
})
export class LevelModule {}
