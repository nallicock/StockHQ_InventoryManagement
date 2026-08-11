# StockHQ

StockHQ is a full-stack inventory management application built with ASP.NET Core and React. It provides a centralized interface for managing products, categories, and inventory while using role-based authorization to control administrative functionality.

The project was built to demonstrate full-stack development with C#, .NET, React, TypeScript, Entity Framework Core, SQL Server, REST APIs, authentication, and relational database design.

## Features

### Product Management

- View all products
- Create new products
- Update existing products
- Delete products
- Assign products to categories
- Track current stock quantities

### Inventory Management

- Receive product stock
- Sell/remove product stock
- Automatically update inventory quantities
- Prevent invalid inventory operations

### Category Management

- View product categories
- Create categories
- Update categories
- Delete categories
- Associate products with categories

### Authentication & Authorization

- User authentication with JWT
- ASP.NET Core Identity
- Role-based authorization
- Admin and Employee roles
- Protected API endpoints
- Protected frontend routes

### Responsive Frontend

- Responsive inventory table
- Product creation/edit modal
- Mobile navigation with hamburger menu
- Role-based UI controls
- Responsive layout for desktop and mobile devices

## Tech Stack

### Backend

- C#
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Core Identity
- JWT Authentication
- LINQ
- Dependency Injection

### Frontend

- React
- TypeScript
- React Router
- HTML
- CSS

### Database

- Microsoft SQL Server
- Entity Framework Core Migrations

### Development Tools

- GitHub
- Visual Studio
- Visual Studio Code

## Architecture

StockHQ follows a layered backend architecture:

```
React Frontend
↓
ASP.NET Core Controller
↓
Service
↓
Repository
↓
Entity Framework Core
↓
SQL Server
```

This separates API handling, business logic, data access, and database operations.

## Database Design

StockHQ uses a relational SQL Server database with Entity Framework Core.

Key relationships include:

- A Category can contain multiple Products.
- A Product belongs to a Category.
- Products can have Inventory Transactions associated with them.
- ASP.NET Core Identity manages application users and roles.

## Authorization

StockHQ supports two application roles:

### Admin

Admins can:

- Create products
- Edit products
- Delete products
- Manage categories
- Receive inventory
- Sell inventory

### Employee

Employees can:

- View products
- View categories
- Receive inventory
- Sell inventory

Administrative API endpoints are protected using ASP.NET Core role-based authorization.

## API

The React frontend communicates with the ASP.NET Core backend through a REST API.

Example product endpoints:

```
GET     /api/products
GET     /api/products/{id}
POST    /api/products
PUT     /api/products/{id}
DELETE  /api/products/{id}

POST    /api/products/{id}/receive
POST    /api/products/{id}/sell
```

Category and authentication endpoints are also exposed through the API.

Swagger/OpenAPI is available during development for testing and documenting API endpoints.

## Authentication Flow

```
User Login
↓
ASP.NET Core validates credentials
↓
JWT generated
↓
React stores JWT
↓
JWT sent with protected API requests
↓
ASP.NET Core authenticates user
↓
Role authorization checked
```

The frontend also reads the user's role from the JWT to determine which controls should be displayed.

Backend authorization remains responsible for enforcing access to protected operations.

## Planned Improvements

The following features are planned as the project continues:

- Product search
- Category filtering
- Product sorting
- Pagination
- Additional LINQ queries
- Improved exception handling
- Structured application logging
- Additional UI/UX improvements
- Production deployment

## Screenshots

### Login
<img width="1380" height="832" alt="StockHQ_React_EF_NET_login" src="https://github.com/user-attachments/assets/35cc5e10-5496-4167-8a9c-e8f84b1d8bf5" />

### Product Management
<img width="1852" height="906" alt="StockHQ_React_EF_NET" src="https://github.com/user-attachments/assets/3f0bf94c-b46e-4b4f-a35f-592bebfdd159" />

### Create / Edit Product
<img width="1870" height="895" alt="StockHQ_React_EF_NET_2" src="https://github.com/user-attachments/assets/cab04b3e-2ff6-490e-bf8f-056a8706f3e7" />

## What I Learned

Building StockHQ provided practical experience with:

- Designing REST APIs with ASP.NET Core
- Building layered applications using controllers, services, and repositories
- Working with Entity Framework Core and SQL Server
- Designing relational database relationships
- Implementing JWT authentication
- Implementing role-based authorization
- Connecting a React frontend to a .NET backend
- Managing application state with React
- Building responsive interfaces with CSS
- Handling authenticated API requests from TypeScript

## License

This project was created as a portfolio and learning project.
