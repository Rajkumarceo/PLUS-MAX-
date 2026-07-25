import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiAnalyticsService } from './ai-analytics.service';
import { TriagePredictionRequest } from '@plux-max/types';

@ApiTags('AI & Predictive Analytics')
@Controller('api/v1/ai')
export class AiAnalyticsController {
  constructor(private readonly aiService: AiAnalyticsService) {}

  @Post('triage')
  @ApiOperation({ summary: 'Run AI Triage prediction & ICD-10 suggestions' })
  async predictTriage(@Body() dto: TriagePredictionRequest) {
    return this.aiService.predictTriage(dto);
  }

  @Get('bed-occupancy-forecast')
  @ApiOperation({ summary: 'Predict bed occupancy and ICU demand for next N days' })
  async predictBedOccupancy(@Query('days') days?: number) {
    return this.aiService.predictBedOccupancy(days ? Number(days) : 7);
  }
}
