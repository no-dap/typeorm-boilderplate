import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Post } from '../entry/Post';
import { Profile } from './Profile';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: false })
    isStaff: boolean = false;

    @Column({ type: 'date' })
    createdAt: string = (new Date()).toISOString();

    @OneToOne(
      () => Profile,
      profile => profile.user,
      {onDelete: "CASCADE", nullable: true}
    )
    profile: Promise<Profile> | Profile;

    @OneToMany(() => Post, post => post.user)
    posts: Promise<Post[]> | Post[];

    @ManyToMany(() => User)
    @JoinTable({ joinColumn: { name: 'user_from' } })
    followingUsers: User[];

}
