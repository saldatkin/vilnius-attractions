
const options = document.getElementsByTagName('option');
console.log(options);
for (let i = 0; i < options.length; i++) {
  const element = options[i];
  console.log(element.outerText);
}
