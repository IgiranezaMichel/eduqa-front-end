import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateReport =(head: string,colums:any[],rows: any[],printedBy:string) => {
    const doc = new jsPDF();
    doc.text(head, 20, 10);
    doc.text(printedBy, 20, 20);
    console.log(colums);
console.log(rows);

    // Table column titles
    // const columns = ['Semester Name', 'Start Date', 'End Date'];

    // Table row data
    // const rows = [
    //   ['Semester 1', '2024-01-01', '2024-05-31'],
    //   ['Semester 2', '2024-06-01', '2024-12-31'],
    //   ['Semester 3', '2025-01-01', '2025-05-31'],
    // ];

    // Generate the table
    // doc.autoTable({
    //   head: [colums],
    //   body: rows,
    //   startY: 20,
    // });
    doc.save(head+'.pdf');
  };

