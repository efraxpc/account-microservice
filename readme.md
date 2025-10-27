¡Absolutamente\! Aquí tienes el archivo **README** de tu microservicio de cuentas en inglés en formato Markdown (`.md`), listo para descargar y usar en tu repositorio de GitHub.

-----

# 🚀 Account Microservice (`account-microservice`)

This is a **stateless** and **Express.js** based microservice that manages the CRUD operations for user accounts. This service is designed to be highly **scalable** and **reproducible** using Docker.

## ✨ Key Features

  * **Full CRUD:** Allows creating, updating, reading, and deleting account records.
  * **Design Pattern:** Follows the **Model-View-Controller (MVC)** pattern and N-Layer architecture.
  * **Database:** Uses **MongoDB** for data persistence.
  * **Validation:** Uses **Joi** for strict data validation in the middleware layer.
  * **Configuration:** Secure management of environment variables with **`dotenv`**.

-----

## 🛠️ System Requirements

To run the project, you need the following installed:

1.  **Node.js** (v18 or higher)
2.  **npm** (included with Node.js)
3.  **Docker & Docker Compose** (to run the MongoDB database)
4.  **Postman** (to test the API endpoints)

-----

## ⚙️ Configuration and Local Execution

### Step 1: Clone the Repository and Install Dependencies

```bash
# Clone the repository
git clone [Your Repository URL] account-microservice
cd account-microservice

# Install Node.js packages
npm install
```

### Step 2: Configure Environment Variables

Create a **`configs`** folder in the project root and add a file named **`.env`** with the following variables.

```env
# Server configuration
PORT=3001

# Database configuration (using the Docker service name)
# NOTE: If you run MongoDB locally without Docker, change 'mongodb' to 'localhost'
MONGODB_URL=mongodb://mongodb:27017/account-microservice
```

### Step 3: Spin up the Database with Docker Compose

The project should include a `docker-compose.yml` file for MongoDB.

```bash
# Start the MongoDB container
docker compose up -d
```

### Step 4: Start the Microservice

Execute the application from the terminal.

```bash
# Start the account microservice
npm start
```

You should see the message: `account service started { port: 3001 }`

-----

## 🌐 API Endpoints (CRUD)

The service exposes its routes under the `/v1/accounts` prefix.

| Method | Endpoint | Description | Sample Body (for POST/PUT) |
| :--- | :--- | :--- | :--- |
| **POST** | `/v1/accounts` | Creates a new account. | `{ "name": "Test Account", "number": "12345", "type": "root", "status": "new" }` |
| **GET** | `/v1/accounts` | Retrieves a list of all accounts. | N/A |
| **GET** | `/v1/accounts/:id` | Retrieves details for a specific account ID. | N/A |
| **PUT** | `/v1/accounts/:id` | Updates fields for an existing account. | `{ "name": "New Name" }` |
| **DELETE**| `/v1/accounts/:id` | Deletes a specific account. | N/A |

-----

## 💻 Project Structure

```
.
├── configs/
│   └── .env            # Environment variables
├── src/
│   ├── config/         # Configuration validation logic (Joi)
│   ├── db/             # MongoDB/Mongoose connection logic
│   ├── controllers/    # HTTP request and response handling
│   ├── models/         # Mongoose schema definitions
│   ├── services/       # Account business logic (DDD Rules)
│   └── index.js        # Main entry point (server)
├── docker-compose.yml  # Docker service definition (MongoDB)
└── package.json
```

-----

## 🧑‍💻 Contributions

Contributions are welcome\! If you'd like to improve this microservice, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/new-feature`).
3.  Commit your changes (`git commit -am 'feat: add new functionality'`).
4.  Push to the branch (`git push origin feature/new-feature`).
5.  Create a new **Pull Request**.