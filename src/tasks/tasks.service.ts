import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: string): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async create(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.prisma.task.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.prisma.task.delete({ where: { id } });
  }
}
