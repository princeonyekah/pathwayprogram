# QuickTask - Docker Setup

This document explains how to run the QuickTask application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd pathwayprogram
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file if you want to change default passwords or ports.

3. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Services

### Frontend
- **Port**: 3000
- **Technology**: React + Nginx
- **Health Check**: http://localhost:3000/health

### Backend API
- **Port**: 5000
- **Technology**: Node.js + Express
- **Health Check**: http://localhost:5000/health
- **API Endpoints**:
  - GET /tasks - Get all tasks
  - POST /tasks - Create a new task
  - PUT /tasks/:id - Update a task
  - DELETE /tasks/:id - Delete a task

### MongoDB
- **Port**: 27017
- **Database**: quicktask
- **Username**: admin
- **Password**: password123

## Development Mode

For development with hot reloading:

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
```

## Commands

```bash
# Start services in the background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build

# Remove all containers and volumes
docker-compose down -v

# Scale services
docker-compose up --scale api=2

# Run commands in containers
docker-compose exec api npm run dev
docker-compose exec frontend npm start
```

## Health Checks

All services have health checks configured:

```bash
# Check service health
docker-compose ps

# Check specific service logs
docker-compose logs api
docker-compose logs frontend
docker-compose logs mongodb
```

## Troubleshooting

### Port Conflicts
If ports are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "3001:80"    # Frontend
  - "5001:5000"  # API
  - "27018:27017" # MongoDB
```

### Database Connection Issues
1. Ensure MongoDB is healthy: `docker-compose ps`
2. Check MongoDB logs: `docker-compose logs mongodb`
3. Verify connection string in API environment variables

### Frontend Cannot Connect to API
1. Check if API is running: `curl http://localhost:5000/health`
2. Verify REACT_APP_API_URL environment variable
3. Check browser console for CORS errors

### Build Issues
1. Clear Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`
3. Check Dockerfile syntax and dependencies

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB root username | admin |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB root password | password123 |
| `NODE_ENV` | Node environment | production |
| `REACT_APP_API_URL` | Frontend API URL | http://localhost:5000 |

## Data Persistence

MongoDB data is persisted in a Docker volume named `mongodb_data`. To reset the database:

```bash
docker-compose down -v
docker-compose up --build
```