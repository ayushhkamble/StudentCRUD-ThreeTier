# 🎓 StudentCRUD — Three-Tier Web Application

A complete **Frontend + Backend + Database** CRUD application built for hands-on practice of three-tier architecture deployment.

```
┌──────────────────────────────────────────────────────────┐
│               THREE-TIER ARCHITECTURE                    │
│                                                          │
│  ┌─────────────┐   ┌─────────────┐   ┌───────────────┐  │
│  │   TIER 1    │   │   TIER 2    │   │    TIER 3     │  │
│  │   Frontend  │──▶│   Backend   │──▶│   Database    │  │
│  │  HTML/CSS/JS│   │  Node.js    │   │   MySQL 8.0   │  │
│  │  Nginx :80  │   │  Express    │   │   Port 3306   │  │
│  │             │   │  Port 5000  │   │               │  │
│  └─────────────┘   └─────────────┘   └───────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
StudentCRUD/
├── frontend/
│   └── index.html          ← Single-page CRUD UI (HTML/CSS/JS)
├── backend/
│   ├── server.js           ← Node.js + Express REST API
│   ├── package.json        ← Node dependencies
│   └── Dockerfile          ← Containerize backend
├── database/
│   └── init.sql            ← DB schema + seed data
├── nginx/
│   └── studentcrud.conf    ← Nginx reverse proxy config
├── docker-compose.yml      ← Full stack orchestration
└── README.md               ← This guide
```

---

## 🚀 DEPLOYMENT GUIDE

Choose **one** of these two methods:

---

## ─── METHOD A: Docker Compose (Easiest — 5 minutes) ────────────────────────

### Prerequisites
- Ubuntu/Debian EC2 or any Linux VM
- Docker + Docker Compose installed

### Step 1 — Install Docker

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER    # run docker without sudo
newgrp docker                    # apply group change immediately
```

### Step 2 — Upload / Clone the Project

```bash
# Option A: Clone from GitHub (if you pushed)
git clone https://github.com/YOUR_USERNAME/StudentCRUD.git
cd StudentCRUD

# Option B: SCP from your local machine
scp -r ./StudentCRUD ec2-user@<EC2-IP>:/home/ec2-user/
cd /home/ec2-user/StudentCRUD
```

### Step 3 — Start All Three Tiers

```bash
docker-compose up -d --build
```

### Step 4 — Verify All Containers Are Running

```bash
docker ps
docker-compose logs -f     # watch logs (Ctrl+C to exit)
```

### Step 5 — Open in Browser

```
http://<YOUR-EC2-PUBLIC-IP>
```

### Useful Docker Commands

```bash
docker-compose down              # stop all containers
docker-compose down -v           # stop + delete database volume
docker-compose restart backend   # restart only backend
docker-compose logs backend      # backend logs only
```

---

## ─── METHOD B: Manual Deployment (Step-by-Step, No Docker) ─────────────────

### Prerequisites
- Ubuntu 22.04 EC2 instance (t2.micro or better)
- Ports 22, 80, 3306, 5000 open in Security Group
- SSH access

---

### STEP 1 — Connect to EC2 & Update System

```bash
ssh -i your-key.pem ubuntu@<EC2-PUBLIC-IP>
sudo apt update && sudo apt upgrade -y
```

---

### STEP 2 — Install MySQL (Database Tier)

```bash
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure the installation
sudo mysql_secure_installation
# → Set root password
# → Remove anonymous users: Y
# → Disallow remote root: Y
# → Remove test DB: Y
# → Reload privilege tables: Y
```

#### Initialize the Database

```bash
sudo mysql -u root -p < /path/to/StudentCRUD/database/init.sql

# Verify:
sudo mysql -u cruduser -pcrudpass -e "USE studentdb; SELECT * FROM students;"
```

---

### STEP 3 — Install Node.js (Backend Tier)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v    # should show v18.x.x
npm -v
```

#### Install Backend Dependencies

```bash
cd /home/ubuntu/StudentCRUD/backend
npm install
```

#### Configure Environment Variables

```bash
# Create .env file
cat > /home/ubuntu/StudentCRUD/backend/.env << EOF
DB_HOST=localhost
DB_USER=cruduser
DB_PASSWORD=crudpass
DB_NAME=studentdb
DB_PORT=3306
PORT=5000
EOF
```

#### Run Backend with PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Start the backend
pm2 start /home/ubuntu/StudentCRUD/backend/server.js --name "studentcrud-backend"

# Auto-start on reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs studentcrud-backend
```

#### Test Backend API

```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok","message":"Backend is running"}

curl http://localhost:5000/api/students
# Expected: JSON array of students
```

---

### STEP 4 — Install Nginx + Deploy Frontend (Frontend Tier)

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Deploy Frontend Files

```bash
sudo cp /home/ubuntu/StudentCRUD/frontend/index.html /var/www/html/index.html
```

#### Configure Nginx Reverse Proxy

```bash
sudo cp /home/ubuntu/StudentCRUD/nginx/studentcrud.conf /etc/nginx/sites-available/studentcrud

# Enable the site
sudo ln -s /etc/nginx/sites-available/studentcrud /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### STEP 5 — Open EC2 Security Group Ports

In AWS Console → EC2 → Security Groups → Inbound Rules, add:

| Type        | Port  | Source     |
|-------------|-------|------------|
| HTTP        | 80    | 0.0.0.0/0  |
| Custom TCP  | 5000  | 0.0.0.0/0  |
| MySQL/Aurora| 3306  | Your IP only|
| SSH         | 22    | Your IP only|

---

### STEP 6 — Access the Application

```
http://<EC2-PUBLIC-IP>
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---|---|
| White page / no data | Check backend URL in `index.html` → `API` variable |
| Backend not connecting to DB | Check DB credentials in `.env` or environment vars |
| MySQL access denied | Re-run GRANT in init.sql as root |
| Port 80 blocked | Check EC2 Security Group inbound rules |
| PM2 not found | `sudo npm install -g pm2` then retry |

---

## 📡 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET    | /api/health           | Health check |
| GET    | /api/students         | Get all students |
| GET    | /api/students/:id     | Get single student |
| POST   | /api/students         | Add new student |
| PUT    | /api/students/:id     | Update student |
| DELETE | /api/students/:id     | Delete student |

### Example API calls

```bash
# Add a student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul","email":"rahul@test.com","course":"CS","age":21}'

# Update
curl -X PUT http://localhost:5000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Kumar","email":"rahul@test.com","course":"IT","age":22}'

# Delete
curl -X DELETE http://localhost:5000/api/students/1
```

---

## 🧱 Tech Stack

| Tier | Technology |
|------|-----------|
| Frontend | HTML5, CSS3, Vanilla JS, Nginx |
| Backend | Node.js 18, Express.js 4 |
| Database | MySQL 8.0 |
| Containerization | Docker, Docker Compose |
| Process Manager | PM2 |

---

> Built for learning three-tier web app deployment on AWS EC2.
