function getDateStamp(date) {
  // EST
  const offset = -5.0;
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const estDate = new Date(utc + (3600000 * offset));

  let monthStr = '';
  let dayStr = '';

  const month = estDate.getMonth() + 1;
  if (month > 9) {
    monthStr += month;
  } else {
    monthStr += `0${month}`;
  }

  const day = estDate.getDate();
  if (day > 9) {
    dayStr += day;
  } else {
    dayStr += `0${day}`;
  }

  return `${estDate.getFullYear()}${monthStr}${dayStr}`;
}

function deleteOldData(todayDateStamp) {
  for (let i = window.localStorage.length - 1; i >= 0; i -= 1) {
    const key = window.localStorage.key(i);
    if (key.startsWith('drizzle__visited-')
        && window.localStorage.getItem(key) !== todayDateStamp) {
      window.localStorage.removeItem(key);
    }
  }
}

export default function checkUniqueView({ window }) {
  let isUnique;
  const key = escape(`drizzle__visited-${window.location.pathname}`);

  const visitedDateStamp = window.localStorage.getItem(key);
  const todayDateStamp = getDateStamp(new Date());

  if (!visitedDateStamp || todayDateStamp !== visitedDateStamp) {
    window.localStorage.setItem(key, todayDateStamp);
    isUnique = true;
  } else {
    isUnique = false;
  }

  setTimeout(() => {
    deleteOldData(todayDateStamp);
  }, 0);

  return isUnique;
}
