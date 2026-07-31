<div align="center">

<img src="https://img.shields.io/badge/-%F0%9F%8E%93%20EXAMPRO-%236366F1?style=for-the-badge&labelColor=0F172A&color=6366F1" alt="ExamPro" height="40"/>

# ExamPro — Online Examination & Test Management System

**A comprehensive full-stack web application for conducting online exams and managing test assessments. Enables administrators to create and manage exam questions while students take interactive quizzes with real-time feedback and auto-grading.**

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.0-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-JavaScript-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=java&logoColor=white)](https://www.oracle.com/java/)

---

*Empowering educational assessment through technology.* 📚

</div>

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Core Objectives](#-core-objectives)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Design](#-database-design)
- [Security Architecture](#-security-architecture)
- [User Roles & Capabilities](#-user-roles--capabilities)
- [Exam Management System](#-exam-management-system)
- [Author](#-author)

---

## 📚 Project Overview

**ExamPro** is a full-stack online examination system built with **Spring Boot (Java)** backend and **React.js** frontend, designed to revolutionize the way educational institutions conduct and manage assessments. The platform serves dual purposes: empowering administrators to create comprehensive question banks and enabling students to take interactive quizzes with instant feedback and performance analytics.

### Core Problem ExamPro Solves:

Traditional paper-based exinations and manual assessment processes face critical challenges:
- **Manual grading** is time-consuming and prone to human error
- **No real-time feedback** for students to learn from mistakes
- **Limited accessibility** restricting test-taking to physical locations
- **Difficulty tracking** student performance across multiple assessments
- **Lack of question bank management** for educators

ExamPro addresses these with:

✅ **Automated grading** with instant result calculation and feedback  
✅ **Real-time performance tracking** across multiple exam attempts  
✅ **Flexible question bank management** for educators  
✅ **Progress caching** allowing students to resume incomplete exams  
✅ **Comprehensive analytics** for performance insights  
✅ **Secure authentication** with role-based access control  

---

## 🎯 Core Objectives

The project is built to achieve:

1. **Streamline Exam Administration** — Enable educators to efficiently create, manage, and update question banks
2. **Provide Interactive Testing** — Deliver engaging quiz experiences with real-time feedback and timers
3. **Implement Auto-Grading** — Automatically evaluate answers and calculate scores without manual intervention
4. **Enable Progress Tracking** — Track student performance across multiple subjects and attempts
5. **Ensure Data Security** — Protect exam integrity and student data with robust authentication
6. **Support Multiple Subjects** — Manage quizzes across 8 academic subjects with organized question banks
7. **Deliver Analytics** — Provide administrators and students with performance insights and statistics

---

## ✨ Key Features

### 🎓 Student Features

**Quiz Taking Experience:**
- Interactive quiz interface with clean, intuitive design
- Real-time countdown timer showing remaining test duration
- Answer palette displaying all questions for quick navigation
- Single-question view with clear options (A, B, C, D)
- Progress indicator showing current question position
- Ability to mark questions for later review
- Auto-save functionality storing progress in browser storage

**Result & Feedback:**
- Instant score calculation upon exam submission
- Detailed performance breakdown showing correct/incorrect answers
- Percentage-based score display with visual indicators
- Confetti animation celebrating test completion
- Answer review panel showing student's answer vs correct answer
- Color-coded feedback (green for correct, red for incorrect)
- Performance statistics including best score and average performance
- Subject-wise performance insights

**Progress Management:**
- Automatic progress caching in browser localStorage
- Resume functionality restoring exam state on page refresh
- Timer restoration showing accurate remaining time
- Answer recovery maintaining selected choices after navigation

---

### 👨‍💼 Admin Features

**Question Management:**
- Create new exam questions across multiple academic subjects
- Edit existing questions and update correct answers
- Delete questions from question bank
- View all questions with correct answers visible
- Advanced filtering by subject and difficulty level
- Search functionality for quick question lookup
- Question organization by difficulty (Easy, Medium, Hard)

**Question Bank Organization:**
- 8 academic subjects: Mathematics, Science, History, Computer Science, Biology, Chemistry, English, Physics
- 40 default questions automatically seeded on system initialization
- Structured categorization for easy navigation
- Bulk question management capabilities

**Analytics & Insights:**
- Admin dashboard showing comprehensive statistics
- Total question count across all subjects
- Student enrollment and participation metrics
- Average score calculations across all students
- Performance trend analysis
- Subject-wise question distribution
- Student attempt tracking and history

**System Oversight:**
- View all student results and performance data
- Track exam attempt history and completion rates
- Monitor question bank health and coverage
- Generate performance reports

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React.js** | Component-based UI framework for interactive user interfaces |
| **Vanilla CSS** | Custom styling with premium Indigo theme design system |
| **Framer Motion** | Smooth page transitions and tab-switching animations |
| **Lucide React** | Modern, clean icon library for UI elements |
| **React Context API** | Global state management for authentication and user sessions |
| **localStorage** | Browser-based exam progress caching and session persistence |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Spring Boot 3.2.0** | Full-stack Java framework for REST API development |
| **Spring Security** | Authentication and authorization with role-based access control |
| **JWT (JSON Web Tokens)** | Stateless token-based authentication for secure sessions |
| **Java 17** | Modern Java version with latest language features |
| **Maven** | Dependency management and project build automation |

### Database
| Technology | Purpose |
|-----------|---------|
| **MySQL** | Relational database management system for data persistence |
| **Spring Data JPA** | Object-Relational Mapping simplifying database queries |
| **Hibernate** | Maps Java entity objects to database tables automatically |

---

## 🏗️ System Architecture

### Application Layers

The system follows a clean, layered architecture for separation of concerns:

**Frontend Layer (React):**
- React components rendering UI
- React Router handling client-side navigation
- Context API managing global authentication state
- localStorage caching exam progress

**API Gateway (Spring Security):**
- JWT token validation on every request
- Role-based authorization (STUDENT vs ADMIN)
- Request filtering and security checks

**Business Logic Layer (Spring Boot Services):**
- Authentication service for login/registration
- Question service for filtering and retrieval
- Result service for grading and analytics
- Data validation and transformation

**Data Persistence Layer (JPA/Hibernate):**
- Repository interfaces defining database queries
- Entity mapping to MySQL tables
- Relationship management between entities

### Request Flow Architecture

```
Student Browser
        ↓
Sends HTTP API Request with JWT Token
        ↓
AuthTokenFilter validates JWT token
        ↓
SpringSecurityContext confirms user role
        ↓
REST Controller routes to appropriate endpoint
        ↓
Service layer executes business logic
        ↓
JPA Repository performs database operations
        ↓
MySQL Database executes query
        ↓
Response sent back to React frontend
        ↓
Components re-render with new data
```

---

## 🗄️ Database Design

### Core Entities & Relationships

**User Entity:**
- `id` — Primary key, auto-incrementing
- `name` — Full name of user
- `email` — Unique email address for login
- `password` — BCrypt hashed password
- `role` — Enum: STUDENT or ADMIN
- Stores both student and administrator accounts
- Password hashing ensures no plaintext storage

**Question Entity:**
- `id` — Primary key, auto-incrementing
- `questionText` — The actual question content
- `optionA, optionB, optionC, optionD` — Four answer choices
- `correctAnswer` — Stores which option is correct (A/B/C/D)
- `subject` — Category (Math, Science, History, CS, Biology, Chemistry, English, Physics)
- `difficultyLevel` — Enum: EASY, MEDIUM, HARD
- Supports 40 default questions across 8 subjects
- Automatically seeded on database initialization

**Result Entity:**
- `id` — Primary key, auto-incrementing
- `student` — Foreign key linking to User (student who took exam)
- `subject` — Subject of the exam taken
- `totalQuestions` — Total questions in the exam
- `correctAnswers` — Count of correctly answered questions
- `wrongAnswers` — Count of incorrectly answered questions
- `score` — Numeric score obtained
- `percentage` — Score as percentage
- `completionTime` — Time taken to complete exam
- `attemptDate` — When the exam was attempted
- Tracks complete exam history for each student

### Entity Relationships

```
User (1) ──< (Many) Result
  ├─ Student takes multiple exams
  └─ Each result linked to one student

Question (1) ──< (Many) Result
  ├─ Question appears in multiple exams
  └─ Each result references questions answered

User (Admin) creates Question
  └─ Administrators manage question bank
```

---

## 🔐 Security Architecture

### Authentication System

**JWT Token-Based Authentication:**
- Stateless token generation on successful login
- Each token contains user ID, email, and role information
- Tokens expire after configured duration
- Client-side storage of tokens in secure context
- Token validation on every API request

**Password Security:**
- All passwords hashed using BCrypt algorithm
- Salt-based hashing prevents rainbow table attacks
- Plaintext passwords never stored in database
- Password validation during login through hashing comparison

**Admin Secret Key Validation:**
- Administrators must provide security key during registration
- Key verified server-side before admin account creation
- Prevents unauthorized administrator account creation

### Authorization System

**Role-Based Access Control (RBAC):**
- Two roles: STUDENT and ADMIN
- Each role has specific endpoint access

**STUDENT Role Permissions:**
- View quiz questions (without correct answers)
- Submit exam answers
- View own results and scores
- Access personal performance statistics
- Cannot access admin features

**ADMIN Role Permissions:**
- Create, read, update, delete questions
- View questions with correct answers visible
- Access admin dashboard with all statistics
- View all student results
- Cannot submit exams as student

### API Security

**Endpoint Protection:**
- `/api/auth/**` — Public endpoints for registration and login
- `/api/student/**` — Protected with STUDENT role requirement
- `/api/admin/**` — Protected with ADMIN role requirement
- `/api/questions/**` — Role-specific filtering of response data

**Token Validation Flow:**
```
Request arrives → AuthTokenFilter intercepts
        ↓
Extract JWT from Authorization header
        ↓
JwtUtils validates signature and expiration
        ↓
SecurityContext stores authenticated user
        ↓
Controller checks user role against endpoint requirements
        ↓
If authorized: Process request
   If unauthorized: Return 403 Forbidden
```

---

## 👨‍💼 User Roles & Capabilities

### 🟢 Student Role

**Exam Taking Capabilities:**
- Browse available quizzes across 8 academic subjects
- Take timed exams with countdown timer
- Select answers from multiple choice options (A, B, C, D)
- Mark questions for later review
- Review all questions in answer palette
- Submit completed exam for auto-grading
- View instant results with score breakdown
- Review correct answers after exam completion
- See performance metrics and statistics

**Progress Features:**
- Automatic progress saving to browser storage
- Resume incomplete exams on page refresh
- Timer restoration showing accurate remaining time
- Answer recovery maintaining selections

**Performance Tracking:**
- View personal exam history and all attempts
- Track performance across different subjects
- View best scores and average performance
- Understand strengths and weaknesses by subject

**Restrictions:**
- Cannot access admin dashboard
- Cannot create or modify questions
- Cannot view other students' results
- Cannot edit published exam questions

---

### 👑 Admin Role

**Question Management:**
- Create new questions with 4 options and correct answer
- Edit existing questions and update content
- Delete questions from question bank
- View complete question database
- Filter questions by subject and difficulty
- Search for specific questions
- Organize questions across 8 academic subjects

**Subject Coverage:**
- Mathematics
- Science
- History
- Computer Science
- Biology
- Chemistry
- English
- Physics

**Analytics & Reporting:**
- View comprehensive admin dashboard
- See total question count and distribution
- Track student enrollment metrics
- Calculate average scores across all students
- Monitor exam attempt statistics
- Generate performance reports
- Identify trending performance patterns

**System Oversight:**
- Access all student results
- Review exam submission history
- Monitor system usage and activity
- Manage question bank health
- Ensure exam question coverage

**Restrictions:**
- Cannot take exams as student
- Cannot modify student scores
- Cannot delete student results
- Access limited to administrative functions

---

## 📝 Exam Management System

### Quiz Structure

**Question Organization:**
- 40 default questions across 8 academic subjects
- Each question has 4 multiple choice options
- Clear designation of correct answer
- Difficulty classification (Easy, Medium, Hard)
- Automatic seeding on first application start

**Exam Workflow:**
1. Student selects subject/exam to take
2. Quiz page loads with real-time timer
3. Student views one question at a time
4. Answer palette shows all questions for navigation
5. Student selects answer and moves to next question
6. Progress automatically cached in browser storage
7. Student submits completed exam
8. Backend auto-grades all answers
9. Results displayed with detailed analytics
10. Student can review answers with correct solutions

### Auto-Grading Logic

**Answer Normalization:**
- System normalizes answer choices to prevent grading errors
- Accepts formats like "optionA", "A", "a" → Normalizes to "A"
- Consistent comparison against correct answer key
- Prevents marking errors due to format variations

**Score Calculation:**
- Counts total correct answers
- Counts total incorrect answers
- Calculates percentage: (Correct/Total) × 100
- Stores complete attempt metrics
- Calculates aggregate statistics

**Performance Analytics:**
- Average score across all attempts
- Best score tracking per subject
- Total attempts per student
- Subject-wise performance breakdown
- Completion time tracking

---

## 🎨 Frontend User Experience

### Visual Design Philosophy

**Indigo-Themed Premium Interface:**
- Professional, educational aesthetic
- Consistent color scheme throughout application
- Clean typography for readability
- Smooth animations enhancing user experience
- Responsive design adapting to all screen sizes

### Interactive Components

**Quiz Interface:**
- Current question display with clear formatting
- 4 multiple choice options with clear selection
- Answer palette grid showing all questions
- Real-time timer countdown
- Progress indicator showing question position
- Navigation buttons for question movement
- Submit button for exam completion

**Results Display:**
- Confetti animation on completion
- Score summary with percentage and grade
- Detailed answer review panel
- Color-coded feedback (green correct, red incorrect)
- Performance charts and visualizations
- Subject-wise performance breakdown
- Statistics summary card

**Navigation & Flow:**
- Smooth page transitions with animations
- Tab controls for role selection during registration
- Quick navigation between quiz questions
- Seamless redirect to results after submission
- Easy access to analytics and history

---

## 🎯 Key Technical Highlights

1. **Dual Authentication System** — Separate login flows for students and admins with role-specific permissions and JWT token management

2. **Automatic Progress Caching** — Browser localStorage saves exam progress including answers, timer, and current question index for seamless resume capability

3. **Answer Normalization Engine** — Standardizes answer choices (optionA, A, a → A) preventing grading errors from format variations

4. **Auto-Grading System** — Instant score calculation without manual intervention, supporting detailed analytics

5. **Role-Based Access Control** — Spring Security enforces authorization at route, controller, and service levels ensuring data isolation

6. **Database Auto-Seeding** — 40 default questions automatically populated on first application startup across 8 subjects

7. **Real-Time Performance Analytics** — Dashboard calculations of averages, trends, and subject-wise performance insights

8. **RESTful API Architecture** — Clean separation between frontend and backend enabling scalability and maintainability

---

<div align="center">

## 👨‍💻 Author

**Abhishek Das**  
Full Stack Web Developer | B.Tech CSE @ Lovely Professional University

[![Email](https://img.shields.io/badge/Email-abhishekdas2104%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abhishekdas2104@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abhishek-das-cse/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abhishekdas2104)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-6366F1?style=for-the-badge)](https://abhidasportfolio.netlify.app/)

---

*Built with ❤️ for educational innovation and digital transformation.* 📚✨

</div>
