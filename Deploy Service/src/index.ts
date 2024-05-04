import { createClient, commandOptions } from "redis";
import { copyFinalDestinationFiles, downloadS3Folder } from "./aws";
import { buildProject } from "./utils";
const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main() {
  while (true) {
    const message = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-queue",
      0
    );
    const projectId = message?.element;
    if (projectId) {
      console.log("Building project with id: " + projectId);
      // Wait for 5 second
      await new Promise((resolve) => setTimeout(resolve, 7000));
      await downloadS3Folder("projects/" + projectId);
      await buildProject(projectId);
      await copyFinalDestinationFiles(projectId);
      publisher.hSet("build-status",projectId, "deployed");
    }
  }
}
main();