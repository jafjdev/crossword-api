import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsNotZero } from '../../../decorators/IsNotZero';

class Letter {
  @IsNumber()
  @IsInt()
  readonly x: number;
  @IsNumber()
  @IsInt()
  readonly y: number;
  @IsString()
  @IsNotEmpty()
  @IsNotIn([' ', '\n'])
  readonly letter: string;
}

class Word {
  @IsString()
  @IsNotEmpty()
  readonly word: string;
  @IsArray()
  readonly letters: Letter[];
}

export class CreateLevelDto {
  @IsNumber()
  @IsInt()
  @IsNotZero()
  readonly width: number;
  @IsNumber()
  @IsInt()
  @IsNotZero()
  readonly height: number;
  @IsArray()
  @IsNotEmpty()
  readonly words: Word[];
}

export class CreateLevelsDto {
  @IsArray()
  @IsNotEmpty()
  structures: CreateLevelDto[];
}
