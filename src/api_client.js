const host = 'http://localhost:3000';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.text().then(text => {
    const error = JSON.parse(text)
    return Promise.reject({ ...error, status: response.status })
  })
}

export function post(path, data) {
  return fetch(`${host}/${path}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${host}`,
    },
  }).then(handleResponse)
}
