import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLevelDto, CreateLevelsDto } from './dto/create-level-dto';
import { LevelService } from '../../repositories/level/level.service';
import { Level } from '../../entities/level.entity';
import { QueryLevelDto } from './dto/query-level-dto';
import { CreateLevelUseCase } from '../../../usecases/level/createLevel.usecase';
import { DeleteLevelUseCase } from '../../../usecases/level/deleteLevel.usecase';
import { GetLevelUseCase } from '../../../usecases/level/getLevel.usecase';
import { GetLevelsUseCase } from '../../../usecases/level/getLevels.usecase';

@Controller('level')
export class LevelController {
  constructor(
    private readonly levelService: LevelService,
    private readonly createLevelUseCase: CreateLevelUseCase,
    private readonly getLevelUseCase: GetLevelUseCase,
    private readonly getLevelsUseCase: GetLevelsUseCase,
    private readonly deleteLevelUseCase: DeleteLevelUseCase,
  ) {}
  @Post('bulk')
  createStructures(@Body() levelsDto: CreateLevelDto[]) {
    this.levelService.createLevels(levelsDto);
    return 'ok';
  }
  @Post()
  createStructure(@Body() createLevelDto: CreateLevelDto) {
    return this.createLevelUseCase.execute(createLevelDto);
  }
  @Get()
  async findAll(@Query() query: QueryLevelDto): Promise<Level[]> {
    return this.getLevelsUseCase.execute(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getLevelUseCase.execute(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteLevelUseCase.execute(id);
  }
}
