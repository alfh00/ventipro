import PyPDF2

def extract_pdf_text(file_path):
    try:
        with open(file_path, "rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            text = []
            for page in reader.pages:
                text.append(page.extract_text())
            return {"status": "success", "content": text}
    except Exception as e:
        return {"status": "error", "message": str(e)}
