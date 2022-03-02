import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
var images = document.getElementsByTagName('img');
console.log(images);
