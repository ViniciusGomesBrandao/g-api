import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchCategoryDto } from './dto/search-category.dto';
import { IOutput } from 'src/_helpers/default-returns';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService
  ) {

  }
  async create(createCategoryDto: CreateCategoryDto): Promise<IOutput> {
    let output: IOutput;
    
    try {
      let newCategory = await this.prisma.categories.create({
        data: {
          name: createCategoryDto.name,
          ...createCategoryDto.description ? {
            description: createCategoryDto.description
          } : undefined,
          ...createCategoryDto.custom_value ? {
            custom_value: Number(createCategoryDto.custom_value)
          } : undefined
        },
        select: {
          id: true,
          name: true,
          description: true,
          custom_value: true,
        }
      });

      if (createCategoryDto.modules.length > 0) {
        await Promise.all(createCategoryDto.modules.map(async (moduleID: number) => {
          const checkExisting = await this.prisma.modules.findFirstOrThrow().catch((error: any) => {
            throw new Error(`Modulo com o ID ${moduleID} nao encontrado!`)
          });
          if (!checkExisting) {
            throw new Error(`Modulo com o ID ${moduleID} nao encontrado!`)
          }

          await this.prisma.categories.update({
            where: {
              id: newCategory.id
            },
            data: {
              CategoriesOnModules: {
                create: {
                  moduleId: moduleID
                }
              }
            }
          });
        }));

        newCategory = await this.prisma.categories.findFirst({
          where: {
            id: newCategory.id
          },
          select: {
            id: true,
            name: true,
            description: true,
            custom_value: true,
            CategoriesOnModules: {
              select: {
                Modules: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    value: true,
                    created_at: true,
                    updated_at: true
                  }
                }
              }
            }
          }
        });
      }

      output = {
        success: true,
        message: "Categoria criada com sucesso!",
        data: newCategory
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  async findAll(searchFilters: SearchCategoryDto): Promise<IOutput> {
    let output: IOutput;
    try {
      const categoriesList = await this.prisma.categories.findMany({
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
        select: {
          id: true,
          name: true,
          description: true,
          custom_value: true,
          created_at: true,
          updated_at: true,
          CategoriesOnModules: {
            select: {
              Modules: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  value: true,
                  created_at: true,
                  updated_at: true
                }
              }
            }
          }
        }
      });
      output = {
        success: true,
        message: "Categorias consultados com sucesso!",
        data: categoriesList
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
      const moduleData = await this.prisma.categories.findFirstOrThrow({

        where: {
          id: Number(id)
        },
        select: {
          id: true,
          name: true,
          description: true,
          custom_value: true,
          created_at: true,
          updated_at: true,
          CategoriesOnModules: {
            select: {
              Modules: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  value: true,
                  created_at: true,
                  updated_at: true,
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
              }
            }
          }
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

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let output: IOutput;
    
    try {
      let updateCategory = await this.prisma.categories.update({
        where: {
          id: Number(id)
        },
        data: {
          name: updateCategoryDto.name,
          ...updateCategoryDto.description ? {
            description: updateCategoryDto.description
          } : undefined,
          ...updateCategoryDto.custom_value ? {
            custom_value: Number(updateCategoryDto.custom_value)
          } : undefined
        },
        select: {
          id: true,
          name: true,
          description: true,
          custom_value: true,
        }
      });

      if (updateCategoryDto.modules.length > 0) {
        await Promise.all(updateCategoryDto.modules.map(async (moduleID: number) => {
          const checkExisting = await this.prisma.modules.findFirstOrThrow().catch((error: any) => {
            throw new Error(`Modulo com o ID ${moduleID} nao encontrado!`)
          });
          if (!checkExisting) {
            throw new Error(`Modulo com o ID ${moduleID} nao encontrado!`)
          }

          await this.prisma.categories.update({
            where: {
              id: updateCategory.id
            },
            data: {
              CategoriesOnModules: {
                create: {
                  moduleId: moduleID
                }
              }
            }
          });
        }));

        updateCategory = await this.prisma.categories.findFirst({
          where: {
            id: updateCategory.id
          },
          select: {
            id: true,
            name: true,
            description: true,
            custom_value: true,
            CategoriesOnModules: {
              select: {
                Modules: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    value: true,
                    created_at: true,
                    updated_at: true
                  }
                }
              }
            }
          }
        });
      }

      output = {
        success: true,
        message: "Categoria atualizada com sucesso!",
        data: updateCategory
      }

    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    return output;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
