#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const pug = require('pug')
const yaml = require('js-yaml')

let config = {
  filters:  {
    stylus: require('pug-stylus')(),
  }
}

const doc = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'))
config = Object.assign(config, doc)

const filePath = path.join('src', 'demo', 'demo.pug')

const result = pug.renderFile(filePath, config)

if (!fs.existsSync('font')) {
  fs.mkdirSync('font')
}

const outputPath = path.join('font', 'demo.html')
fs.writeFileSync(outputPath, result)
