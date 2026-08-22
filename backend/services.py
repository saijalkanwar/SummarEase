import io
import re
from pypdf import PdfReader
from PIL import Image
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def _clean_text(text: str) -> str:
    """
    Collapses runs of whitespace (spaces, tabs, single newlines) into a single
    space, but preserves paragraph breaks (double newlines) as-is.
    """
    # Temporarily protect intentional paragraph breaks
    text = text.replace("\n\n", "<<PARA>>")
    # Collapse all remaining whitespace runs (including single newlines) into one space
    text = re.sub(r"\s+", " ", text)
    # Restore paragraph breaks
    text = text.replace("<<PARA>>", "\n\n")
    return text.strip()

def extract_pdf_text(file_bytes: bytes) -> str:
    """
    Extracts all readable text from a PDF's bytes.
    Raises ValueError if the PDF can't be read or has no extractable text.
    """
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
    except Exception as exc:
        raise ValueError("Could not read this PDF. It may be corrupted.") from exc

    pages_text = []
    for page in reader.pages:
        text = page.extract_text() or ""
        if text.strip():
            pages_text.append(_clean_text(text))

    full_text = "\n\n".join(pages_text).strip()

    if not full_text:
        raise ValueError(
            "No selectable text found in this PDF. It may be a scanned document "
            "with no text layer — try uploading it as an image instead."
        )

    return full_text

def extract_image_text(file_bytes: bytes) -> str:
    """
    Runs OCR on an image's bytes and returns the recognized text.
    Raises ValueError if the image can't be read or no text is found.
    """
    try:
        image = Image.open(io.BytesIO(file_bytes))
    except Exception as exc:
        raise ValueError("Could not read this image file.") from exc

    text = pytesseract.image_to_string(image).strip()

    if not text:
        raise ValueError(
            "No readable text was found in this image. Try a clearer or "
            "higher-resolution scan."
        )

    return _clean_text(text)