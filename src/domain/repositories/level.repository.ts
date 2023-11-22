import { Level } from 'src/infrastructure/entities/level.entity';
import { CreateLevelDto } from '../../infrastructure/controllers/level/dto/create-level-dto';
import { QueryLevelDto } from '../../infrastructure/controllers/level/dto/query-level-dto';

export interface LevelRepository {
  createLevel(level: CreateLevelDto): Promise<void>;
  createLevels(levels: CreateLevelDto[]): Promise<void>;
  findAll(queryLevelsDto: QueryLevelDto): Promise<Level[]>;
  findOne(id: string): Promise<Level>;
  delete(id: string): Promise<Level>;
}
