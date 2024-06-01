import { Injectable, UnauthorizedException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/users/entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  async createPost(user: any, title: string, description: string, price: number): Promise<Post> {
    if (!user.active) {
      throw new ForbiddenException('User is not active');
    }

    const user_id = user.id;

    const post = this.postsRepository.create({ title, description, user_id, price });
    return this.postsRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async updatePost(id: number, updateData: Partial<Post>): Promise<Post> {
    const post = await this.getPostById(id);

    Object.assign(post, updateData);

    return this.postsRepository.save(post);
  }

  async deletePost(id: string): Promise<void> {
    const post = await this.postsRepository.delete(id);
    if (post.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

}