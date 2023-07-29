import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Level, LEVELS_COLLECTION, LevelSchema } from './level.entity';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        collection: LEVELS_COLLECTION,
        name: Level.name,
        schema: LevelSchema,
      },
    ]),
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
