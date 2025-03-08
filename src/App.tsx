import React, { useState } from "react";
import InvoiceForm from "./component/InvoiceForm";
import InvoicePreview from "./component/InvoicePreview";
import { Invoice } from "./types/Invoice";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"; // Import PDFViewer
import PdfDocument from "./component/PdfDocument";

const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  { code: "Rs.", symbol: "Rs." },
];

const App: React.FC = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    items: [{ description: "", price: 0, quantity: 1 }],
    vatRate: 0,
    discount: 0,
  });

  const [currency, setCurrency] = useState("USD"); // Default currency
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 p-10">
      {/* Invoice Form Section */}
      <div className="w-1/2 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Invoice Form</h2>
        <InvoiceForm invoice={invoice} setInvoice={setInvoice} />

        {/* Currency Selector */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Select Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 ml-2"
          >
            {CURRENCY_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.code} ({option.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Invoice Preview Section */}
      <div className="w-1/2 ml-6">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
          <InvoicePreview invoice={invoice} currency={currency} />
        </div>

        {/* PDF Buttons */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Preview PDF
          </button>
          <PDFDownloadLink document={<PdfDocument invoice={invoice} currency={currency} />} fileName="invoice.pdf">
            {({ loading }) => (
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
                {loading ? "Loading..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      {/* Modal for PDF Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Invoice PDF Preview</h2>
            <div className="h-[500px] overflow-hidden">
              <PDFViewer style={{ width: "100%", height: "100%" }}>
                <PdfDocument invoice={invoice} currency={currency} />
              </PDFViewer>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;