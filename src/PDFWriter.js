var pdf = require("html-pdf");

class PDFWriter {
    static writePdf(fileName, html) {
        pdf.create(html, {}).toFile(fileName, (err) => {});
    }
}

module.exports = PDFWriter;