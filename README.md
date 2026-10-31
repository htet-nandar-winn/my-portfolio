# Vite-Project

A web application built with **Laravel** and **Vite**. Laravel handles the application's backend structure and functionality, while Vite provides fast frontend asset development and bundling.

## 🔗 Live Demo

Live demo coming soon.

## 📂 GitHub Repository

[View Vite-Project on GitHub](https://github.com/htet-nandar-winn/Vite-Project)

## 🛠️ Technologies Used

- **PHP** – Backend programming language
- **Laravel** – PHP web application framework
- **Vite** – Frontend asset development and build tool
- **JavaScript** – Client-side functionality
- **HTML5** – Web page structure
- **CSS3** – Styling and layout
- **MySQL** – Database management (if configured)
- **Composer** – PHP dependency management
- **npm** – Frontend package management

## ✨ Features

- Laravel-based web application structure
- Organized backend development using Laravel
- Vite integration for frontend asset management
- Fast frontend development workflow
- Development and production asset builds

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [PHP](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/htet-nandar-winn/Vite-Project.git
```

**2. Navigate to the project directory**

```bash
cd Vite-Project
```

**3. Install PHP dependencies**

```bash
composer install
```

**4. Install frontend dependencies**

```bash
npm install
```

**5. Create your environment file**

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

**6. Generate the application key**

```bash
php artisan key:generate
```

**7. Configure your database**

Update the database settings in your `.env` file if the project uses a database.

If migrations are required, run:

```bash
php artisan migrate
```

**8. Start the development servers**

Run Laravel:

```bash
php artisan serve
```

In another terminal, run Vite:

```bash
npm run dev
```

Open the Laravel URL displayed in your terminal, usually:

```text
http://127.0.0.1:8000
```

## 📦 Build for Production

To build frontend assets for production, run:

```bash
npm run build
```

Vite will generate optimized assets in the configured build directory, typically `public/build`.

## 🧹 Code Quality

If the project includes configured code-quality scripts, run the relevant commands from `package.json` or `composer.json`.

## 📁 Project Structure

```text
Vite-Project/
├── app/                # Application logic
├── bootstrap/          # Framework bootstrapping
├── config/             # Configuration files
├── database/           # Migrations and seeders
├── public/             # Public assets
├── resources/          # Views, CSS, and JavaScript
├── routes/             # Application routes
├── storage/            # Application storage
├── tests/              # Automated tests
├── vendor/             # Composer dependencies
├── node_modules/       # npm dependencies
├── package.json        # Frontend dependencies and scripts
├── vite.config.js      # Vite configuration
├── composer.json       # PHP dependencies
└── README.md           # Project documentation
```

## 🔐 Environment Variables

Store local environment settings in the `.env` file.

**Important:** Never commit API keys, passwords, database credentials, or other sensitive information to GitHub. Make sure `.env` is excluded through `.gitignore`.

## 👩‍💻 Author

**HTET NANDAR WINN**

- GitHub: [@htet-nandar-winn](https://github.com/htet-nandar-winn)
- Portfolio: [Visit My Portfolio](https://htet-nandar-winn.github.io/my-portfolio/)

## 📄 License

No license has been specified yet. All rights are reserved by default unless a license is added to the repository.

---

⭐ Feel free to explore the repository and follow my development journey.
