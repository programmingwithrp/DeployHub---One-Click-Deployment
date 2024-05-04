import express from "express";
import cors from "cors";
import { generateCharacterId } from "./utils";
import SimpleGit from "simple-git";
import path from "path";
import { getAllFilesPath } from "./file";
import { uploadFile } from "./aws";
import dotenv from "dotenv";
import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000);

app.post("/deploy", async (req, res) => {
  console.log("Deploying...");
  const repoUrl = req.body.repoUrl;
  const projectId = generateCharacterId();

  // Get the Project from the Git Repository and Stores in Project Folder
  await SimpleGit().clone(repoUrl, path.join(__dirname, `projects/${projectId}`));

  //   Get all the files path from the Project Folder
  const filesPath = getAllFilesPath(path.join(__dirname, `projects/${projectId}`)).map(
    (filePath) => filePath.replace(/\\/g, "/")
  );
  console.log(filesPath);

  //   Deploy the Project to the S3 Bucket
  filesPath.forEach(async (filePath) => {
    const fileName = filePath.slice(__dirname.length + 1);
    console.log(fileName);
    await uploadFile(fileName, filePath);
  });

  publisher.lPush("build-queue", projectId);
  publisher.hSet("build-status", projectId, "uploaded");

  res.send({
    ProjectId: projectId
  });
});

app.get("/status/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const status = await subscriber.hGet("build-status", projectId);
  res.send({
    status: status
  });
});
