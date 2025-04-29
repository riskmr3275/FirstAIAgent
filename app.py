from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_path = "./opt350m_b_finetuned"  # Adjust if needed

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path).to(device)
model.eval()

# FastAPI app
app = FastAPI(title="Krishna Leela Text Generator")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 👈 React frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class Prompt(BaseModel):
    text: str
    max_length: int = 100

@app.post("/generate/")
def generate_text(prompt: Prompt):
    try:
        inputs = tokenizer(prompt.text, return_tensors="pt", truncation=True, padding=True, max_length=256).to(device)
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=prompt.max_length + inputs["input_ids"].shape[1],
                pad_token_id=tokenizer.eos_token_id,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                temperature=1.0,
                num_return_sequences=1
            )
        generated = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return {"generated_text": generated}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# uvicorn app:app --reload