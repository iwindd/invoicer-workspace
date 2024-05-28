import { BadRequestException, Controller, Get, Header, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Guest } from 'src/auth/auth.decorator';

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

  @Guest()
  @HttpCode(200)
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'GET')
  @Header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  @Get('check/:id')
  checkOne(@Param('id') id: string) {
    return this.noticeService.checkOne(+id);
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
