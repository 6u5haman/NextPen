
# NextPen 🖋️

This repository is a full-featured Next.js application that allows users to browse, view, and edit articles. The app is built with modern Next.js 15 features, including the **App Router**, server-side rendering, dynamic routes, and authentication using **NextAuth.js**.

---

## Features
- **Dynamic Routing**: Articles are fetched and rendered dynamically based on the `slug`.
- **Authentication**: Integration with NextAuth.js to protect editing and other actions.
- **Server-Side Rendering (SSR)**: Metadata is dynamically generated for SEO.
- **Article Management**: Fetch, view, and edit articles via REST API endpoints.
- **Client and Server Components**: Uses the App Router with hybrid rendering capabilities.

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/<username>/<repository-name>.git
cd <repository-name>
```

### 2. Install Dependencies
Make sure you have Node.js (v18 or higher) installed. Then, install the required dependencies:
```bash
npm install
```
or
```bash
yarn install
```

---

## Configuration

### Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000


# API Configuration
API_BASE_URL=http://localhost:3000/api
```

Replace the placeholders with actual values. If using another provider for authentication, update the corresponding variables.

---

## Running the App

### 1. Development Server
Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```
Visit the app at [http://localhost:3000](http://localhost:3000).

### 2. Production Build
To create a production-ready build:
```bash
npm run build
```
or
```bash
yarn build
```

Start the production server:
```bash
npm run start
```
or
```bash
yarn start
```

---

## Usage

### Viewing Articles
Navigate to `/articles` to view a list of available articles. Each article is dynamically rendered based on its `slug`.

### Editing Articles
1. Log in using your GitHub account or another OAuth provider configured in the environment variables.
2. Navigate to `/articles/<slug>/edit` to edit an article.
3. Save changes, which will be sent to the backend API for processing.

### Protected Routes
Unauthenticated users will be redirected to the login page when attempting to access protected routes.

---

## API Endpoints

The app interacts with the backend API to fetch and save article data. Below are the key endpoints:

1. **Fetch an Article**  
   `GET /api/articles/:slug`  
   Returns the article content for the given `slug`.

2. **Save an Article**  
   `POST /api/articles/:slug`  
   Updates the article content for the given `slug`.

---

## Folder Structure

```plaintext
app/
  articles/
    [slug]/
      edit/
        page.tsx     # Editing functionality for a single article
      page.tsx       # Viewing functionality for a single article
  layout.tsx         # App-wide layout
  page.tsx           # Home page
api/
  articles/
    [slug].ts        # Backend logic for fetching/updating articles
```

---

## Key Dependencies
- **Next.js**: Framework for server-side rendering and static site generation.
- **NextAuth.js**: For authentication and session management.
- **React**: Frontend library for building UI components.
- **Tailwind CSS**: Utility-first CSS framework for styling.

