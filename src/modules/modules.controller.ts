import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { SearchModulesDto } from './dto/search-modules.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('modules')
@ApiTags('Modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()

  @ApiOperation({ summary: 'Obter modulos'})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  async findAll(@Query() searchFilters: SearchModulesDto) {
    return await this.modulesService.findAll(searchFilters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter modulo pelo ID'})
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(+id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(+id);
  }
}
