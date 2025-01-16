import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Image from '../../public/auca.png'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateReport =(head: string,colums:any[],rows: any[],printedBy:string) => {
    
    const doc = new jsPDF();
    doc.addImage(Image,'.png',15,20,20,20)
    doc.setFontSize(12)
    doc.text(head, 15, 50);
    doc.text('Done at :: '+new Date().getDay()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear(), 15, 55);
    doc.text('Printed by ::'+printedBy, 15, 60);
    // Table column titles
    // const columns = ['Semester Name', 'Start Date', 'End Date'];

    // Table row data
    // const rows = [
    //   ['Semester 1', '2024-01-01', '2024-05-31'],
    //   ['Semester 2', '2024-06-01', '2024-12-31'],
    //   ['Semester 3', '2025-01-01', '2025-05-31'],
    // ];

    // Generate the table
    doc.autoTable({
      head: [colums],
      body: rows,
      startY: 65,
    });
    doc.save(head+'.pdf');
  };

