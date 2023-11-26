import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateLevelDto, CreateLevelsDto } from './dto/create-level-dto';
import { LevelService } from '../../repositories/level/level.service';
import { Level } from '../../entities/level.entity';
import { QueryLevelDto } from './dto/query-level-dto';
import { CreateLevelUseCase } from '../../../usecases/level/createLevel.usecase';
import { DeleteLevelUseCase } from '../../../usecases/level/deleteLevel.usecase';
import { GetLevelUseCase } from '../../../usecases/level/getLevel.usecase';
import { GetLevelsUseCase } from '../../../usecases/level/getLevels.usecase';
import { LocalStrategy } from '../../strategies/local.strategy';
import { AuthGuard } from '@nestjs/passport';
import { CreateLevelsUseCase } from '../../../usecases/level/createLevels.usecase';

@Controller('level')
export class LevelController {
  constructor(
    private readonly createLevelUseCase: CreateLevelUseCase,
    private readonly createLevelsUseCase: CreateLevelsUseCase,
    private readonly getLevelUseCase: GetLevelUseCase,
    private readonly getLevelsUseCase: GetLevelsUseCase,
    private readonly deleteLevelUseCase: DeleteLevelUseCase,
  ) {}
  @Post('bulk')
  createStructures(@Body() levelsDto: CreateLevelDto[]) {
    this.createLevelsUseCase.execute(levelsDto);
    return 'ok';
  }
  @Post()
  createStructure(@Body() createLevelDto: CreateLevelDto) {
    return this.createLevelUseCase.execute(createLevelDto);
  }
  @Get()
  @UseGuards(AuthGuard('local'))
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
