import { Injectable } from '@nestjs/common';
import { ApiResponse, CreateInvoiceDto, PaymentProcessDto } from '@plux-max/types';

@Injectable()
export class FinancialService {
  private invoices = [
    {
      id: 'inv-9001',
      invoiceNumber: 'INV-2026-0091',
      patientName: 'Aarav Sharma',
      patientUhid: 'UHID-2026-9081',
      totalAmount: 18500.0,
      gstAmount: 3330.0,
      paidAmount: 18500.0,
      status: 'PAID',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inv-9002',
      invoiceNumber: 'INV-2026-0092',
      patientName: 'Priya Verma',
      patientUhid: 'UHID-2026-9082',
      totalAmount: 4200.0,
      gstAmount: 756.0,
      paidAmount: 0.0,
      status: 'UNPAID',
      createdAt: new Date().toISOString(),
    },
  ];

  async getInvoices(): Promise<ApiResponse> {
    return {
      success: true,
      data: this.invoices,
      timestamp: new Date().toISOString(),
    };
  }

  async createInvoice(dto: CreateInvoiceDto): Promise<ApiResponse> {
    const subtotal = dto.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const gstRate = dto.gstRatePercentage || 18;
    const gstAmount = (subtotal * gstRate) / 100;
    const totalAmount = subtotal + gstAmount - (dto.discount || 0);

    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: dto.patientId,
      patientUhid: dto.patientId || 'UHID-2026-9081',
      patientName: 'Registered Patient',
      totalAmount,
      gstAmount,
      paidAmount: 0,
      status: 'UNPAID',
      createdAt: new Date().toISOString(),
    };

    this.invoices.unshift(newInvoice);

    return {
      success: true,
      message: 'Tax invoice created with GST calculation',
      data: newInvoice,
      timestamp: new Date().toISOString(),
    };
  }

  async processPayment(dto: PaymentProcessDto): Promise<ApiResponse> {
    const invoice = this.invoices.find((i) => i.id === dto.invoiceId);
    if (invoice) {
      invoice.paidAmount += dto.amount;
      if (invoice.paidAmount >= invoice.totalAmount) {
        invoice.status = 'PAID';
      } else {
        invoice.status = 'PARTIALLY_PAID';
      }
    }

    return {
      success: true,
      message: `Payment of ₹${dto.amount} via ${dto.paymentMode} captured`,
      data: {
        receiptNumber: `RCPT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        transactionId: dto.transactionId || `TXN-${Date.now()}`,
        status: 'SUCCESS',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
