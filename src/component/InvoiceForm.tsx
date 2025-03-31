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
    console.log("Attempting to remove item at index:", index);
  
    setInvoice((prev) => {
      if (prev.items.length === 1) {
        console.warn("Cannot remove the last item. Keeping at least one.");
        return prev; // Prevent removing the last item to keep one entry
      }
  
      const updatedItems = prev.items.filter((_, i) => i !== index);
      console.log("Updated Items after removal:", updatedItems);
  
      return { ...prev, items: updatedItems };
    });
  };
  
  
  
  
  

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow only numbers and a single decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;

    setInvoice((prev) => ({
      ...prev,
      [name]: value, // Store as string to allow real-time typing
    }));
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Trim and check if the input is empty or invalid
    let parsedValue = value.trim() === "" || isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  
    setInvoice((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
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
              type="text"
              name="vatRate"
              value={invoice.vatRate}
              onChange={handleNumberInput}
              onBlur={handleBlur}
              placeholder="Enter VAT Rate"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount (%) 
            </label>
            <input
              type="text"
              name="discount"
              value={invoice.discount}
              onChange={handleNumberInput}
              onBlur={handleBlur}
              placeholder="Enter Discount"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;