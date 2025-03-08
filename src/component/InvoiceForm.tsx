import React, { useState } from "react";
import InvoiceItem, { InvoiceItem as InvoiceItemType } from "./InvoiceItem";
import UserForm from "./UserForm";
import ClientForm from "./ClientForm";
import { Invoice } from "../types/Invoice";

interface InvoiceFormProps {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, setInvoice }) => {
  const [user, setUser] = useState({
    name: "",
    companyAddress: "",
    phoneNumber: "",
    logo: null,
  });

  const [client, setClient] = useState({
    clientName: "",
    clientCompanyName: "",
    clientPhoneNumber: "",
  });

  const handleUserChange = (updatedUser: any) => {
    setUser(updatedUser);
    setInvoice((prev) => ({ ...prev, user: updatedUser }));
  };

  const handleClientChange = (updatedClient: any) => {
    setClient(updatedClient);
    setInvoice((prev) => ({ ...prev, client: updatedClient }));
  };

  const handleItemChange = (index: number, updatedItem: InvoiceItemType) => {
    const newItems = [...invoice.items];
    newItems[index] = updatedItem;
    setInvoice({ ...invoice, items: newItems });
  };

  const handleAddItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: "", price: 0, quantity: 1 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    if (invoice.items.length === 1) return;
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice((prev) => ({ ...prev, items: newItems }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: number | string = value; // Allow empty string
    if (name === "vatRate" || name === "discount") {
      newValue = value === "" ? 0 : parseFloat(value); // Handle empty string as 0 for numeric fields
      if (typeof newValue === 'number' && newValue < 0) newValue = 0;
    }
    setInvoice({ ...invoice, [name]: newValue });
  };

  return (
    <div>
      <UserForm onUserChange={handleUserChange} />
      <ClientForm onClientChange={handleClientChange} />
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Invoice Details
        </h2>

        <div className="space-y-4">
          {invoice.items.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item {index + 1}
              </label>
              <InvoiceItem
                item={item}
                onChange={(updatedItem) => handleItemChange(index, updatedItem)}
                onRemove={() => handleRemoveItem(index)}
              />
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
          onClick={handleAddItem}
        >
          + Add Item
        </button>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              VAT Rate (%)
            </label>
            <input
              type="number"
              name="vatRate"
              value={invoice.vatRate}
              onChange={handleChange}
              placeholder="Enter VAT Rate"
              min="0"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={invoice.discount}
              onChange={handleChange}
              placeholder="Enter Discount"
              min="0"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;