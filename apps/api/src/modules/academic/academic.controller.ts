import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AcademicService } from './academic.service';
import { OsceEvaluationDto } from '@plux-max/types';

@ApiTags('Academic (Medical College) ERP')
@Controller('api/v1/academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Get('students')
  @ApiOperation({ summary: 'List registered medical students' })
  async getStudents() {
    return this.academicService.getStudents();
  }

  @Get('clinical-postings')
  @ApiOperation({ summary: 'List student clinical hospital postings' })
  async getClinicalPostings() {
    return this.academicService.getClinicalPostings();
  }

  @Get('cbme/competencies')
  @ApiOperation({ summary: 'List NMC CBME Competencies' })
  async getCbmeCompetencies() {
    return this.academicService.getCbmeCompetencies();
  }

  @Get('logbook')
  @ApiOperation({ summary: 'List student e-Logbook entries' })
  async getLogbookEntries() {
    return this.academicService.getLogbookEntries();
  }

  @Post('logbook/:id/sign-off')
  @ApiOperation({ summary: 'Faculty Digital Sign-off on student CBME logbook entry' })
  async signOffLogbookEntry(
    @Param('id') logId: string,
    @Body() body: { facultyName: string },
  ) {
    return this.academicService.signOffLogbookEntry(logId, body.facultyName || 'Dr. Rajesh Kumar');
  }

  @Post('osce/evaluate')
  @ApiOperation({ summary: 'Evaluate student OSCE station performance' })
  async evaluateOsceStation(@Body() dto: OsceEvaluationDto) {
    return this.academicService.evaluateOsceStation(dto);
  }

  @Get('internal-assessments')
  @ApiOperation({ summary: 'Calculate NMC 40% IA eligibility for university exams' })
  async getInternalAssessments() {
    return this.academicService.getInternalAssessments();
  }

  @Get('student-dashboard')
  @ApiOperation({ summary: 'Isolated student dashboard endpoint returning only own student data' })
  async getStudentDashboard() {
    return this.academicService.getIsolatedStudentDashboard();
  }

  @Get('staff-dashboard')
  @ApiOperation({ summary: 'Restricted staff dashboard endpoint returning staff HR, shifts & assigned module' })
  async getStaffDashboard() {
    return this.academicService.getIsolatedStaffDashboard();
  }
}
