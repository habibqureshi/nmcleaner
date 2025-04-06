#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import colors from 'yoctocolors';


const getAllNodeModules =  (dir, results = []) => {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      try {
     
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          if (file === "node_modules") {
           console.log(colors.yellow(`node_module found at ${fullPath}`))
            const sizeInMB = (getDirSize(fullPath) / (1024 * 1024)).toFixed(2); // Convert size to MB and format to 2 decimal points
            results.push({"path": fullPath, "size": sizeInMB});
      
          } else {
             getAllNodeModules(fullPath, results);
          }
        }
      } catch (err) {
        // Skip files/directories that can't be accessed
        continue;
      }
    }
  } catch (err) {
    // Skip directories that can't be accessed
    console.log(colors.yellow(`Warning: Could not access directory ${dir}`));
  }

  return results;
};

const run = async () => {
  const baseDir = process.argv.find(arg => arg.startsWith('path='))?.split('=')[1] || process.cwd();
  const found =  getAllNodeModules(baseDir);
  process.stdout.write('\n');
  if (found.length === 0) {
    console.log(colors.yellow("No node_modules folders found."));
    return;
  }
  console.log(colors.green(`Found ${found.length} node_modules folders:\n`));

  let deletedCount = 0;
  let freedSize = 0;

  for (const folder of found) {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Delete node_modules at ${colors.cyan(folder.path)} to free ${folder.size} MB?`,
        default: false,
      },
    ]);

    if (confirm) {
      try {
        await fs.remove(folder.path);
        deletedCount++;
        freedSize += +folder.size;
        console.log(colors.red(`Deleted: ${folder.path}`));
      } catch (err) {
        console.log(colors.red(`Failed to delete: ${folder.path}`),err);
      }
    }
  }

  console.log(
    colors.green(`\n✅ Deleted ${deletedCount} node_modules. Free space ${freedSize.toFixed(2)} MB!`)
  );
};


const getDirSize = (dirPath) => {
    let size = 0;
    const files = fs.readdirSync(dirPath);
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dirPath, files[i])
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        size += stats.size;
      } else if (stats.isDirectory()) {
        size += getDirSize(filePath);
      }
    }
    return size;
  };
  
run();
