How to build project from source and run it:

1. Clone repo
2. Make sure you have npm installed (type `npm -version` in the terminal to check)
3. Navigate to the folder which contains this project. It is called logic-online by default. I will refer to this folder from now on as `{project_directory}`
4. Open `{project_directory}/server/src/ts/index.ts`. Set the const named `PUBLIC_FOLDER_PATH` to the full path of the `{project_directory}/client/public` folder
5. Navigate back to `{project_directory}`
6. In the terminal, run: `npm install` to install dependencies
7. Run: `npm run build` to compile the server and client
8. Run: `npm run start:server` to start the server
9. Navigate to localhost:3000 in a browser
