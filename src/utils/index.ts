export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const urlToString = url => {
  return url
    .split('/')
    .join('')
    .split(':')
    .join('')
    .split('.')
    .join()
    .split(',')
    .join('');
};

export const isValuesEmpty = values => {
  const keysOfValus = Object.values(values);

  if (!(Object.keys(values).length > 0)) return true;
  let isEmpty = false;

  keysOfValus.forEach(value => {
    if (!value) {
      isEmpty = true;
    }
  });

  return isEmpty;
};
