import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/users/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(userId: number, title: string, description: string, price: number): Promise<Post> {

    const post = new Post();
    post.title = title;
    post.description = description;
    post.user_id = userId;
    post.price = price;
    return this.postsRepository.save(post);
  }
}