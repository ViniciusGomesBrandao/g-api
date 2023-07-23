import { Test, TestingModule } from '@nestjs/testing';
import { BigdatacorpService } from './bigdatacorp.service';

describe('BigdatacorpService', () => {
  let service: BigdatacorpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigdatacorpService],
    }).compile();

    service = module.get<BigdatacorpService>(BigdatacorpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
