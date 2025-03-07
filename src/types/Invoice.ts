export interface InvoiceItem {
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface Invoice {
    items: InvoiceItem[];
    vatRate: number;
    discount: number;
  }