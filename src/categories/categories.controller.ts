import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchCategoryDto } from './dto/search-category.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from 'src/auth/auth.guard';

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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: any) {
    console.log(req.user)
    return await this.categoriesService.create(createCategoryDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obter categorias'})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findAll(@Query() searchFilters: SearchCategoryDto, @Req() req: any) {
    return await this.categoriesService.findAll(searchFilters, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter categoria pelo ID'})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string, @Req() req: any) {
    return await this.categoriesService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria'})
  // @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @ApiBody({
    type: CreateCategoryDto
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Req() req: any) {
    return this.categoriesService.update(+id, updateCategoryDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
