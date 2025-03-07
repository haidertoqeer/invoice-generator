import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Invoice } from '../types/Invoice';

// Register fonts for bold styling
Font.register({
  family: 'Helvetica-Bold',
  src: 'https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf'
});

interface PdfDocumentProps {
  invoice: Invoice;
}

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: 'Helvetica' },
  section: { margin: 10, padding: 10 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontFamily: 'Helvetica-Bold' },
  table: { display: 'table', width: '100%', border: '1px solid #000' },
  tableRow: { flexDirection: 'row' },
  tableColHeader: {
    width: '25%',
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
    padding: 4,
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center'
  },
  tableCol: { width: '25%',fontSize: 12,  border: '1px solid #000', padding: 4, textAlign: 'center' },
  date: { fontSize: 12, textAlign: 'right', marginBottom: 10 },
  // Wrapper for aligning totals to the right
  totalsTable: { display: 'table', width: '50%', marginLeft: 'auto', marginTop: 10, border: '1px solid #000' },
  totalsRow: { flexDirection: 'row' },
  totalsCol: { fontSize: 12, width: '50%', border: '1px solid #000', padding: 2, textAlign: 'right' },
  totalsColHeader: { fontSize: 13, width: '50%', border: '1px solid #000', padding: 2, fontFamily: 'Helvetica-Bold', textAlign: 'right' },

  totalTextFinal: { fontSize: 14, fontFamily: 'Helvetica-Bold' }
});

const PdfDocument: React.FC<PdfDocumentProps> = ({ invoice }) => {
  const calculateSubtotal = () => invoice.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculateVAT = () => calculateSubtotal() * (invoice.vatRate / 100);
  const calculateTotal = () => calculateSubtotal() + calculateVAT() - invoice.discount;
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  const currentDate = formatDate(new Date());



  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
        <Text style={styles.date}>Date: {currentDate}</Text>
          <Text style={styles.title}>Invoice</Text>

          {/* Table */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Description</Text>
              <Text style={styles.tableColHeader}>Price</Text>
              <Text style={styles.tableColHeader}>Quantity</Text>
              <Text style={styles.tableColHeader}>Total</Text>
            </View>
            {invoice.items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{item.description}</Text>
                <Text style={styles.tableCol}>${item.price.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Totals Table */}
          <View style={styles.totalsTable}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsCol}>Subtotal:</Text>
              <Text style={styles.totalsCol}>${calculateSubtotal().toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsCol}>VAT ({invoice.vatRate}%):</Text>
              <Text style={styles.totalsCol}>${calculateVAT().toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsCol}>Discount:</Text>
              <Text style={styles.totalsCol}>-${invoice.discount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={[styles.totalsColHeader]}>Total:</Text>
              <Text style={[styles.totalsColHeader]}>${calculateTotal().toFixed(2)}</Text>
            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;