import fs from 'fs';
import path from 'path';

export const getAllFilesPath = (dirPath: string) => {
    const files = fs.readdirSync(dirPath);
    let filesPath: string[] = [];
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            filesPath = filesPath.concat(getAllFilesPath(filePath));
        } else {
            filesPath.push(filePath);
        }
    });
    return filesPath;
}