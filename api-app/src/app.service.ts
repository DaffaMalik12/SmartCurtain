import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SystemSettings } from './entities/system-settings.entity';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(SystemSettings)
    private readonly systemSettingsRepository: Repository<SystemSettings>,
    private configService: ConfigService,
  ) {}

  async gtRight() {
    const { data } = await axios.get(
      `${this.configService.get<string>('RASPI_HOST')}/gt-right`,
    );
    console.log(data);
    return { success: true, message: 'GT Right' };
  }

  async gtLeft() {
    const { data } = await axios.get(
      `${this.configService.get<string>('RASPI_HOST')}/gt-left`,
    );
    console.log(data);
    return { success: true, message: 'GT Left' };
  }

  async getSystemSettings() {
    const systemSettings = await this.systemSettingsRepository.findOne({
      where: { id: 'raspiidile' },
    });
    return {
      success: true,
      message: 'Settings Retrieved',
      data: systemSettings,
    };
  }

  async updateSystemSettings(updateSystemSettingsDto: UpdateSystemSettingsDto) {
    const systemSettings = await this.systemSettingsRepository.findOne({
      where: { id: 'raspiidile' },
    });

    if (!systemSettings) {
      throw new Error('System Settings Not Found');
    }

    Object.assign(systemSettings, updateSystemSettingsDto);

    await axios.post(
      `${this.configService.get<string>('RASPI_HOST')}/system-settings`,
      {
        open_hour: systemSettings.open_hour,
        open_minute: systemSettings.open_minute,
        open_second: systemSettings.open_second,
        close_hour: systemSettings.close_hour,
        close_minute: systemSettings.close_minute,
        close_second: systemSettings.close_second,
        status: systemSettings.status,
      },
    );

    await this.systemSettingsRepository.save(systemSettings);

    return { success: true, message: 'Update Success' };
  }
}
