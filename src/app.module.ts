import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig, { IAppConfig } from '../config/app.config';
import MongoConfig, { IMongoConfig } from '../config/mongo.config';
import { LevelModule } from './modules/level/level.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, MongoConfig],
      envFilePath: ['.env'],
      expandVariables: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<
          {
            appConfig: IAppConfig;
            mongoConfig: IMongoConfig;
          },
          true
        >,
      ) => {
        const mongoConfig = configService.get('mongoConfig', { infer: true });
        return {
          uri: mongoConfig.connectionUrl,
        };
      },
    }),
    LevelModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtService],
})
export class AppModule {}
