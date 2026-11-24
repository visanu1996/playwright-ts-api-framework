import path from 'node:path'
import { readFileSync } from 'node:fs'
import yaml from 'js-yaml'

export function readYaml<T>(filename: string):T{
    const filePath = path.resolve(__dirname,'../../tests/data',filename)
    const yamlContent = readFileSync(filePath,"utf-8")
    return yaml.load(yamlContent) as T
}