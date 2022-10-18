const fs = require('fs')
const YAML = require('json-to-pretty-yaml')
const json = require('./docs.postman_collection.json')

const data = YAML.stringify(json)
fs.writeFileSync('./document.yaml', data)
