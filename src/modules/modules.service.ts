import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { SearchModulesDto } from './dto/search-modules.dto';
import { IOutput } from 'src/_helpers/default-returns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(
    private prisma: PrismaService
  ) {

  }
  create(createModuleDto: CreateModuleDto) {
    return 'This action adds a new module';
  }

  async findAll(searchFilters: SearchModulesDto): Promise<IOutput> {
    let output: IOutput;
    
    try {
      const modulesList = await this.prisma.modules.findMany({
        skip: searchFilters.page ? Number(searchFilters.page) : 0,
        take: searchFilters.limit ? Number(searchFilters.limit) : 10,
        where: {
          ...searchFilters.search ? {
            OR: [
              {
                name: {
                  contains: searchFilters.search
                },
              },
              {
                description: searchFilters.search
              },
            ]
          } : undefined,
        },
        include: {
          ResourcesOnModules: {
            select: {
              Resources: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  library: true,
                  value: true,
                  created_at: true,
                  updated_at: true
                }
              }
            }
          },
        }
      });
      output = {
        success: true,
        message: "Modulos consultados com sucesso!",
        data: modulesList
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async findOne(id: number) {
    let output: IOutput;
    try {
      const moduleData = await this.prisma.modules.findFirstOrThrow({
        
        where: {
          id: Number(id)
        },
        include: {
          ResourcesOnModules: {
            select: {
              Resources: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  library: true,
                  value: true,
                  created_at: true,
                  updated_at: true
                }
              }
            }
          },
        }
      }).catch(error => { throw new Error(`${error.code ?? ''} Modulo não foi encontrado`) })
      output = {
        success: true,
        message: "Modulo consultado com sucesso!",
        data: moduleData
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
    
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
