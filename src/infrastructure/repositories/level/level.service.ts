import { Injectable, NotFoundException } from '@nestjs/common';
import { Level } from '../../entities/level.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLevelDto } from '../../controllers/level/dto/create-level-dto';
import { QueryLevelDto } from '../../controllers/level/dto/query-level-dto';
import { LevelRepository } from '../../../domain/repositories/level.repository';

@Injectable()
export class LevelService implements LevelRepository {
  constructor(
    @InjectModel(Level.name)
    private readonly mongooseModel: Model<Level>,
  ) {}

  async createLevel(level: CreateLevelDto): Promise<void> {
    await this.mongooseModel.create(level);
  }

  async createLevels(levels: CreateLevelDto[]): Promise<void> {
    await this.mongooseModel.create(levels);
  }

  async findAll(queryLevelsDto: QueryLevelDto): Promise<Level[]> {
    const { limit, page, sort, sortBy } = queryLevelsDto;

    return this.mongooseModel
      .find()
      .limit(limit)
      .sort({ [sortBy]: sort })
      .skip((page - 1) * limit)
      .exec();
  }

  async findOne(id: string): Promise<Level> {
    const level = await this.mongooseModel.findById(id);
    this.validateLevelNotFoundException(id, level);
    return level;
  }

  async delete(id: string): Promise<Level> {
    return this.mongooseModel.findByIdAndDelete(id);
  }
  private validateLevelNotFoundException(id: string, level: Level): void {
    if (!level) {
      throw new NotFoundException(`Level with id ${id} not found`);
    }
  }
}
