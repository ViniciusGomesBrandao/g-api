import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchCategoryDto } from './dto/search-category.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar categoria'})
  // @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @ApiBody({
    type: CreateCategoryDto
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter categorias'})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  async findAll(@Query() searchFilters: SearchCategoryDto) {
    return await this.categoriesService.findAll(searchFilters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter categoria pelo ID'})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria'})
  // @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @ApiBody({
    type: CreateCategoryDto
  })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
