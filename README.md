# Task Manager

A simple fullstack application for managing tasks organized by categories.  
The backend is built with ASP.NET Core and the frontend with Angular.

## Project Structure

```
/TaskManager       → Backend (ASP.NET Core)
/frontend          → Frontend (Angular)
```

## Getting Started

### Prerequisites

Make sure you have the following tools installed:

- .NET 9 SDK
- Node.js and npm
- Angular CLI (`npm install -g @angular/cli`)

## Backend Setup (`/TaskManager`)

1. Restore dependencies:

   ```bash
   dotnet restore
   ```

2. Apply the latest database migration:

   ```bash
   dotnet ef database update
   ```

   If you don't have the EF Core CLI installed:

   ```bash
   dotnet tool install --global dotnet-ef
   ```

3. Run the application:

   ```bash
   dotnet run
   ```

   The API will be available at `https://localhost:5209`.

## Frontend Setup (`/frontend`)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   ng serve
   ```

3. Open your browser at `http://localhost:4200`.

Make sure the backend is running so the frontend can communicate with the API.

## Features

- Full CRUD operations for categories and tasks.
- Add, edit, and delete categories.
- Add, edit, and delete tasks within categories.
- Clean and responsive user interface with modal forms.
- RESTful API backend for seamless data management.

## Technologies Used

Backend:

- ASP.NET Core 9
- Entity Framework Core with SQLite
- RESTful API

Frontend:

- Angular
- Bootstrap
- RxJS
