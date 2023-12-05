# Frontend for Dropbox Clone

## Introduction
This document provides setup instructions for the frontend of the Dropbox clone, named `frontend-filebox`. The frontend is a React application that interacts with the [Dropbox Clone Backend](https://github.com/Gustolandia/dropboxbackend).

### Prerequisites
- Node.js
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**
   ```bash
   git clone [frontend-repo-url]
   cd frontend-filebox
```

2. **Install Dependencies**
   ```bash
   npm install
```

## Available Scripts

In the project directory, you can run:

- **Start the Development Server**
  ```bash
  npm start
  ```
  
This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

- **Build for Production**
  ```bash
  npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- **Run Tests**
  ```bash
  npm test
```

  Launches the test runner in interactive watch mode.

- **Eject React Scripts**
  ```bash
  npm run eject
```

**Note:** This is a one-way operation. Once you `eject`, you can’t go back! If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Dependencies
The project uses several dependencies, including React, React Router, Bootstrap, Font Awesome, and more. These are defined in the `package.json` file.

## Environment Configuration

Create a `.env` file in the project root and include the following configuration:

```dotenv
REACT_APP_API="http://127.0.0.1:8080"
```

This environment variable specifies the API endpoint that the frontend will interact with. Adjust the URL as necessary to point to your backend service.

## Development Notes
- Ensure that the `REACT_APP_API` value in the `.env` file matches the address of your [Dropbox Clone Backend](https://github.com/Gustolandia/dropboxbackend).
- For local development, the backend should typically run on `http://127.0.0.1:8080` or a similar local server address.

## Contributing
Contributions to the project are welcome. Follow standard React development practices and adhere to the project's coding guidelines when submitting contributions.

## Author
Gustavo Pedro Ricou

## License
Free to use as long as credit is given

---

For more details, check `package.json` for a complete list of dependencies and scripts. Adjust configurations and scripts as necessary for your deployment and development needs.
