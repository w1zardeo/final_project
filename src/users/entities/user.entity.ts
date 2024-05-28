import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  phone: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: false })
  active: boolean;

  // @OneToMany(() => Post, post => post.user)
  // posts: Post[];
}