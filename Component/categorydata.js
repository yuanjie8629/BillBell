exports.getValue = (array, key) => {
  return array.filter(o => o.key === key)[0].value;
};

exports.categories = [
  {key: 'Bill & Utility', value: 'Bill & Utility'},
  {key: 'Transport & Travel', value: 'Transport & Travel'},
  {key: 'Education', value: 'Education'},
  {key: 'Entertainment', value: 'Entertainment'},
  {key: 'Drink & Dine', value: 'Drink & Dine'},
  {key: 'Grocery', value: 'Grocery'},
  {key: 'Shopping', value: 'Shopping'},
  {key: 'Health & Fitness', value: 'Health & Fitness'},
  {key: 'Personal Care', value: 'Personal Care'},
  {key: 'Others', value: 'Others'},
];
