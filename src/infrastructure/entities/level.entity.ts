import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

@Schema()
export class Letter {
  @Prop()
  x: number;

  @Prop()
  y: number;

  @Prop()
  letter: string;
}

export const LetterSchema = SchemaFactory.createForClass(Letter);

@Schema()
export class Word {
  @Prop()
  word: string;

  @Prop({ type: [LetterSchema] })
  letters: Letter[];
}

export const WordSchema = SchemaFactory.createForClass(Word);

export const LEVELS_COLLECTION = 'levels';

@Schema({
  collection: LEVELS_COLLECTION,
  timestamps: true,
})
export class Level {
  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop({ type: [WordSchema] })
  words: Word[];

  constructor(args?: Partial<Level>) {
    Object.assign(this, args);
  }
}

export type LevelDocument = Level & Document;

export const LevelSchema = SchemaFactory.createForClass(Level);

const SOFT_DELETE_OPTIONS = {
  deletedAt: true,
  overrideMethods: 'all',
};

LevelSchema.plugin(mongooseDelete, SOFT_DELETE_OPTIONS);
