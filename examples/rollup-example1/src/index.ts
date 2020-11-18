import { camelCase } from 'lodash-es';
import moduleA from './moduleA';
import { name } from './config.json';
import $ from 'jquery';
import './mobuleB';

// 注释...
console.log(camelCase('hello'));

console.log(moduleA);

console.log(name);

console.log(__ENV__);
if (__ENV__ === 'prod') {
  console.log('prod');
} else {
  console.log('test');
}

Promise.resolve().then(() => {
  console.log('hh');
});

// __BUILD_DATE__
console.log(new Date(__BUILD_DATE__));

console.log($.extend);

export { moduleA, name };
