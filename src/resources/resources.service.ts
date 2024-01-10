import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IOutput } from 'src/_helpers/default-returns';

@Injectable()
export class ResourcesService {

  constructor(
    private prisma: PrismaService
  ) {

  }
  async create(createResourceDto: CreateResourceDto) {
    // return 'This action adds a new resource';
    let output: IOutput;
    try {
      
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return "";
  }

  findAll() {
    return `This action returns all resources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
