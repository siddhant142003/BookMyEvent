# BookMyEvent – Event Ticketing & Management Platform

## Project Overview

**BookMyEvent** is a full-stack, role-based event ticketing and management platform designed to manage the complete lifecycle of events—from creation and ticket sales to secure on-site attendee validation. The application emphasizes scalability, security, and real-world reliability, featuring concurrency-safe ticket booking and QR code–based verification.

The system supports three primary user roles: **Organizer**, **Attendee**, and **Staff**. Authentication is securely handled using **Google OAuth**, and each booked ticket is issued with a unique **QR code** that can be validated at the venue. To simplify setup and ensure consistency across environments, the entire application is fully **Dockerized**.

---

## System Capabilities

* Organizers can create and manage events, control ticket availability, and monitor bookings through a dedicated dashboard.
* Attendees can browse events, book tickets, and access their QR-coded tickets digitally.
* Staff members use a scanning interface to validate QR codes at entry points, preventing duplicate or invalid ticket usage.

To handle high-demand booking scenarios, the backend implements **concurrency control mechanisms**. Ticket availability is verified and updated atomically at the database level, ensuring that overbooking does not occur even when multiple users attempt to book simultaneously.

---

## Technology Stack

### Frontend

* React with TypeScript
* Tailwind CSS for styling
* Framer Motion for animations
* Axios for REST API communication
* Google OAuth for authentication

### Backend

* Java with Spring Boot
* RESTful API architecture
* Spring Data JPA for ORM
* PostgreSQL as the relational database
* Server-side Google ID token verification

### DevOps

* Docker & Docker Compose for containerization and orchestration

---

## Application Architecture

The system follows a **client–server architecture**:

* The React frontend communicates with the Spring Boot backend via REST APIs.
* The backend handles authentication, business logic, ticket booking, QR code generation, and validation.
* PostgreSQL stores persistent data such as users, events, tickets, and QR codes.

QR codes are generated after successful ticket booking and are validated in real time by staff during entry, ensuring each ticket can only be used once.

---

## User Roles and Access Flow

* **Organizer**: Creates and manages events, sets ticket limits, and tracks bookings.
* **Attendee**: Browses events, books tickets, and views QR codes.
* **Staff**: Scans and validates QR codes at venues.

Role-based access control (RBAC) ensures that users only access features relevant to their assigned role.

---

## Dockerized Deployment

BookMyEvent is fully Dockerized to simplify setup and deployment.

* Docker Compose manages multiple containers:

  * Frontend
  * Backend
  * PostgreSQL database
* Environment variables configure database credentials, backend URLs, and Google OAuth client IDs.

This approach ensures consistent behavior across development and deployment environments while eliminating dependency conflicts.

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
```

Once the containers are running:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:8080](http://localhost:8080)

To stop the application:

```bash
docker-compose down
```

---

### Option 2: Run Without Docker (Manual Setup)

#### Backend (Spring Boot)

```bash
cd backend
./gradlew clean bootRun
```

The backend server will start at:

* [http://localhost:8080](http://localhost:8080)

#### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at:

* [http://localhost:3000](http://localhost:3000)

#### Database (PostgreSQL)

Ensure PostgreSQL is running locally and create a database (e.g., `eventdb`). Update the database credentials in the backend configuration file if required.

---

## Hosting and Service Ports

| Service  | Host                                 | Port |
| -------- | ------------------------------------ | ---- |
| Frontend | [http://localhost](http://localhost) | 3000 |
| Backend  | [http://localhost](http://localhost) | 8080 |
| Database | localhost                            | 5432 |

---

## Security and Reliability

* Google OAuth with server-side token verification
* Concurrency-safe ticket booking to handle high load
* Server-side QR code validation to prevent reuse, duplication, or forgery

---

## Conclusion

BookMyEvent demonstrates a production-ready event ticketing solution that combines a modern frontend, a secure and scalable backend, and containerized deployment. The project addresses real-world challenges such as authentication, concurrency handling, and secure access validation, making it suitable for both academic evaluation and practical use.
