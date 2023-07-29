import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateLevelDto, CreateLevelsDto } from './dto/create-level-dto';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
  @Post()
  createStructures(@Body() createLevelsDto: CreateLevelsDto) {
    return this.levelService.createLevels(createLevelsDto);
  }
  @Post()
  createStructure(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.createLevel(createLevelDto);
  }

  @Get()
  findAll() {
    return this.levelService.findAll();
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
