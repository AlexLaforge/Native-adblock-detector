import checkUniqueView from './checkUniqueView';

function sendRequest(url) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', url, true);
  xhttp.send();
}

export function sendAdblockAnalytic({ API_URL, detected, disabled, url, window }) {
  if (!API_URL) { return; }

  const isUnique = checkUniqueView({ window });

  let apiUrl = `${API_URL}/api/v1/analytics?url=${url}`;
  apiUrl += `&using=${detected ? 1 : 0}&disabled=${disabled ? 1 : 0}&unique=${isUnique ? 1 : 0}`;
  sendRequest(apiUrl);
}

export function extraButtonClicked({ API_URL, url }) {
  if (!API_URL) { return; }

  const apiUrl = `${API_URL}/api/v1/extra-button-clicked?url=${url}`;
  sendRequest(apiUrl);
}
