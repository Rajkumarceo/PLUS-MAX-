import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FinancialService } from './financial.service';
import { CreateInvoiceDto, PaymentProcessDto } from '@plux-max/types';

@ApiTags('Financial & Billing ERP')
@Controller('api/v1/financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Get('invoices')
  @ApiOperation({ summary: 'List all invoices' })
  async getInvoices() {
    return this.financialService.getInvoices();
  }

  @Post('invoices')
  @ApiOperation({ summary: 'Create GST invoice' })
  async createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.financialService.createInvoice(dto);
  }

  @Post('payments/process')
  @ApiOperation({ summary: 'Process POS / Gateway Payment (Razorpay/Stripe)' })
  async processPayment(@Body() dto: PaymentProcessDto) {
    return this.financialService.processPayment(dto);
  }
}
