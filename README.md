# ShakeBack - From Layoff to Offer

An AI-powered career assistant that helps professionals recover from layoffs, plan their career strategy, and improve their job applications.

## Features

- **Resume Analysis**: AI-powered resume analysis with skill summary, career overview, and improvement suggestions
- **Career Strategy Generator**: 30-day job search plans based on user skills and goals
- **Job Match Analyzer**: Job match scoring, missing keywords identification, and tailored cover letters
- **AI Interview Coach**: Interview question generation and preparation
- **Job Application Tracker**: Track applications, interviews, and follow-ups

## Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **AI**: DigitalOcean Gradient AI
- **Frontend**: React/Next.js (planned)

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your DigitalOcean Gradient AI credentials
   - Set up your PostgreSQL database URL

5. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints

- `POST /resume/analyze` - Analyze resume
- `POST /career/plan` - Generate career plan
- `POST /job/match` - Analyze job match
- `POST /interview/questions` - Generate interview questions
- `GET/POST /applications` - Application tracking

## Development

This is currently the backend API. The frontend React/Next.js application is planned for future development.

## Demo Scenario

Meet Alex, a product analyst who was recently laid off:

1. **Resume Upload**: Alex uploads their resume and gets AI analysis
2. **Career Strategy**: AI generates a 30-day job search plan
3. **Job Match**: Paste job descriptions for match analysis and cover letters
4. **Interview Coach**: Practice with AI-generated interview questions
5. **Application Tracker**: Track all applications and progress