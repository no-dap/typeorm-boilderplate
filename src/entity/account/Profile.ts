import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn } from 'typeorm/browser';
import { User } from './User';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: Promise<User> | User;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column({type: "integer"})
  age: number;

  @Column({type: "text"})
  introduction: string;

}
