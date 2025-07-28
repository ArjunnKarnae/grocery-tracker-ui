# Grocery Tracker UI

This project is the user interface (UI) for a Grocery Tracker application. It is built with modern web technologies, providing a sleek and efficient way to manage your grocery needs.

## Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
* **Vite**: A next-generation frontend tooling that provides an extremely fast development experience with Hot Module Replacement (HMR).
* **ESLint**: Configured for robust linting, including type-aware and React-specific rules, to ensure code consistency and catch potential errors early.
* **Zod**: A TypeScript-first schema declaration and validation library, used here for robust data validation, often integrated with form handling.
* **React Hook Form**: A performant, flexible and extensible forms library for React, simplifying form management and validation.
* **RTK Query**: A powerful data fetching and caching tool built on top of Redux Toolkit, specifically used for making API calls and managing server state.

## Features

Here are the key functionalities available in the Grocery Tracker UI:

1.  **User Authentication**:
    * **New User Signup**: Allows new users to create an account.
    * **Login Page**: Provides a secure login interface for existing users.
    * **JWT Security**: The application is secured using JSON Web Tokens (JWT) for authenticated access.
2.  **Home Page Dashboard**:
    * Displays a comprehensive list of all added grocery items.
    * **Category Filtering**: Users can easily filter items based on predefined categories using dedicated buttons.
    * **Search Functionality**: A search bar is available to filter grocery items by name.
3.  **Item Management**:
    * Users have options to **edit** existing grocery item details.
    * Items can be **deleted** from the list.
    * An item can be marked as **used**, which automatically reduces its count.
4.  **Add New Item**:
    * A prominent button at the bottom of the home screen opens a dedicated form for adding new grocery items to the list.


## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and npm (Node Package Manager) or Yarn installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ArjunnKarnae/grocery-tracker-ui.git](https://github.com/ArjunnKarnae/grocery-tracker-ui.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd grocery-tracker-ui
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or if you use Yarn
    # yarn install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
# or if you use Yarn
# yarn dev