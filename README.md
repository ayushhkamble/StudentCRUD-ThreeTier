# 🎓 StudentCRUD — Three-Tier Web Application

![AWS](https://img.shields.io/badge/AWS-EC2-orange?logo=amazon-aws&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL%208.0-blue?logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js%2018-green?logo=node.js&logoColor=white)
![Nginx](https://img.shields.io/badge/Server-Nginx-brightgreen?logo=nginx&logoColor=white)
![Domain](https://img.shields.io/badge/Domain-Route%2053-orange?logo=amazon-aws&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

> A fully deployed three-tier CRUD web application built with HTML/CSS/JS, Node.js + Express, and MySQL — hosted on AWS EC2 with a custom domain configured via Amazon Route 53.

**🌐 Live Site:** [https://ayushk.online](https://ayushk.online)

---

## 📌 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Part 1 — Upload to GitHub](#-part-1--upload-to-github)
- [Part 2 — AWS EC2 Setup](#-part-2--aws-ec2-setup)
- [Part 3 — Database Tier (MySQL)](#-part-3--database-tier-mysql-80)
- [Part 4 — Application Tier (Node.js)](#-part-4--application-tier-nodejs--express)
- [Part 5 — Presentation Tier (Nginx)](#-part-5--presentation-tier-nginx)
- [Part 6 — Domain Setup via Route 53](#-part-6--domain-setup-via-amazon-route-53)
- [Part 7 — SSL Certificate (HTTPS)](#-part-7--ssl-certificate-https)
- [Part 8 — Verify the Application](#-part-8--verify-the-application)
- [Part 9 — Update Workflow](#-part-9--update-workflow-git-pull)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)
- [Final Checklist](#-final-checklist)

---

## 🏗️ Architecture Overview

```
                        ┌─────────────────────────────────────────┐
                        │           AWS CLOUD (eu-region)          │
                        │                                          │
  User Browser          │   ┌──────────────────────────────────┐  │
      │                 │   │         EC2 Instance              │  │
      │  ayushk.online  │   │  ┌────────────────────────────┐  │  │
      │────────────────────▶│  │  TIER 1 — Nginx :80 / :443 │  │  │
      │                 │   │  │  Serves static HTML         │  │  │
      │                 │   │  │  Reverse proxies /api/*     │  │  │
      │                 │   │  └────────────┬───────────────┘  │  │
      │                 │   │               │ localhost:5000    │  │
      │                 │   │  ┌────────────▼───────────────┐  │  │
      │                 │   │  │  TIER 2 — Node.js :5000    │  │  │
      │                 │   │  │  Express REST API           │  │  │
      │                 │   │  │  PM2 Process Manager        │  │  │
      │                 │   │  └────────────┬───────────────┘  │  │
      │                 │   │               │ localhost:3306    │  │
      │                 │   │  ┌────────────▼───────────────┐  │  │
      │                 │   │  │  TIER 3 — MySQL 8.0 :3306  │  │  │
      │                 │   │  │  studentdb database         │  │  │
      │                 │   │  └────────────────────────────┘  │  │
      │                 │   └──────────────────────────────────┘  │
      │                 │                    ▲                     │
      │                 │   ┌────────────────┴─────────────────┐  │
      │                 │   │  Route 53 — DNS                   │  │
      │                 │   │  ayushk.online → EC2 Elastic IP  │  │
      │                 │   └──────────────────────────────────┘  │
      │                 └─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript | Student CRUD user interface |
| **Web Server** | Nginx | Serves frontend, reverse proxies API |
| **Backend** | Node.js 18 + Express.js | REST API — handles all CRUD operations |
| **Database** | MySQL 8.0 | Stores student records |
| **Process Manager** | PM2 | Keeps Node.js running, auto-restarts on crash/reboot |
| **Cloud** | AWS EC2 (Ubuntu 22.04) | Hosts the entire application |
| **DNS** | Amazon Route 53 | Maps domain name to EC2 Elastic IP |
| **SSL** | Let's Encrypt (Certbot) | Free HTTPS certificate |
| **Version Control** | GitHub | Source code repository |

---

## 📁 Project Structure

```
StudentCRUD-ThreeTier/
├── frontend/
│   └── index.html              ← Single-page CRUD UI (HTML + CSS + JS)
├── backend/
│   ├── server.js               ← Node.js + Express REST API
│   ├── package.json            ← Node dependencies
│   └── Dockerfile              ← Docker containerization (optional)
├── database/
│   └── init.sql                ← MySQL schema + seed data
├── nginx/
│   └── studentcrud.conf        ← Nginx reverse proxy configuration
├── docker-compose.yml          ← Full stack Docker orchestration
└── README.md                   ← This guide
```

---

## ✨ Features

- ➕ **Add** students with name, email, course, and age
- 📋 **View** all students in a live searchable table
- ✏️ **Edit** any student record inline
- 🗑️ **Delete** students with confirmation
- 🔍 **Live search** by name or course
- 📊 **Real-time stats** — total students, number of courses, average age
- 🌐 **Custom domain** with HTTPS via Route 53 + Let's Encrypt

---

## 📤 Part 1 — Upload to GitHub

### Step 1 — Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Set **Repository name:** `StudentCRUD-ThreeTier`
3. Set **Visibility:** `Public`
4. ❌ Do **NOT** check "Add a README file"
5. Click **Create repository**

### Step 2 — Push Code from Local Machine

```bash
# Navigate into your project folder
cd /path/to/StudentCRUD

# Initialize git
git init

# Stage all files
git add .

# First commit
git commit -m "Initial commit - StudentCRUD Three-Tier App"

# Set branch to main
git branch -M main

# Link to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/StudentCRUD-ThreeTier.git

# Push to GitHub
git push -u origin main
```

> ⚠️ **Note:** Never push your `.env` file to GitHub. Add it to `.gitignore` to keep your database credentials safe.

---

## ☁️ Part 2 — AWS EC2 Setup

### Step 1 — Launch EC2 Instance

| Setting | Value |
|---------|-------|
| **AMI** | Ubuntu Server 22.04 LTS |
| **Instance Type** | t2.micro (Free Tier eligible) |
| **Storage** | 10 GB gp2 |
| **Key Pair** | Create new `.pem` key — save securely |

### Step 2 — Configure Security Group Inbound Rules

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| SSH | 22 | My IP | Secure shell access |
| HTTP | 80 | 0.0.0.0/0 | Public web access |
| HTTPS | 443 | 0.0.0.0/0 | SSL web access |
| Custom TCP | 5000 | 0.0.0.0/0 | Node.js API |
| MySQL/Aurora | 3306 | My IP | Direct DB access (your IP only) |

### Step 3 — Allocate and Attach Elastic IP

> ⚠️ **Important:** Always use an Elastic IP so your IP doesn't change when the instance restarts.

1. Go to **EC2 → Network & Security → Elastic IPs**
2. Click **Allocate Elastic IP address** → **Allocate**
3. Select the new EIP → **Actions → Associate Elastic IP address**
4. Select your EC2 instance → **Associate**

### Step 4 — SSH into EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<EC2-ELASTIC-IP>
```

### Step 5 — Update System & Install Git

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git

# Clone your repository
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/StudentCRUD-ThreeTier.git
cd StudentCRUD-ThreeTier

# Verify all files
ls -R
```

---

## 🗄️ Part 3 — Database Tier (MySQL 8.0)

### Step 1 — Install MySQL

```bash
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Step 2 — Secure MySQL Installation

```bash
sudo mysql_secure_installation
```

Answer the prompts:
- Set root password → **Yes** (choose a strong password)
- Remove anonymous users → **Yes**
- Disallow root login remotely → **Yes**
- Remove test database → **Yes**
- Reload privilege tables → **Yes**

### Step 3 — Fix Password Policy & Initialize Database

```bash
# Login as root (no password needed via sudo on EC2)
sudo mysql
```

Run inside MySQL shell:

```sql
-- Lower password policy to allow simple app passwords
SET GLOBAL validate_password.policy = LOW;
SET GLOBAL validate_password.length = 6;

-- Create database and user
CREATE DATABASE IF NOT EXISTS studentdb;
CREATE USER IF NOT EXISTS 'cruduser'@'%' IDENTIFIED BY 'crudpass';
GRANT ALL PRIVILEGES ON studentdb.* TO 'cruduser'@'%';
FLUSH PRIVILEGES;

USE studentdb;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  course     VARCHAR(100) NOT NULL,
  age        INT          NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert seed data
INSERT INTO students (name, email, course, age) VALUES
  ('Ayush Sharma',    'ayush@example.com',  'Computer Science',       21),
  ('Priya Patil',     'priya@example.com',  'Information Technology', 20),
  ('Rahul Desai',     'rahul@example.com',  'Electronics',            22),
  ('Sneha Joshi',     'sneha@example.com',  'Mechanical Engineering', 21),
  ('Aditya Kulkarni', 'aditya@example.com', 'Civil Engineering',      23);

EXIT;
```

### Step 4 — Verify Database

```bash
mysql -u cruduser -pcrudpass -e "USE studentdb; SELECT * FROM students;"
```

✅ You should see 5 students listed.

---

## ⚙️ Part 4 — Application Tier (Node.js + Express)

### Step 1 — Install Node.js 18

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node -v    # v18.x.x
npm -v     # 9.x.x
```

### Step 2 — Install Dependencies

```bash
cd /home/ubuntu/StudentCRUD-ThreeTier/backend
npm install --production
```

### Step 3 — Create Environment File

```bash
cat > /home/ubuntu/StudentCRUD-ThreeTier/backend/.env << 'EOF'
DB_HOST=localhost
DB_USER=cruduser
DB_PASSWORD=crudpass
DB_NAME=studentdb
DB_PORT=3306
PORT=5000
EOF

# Verify
cat /home/ubuntu/StudentCRUD-ThreeTier/backend/.env
```

### Step 4 — Start with PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the backend
pm2 start /home/ubuntu/StudentCRUD-ThreeTier/backend/server.js --name "studentcrud-backend"

# Save process list
pm2 save

# Enable auto-start on reboot
pm2 startup
# Copy and run the command it prints
```

### Step 5 — Test the API

```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok","message":"Backend is running"}

curl http://localhost:5000/api/students
# Expected: JSON array of 5 students
```

#### PM2 Command Reference

| Command | Description |
|---------|-------------|
| `pm2 status` | Show all running processes |
| `pm2 logs studentcrud-backend` | View backend logs |
| `pm2 restart studentcrud-backend` | Restart backend |
| `pm2 stop studentcrud-backend` | Stop backend |
| `pm2 monit` | Live process monitor |

---

## 🌐 Part 5 — Presentation Tier (Nginx)

### Step 1 — Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 2 — Deploy Frontend

```bash
sudo cp /home/ubuntu/StudentCRUD-ThreeTier/frontend/index.html /var/www/html/index.html
```

### Step 3 — Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/studentcrud
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name ayushk.online www.ayushk.online;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass         http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save: `Ctrl+X` → `Y` → `Enter`

### Step 4 — Enable Site & Reload

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/studentcrud /etc/nginx/sites-enabled/studentcrud

# Remove default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t
# Expected: test is successful

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🌍 Part 6 — Domain Setup via Amazon Route 53

### Step 1 — Register or Transfer Domain

1. Go to **AWS Console → Route 53 → Registered Domains**
2. Click **Register Domain** → search for your domain (e.g. `ayushk.online`)
3. Add to cart → complete purchase
   
> If you already own the domain elsewhere, you can transfer it to Route 53 or just update the nameservers.

### Step 2 — Create a Hosted Zone

1. Go to **Route 53 → Hosted Zones**
2. Click **Create hosted zone**
3. Enter your domain name (e.g. `ayushk.online`)
4. Type: **Public hosted zone**
5. Click **Create hosted zone**

### Step 3 — Add DNS Records

Inside your hosted zone, click **Create record** and add these two records:

**Record 1 — Root domain:**

| Field | Value |
|-------|-------|
| Record name | _(leave blank)_ |
| Record type | A |
| Value | `<YOUR-EC2-ELASTIC-IP>` |
| TTL | 300 |

**Record 2 — www subdomain:**

| Field | Value |
|-------|-------|
| Record name | `www` |
| Record type | A |
| Value | `<YOUR-EC2-ELASTIC-IP>` |
| TTL | 300 |

Click **Create records** ✅

### Step 4 — Update Nameservers (if domain registered elsewhere)

If your domain is registered outside AWS (e.g. GoDaddy, Namecheap):

1. In Route 53, copy the **4 NS (nameserver) values** from your hosted zone
2. Go to your domain registrar → DNS Settings
3. Replace existing nameservers with the 4 Route 53 NS values
4. Save changes — DNS propagation takes **5 minutes to 48 hours**

### Step 5 — Verify DNS Propagation

```bash
# Check if domain resolves to your EC2 IP
nslookup ayushk.online

# Or use dig
dig ayushk.online
```

You should see your EC2 Elastic IP in the response.

---

## 🔒 Part 7 — SSL Certificate (HTTPS)

Free SSL certificate using Let's Encrypt + Certbot:

### Step 1 — Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2 — Obtain SSL Certificate

```bash
sudo certbot --nginx -d ayushk.online -d www.ayushk.online
```

Follow the prompts:
- Enter your **email address**
- Agree to Terms of Service → **Y**
- Share email with EFF (optional) → **Y or N**
- Certbot automatically updates your Nginx config ✅

### Step 3 — Verify Auto-Renewal

```bash
# Test renewal (dry run)
sudo certbot renew --dry-run
# Expected: Congratulations, all simulated renewals succeeded
```

> ✅ Certbot sets up a cron job that auto-renews your certificate every 90 days.

### Step 4 — Verify HTTPS

Open in browser:
```
https://ayushk.online
```

You should see the 🔒 padlock in the browser address bar.

---

## ✅ Part 8 — Verify the Application

### Check All Services

```bash
# MySQL — Tier 3
sudo systemctl status mysql
# Expected: Active (running)

# Node.js backend — Tier 2
pm2 status
# Expected: studentcrud-backend | online

# Nginx — Tier 1
sudo systemctl status nginx
# Expected: Active (running)

# Check all ports are listening
sudo ss -tlnp | grep -E '80|443|5000|3306'
```

### Test End-to-End

```bash
# Test backend API health
curl http://localhost:5000/api/health

# Test Nginx is serving
curl http://localhost:80

# Test via domain
curl https://ayushk.online/api/health
```

### Browser Tests

- [ ] `https://ayushk.online` loads the StudentCRUD dashboard
- [ ] Student records appear in the table (5 seed records)
- [ ] **Add** a new student → appears in table
- [ ] **Edit** a student → changes saved
- [ ] **Delete** a student → removed from table
- [ ] **Search** filters students by name/course
- [ ] Refresh page → data still persists (MySQL working)

---

## 🔄 Part 9 — Update Workflow (git pull)

Whenever you make changes and push to GitHub:

### On Your Local Machine

```bash
cd /path/to/StudentCRUD
git add .
git commit -m "Your commit message"
git push origin main
```

### On EC2 Server

```bash
cd /home/ubuntu/StudentCRUD-ThreeTier
git pull origin main
```

Then apply changes based on what was updated:

| What Changed | Command to Run |
|---|---|
| `backend/server.js` | `pm2 restart studentcrud-backend` |
| `frontend/index.html` | `sudo cp frontend/index.html /var/www/html/index.html` |
| `nginx/studentcrud.conf` | `sudo cp nginx/studentcrud.conf /etc/nginx/sites-available/studentcrud && sudo systemctl reload nginx` |

---

## 📡 API Reference

Base URL: `https://ayushk.online/api`

| Method | Endpoint | Description | Body |
|--------|---------|-------------|------|
| `GET` | `/health` | Health check | — |
| `GET` | `/students` | Get all students | — |
| `GET` | `/students/:id` | Get single student | — |
| `POST` | `/students` | Add new student | `{name, email, course, age}` |
| `PUT` | `/students/:id` | Update student | `{name, email, course, age}` |
| `DELETE` | `/students/:id` | Delete student | — |

### Example Requests

```bash
# Health check
curl https://ayushk.online/api/health

# Get all students
curl https://ayushk.online/api/students

# Add a student
curl -X POST https://ayushk.online/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Kumar","email":"rahul@mail.com","course":"Data Science","age":22}'

# Update a student
curl -X PUT https://ayushk.online/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul Kumar","email":"rahul@mail.com","course":"AI","age":23}'

# Delete a student
curl -X DELETE https://ayushk.online/api/students/1
```

---

## 🔧 Troubleshooting

### ❌ "Backend unreachable" on website

```bash
# Check if PM2 is running
pm2 status

# If stopped/errored:
cd /home/ubuntu/StudentCRUD-ThreeTier/backend
pm2 restart studentcrud-backend

# Check logs for errors
pm2 logs studentcrud-backend
```

### ❌ ERROR 1819 — Password policy

```bash
sudo mysql
SET GLOBAL validate_password.policy = LOW;
SET GLOBAL validate_password.length = 6;
EXIT;
```

### ❌ ERROR 1062 — Duplicate entry

This means init.sql already ran successfully. Your data is already there — just skip the init step.

```bash
mysql -u cruduser -pcrudpass -e "USE studentdb; SELECT * FROM students;"
```

### ❌ Nginx fails to start

```bash
# Check config syntax
sudo nginx -t

# Check error logs
sudo tail -50 /var/log/nginx/error.log
```

### ❌ Domain not resolving

```bash
# Check DNS propagation
nslookup ayushk.online 8.8.8.8

# Verify Route 53 A record points to correct Elastic IP
# Check EC2 Security Group has port 80 and 443 open
```

### ❌ Site down after EC2 restart

```bash
# Restart all services
sudo systemctl start mysql
sudo systemctl start nginx
pm2 start studentcrud-backend
pm2 save
```

> 💡 Prevent this permanently: run `pm2 startup` and `pm2 save` once so PM2 auto-restarts on reboot. MySQL and Nginx already auto-start via `systemctl enable`.

---

## ✅ Final Checklist

| # | Checkpoint | Status |
|---|-----------|--------|
| 1 | GitHub repo created and code pushed | ☐ |
| 2 | EC2 instance launched (Ubuntu 22.04) | ☐ |
| 3 | Elastic IP allocated and attached | ☐ |
| 4 | Security Group ports open (22, 80, 443, 5000) | ☐ |
| 5 | SSH access working | ☐ |
| 6 | Repository cloned on EC2 | ☐ |
| 7 | MySQL installed and running | ☐ |
| 8 | Database and user created (studentdb / cruduser) | ☐ |
| 9 | Students table with seed data exists | ☐ |
| 10 | Node.js 18 installed | ☐ |
| 11 | npm install completed in /backend | ☐ |
| 12 | .env file configured correctly | ☐ |
| 13 | PM2 running (studentcrud-backend online) | ☐ |
| 14 | PM2 startup + save configured | ☐ |
| 15 | API health check passes on localhost:5000 | ☐ |
| 16 | Nginx installed and running | ☐ |
| 17 | index.html deployed to /var/www/html/ | ☐ |
| 18 | Nginx config applied with domain name | ☐ |
| 19 | Route 53 hosted zone created | ☐ |
| 20 | A records added (root + www → Elastic IP) | ☐ |
| 21 | Domain resolves to EC2 IP (nslookup passes) | ☐ |
| 22 | SSL certificate installed via Certbot | ☐ |
| 23 | https://ayushk.online loads correctly | ☐ |
| 24 | Full CRUD tested (Add / Edit / Delete / Search) | ☐ |

---

## 👨‍💻 Author

**Ayush Kamble**
- GitHub: [https://github.com/ayushhkamble](https://github.com/ayushhkamble)
- Live Project: [https://ayushk.online](https://ayushk.online)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If this project helped you, consider giving it a star on GitHub!
