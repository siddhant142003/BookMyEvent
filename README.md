# BookMyEvent – Event Ticketing & Management Platform

## Project Overview

BookMyEvent is a full-stack, role-based event ticketing and management platform designed to manage the complete lifecycle of events—from creation and ticket sales to secure on-site attendee validation. The application is built with a strong focus on scalability, security, and real-world reliability, incorporating concurrency-safe ticket booking and QR code–based verification.

The system supports three primary user roles: Organizer, Attendee, and Staff. Authentication is handled securely using Google OAuth, and each booked ticket is issued with a unique QR code that can be validated at the venue. To simplify setup and ensure consistency across environments, the entire application is fully Dockerized.

---

## System Capabilities

The platform allows organizers to create and manage events, control ticket availability, and monitor bookings through a dedicated dashboard. Attendees can browse available events, book tickets, and access their QR-coded tickets digitally. Staff members are provided with a scanning interface that validates QR codes at entry points and prevents duplicate or invalid ticket usage.

To handle high-demand booking scenarios, the backend implements concurrency control mechanisms that prevent race conditions. Ticket availability is verified and updated atomically at the database level, ensuring that overbooking does not occur even when multiple users attempt to book simultaneously.

---

## Technology Stack

The frontend is developed using React with TypeScript, styled with Tailwind CSS, and enhanced using Framer Motion for smooth user interactions. REST API communication is handled using Axios, and Google OAuth is integrated for authentication.

The backend is built using Java and Spring Boot, following RESTful architecture principles. Spring Data JPA manages database interactions, and PostgreSQL is used as the relational database. Google ID tokens are verified on the server side to ensure secure authentication.

Docker and Docker Compose are used to containerize and orchestrate the frontend, backend, and database services.

---

## Application Architecture

The system follows a client–server architecture where the React frontend communicates with the Spring Boot backend via REST APIs. The backend handles authentication, business logic, ticket booking, QR code generation, and validation. PostgreSQL stores persistent data such as users, events, tickets, and QR codes.

QR codes are generated once a ticket is successfully booked and are validated in real time by staff during entry, ensuring each ticket can only be used once.

---

## User Roles and Access Flow

Organizers can create events, manage ticket counts, and track event-related information. Attendees discover events, book tickets, and view their QR codes. Staff members scan and validate QR codes to allow secure access at event venues. Role-based access control ensures that each user only accesses features relevant to their role.

---

## Dockerized Deployment

BookMyEvent is fully Dockerized to simplify setup and deployment. Docker Compose is used to manage multiple containers, including the frontend, backend, and PostgreSQL database. This ensures consistent behavior across development and deployment environments and eliminates dependency conflicts.

Environment variables are used to configure database credentials, backend URLs, and Google OAuth client IDs.

---

## Running the Application

### Option 1: Run Using Docker (Recommended)

Ensure Docker and Docker Compose are installed on your system.

```bash
# Clone the repository
git clone <repository-url>
cd BookMyEvent
# Start all services (frontend, backend, database)
docker-compose up --build
Once the containers are running:

Frontend will be available at http://localhost:3000

Backend will be available at http://localhost:8080

To stop the application:

bash
Copy code
docker-compose down

Option 2: Run Without Docker (Manual Setup)
Backend (Spring Boot)
cd backend
./gradlew clean bootRun


The backend server will start on http://localhost:8080
.

Frontend (React)
cd frontend
npm install
npm run dev


The frontend will start on http://localhost:3000
.

Database (PostgreSQL)

Ensure PostgreSQL is running locally and create a database (e.g., eventdb). Update the database credentials in the backend configuration file if required.

Hosting and Service Ports
Service	Host	Port
Frontend	http://localhost
	3000
Backend	http://localhost
	8080
Database	localhost	5432
Security and Reliability

Authentication is handled using Google OAuth with server-side token verification. Ticket booking operations are concurrency-safe, ensuring accurate ticket counts under high load. QR code validation is performed server-side to prevent reuse, duplication, or forgery.

Future Enhancements

The system can be extended to include payment gateway integration, advanced analytics for organizers, email-based ticket delivery, administrative dashboards, and support for multiple ticket types and pricing tiers.

Conclusion

BookMyEvent demonstrates a production-ready event ticketing solution combining a modern frontend, a secure and scalable backend, and containerized deployment. The project effectively addresses real-world challenges such as authentication, concurrency handling, and secure access validation, making it suitable for both academic evaluation and practical use.
