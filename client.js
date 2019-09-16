console.log('client ');

fetch('http://localhost:3456').then(r => r.json()).then(data => {
  console.log('>>', data);
}).catch(e => {
  console.log('error', e);
})