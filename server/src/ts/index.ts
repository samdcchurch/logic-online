import express from "express"

const PUBLIC_FOLDER_PATH = "/Users/sam/Documents/projects/logic-online/client/public"
const PORT = 3000;

const app = express();

app.use(express.static(PUBLIC_FOLDER_PATH));

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
