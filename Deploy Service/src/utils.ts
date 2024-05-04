import { exec, spawn } from "child_process";
import path from "path";

export function buildProject(id: string) {
  return new Promise((resolve, reject) => {
    console.log("Building project");
    console.log(path.join(__dirname + `/projects/${id}`));

    const process = exec(
      `cd ${path.join(__dirname + `/projects/${id}`)} && npm install && npm run build`
    );
    process.stdout?.on("data", (data) => {
      console.log(data.toString());
    });
    process.stderr?.on("data", (data) => {
      console.error(data.toString());
    });
    process.on("close", (code) => {
      if (code === 0) {
        resolve("Project Build Successfully");
      } else {
        reject("Error building project");
      }
    });
  });
}
