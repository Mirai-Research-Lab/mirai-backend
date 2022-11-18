## This repo contains the codebase for the Express JS backend server for both the Unity Mirai Shooter Game and our Next JS website.

---

### To run the server in local environment, follow these steps:

1. Run command: `git clone https://github.com/Mirai-Research-Lab/mirai-backend.git`
2. Run command: `cd mirai-backend`
3. Run command: `npm install`
4. Run command: `nodemon ./index.ts`

The server will be running on port 3001.
To test the server, open your browser and go to `http://localhost:3001/api/players`. It will return a JSON object with the list of players.

---

### The server is deployed on Vercel and can be accessed at: https://mirai-backend.vercel.app/
