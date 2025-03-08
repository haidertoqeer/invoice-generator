export interface InvoiceItem {
    description: string;
    price: number;
    quantity: number;
  }
  
  export interface Invoice {
    items: InvoiceItem[];
    vatRate: number;
    discount: number;
    user?: {
      name: string;
      companyAddress: string;
      phoneNumber: string;
      logo: string | null;
    };
    client?: {
      clientName: string;
      clientCompanyName: string;
      clientPhoneNumber: string;
    };
  }