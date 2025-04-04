import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Invoice } from '../types/Invoice';

// Register fonts for bold styling
Font.register({
  family: 'Helvetica-Bold',
  src: 'https://fonts.gstatic.com/s/helvetica/Helvetica-Bold.ttf',
});

interface PdfDocumentProps {
  invoice: Invoice;
  currency: string;
}

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: 'Helvetica' },
  section: { margin: 10, padding: 10 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontFamily: 'Helvetica-Bold' },
  table: { display: 'table', width: '100%', border: '0.5px solid #ccc' },
  tableRow: { flexDirection: 'row' },
  tableColHeader: {
    border: '0.5px solid #ccc',
    backgroundColor: '#f0f0f0',
    padding: 4,
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  tableCol: { fontSize: 12, border: '0.5px solid #ccc', padding: 4, textAlign: 'center' },
  date: { fontSize: 12, textAlign: 'right', marginBottom: 10 },
  totalsTable: { display: 'table', width: '50%', marginLeft: 'auto', marginTop: 10, border: '0.5px solid #ccc' },
  totalsRow: { flexDirection: 'row' },
  totalsCol: { fontSize: 12, width: '50%', border: '0.5px solid #ccc', padding: 2, textAlign: 'right' },
  totalsColHeader: { fontSize: 13, width: '50%', border: '0.5px solid #ccc', padding: 2, fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  totalTextFinal: { fontSize: 14, fontFamily: 'Helvetica-Bold' },
  userInfoSection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  userInfoText: {
    fontSize: 12,
    marginBottom: 2,
  },
  logo: {
    width: 100,
    marginRight: 20,
  },
  clientInfoSection: {
    marginBottom: 10,
  },
});

const PdfDocument: React.FC<PdfDocumentProps> = ({ invoice, currency }) => {
  const calculateSubtotal = () => invoice.items.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 0)), 0);
  const calculateVAT = () => calculateSubtotal() * ((invoice.vatRate || 0) / 100);
  const calculateTotal = () => calculateSubtotal() + calculateVAT() - (invoice.discount || 0);  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  const getCurrencySymbol = (currencyCode: string) => {
    const currencySymbols: { [key: string]: string } = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      'Rs.': 'Rs.',
    };
    return currencySymbols[currencyCode] || '$'; // Default to $ if not found
  };
  const currencySymbol = getCurrencySymbol(currency);
  const currentDate = formatDate(new Date());

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View>
          {invoice.user?.logo ? <Image style={styles.logo} src={invoice.user.logo} /> : null}
          </View>
          <View style={styles.userInfoSection}>
            <View>
            <Text style={styles.userInfoText}>Name: {invoice.user?.name || "N/A"}</Text>
<Text style={styles.userInfoText}>Address: {invoice.user?.companyAddress || "N/A"}</Text>
<Text style={styles.userInfoText}>Phone: {invoice.user?.phoneNumber || "N/A"}</Text>

            </View>
            <View style={styles.clientInfoSection}>
            <Text style={styles.userInfoText}>Client Name: {invoice.client?.clientName || "N/A"}</Text>
<Text style={styles.userInfoText}>Company: {invoice.client?.clientCompanyName || "N/A"}</Text>
<Text style={styles.userInfoText}>Phone: {invoice.client?.clientPhoneNumber || "N/A"}</Text>

            </View>
          </View>

          <Text style={styles.date}>Date: {currentDate}</Text>
          <Text style={styles.title}>Invoice</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={{ ...styles.tableColHeader, width: '10%' }}>S.No</Text>
              <Text style={{ ...styles.tableColHeader, width: '30%' }}>Description</Text>
              <Text style={{ ...styles.tableColHeader, width: '20%' }}>Price</Text>
              <Text style={{ ...styles.tableColHeader, width: '20%' }}>Quantity</Text>
              <Text style={{ ...styles.tableColHeader, width: '20%' }}>Total</Text>
            </View>
            {invoice.items.length > 0 ? (
  invoice.items.map((item, index) => (
    <View style={styles.tableRow} key={index}>
      <Text style={{ ...styles.tableCol, width: '10%' }}>{index + 1}</Text>
      <Text style={{ ...styles.tableCol, width: '30%' }}>{item.description?.trim() || "N/A"}</Text>
      <Text style={{ ...styles.tableCol, width: '20%' }}>
        {currencySymbol}{(item.price || 0).toFixed(2)}
      </Text>
      <Text style={{ ...styles.tableCol, width: '20%' }}>{item.quantity || 0}</Text>
      <Text style={{ ...styles.tableCol, width: '20%' }}>
        {currencySymbol}{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
      </Text>
    </View>
  ))
) : (
  <View style={styles.tableRow}>
    <Text style={{ ...styles.tableCol, width: '100%' }}>No items available</Text>
  </View>
)}

          </View>

          <View style={styles.totalsTable}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsCol}>Subtotal:</Text>
              <Text style={styles.totalsCol}>{currencySymbol}{(calculateSubtotal() || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsCol}>VAT ({invoice.vatRate}%):</Text>
              <Text style={styles.totalsCol}>{currencySymbol}{(calculateVAT() || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsCol}>Discount:</Text>
              <Text style={styles.totalsCol}>-{currencySymbol}{(invoice.discount || 0).toFixed(2)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={[styles.totalsColHeader]}>Total:</Text>
              <Text style={styles.totalsColHeader}>{currencySymbol}{(calculateTotal() || 0).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;