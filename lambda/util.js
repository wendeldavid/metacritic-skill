const interpolateString = function(template, valueMap) {
    return Object.keys(valueMap).reduce((result, key) => {
      const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
      return result.replace(regex, valueMap[key]);
    }, template);
}

module.exports  = {
    interpolateString : interpolateString
}
