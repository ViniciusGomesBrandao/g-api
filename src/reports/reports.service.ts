import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { IOutput } from 'src/_helpers/default-returns';
import { PrismaService } from 'src/prisma/prisma.service';
import { BigdatacorpService } from '@app/bigdatacorp';
import { MakePdfService } from 'src/_services/make-pdf/make-pdf.service';
import { GetPdfReportDto } from './dto/get-pdf-report.dto';


@Injectable()
export class ReportsService {

  constructor(
    private prisma: PrismaService,
    private bigdata: BigdatacorpService,
    private makePdf: MakePdfService
  ) {

  }

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  async getPdfReport(userID: number, params: GetPdfReportDto) {
    let output: IOutput;
    try {
      console.log(userID)
      //check if the user has the category registered
      const isExistingCategory = await this.prisma.usersOnCategories.findFirstOrThrow({
        where: {
          categoryId: Number(params.categoryID),
          userId: userID
        }
      }).catch((error) => {
        throw new Error("Usuário não possui essa categoria!");
      });


      const categoryData = await this.prisma.categories.findFirstOrThrow({
        where: {
          id: Number(params.categoryID)
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
                  path_make_function: true,
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
                          updated_at: true,
                          path: true
                        }
                      }
                    }
                  },
                }
              }
            }
          }
        }
      }).catch(error => { throw new Error(`${error.code ?? ''} Categoria não foi encontrado`) });

      // console.log(categoryData.CategoriesOnModules);

      let infoData: any = {};
      let htmlContent: string = "";
      await Promise.all(categoryData.CategoriesOnModules.map(async (module) => {
        if (module.Modules.id == 9 || module.Modules.id == 8 || module.Modules.id == 7 || module.Modules.id == 6 || module.Modules.id == 5) {
          // console.log(module.Modules.name)
          await Promise.all(module.Modules.ResourcesOnModules.map(async (resource: any) => {
 
            //GET PATH FUNCTION OF GET INFORMATIONS
            let pathFunction: keyof typeof BigdatacorpService = resource.Resources.path as keyof typeof BigdatacorpService;

            // CHECK IF EXISTS AND GET INFORMATIONS
            if (this.bigdata && typeof this.bigdata[pathFunction] === 'function') {
              const te = await this.bigdata[pathFunction]({
                doc: params.doc
              });
              infoData[`${resource.Resources.path}`] = te;
            } else {
              console.error(`Método ${pathFunction} não encontrado em this.bigdata`);
            }
            // console.log(infoData)
          }));
          let newHtml = await this.makePdf[module.Modules.path_make_function](infoData);
          if (!newHtml.success) {
            throw new Error(newHtml.message)
          }
          htmlContent = `${htmlContent}${newHtml.data}`
        }
      }));

      const pdfData = await this.makePdf.makePdf({
        content: htmlContent,
        format: "a4"
      });

      // console.log(categoryData.CategoriesOnModules[6].Modules.ResourcesOnModules)

      output = {
        success: true,
        message: "",
        data: pdfData.data
      }
    } catch (error) {
      output = {
        success: false,
        message: error.message
      }
    }
    // console.log(output)
    return output;
  }
}
