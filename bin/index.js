#!/usr/bin/env node
import path from 'path'
import chalk from 'chalk'
import fs from 'fs-extra'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const packageJSON = () => JSON.stringify(
  {
    "name": process.argv[2] ? process.argv[2] : "my-ts-project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "build": "tsc --build",
      "clean": "rm -rf dist",
      "prepublishOnly": "npm run clean && npm run build",
      "test": "jest"
    },
    "author": "",
    "license": "MIT",
    "dependencies": {
      "jest": "^26.6.3",
      "node-fetch": "^2.6.1",
      "ts-node": "^9.1.1",
      "typescript": "^4.2.4"
    },
    "devDependencies": {
      "@types/jest": "^26.0.23",
      "@types/node": "^15.0.2"
    }
  },
  null,
  2,
)

const newProjectDir = (() => (
  process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : path.join(process.cwd(), 'my-ts-project')
))()

const createFiles = () => Promise.all([
  fs.writeFile(path.join(newProjectDir, 'tsconfig.eslint.json'), ''),
  fs.writeFile(path.join(newProjectDir, 'tsconfig.json'), ''),
])

const copyFiles = () => Promise.all([
  fs.copyFile(path.join(__dirname, '../ts-project-files/tsconfig.eslint.json'), path.join(newProjectDir, 'tsconfig.eslint.json')),
  fs.copyFile(path.join(__dirname, '../ts-project-files/tsconfig.json'), path.join(newProjectDir, 'tsconfig.json')),
])

const generateProject = async () => {
  console.log(chalk.black(chalk.italic.bgMagentaBright('Making your ts project...')))
  
  await fs.mkdir(newProjectDir)
  console.log(chalk.redBright('1'))
  await createFiles()
  console.log(chalk.yellowBright('  2'))
  await copyFiles()
  console.log(chalk.blueBright('    3'))
  await fs.writeFile(path.join(newProjectDir, 'package.json'), packageJSON())

  console.log(chalk.greenBright('Your typescript project has been generated successfully!'));
  console.log(chalk.greenBright('TS PROJECT DIRECTORY @ ') + chalk.black(chalk.bgMagentaBright(newProjectDir)));
}

generateProject()