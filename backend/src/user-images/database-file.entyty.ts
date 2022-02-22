import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DatabaseFileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column({
    type: 'bytea',
    nullable: false,
  })
  data: Uint8Array;

  @Column()
  uploadDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
}
