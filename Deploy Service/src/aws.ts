import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";


const s3 = new S3({
  accessKeyId: "c2ea59b0ca156bb407ce948da3c123e6",
  secretAccessKey: "3b2b6337916c4ea79fa815f8615bcdf955736dce8b6448d0ab062cd1e4df0ae2",
  endpoint: "https://94163a17f321d34c106874452c9789aa.r2.cloudflarestorage.com"
});

export async function downloadS3Folder(prefix: string) {
  if (prefix === "") {
    return;
  }
  const params = {
    Bucket: "vercel-deployer",
    Prefix: prefix
  };
  const data = await s3.listObjectsV2(params).promise();
  console.log(data);
  const allPromises =
    data.Contents?.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        if (!Key) {
          resolve("");
          return;
        }
        const finalOutputPath = path.join(__dirname, Key);
        const outputFile = fs.createWriteStream(finalOutputPath);
        const dirName = path.dirname(finalOutputPath);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }
        s3.getObject({
          Bucket: "vercel-deployer",
          Key
        })
          .createReadStream()
          .pipe(outputFile)
          .on("finish", () => {
            console.log(`Downloaded ${Key}`);
            resolve("");
          });
      });
    }) || [];
  console.log("awaiting");
  await Promise.all(allPromises?.filter((x) => x !== undefined));
}

export async function copyFinalDestinationFiles(projectId: string) {
  const folderPath = path.join(__dirname, `projects/${projectId}/dist`);
  console.log("folderPath" + folderPath);

  const allFilePaths = getAllFilesPath(folderPath).map(
    (filePath) => filePath.replace(/\\/g, "/")
  );
  allFilePaths.forEach((filePath) => {
    console.log(`dist/${projectId}/${filePath.slice(folderPath.length + 1)}`);
    uploadFile(`dist/${projectId}/${filePath.slice(folderPath.length + 1)}`, filePath);
  });
}

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

export const getAllFilesPath = (dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  let filesPath: string[] = [];
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filesPath = filesPath.concat(getAllFilesPath(filePath));
    } else {
      filesPath.push(filePath);
    }
  });
  return filesPath;
};
