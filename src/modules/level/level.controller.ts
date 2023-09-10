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
import { LevelService } from './level.service';
import { Level } from './level.entity';
import { QueryLevelDto } from './dto/query-level-dto';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  @Post('bulk')
  createStructures(@Body() levelsDto: CreateLevelDto[]) {
    console.log(levelsDto);
    this.levelService.createLevels(levelsDto);
    return 'ok';
  }
  @Post()
  createStructure(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.createLevel(createLevelDto);
  }
  @Get()
  async findAll(@Query() query: QueryLevelDto): Promise<Level[]> {
    const levels = await this.levelService.findAll(query);
    return levels;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.levelService.delete(id);
  }
}
