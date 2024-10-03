import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { cors } from "hono/cors";
import path from "node:path"; // Importer path
import { fileURLToPath } from "node:url"; // Importer fileURLToPath

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Hono();
app.use("/*", cors());

const dataFilePath = path.join(__dirname, "./data.json");

app.get("/json", async (c) => {
    try {
        const data = await readFile("./data.json", "utf-8");
        return c.json(JSON.parse(data));
    } catch (error) {
        console.error("Error reading data.json:", error);
        return c.json({ message: "Failed to read projects." }, 500);
    }
});

app.post("/create-project", async (c) => {
    try {
        const newProject = await c.req.json();
        const data = JSON.parse(await readFile("./data.json", "utf-8"));

        data.allprojects.push({
            Id: Date.now(),
            Title: newProject.Title,
            Description: newProject.Description,
        });

        await writeFile(dataFilePath, JSON.stringify(data, null, 2));

        return c.json({ message: "Project created successfully" });
    } catch (error) {
        console.error("Error writing to data.json:", error);
        return c.json({ message: "Failed to create project." }, 500);
    }
});

const port = 6969;
console.log(`Server running on ${port}`);
serve({
    fetch: app.fetch,
    port,
});
