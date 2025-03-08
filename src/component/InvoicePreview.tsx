import React from 'react';
import { Invoice } from '../types/Invoice';

interface InvoicePreviewProps {
  invoice: Invoice;
  currency: string;
}

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
};

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice, currency }) => {
  const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;

  const calculateSubtotal = () => {
    return invoice.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateVAT = () => {
    return calculateSubtotal() * (invoice.vatRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT() - invoice.discount;
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-end mb-4">
        <div>
          {invoice.user?.logo && (
            <img src={invoice.user.logo} alt="User Logo" className="max-h-40 mb-2" />
          )}
          <p>{invoice.user?.name}</p>
          <p>{invoice.user?.companyAddress}</p>
          <p>{invoice.user?.phoneNumber}</p>
        </div>
        <div>
          <p><strong>To:</strong></p>
          <p>{invoice.client?.clientName}</p>
          <p>{invoice.client?.clientCompanyName}</p>
          <p>{invoice.client?.clientPhoneNumber}</p>
        </div>
        {/* <div>
          <h2 className="text-lg font-semibold">Invoice Preview</h2>
        </div> */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {currencySymbol}{item.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {currencySymbol}{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={3} className="border border-gray-300 px-4 py-2 text-right">Subtotal</td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {currencySymbol}{calculateSubtotal().toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <table className="w-1/3 border border-gray-300 text-right">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">VAT ({invoice.vatRate}%)</td>
              <td className="border border-gray-300 px-4 py-2">
                {currencySymbol}{calculateVAT().toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Discount</td>
              <td className="border border-gray-300 px-4 py-2">
                -{currencySymbol}{invoice.discount.toFixed(2)}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2">
                {currencySymbol}{calculateTotal().toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicePreview;