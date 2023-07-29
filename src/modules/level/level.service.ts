import { Injectable, NotFoundException } from '@nestjs/common';
import { Level } from './level.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLevelDto, CreateLevelsDto } from './dto/create-level-dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectModel(Level.name)
    private readonly mongooseModel: Model<Level>,
  ) {}

  async createLevel(level: CreateLevelDto): Promise<void> {
    await this.mongooseModel.create(level);
  }

  async createLevels(levels: CreateLevelsDto): Promise<void> {
    await this.mongooseModel.create(levels);
  }

  async findAll(page = 1, limit = 10): Promise<Level[]> {
    return this.mongooseModel
      .find()
      .limit(limit)
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
