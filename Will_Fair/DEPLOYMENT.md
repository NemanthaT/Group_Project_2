# WillFair Donation Platform - Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

---

## Prerequisites

### System Requirements
- **Node.js**: v16.x or higher
- **npm**: v8.x or higher
- **PostgreSQL**: v14.x or higher
- **Git**: Latest version

### Development Tools
- Code editor (VS Code recommended)
- PostgreSQL client (pgAdmin, DBeaver, or CLI)
- API testing tool (Postman, Insomnia)

---

## Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Will_Fair
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

**Key Backend Dependencies:**
- express: ^4.18.x
- pg: ^8.11.x
- bcryptjs: ^2.4.x
- jsonwebtoken: ^9.0.x
- cors: ^2.8.x
- dotenv: ^16.3.x
- multer: ^1.4.x (for file uploads)

#### Frontend Dependencies
```bash
cd ../
npm install
```

**Key Frontend Dependencies:**
- react: ^18.2.x
- react-dom: ^18.2.x
- react-router-dom: ^6.x
- axios: ^1.6.x
- lucide-react: ^0.x (for icons)
- react-toastify: ^9.x (for notifications)

---

## Database Configuration

### 1. Create PostgreSQL Database

```sql
CREATE DATABASE willfair_db;
```

### 2. Create Database User

```sql
CREATE USER willfair_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE willfair_db TO willfair_user;
```

### 3. Run Database Schema

Execute the SQL schema file located in `server/database/schema.sql`:

```bash
psql -U willfair_user -d willfair_db -f server/database/schema.sql
```

**Database Tables Include:**
- `donors` - Donor user accounts
- `donees` - Donee user accounts
- `donations` - Donation records
- `donation_requests` - Donation request records
- `categories` - Donation categories
- `regional_managers` - Regional manager accounts
- `sys_admins` - System administrator accounts
- `auth_managers` - Authentication manager accounts

### 4. Environment Variables for Database

Create `server/.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=willfair_db
DB_USER=willfair_user
DB_PASSWORD=your_secure_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_min_32_chars

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

---

## Backend Deployment

### 1. Development Environment

```bash
cd server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 2. Test Backend API

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Test Endpoints:**
- GET `/api/categories` - Get donation categories
- POST `/api/auth/donor/register` - Register donor
- POST `/api/auth/donor/login` - Login donor
- GET `/admin/donors` - Get all donors (admin)
- GET `/admin/donees` - Get all donees (admin)

### 3. Production Backend Setup

```bash
cd server
npm install --production
npm start
```

**PM2 Setup (Recommended for Production):**

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name willfair-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

**PM2 Commands:**
```bash
pm2 list                    # List all running processes
pm2 logs willfair-backend  # View logs
pm2 restart willfair-backend  # Restart application
pm2 stop willfair-backend  # Stop application
pm2 delete willfair-backend  # Delete from PM2
```

---

## Frontend Deployment

### 1. Development Environment

Create `src/.env` or `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

Start development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 3. Preview Production Build

```bash
npm run preview
```

### 4. Deploy Frontend

#### Option A: Static Hosting (Netlify, Vercel, GitHub Pages)

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Configuration for SPA Routing:**
Create `dist/_redirects` (Netlify) or `vercel.json` (Vercel):

**Netlify `_redirects`:**
```
/*    /index.html   200
```

**Vercel `vercel.json`:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### Option B: Nginx Server

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/willfair/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Deploy Steps:**
```bash
# Copy build files to server
scp -r dist/* user@server:/var/www/willfair/

# Restart Nginx
sudo systemctl restart nginx
```

---

## Production Deployment

### Complete Production Setup

#### 1. Server Setup (Ubuntu/Debian)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

#### 2. Database Setup on Server

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE willfair_db;
CREATE USER willfair_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE willfair_db TO willfair_user;
\q

# Import schema
sudo -u postgres psql willfair_db < schema.sql
```

#### 3. Deploy Backend

```bash
# Clone repository
git clone <repo-url> /var/www/willfair
cd /var/www/willfair/server

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add production environment variables

# Start with PM2
pm2 start server.js --name willfair-backend
pm2 save
pm2 startup
```

#### 4. Deploy Frontend

```bash
cd /var/www/willfair

# Build frontend
npm install
npm run build

# Configure Nginx
sudo nano /etc/nginx/sites-available/willfair
# Add Nginx configuration from above

# Enable site
sudo ln -s /etc/nginx/sites-available/willfair /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
sudo certbot renew --dry-run
```

---

## Environment Variables Reference

### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=willfair_db
DB_USER=willfair_user
DB_PASSWORD=your_secure_password

# Authentication
JWT_SECRET=your_very_secure_jwt_secret_min_32_characters
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Email (if configured)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=https://api.yourdomain.com

# App Configuration
VITE_APP_NAME=WillFair
VITE_APP_VERSION=1.0.0
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Problem:** Cannot connect to PostgreSQL

**Solutions:**
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in `.env` file
- Check `pg_hba.conf` for authentication settings
- Ensure database exists: `psql -U postgres -l`

#### 2. CORS Errors

**Problem:** Frontend cannot access backend API

**Solutions:**
- Add frontend URL to CORS whitelist in `server/server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

#### 3. File Upload Issues

**Problem:** Cannot upload files

**Solutions:**
- Check upload directory exists and has write permissions:
```bash
mkdir -p server/uploads
chmod 755 server/uploads
```
- Verify `MAX_FILE_SIZE` in `.env`
- Check Nginx `client_max_body_size`:
```nginx
client_max_body_size 10M;
```

#### 4. JWT Token Expired

**Problem:** Users logged out unexpectedly

**Solutions:**
- Increase `JWT_EXPIRES_IN` in `.env`
- Implement token refresh mechanism
- Check system time synchronization

#### 5. Port Already in Use

**Problem:** Port 5000 already in use

**Solutions:**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

---

## Maintenance

### Regular Maintenance Tasks

#### 1. Database Backup

**Daily Backup Script:**
```bash
#!/bin/bash
# /usr/local/bin/backup-willfair-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/willfair"
mkdir -p $BACKUP_DIR

pg_dump -U willfair_user willfair_db > $BACKUP_DIR/willfair_db_$DATE.sql
gzip $BACKUP_DIR/willfair_db_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

**Setup Cron Job:**
```bash
crontab -e

# Add daily backup at 2 AM
0 2 * * * /usr/local/bin/backup-willfair-db.sh
```

#### 2. Log Rotation

**Configure PM2 Log Rotation:**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

#### 3. Monitoring

**Setup Basic Monitoring:**
```bash
# Install monitoring tools
pm2 install pm2-server-monit

# View metrics
pm2 monit
```

#### 4. Updates

**Update Application:**
```bash
cd /var/www/willfair

# Pull latest changes
git pull origin main

# Update backend
cd server
npm install
pm2 restart willfair-backend

# Update frontend
cd ..
npm install
npm run build
```

#### 5. Security Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies
npm audit
npm audit fix

# Review security advisories
npm audit --production
```

---

## Performance Optimization

### 1. Database Optimization

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_donors_email ON donors(email);
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_request_id ON donations(request_id);
CREATE INDEX idx_donation_requests_status ON donation_requests(status);

-- Analyze tables
ANALYZE donors;
ANALYZE donations;
ANALYZE donation_requests;
```

### 2. Nginx Caching

```nginx
# Add to Nginx configuration
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Enable Gzip Compression

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

---

## Health Checks

### Backend Health Endpoint

The backend should have a health check endpoint:

**GET** `/health`

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "database": "connected",
  "uptime": 86400
}
```

### Monitoring Script

```bash
#!/bin/bash
# /usr/local/bin/health-check.sh

curl -f http://localhost:5000/health || pm2 restart willfair-backend
```

**Cron Job (every 5 minutes):**
```bash
*/5 * * * * /usr/local/bin/health-check.sh
```

---

## Support and Documentation

### Additional Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

### Getting Help
- Create an issue in the repository
- Contact the development team
- Review application logs: `pm2 logs willfair-backend`

---

## License

This deployment guide is part of the WillFair Donation Platform project.

---

**Last Updated:** October 2025  
**Version:** 1.0.0
