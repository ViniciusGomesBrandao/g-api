import { Test, TestingModule } from '@nestjs/testing';
import { MakePdfService } from './make-pdf.service';

describe('MakePdfService', () => {
  let service: MakePdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakePdfService],
    }).compile();

    service = module.get<MakePdfService>(MakePdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
