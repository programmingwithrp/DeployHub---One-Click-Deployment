import { S3 } from "aws-sdk";
import fs from "fs";

// Deactivated
const s3 = new S3({
  accessKeyId: "c2ea59b0ca156bb407ce948da3c123e6",
  secretAccessKey: "3b2b6337916c4ea79fa815f8615bcdf955736dce8b6448d0ab062cd1e4df0ae2",
  endpoint: "https://94163a17f321d34c106874452c9789aa.r2.cloudflarestorage.com"
});

export const uploadFile = async (fileName: string, localFilePath: string) => {
  const fileContent = fs.readFileSync(localFilePath);
  const params = {
    Bucket: "vercel-deployer",
    Key: fileName,
    Body: fileContent
  };
  const response = await s3.upload(params).promise();
  console.log(response);
};
