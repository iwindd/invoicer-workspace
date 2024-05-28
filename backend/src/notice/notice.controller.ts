import { BadRequestException, Controller, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

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

  @HttpCode(200)
  @Post(":id")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads",
      filename(req, file, callback) {
        callback(null, `${file.originalname}`)
      },
    })
  }))
  uploadFile(@Param("id") id : string, @UploadedFile() file: Express.Multer.File) {
    if (!file){
      throw new BadRequestException("file not uploaded.");
    }

    return this.noticeService.paid(+id, file.filename)
  }
}
