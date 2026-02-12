function expandVariantGroups(classString) {
  const variantGroupRegex = /([a-zA-Z0-9-]+:?)+\(([^)]+)\)/g;

  return classString.replace(variantGroupRegex, (match, _variant, classes) => {
    console.log('Match:', match);
    console.log('Variant:', _variant);
    console.log('Classes:', classes);
    
    const variantPrefix = match.slice(0, match.indexOf('('));
    console.log('Prefix:', variantPrefix);
    
    const classList = classes.trim().split(/\s+/);
    console.log('Class list:', classList);
    
    const result = classList.map((cls) => `${variantPrefix}${cls}`).join(' ');
    console.log('Result:', result);
    console.log('---');
    
    return result;
  });
}

const input = 'md:(flex-col gap-5 w-60) lg:(flex-col gap-6 w-67) xl:(flex-col gap-5 w-60) flex w-75 flex-row items-start justify-start gap-6';
const output = expandVariantGroups(input);
console.log('Final output:', output);
