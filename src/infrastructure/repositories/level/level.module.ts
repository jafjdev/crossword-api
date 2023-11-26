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
import { LocalStrategy } from '../../strategies/local.strategy';
import { AuthModule } from '../user/auth.module';
import { CreateLevelsUseCase } from '../../../usecases/level/createLevels.usecase';

@Module({
  imports: [
    AuthModule,
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
    CreateLevelsUseCase,
    DeleteLevelUseCase,
    GetLevelUseCase,
    GetLevelsUseCase,
    LoggerService,
    LocalStrategy,
  ],
  exports: [
    LevelService,
    CreateLevelUseCase,
    CreateLevelsUseCase,
    DeleteLevelUseCase,
    GetLevelUseCase,
    GetLevelsUseCase,
    LoggerService,
    LocalStrategy,
  ],
})
export class LevelModule {}
