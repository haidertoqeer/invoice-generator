import React, { useState } from "react";
import InvoiceForm from "./component/InvoiceForm";
import InvoicePreview from "./component/InvoicePreview";
import { Invoice } from "./types/Invoice";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "./component/PdfDocument";
import { Link } from "react-router-dom";

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

  const [currency, setCurrency] = useState("USD");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRenderPdf = () => {
    const validatedInvoice = {
      ...invoice,
      vatRate: typeof invoice.vatRate === "number" ? invoice.vatRate : 0,
      discount: typeof invoice.discount === "number" ? invoice.discount : 0,
    };
    return <PdfDocument invoice={validatedInvoice} currency={currency} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
    <div className="flex justify-end p-4">
    <Link to="http://invoice-generator.anamtaa.com/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
    Go To Home
    </Link>
    </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Invoice Form Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Invoice Form</h2>
          <InvoiceForm invoice={invoice} setInvoice={setInvoice} />

          {/* Currency Selector */}
          <div className="mt-2">
            <label className="text-sm font-medium text-gray-700">
              Select Currency:
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 ml-2 w-full md:w-auto"
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
        <div className="w-full md:w-1/2">
          <div className="bg-white shadow-lg p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Invoice Preview</h2>
            <InvoicePreview invoice={invoice} currency={currency} />
          </div>

          {/* PDF Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Preview PDF
            </button>
            <PDFDownloadLink
              document={handleRenderPdf()}
              fileName="invoice.pdf"
            >
              {({ loading }) => (
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 w-full sm:w-auto">
                  {loading ? "Loading..." : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>

      {/* Modal for PDF Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl font-semibold mb-2">Invoice PDF Preview</h2>
            <div className="h-[300px] md:h-[500px] overflow-hidden">
              <PDFViewer style={{ width: "100%", height: "100%" }}>
                {handleRenderPdf()}
              </PDFViewer>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 w-full"
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