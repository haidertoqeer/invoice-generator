# Invoice Generator (ReactJS with TypeScript)

This project is a simple invoice generator built with ReactJS and TypeScript, utilizing the beautiful UI components from shadcn/ui. It allows users to create invoices with multiple items, apply VAT and discounts, and export the invoice as a PDF.

## Features

* **Interactive Invoice Form:**
    * Add multiple invoice items with descriptions, prices, and quantities.
    * Dynamically calculate item totals.
    * Apply VAT rates and discounts.
* **Real-time Invoice Preview:**
    * View a live preview of the invoice as you make changes.
    * Displays subtotal, VAT, discount, and total amounts.
* **PDF Export:**
    * Generate and download the invoice as a PDF document.
    * Modal view of the pdf.
* **TypeScript:**
    * Strong typing for improved code quality and maintainability.
* **Responsive Design:**
    * Layout adapts to different screen sizes.

## Technologies Used

* **ReactJS:** JavaScript library for building user interfaces.
* **TypeScript:** Typed superset of JavaScript.
* **Tailwind CSS:** Utility-first CSS framework.
* **react-pdf & @react-pdf/renderer:** PDF generation in React.
* **Vite:** Fast build tool and development server.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd invoice-generator
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**

    * Navigate to `http://localhost:5173` (or the port specified by Vite).

## Configuration

* **Tailwind CSS:**
    * The Tailwind CSS configuration is located in `tailwind.config.js`. You can customize the theme and utilities to match your design.
* **tsconfig.json:**
    * The tsconfig.json file contains the baseurl and paths for the '@' alias.

## Usage

1.  **Fill out the invoice form:**
    * Add items, set prices, quantities, VAT rate, and discount.
2.  **View the real-time preview:**
    * The preview will update as you make changes.
3.  **Generate PDF:**
    * Click the "View PDF" button to open the invoice in a modal.
    * Click the "Download PDF" button to download the invoice.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

https://www.upwork.com/freelancers/~01bbd0b4facc5ae5ba

## License

This project is licensed under the [MIT License](LICENSE).
