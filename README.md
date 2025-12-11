# Document Manager

A simple and clean document management system built with Vue.js. Upload, organize, and filter your documents with ease.

## Overview

This application helps you manage documents efficiently. You can upload documents, categorize them, add tags, and filter through your collection. The app uses OTP-based authentication for secure access.

## Features

**OTP Authentication** - Secure login with mobile number verification
**Document Upload** - Upload PDFs and images with metadata
**Tag Management** - Organize documents with custom tags
**Advanced Filtering** - Filter by category, sub-category, tags, and date range
**Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
**Document List** - View all your documents in a clean table format

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component framework
- **Vue Router** - Client-side routing
- **Vuex** - State management
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager

## Getting Started

### Installation

1. Clone the repository:

git clone <repository-url>
cd doc_manager


2. Install dependencies:

npm install


### Running the Application

Start the development server:


npm run dev


The application will be available at `http://localhost:3000`

## Project Structure


src/
├── assets/          # Images and static assets
├── components/      # Reusable Vue components
│   ├── common/     # Common components (LogoutDialog, etc.)
│   └── documents/  # Document-related components
├── constants/       # Constants and configuration
│   └── app-js/     # API URLs and axios helper
├── layout/         # Layout components (auth, default)
├── pages/          # Page components
│   └── auth/       # Authentication pages
├── plugins/        # Vue plugins configuration
├── router/         # Vue Router configuration
├── store/          # Vuex store
└── styles/         # Global styles


## Configuration

The API base URL is configured in `src/constants/app-js/urls.js`.
## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint and fix issues

## License

This project is private and proprietary.
