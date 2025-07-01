import { Controller, Get, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('gt-right')
  getGtRight() {
    return this.appService.gtRight();
  }

  @Get('gt-left')
  getGtLeft() {
    return this.appService.gtLeft();
  }

  @Get('system-settings')
  getSystemSettings() {
    return this.appService.getSystemSettings();
  }

  @Put('system-settings')
  updateSystemSettings(
    @Body()
    updateSystemSettingsDto: UpdateSystemSettingsDto,
  ) {
    return this.appService.updateSystemSettings(updateSystemSettingsDto);
  }
}
