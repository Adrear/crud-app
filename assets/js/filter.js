const abbreviation = text => (text ? text.match(/\b\w/g).join('').slice(0,2) : '');

const formatTime = time => {
  const date = new Date(time);
  return ("0" + (date.getHours() - 3)).slice(-2) + ' : ' + ("0" + date.getMinutes()).slice(-2) + ' : ' + ("0" + date.getSeconds()).slice(-2)
}

const checkNumber = user => (!user ? user : 'No users');

const checkActive = value => (value ? 'Active' : 'Inactive');

export {abbreviation, formatTime, checkActive, checkNumber};

