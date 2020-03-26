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
