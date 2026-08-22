from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Document Summary Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/health")
def health_check():
    return {"status": "healthy"}


ALLOWED_TYPES = {"application/pdf", "image/png", "image/jpeg", "image/jpg"}


@app.post("/extract")
async def extract(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=422,
            detail=f"Unsupported file type: {file.content_type}. Upload a PDF, PNG, or JPG.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    # TEMPORARY: just confirm we received the file. Real extraction comes in Phase 6/7.
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size_bytes": len(file_bytes),
    }
