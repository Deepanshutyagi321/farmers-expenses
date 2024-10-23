import jsPDF, { jsPDFAPI } from 'jspdf';
import autoTable, { jsPDFConstructor } from 'jspdf-autotable';

interface Expense {
  plot : string;
  createdAt: string;
  labourCost: number;
  metrial: string; // Fixed typo from 'matrial' to 'material'
  price: number;
}

const downloadPDF = (expenses: Expense[], plotTitle: string) => {
  const doc = new jsPDF();
  let totalCost = 0;

  // Calculate total cost (labourCost + price for each expense)
  expenses.forEach((expense) => {
    totalCost += expense.labourCost + expense.price;
  });

  // Add title
  doc.text(`Farmers Expenses Report ${plotTitle}`, 20, 10);

  // Prepare table headers and rows
  const tableColumn = ['Date' , 'Material', 'Labor Cost', 'Price'];
  const tableRows: (string | number)[][] = [];

  expenses.forEach((expense) => {
    console.log(expense)
    const expenseData = [
      new Date(expense.createdAt).toLocaleString(),
      expense.metrial,  // Fixed typo
      expense.labourCost.toFixed(2), // Convert number to string with 2 decimal points
      expense.price.toFixed(2),
    ];
    tableRows.push(expenseData );
  });

  // Add table using autoTable
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20, // Starting Y position after the title
  });

  // Add total cost at the bottom of the table
  const finalY = (doc as jsPDFConstructor ).lastAutoTable.finalY || 20; // Get Y position after the table
  doc.text(`Total Cost: ${totalCost.toFixed(2)}`, 20, finalY + 10);

  // Save the PDF
  doc.save('expenses-report.pdf');
};

export default downloadPDF;
