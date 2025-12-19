# Law Firm Website

This is a [Next.js](https://nextjs.org) project for a law firm website with PostgreSQL database.

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Docker and Docker Compose

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd lawFirm4
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://postgres:12345678@localhost:5430/lawfirm?schema=public"
```

**Note:** The database URL matches the Docker Compose configuration:

- Host: `localhost`
- Port: `5430` (mapped from container port 5432)
- User: `postgres`
- Password: `12345678`
- Database: `lawfirm`

### 4. Start the PostgreSQL database with Docker Compose

```bash
docker-compose up -d
```

This command will:

- Pull the PostgreSQL 16 image (if not already present)
- Create and start the `lawfirm_postgres` container
- Create a persistent volume for database data
- Expose PostgreSQL on port `5430`

**Verify the database is running:**

```bash
docker-compose ps
```

**View database logs:**

```bash
docker-compose logs postgres
```

**Stop the database:**

```bash
docker-compose down
```

**Stop and remove volumes (⚠️ This will delete all data):**

```bash
docker-compose down -v
```

### 5. Set up the database schema with Prisma

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

Or push the schema directly (for development):

```bash
npm run prisma:push
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3040](http://localhost:3040)

## Server Deployment Setup

### 1. Connect to your server

```bash
ssh user@your-server-ip
```

### 2. Install prerequisites

**Install Node.js (if not already installed):**

```bash
# Using NodeSource repository (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

**Install Docker and Docker Compose:**

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

### 3. Clone and set up the project

```bash
# Clone the repository
git clone <repository-url>
cd lawFirm4

# Install dependencies
npm install --production=false
```

### 4. Configure environment variables

```bash
# Create .env file
nano .env
```

Add the following (adjust if database is on a different host):

```env
DATABASE_URL="postgresql://postgres:12345678@localhost:5430/lawfirm?schema=public"
NODE_ENV="production"
```

**⚠️ Security Note:** For production, use a strong password and consider using environment variable management or secrets management.

### 5. Start the database

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify it's running
docker-compose ps
```

### 6. Set up the database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

### 7. Build the application

```bash
npm run build
```

### 8. Start the production server

**Option A: Direct start (for testing)**

```bash
npm start
```

**Option B: Using PM2 (recommended for production)**

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "lawfirm" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

**Option C: Using systemd service**

Create a service file:

```bash
sudo nano /etc/systemd/system/lawfirm.service
```

Add the following (adjust paths as needed):

```ini
[Unit]
Description=Law Firm Next.js App
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/path/to/lawFirm4
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable lawfirm
sudo systemctl start lawfirm
sudo systemctl status lawfirm
```

### 9. Configure reverse proxy (Nginx)

```bash
# Install Nginx
sudo apt-get update
sudo apt-get install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/lawfirm
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3040;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/lawfirm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 10. Set up SSL with Let's Encrypt (optional but recommended)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Certbot will automatically configure Nginx and set up auto-renewal
```

## Useful Commands

### Database Management

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs -f postgres

# Access PostgreSQL CLI
docker exec -it lawfirm_postgres psql -U postgres -d lawfirm

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

### Application Management

```bash
# Development
npm run dev

# Build
npm run build

# Production start
npm start

# Linting
npm run lint
```

### PM2 Commands (if using PM2)

```bash
# View logs
pm2 logs lawfirm

# Restart application
pm2 restart lawfirm

# Stop application
pm2 stop lawfirm

# View status
pm2 status

# Monitor
pm2 monit
```

## Troubleshooting

### Database connection issues

1. Verify Docker container is running:

   ```bash
   docker-compose ps
   ```

2. Check database logs:

   ```bash
   docker-compose logs postgres
   ```

3. Verify DATABASE_URL in `.env` matches docker-compose.yml settings

### Port conflicts

- If port 3040 is already in use, change it in `package.json` scripts
- If port 5430 is already in use, change it in `docker-compose.yml`

### Prisma issues

```bash
# Reset Prisma Client
npm run prisma:generate

# Reset database (⚠️ deletes all data)
docker-compose down -v
docker-compose up -d
npm run prisma:migrate
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
