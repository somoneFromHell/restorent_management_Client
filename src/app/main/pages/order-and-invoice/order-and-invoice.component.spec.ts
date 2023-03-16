import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAndInvoiceComponent } from './order-and-invoice.component';

describe('OrderAndInvoiceComponent', () => {
  let component: OrderAndInvoiceComponent;
  let fixture: ComponentFixture<OrderAndInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAndInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderAndInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
