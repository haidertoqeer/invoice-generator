import React from "react";

interface InvoiceItemProps {
  item: InvoiceItem;
  onChange: (updatedItem: InvoiceItem) => void;
  onRemove: () => void;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ item, onChange, onRemove }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "description") {
      onChange({ ...item, description: value });
      return;
    }

    // Allow only numbers and a decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;

    let newValue = value === "" ? 0 : parseFloat(value);
    if (newValue < 0) newValue = 0; // Prevent negative values

    onChange({ ...item, [name]: newValue });
  };

  return (
    <div className="flex flex-wrap items-end gap-2">
      {/* Description Field (Full-Width) */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Item Description"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Price */}
      <div className="w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price 
        </label>
        <input
          type="text"
          name="price"
          value={item.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quantity */}
      <div className="w-1/4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity 
        </label>
        <input
          type="text"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Remove Button */}
      <button
  onClick={() => {
    console.log("onRemove function:", onRemove);
    if (typeof onRemove !== "function") {
      console.error("Error: onRemove is not a function", onRemove);
      return;
    }
    onRemove(); // Call the function
  }}
  className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition-all"
>
  Remove
</button>

    </div>
  );
};

export default InvoiceItem;
