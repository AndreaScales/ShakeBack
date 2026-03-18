from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from models import Application, get_db

router = APIRouter(prefix="/applications", tags=["applications"])

class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: str = "applied"
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None
    interview_date: Optional[datetime] = None
    job_description: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    status: str
    notes: Optional[str] = None
    applied_date: Optional[datetime] = None
    interview_date: Optional[datetime] = None
    job_description: Optional[str] = None

@router.options("/")
def options_applications():
    """Handle CORS preflight requests"""
    return {}

@router.options("/{app_id}")
def options_application(app_id: int):
    """Handle CORS preflight requests for specific application"""
    return {}

@router.post("/", response_model=ApplicationResponse)
def create_application(app: ApplicationCreate, db: Session = Depends(get_db)):
    db_app = Application(**app.dict())
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app

@router.get("/", response_model=list[ApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    return db.query(Application).all()

@router.get("/{app_id}", response_model=ApplicationResponse)
def get_application(app_id: int, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.put("/{app_id}", response_model=ApplicationResponse)
def update_application(app_id: int, app: ApplicationCreate, db: Session = Depends(get_db)):
    db_app = db.query(Application).filter(Application.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    for key, value in app.dict().items():
        setattr(db_app, key, value)
    db.commit()
    db.refresh(db_app)
    return db_app

@router.patch("/{app_id}", response_model=ApplicationResponse)
def patch_application(app_id: int, updates: dict, db: Session = Depends(get_db)):
    db_app = db.query(Application).filter(Application.id == app_id).first()

    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")

    for key, value in updates.items():
        setattr(db_app, key, value)

    db.commit()
    db.refresh(db_app)

    return db_app

@router.delete("/{app_id}")
def delete_application(app_id: int, db: Session = Depends(get_db)):
    db_app = db.query(Application).filter(Application.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Application not found")
    db.delete(db_app)
    db.commit()
    return {"message": "Application deleted"}