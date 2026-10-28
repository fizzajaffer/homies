// Keep PDF.js and its worker together at runtime; Next's chunk path is not a PDF worker path.
export default {serverExternalPackages:['pdfjs-dist']};
