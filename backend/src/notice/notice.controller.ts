import { Controller, Get, Param } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {};

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.fineOne(+id);
  }

}
