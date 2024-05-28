import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() createPostDto: { userId: number, title: string, description: string, price: number }) {
    // const user = req.user;
    return this.postsService.createPost(createPostDto.userId, createPostDto.title, createPostDto.description, createPostDto.price);
  }
}
