## Presequites

- NPM ver 9.6.4 or above
- Node ver 20.0.0 or above

## Tech Stack Uses

- Backend : NodeJs, Express, PostgreSQL (Supabase), Sequelize
- Frotend : ReactJs

## Database Uses

- **PostgreSQL**

## AI and automation 
AI and automation are implemented when calculating the score after the user completes the quiz

## Run In Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17959065-7c216e54-0e4d-4697-8126-256f31182ec6?action=collection%2Ffork&collection-url=entityId%3D17959065-7c216e54-0e4d-4697-8126-256f31182ec6%26entityType%3Dcollection%26workspaceId%3D219df081-6e17-4ea0-bf77-e0f8bf10fd6a)

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/rdhhauzan/sevima-hackaton.git
   ```

2. Go to backend folder and Install dependencies

   ```sh
   cd backend && npm install
   ```

3. Go to frontend folder and Install dependencies and copy .env

   ```sh
   cd frontend && npm install && cp .env.example .env
   ```

4. Restore Database using hackaton.sql (POSTGRESQL)
5. Go to backend/config folder to edit your database credentials
6. Run backend server
   ```sh
   cd backend && nodemon index.js
   ```
7. In new terminal, run frontend server
   ```sh
   cd frontend && npm start
   ```
## Credentials
- User Role
    ```sh
        Email : users@mail.com
        Password : user123
    ```
- Admin Role
    ```sh
        Email : admin@mail.com
        Password : admin123
    ```

## Notes

- Make sure you run the backend server with 3000 port, and ReactJS on 3001/anything else Port
- If the backend server is running on port other than 3000 you need to change your .env REACT_APP_API_URL to your backend server url
- You Need to run the backend server and ReactJS at the same time for run the project
