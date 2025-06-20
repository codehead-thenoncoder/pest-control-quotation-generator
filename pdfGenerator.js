// This uses jsPDF library to generate the PDF
const { jsPDF } = window.jspdf;

function generatePDF(formData) {
    const doc = new jsPDF();
    
    // Add company header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('QUOTATION', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Office: Off No. 29, 1st Floor, 6th Cross, MC Industrial Layout, JP Nagar 7th Phase,', 105, 30, { align: 'center' });
    doc.text('Chunchghatta Main Road, Bangalore 560078', 105, 35, { align: 'center' });
    doc.text('Contact: +91 9941229005 | +91 9845640219', 105, 40, { align: 'center' });
    doc.text('Mail: acuitypestcontrol@gmail.com', 105, 45, { align: 'center' });
    doc.text('Web: www.acuitypestcontrols.com / www.acuitypestcontrol.com', 105, 50, { align: 'center' });
    
    // Add quote info table
    doc.autoTable({
        startY: 60,
        head: [['Quote ID', 'Date', 'GSTIN No.', 'SAC Code']],
        body: [
            [generateQuoteId(), getCurrentDate(), '29BJCPM9047D1Z2', '998531']
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [52, 152, 219],
            textColor: [255, 255, 255]
        },
        margin: { top: 10 }
    });
    
    // Add client info
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`Company Name: ${formData.companyInfo.name}`, 14, 90);
    doc.text(`Service Address: ${formData.companyInfo.address}`, 14, 95);
    doc.text(`Mob No.: ${formData.companyInfo.mobile}`, 14, 100);
    doc.text(`GSTIN No.: ${formData.companyInfo.gstin || 'N/A'}`, 14, 105);
    doc.text(`Email: ${formData.companyInfo.email}`, 14, 110);
    
    // Add services table
    doc.autoTable({
        startY: 120,
        head: [['Sr.', 'Particulars', 'Area', 'Frequency', 'Monthly Billed']],
        body: formData.services.map((service, index) => [
            index + 1,
            service.type,
            service.area,
            service.frequency,
            '₹' + service.amount
        ]),
        foot: [
            ['', '', '', 'Total', '₹' + formData.total]
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [52, 152, 219],
            textColor: [255, 255, 255]
        },
        footStyles: {
            fillColor: [231, 76, 60],
            textColor: [255, 255, 255]
        },
        margin: { top: 10 }
    });
    
    // Add remarks
    doc.setFontSize(10);
    doc.text(`Remark: ${formData.remarks}`, 14, doc.lastAutoTable.finalY + 15);
    
    // Add notes
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text('Note:', 14, doc.lastAutoTable.finalY + 30);
    doc.text('1. Payment Can Be Made By Cash, Cheque, NEFT & IMPS', 20, doc.lastAutoTable.finalY + 35);
    doc.text('2. Payment should be made after completed the work', 20, doc.lastAutoTable.finalY + 40);
    doc.text(`3. This Quotation Will Be Valid For Only ${formData.validity} Days`, 20, doc.lastAutoTable.finalY + 45);
    doc.text('4. Our Bank Details for Making Payment:', 20, doc.lastAutoTable.finalY + 50);
    doc.text('➢ Bank Name: ICICI Bank', 25, doc.lastAutoTable.finalY + 55);
    doc.text('➢ Branch: J.P. Nagar', 25, doc.lastAutoTable.finalY + 60);
    doc.text('➢ Account No.: 040105003200', 25, doc.lastAutoTable.finalY + 65);
    doc.text('➢ IFSC Code: ICIC0000401', 25, doc.lastAutoTable.finalY + 70);
    
    // Save the PDF or display it
    const pdfOutput = doc.output('datauristring');
    document.getElementById('pdfPreview').innerHTML = `<iframe src="${pdfOutput}" style="width:100%; height:100%; border:none;"></iframe>`;
    
    // Set up download button
    document.getElementById('downloadPdf').onclick = function() {
        doc.save(`Quotation_${formData.companyInfo.name.replace(/\s+/g, '_')}_${getCurrentDate().replace(/\//g, '-')}.pdf`);
    };
}

// Helper functions
function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

function generateQuoteId() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${Math.floor(Math.random() * 1000)}`;
}