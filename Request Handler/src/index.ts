import express from "express";
import { S3 } from "aws-sdk";
import mime from "mime-types";

const app = express();
// Deactivated
const s3 = new S3({
  accessKeyId: "c2ea59b0ca156bb407ce948da3c123e6",
  secretAccessKey: "3b2b6337916c4ea79fa815f8615bcdf955736dce8b6448d0ab062cd1e4df0ae2",
  endpoint: "https://94163a17f321d34c106874452c9789aa.r2.cloudflarestorage.com"
});

app.get("/*", async (req, res) => {
  const path = req.path;
  console.log(req.hostname);
  const id = req.hostname.split(".")[0];
  console.log(id, path);
  const params = {
    Bucket: "vercel-deployer",
    Key: `dist/${id}${path}`
  };
  const content = await s3.getObject(params).promise();
  res.set("Content-Type", mime.lookup(path) || "application/octet-stream");
  res.send(content.Body);
});

app.listen(3001);
