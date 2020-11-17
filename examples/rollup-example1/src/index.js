import { camelCase } from 'lodash-es';
import moduleA from './moduleA';
import { name } from './config.json';

// 注释...
console.log(camelCase('hello'));

console.log(moduleA);

console.log(name);

export { moduleA, name };
