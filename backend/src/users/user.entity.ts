import { DatabaseFileEntity } from 'src/user-images/database-file.entyty';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany(() => DatabaseFileEntity, (file) => file.user)
  files: DatabaseFileEntity[];
}
