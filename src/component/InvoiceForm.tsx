import React from "react";
import InvoiceItem, { InvoiceItem as InvoiceItemType } from "./InvoiceItem";

interface InvoiceFormProps {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, setInvoice }) => {
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
    if (invoice.items.length === 1) return; // Prevent removing the last item
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice((prev) => ({ ...prev, items: newItems }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = parseFloat(value) || 0;
    if (newValue < 0) newValue = 0; // Prevent negative values
    setInvoice({ ...invoice, [name]: newValue });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoice Details</h2>

      {/* Invoice Items */}
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

      {/* Add Item Button */}
      <button
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
        onClick={handleAddItem}
      >
        + Add Item
      </button>

      {/* VAT & Discount Fields */}
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
  );
};

export default InvoiceForm;
