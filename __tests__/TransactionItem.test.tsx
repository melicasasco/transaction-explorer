import React from 'react';
import { render } from '@testing-library/react';
import TransactionItem from '../src/app/components/transactions/TransactionItem';
import { Transaction } from '../src/app/types/transaction';

const mockTransaction: Transaction = {
  id: '1',
  amount: 100,
  createdAt: '2025-01-01T12:00:00Z',
  paymentMethod: 'Tarjeta de Crédito',
  card: 'Visa',
  installments: 1,
  type: 'payment',
  date: '2023-01-01'
};

describe('TransactionItem Component', () => {
  it('renders transaction details correctly', () => {
    const { getByText } = render(<TransactionItem tx={mockTransaction} />);
    expect(getByText('Tarjeta de Crédito')).toBeInTheDocument();
    expect(getByText('+ $100.00')).toBeInTheDocument(); 
    expect(getByText('01/01/2025')).toBeInTheDocument();
  });
});