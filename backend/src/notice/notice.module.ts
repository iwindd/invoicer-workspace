import { Module } from '@nestjs/common';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService, PrismaService]
})
export class NoticeModule {}
