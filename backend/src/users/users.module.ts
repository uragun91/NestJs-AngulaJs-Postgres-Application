import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFileEntity } from 'src/user-images/database-file.entyty';
import { DatabaseFilesService } from 'src/user-images/databse-file.service';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, DatabaseFileEntity]),
    MulterModule.register(),
  ],
  controllers: [UsersController],
  providers: [UsersService, DatabaseFilesService],
  exports: [UsersService],
})
export class UsersModule {}
