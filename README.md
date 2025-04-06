# 🧹 NM Cleaner

A powerful utility to clean up `node_modules` folders across your projects. Perfect for developers who want to free up disk space by removing unused `node_modules` directories.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-ISC-blue.svg?style=for-the-badge)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## ✨ Features

- 🔍 Recursively finds all `node_modules` folders in a directory
- 💾 Shows the size of each `node_modules` folder
- 🗑️ Interactive deletion with confirmation prompts
- 📊 Summary of deleted folders and freed space
- 🛡️ Safe deletion with error handling
- 🎯 Target specific directories with path parameter

## 📦 Installation

```bash
# Install globally using npm
npm install -g nmcleaner

# Or install locally in your project
npm install nmcleaner
```



## 🚀 Usage

### Basic Usage

```bash
# If installed globally
nmcleaner

# If installed locally
npx nmcleaner

# Run in a specific directory
nmcleaner path=/path/to/your/projects
```

### Example Output

```
Found 3 node_modules folders:

Delete node_modules at /path/to/project1/node_modules? (y/N)
Delete node_modules at /path/to/project2/node_modules? (y/N)
Delete node_modules at /path/to/project3/node_modules? (y/N)

✅ Deleted 2 folders. All done!
```

## 🔧 Configuration

The utility accepts the following parameters:

- `path`: Specify the target directory to scan (default: current directory)
  ```bash
  node index.js path=/Users/username/projects
  ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.



## 🔍 How It Works

1. The utility scans the current directory where the user executed nmcleaner if no specific path is provided, recursively checking for all subdirectories.
2. It identifies all `node_modules` folders
3. For each folder found:
   - Shows the path along size in  MB
   - Asks for confirmation
   - Deletes if confirmed
4. Provides a summary of actions taken

## 🛠️ Built With

- [Node.js](https://nodejs.org/)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [inquirer](https://github.com/SBoudrias/Inquirer.js)
- [yoctocolors](https://github.com/sindresorhus/yoctocolors) 
