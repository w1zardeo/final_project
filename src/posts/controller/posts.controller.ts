import { Controller, Post, Body, UseGuards, Request, Param, ParseIntPipe, Get, NotFoundException, ForbiddenException, Put, Delete, Req} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PostsService } from '../services/posts.service';
import { Post as PostEntity } from 'src/users/entities/post.entity';
import { Role } from 'src/auth/role.enum';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

 @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Request() req, @Body() createPostDto: {title: string, description: string, price: number }) {
    const user = req.user;

    if(!user.active) {
      throw new ForbiddenException('User not activated');
    }
    return this.postsService.createPost(user, createPostDto.title, createPostDto.description, createPostDto.price);
  }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updateData: any,
    @Request() req: any
  ) {
    const post = await this.postsService.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user_id !== req.user.id) {
      throw new ForbiddenException('You are not authorized to update this post');
    }

    return this.postsService.updatePost(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(
    @Param('id') id: any,
    @Request() req: any
  ): Promise<void> {

    const post = await this.postsService.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user_id !== req.user.id && req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('You are not authorized to delete this post');
    }

    return this.postsService.deletePost(id);
  }

}