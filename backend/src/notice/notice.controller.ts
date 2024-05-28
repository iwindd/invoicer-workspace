import { Controller, Get, Param } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {};

  @HttpCode(200)
  @Get('images/:name')
  getFile(@Param("name") name: string, @Res() res : any){
    try {
      res.sendFile(join(process.cwd(), `uploads/${name}`))
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.fineOne(+id);
  }

}
