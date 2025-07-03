# Redocly Trial Day Exercise

Hey there! Welcome to the Redocly trial day exercise. We've put together this task to see your skills in action, particularly with JavaScript-based technologies, Prisma, and handling data. Let's build something cool!

**Goal:** The main goal is to build a functional "People Page" – think of a UI where you can see members of an organization, filter them, and sort them, all backed by API you'll create.

**Context:** Building intuitive tools for managing users, teams, and permissions is a big part of what we do. This task mirrors some of the real-world challenges involved in creating a smooth experience for listing and filtering people based on different attributes like their role, team membership, or activity.

**Inspiration:** We have a "People" view in our app. The image below shows the kind of filters and data typically displayed. Feel free to use it as a visual guide, but you have creative freedom on the exact UI implementation.

![People Page UI Inspiration](./real-app.png)

## Provided Setup

This repository includes:

*   A pre-defined Prisma schema (`prisma/schema.prisma`) modelling Users, Teams, and Memberships (please stick to this structure).
*   Configuration for using a **SQLite** database (`prisma/dev.db` - appears after setup).
*   A seed script (`prisma/seed.ts`) to populate the database with varied test data.
*   Basic scripts in `package.json` for common Prisma operations.

## Setup Instructions

First things first, let's get the database up and running:

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Generate Prisma Client** 
    ```bash
    npm run prisma:generate
    ```

3. **Create the SQLite database, apply the schema, and seed this with test data**
    ```bash
    npm run prisma:migrate
    ```

4.  **Optional: Re-seed the database with test data**
    ```bash
    npm run db:seed
    ```
    This populates `dev.db` with sample data (around 500 Users, 30 Teams, etc.) to work with.

## Exploring the Data (Optional but Handy!)

Getting familiar with the data models and sample data might be helpful before diving in.

### Using Prisma Studio

A visual GUI to browse your database:
```bash
npm run prisma:studio
```

### Using the Test Client

A simple script to fetch and log a few users and their related data (if you never worked with Prisma before, this script is a good way to see how it works):
```bash
npm run test:client
```

## Your Task: Build the People Page Feature

Build a full-stack feature that displays a list of organization members with filtering, sorting, and pagination.

**Core Requirements:**

We'd like you to build a full-stack "People Page" feature. This will be an interface to display members of an organization, allowing users to filter and sort them.

Here are the main things we're looking for:

*   **Technical Approach:**
    *   Please use a JavaScript-based language for your solution (e.g., Node.js, Deno, Bun for backend/full-stack, or standard JavaScript/TypeScript for frontend logic).
    *   For the user interface, you can use your preferred framework or library (e.g., React, Vue, Svelte, or others), or a full-stack approach (e.g., Next.js, Remix, SvelteKit). You can also opt for plain HTML, CSS, and JavaScript.
    *   You'll need to use **Prisma** (with the provided `@prisma/client`) to interact with the **SQLite database**, based on the `schema.prisma` file we've included.

*   **Data Handling and Display:**
    *   Implement the logic for fetching member data. This should support filtering, sorting, and pagination. This could be through a dedicated API or integrated within a full-stack application.
    *   **Important Data Rule:** Only display users who have a corresponding record in the `Membership` table. If a user exists but isn't in `Membership`, this means they are not a part of your organization and should not be included in this list.

*   **User Interface Functionality:**
    *   The UI should display a list of organization members.
    *   Each member entry must show at least: **Name, Email, Role, Guest Status (true/false), Last Login Date, and associated Team Names**.
    *   Provide UI controls for users to:
        *   **Filter by:**
            *   `Role` (e.g., OWNER, MEMBER, VIEWER) - Allow selection of one or multiple roles.
            *   `Guest` status (true/false).
            *   `Teams` - Allow selection of one or multiple teams (display users belonging to *any* of the selected teams).
            *   Users with `No Team` assigned.
            *   Text `Search` (on Name or Email fields).
        *   **Sort by:**
            *   `Name` (ascending/descending).
            *   `Email` (ascending/descending).
            *   `Role` (ascending/descending).
            *   `Last Login` date (ascending/descending; consider how to handle users who have not logged in).
            *   `Teams` (ascending/descending based on team names).
        *   **Paginate** the results.

**Focus & Approach:**

*   Please use the provided **database schema structure** as is. Your focus should be on building the functionality on top of it.
*   **Functionality first:** Aim to get the core filtering, sorting, and display working. Don't worry excessively about perfecting every single edge case.
*   **Document edge cases:** If you identify a tricky edge case (e.g., complex filtering interaction) that you don't have time to fully resolve, please just leave a note about it in the README instead of spending too much time on it.
*   **AI Assistance:** Feel free to use AI coding tools! They are part of modern development. However, be mindful that integrating AI-generated code might sometimes require extra effort to ensure it fits the specific requirements and quality standards. This exercise is designed to be somewhat resistant to trivial AI solutions due to the specific data relationships and filter combinations.

## Technology Constraints & Flexibility

Here are the technology guidelines for this task:

*   **Mandatory:**
    *   Your solution should be built using a **JavaScript-based technology** (e.g., Node.js, Deno, Bun, or client-side JavaScript/TypeScript).
    *   You must use **Prisma** (with `@prisma/client`) for database interaction, based on the provided `schema.prisma`.
    *   The database will be **SQLite** (as per the setup).

*   **Your Choice:**
    *   **Frameworks and Libraries:** You are free to choose your preferred backend framework (if any), frontend library/framework (e.g., React, Vue, Svelte, Next.js, etc.), or decide to use vanilla JavaScript, HTML, and CSS.
    *   **Other Tools:** Decisions on state management, UI component libraries, and styling approaches are up to you. We prioritize functionality and clean code.

## Deliverables

*   A link to a Git repository (e.g., GitHub, GitLab) containing your complete source code.
*   This `README.md` file updated with:
    *   Clear instructions on how **you** intended the app to be run (e.g., `npm run start`, `npm run dev`, or separate commands if you chose a split architecture).
    *   Any notes on assumptions made or known limitations/edge cases you didn't fully address.
    *   If you will have enough time you can drop a video with demo of the app on slack channel.

## Evaluation Criteria

We're keen to see your approach and how you think! We'll primarily look at:

*   **Problem Solving:** The ideas and logic used in your code, especially in the backend data fetching and filtering.
*   **Readability & Simplicity:** How clean, understandable, and maintainable your code is. We appreciate simplicity over unnecessary layers of abstraction.
*   **Functionality:** Does the core task work as expected?
*   **Prioritization & Delivery:** We value seeing the core feature working end-to-end. Please note any limitations or edge cases you didn't fully address rather than getting stuck, though polishing is great if time permits.


## Time & Help

*   **Time Limit:** Please aim to complete this by the end of your trial day with us.
*   **Questions?** If you run into any blockers or have questions about the requirements, please don't hesitate to ask us on the provided Slack channel!

We're excited to see what you build. Good luck and have fun!
