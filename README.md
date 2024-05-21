# Notes App

The Notes App is a simple CRUD operations app that allows users to manage their notes. Users can add, update, and delete notes, as well as search them by heading or body content. The app features a beautiful UI with modals for note editing and a modal for deletion confirmation.

## Features

- **CRUD Operations**: Users can add, update, and delete notes.
- **Search Functionality**: Users can search for notes by heading or body content.
- **Authentication**: Integrated authentication system using Firebase for secure user authentication.
- **Real-time Database**: Uses Firebase Realtime Database to store and retrieve user's notes efficiently and in real time.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication

## Installation

To run the app locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Mohamed-Samahi/notes-app.git
    ```

2. **Navigate to the root directory and install dependencies**:

    For the backend, run the installation command at the root folder, where the package.json file exists:
    ```sh
    cd notes-app
    npm install
    ```

3. **Set up Firebase**:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Firebase Authentication and Firebase Realtime Database in the Firebase Console.
    - Obtain the Firebase configuration values for your web app (apiKey, authDomain, projectId, storageBucket) from Firebase Console.

4. **Create a `.env` file in the root directory of the app** and add the following environment variables:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    ```

5. **Run the app**:
    First, start the backend server:
    ```sh
    npm start
    ```

## Usage

1. **Create Account/Sign In**: Users can create new accounts or sign in with existing accounts.
2. **Add Note**: Click the "Add Note" button to create a new note.
3. **Edit Note**: Click the edit icon on a note to edit its content in a modal.
4. **Delete Note**: Click the delete icon on a note to delete it, with a confirmation modal for deletion.

## Contact

For any questions or feedback, please open an issue on GitHub or contact me at [mohamedsamahi.work@gmail.com](mailto:mohamedsamahi.work@gmail.com).

## More Projects

For more projects, visit my portfolio at [https://mohamed-samahi.vercel.app/](https://mohamed-samahi.vercel.app/).
