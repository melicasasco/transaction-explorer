// types/transaction.ts

export interface Card {
    value: string;
    label: string;
  }
  
  export interface PaymentMethod {
    value: string;
    label: string;
  }
  
  export interface Transaction {
    id: string;
    amount: number;
    type: string;
    date: string;
    card: string;
    installments: number;
    createdAt: string;
    updatedAt?: string;
    paymentMethod?: string;
  }
  
  export interface Metadata {
    cards: Card[];
    paymentMethods: PaymentMethod[];
  }
  
  export interface ApiData {
    metadata: Metadata;
    transactions: Transaction[];
  }
  