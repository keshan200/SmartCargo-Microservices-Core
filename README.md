# 📦 SmartCargo-Microservices-Core

**SmartCargo** is a modern, highly scalable **Microservices-based** backend system designed to revolutionize the logistics industry in Sri Lanka. By leveraging AI-driven insights and a decoupled architecture, the system streamlines the end-to-end lifecycle of cargo management—from booking to real-time tracking and automated delivery optimization.

---

## 🚀 Key Features

* **Microservices Architecture:** Deployed as 6 independent services to ensure high availability and independent scaling.
* **AI-Powered Tracking Agent:** Integrated with **Flowise** and **Groq (Llama 3)** to provide natural language updates (Sinhala/English) regarding shipment status.
* **Service Discovery:** Utilizes **Netflix Eureka** for dynamic service registration and seamless inter-service communication.
* **100% Free Interactive Mapping:** Powered by **Leaflet.js** and **OpenStreetMap** for real-time visual tracking without Google Maps API costs.
* **Automated Batching (Consignments):** Intelligent grouping of parcels based on destination hubs for optimized long-haul transport.
* **QR Code Integration:** Unique tracking identifiers generated for every shipment to facilitate easy scanning at sorting hubs.

---

## 🛠️ Technology Stack

* **Runtime:** Node.js (TypeScript)
* **Framework:** NestJS
* **Database:** MongoDB (using Mongoose ODM)
* **Infrastructure:** Netflix Eureka (Service Discovery), Spring Cloud Config Server
* **AI/LLM:** Flowise AI, Groq SDK (Llama 3)
* **Communication:** REST APIs (Axios for inter-service communication)
* **Deployment:** Docker, Render/Koyeb

---

## 🏗️ System Architecture

The system is partitioned into the following specialized microservices:

1.  **Identity Service:** Handles secure JWT-based authentication and Role-Based Access Control (RBAC).
2.  **Fleet Service:** Manages logistics infrastructure including Hubs, Vehicles, and Driver assignments.
3.  **Shipment Service:** Manages core cargo operations, bookings, and package specifications.
4.  **Logistics Service:** Orchestrates route planning and the creation of cargo batches (Consignments).
5.  **Tracking Service:** Records and serves real-time location data and comprehensive shipment history.
6.  **Notification Service:** Automates customer alerts via Email and Push notifications.

---

## 📂 Project Structure (Monorepo)

```text
SmartCargo-Microservices-Core/
├── services/
│   ├── identity-service/      # NestJS - Auth & User Management
│   ├── shipment-service/      # NestJS - Core Operations
│   ├── tracking-service/      # NestJS - Status & History
│   └── ... (Other Services)
├── infrastructure/
│   ├── eureka-server/         # Java/Spring Boot Discovery Server
│   └── api-gateway/           # Central Routing & Security
├── docker-compose.yml         # Container Orchestration
└── README.md
