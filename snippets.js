module.exports = {
  queryStringToObject: queryString => queryString.split("&").map(p => p.split("=")).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
};
