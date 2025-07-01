import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_settings')
export class SystemSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  open_hour: number;

  @Column()
  open_minute: number;

  @Column()
  open_second: number;

  @Column()
  close_hour: number;

  @Column()
  close_minute: number;

  @Column()
  close_second: number;

  @Column()
  status: boolean;
}
