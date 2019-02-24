import axios from 'axios';

export async function HTTP(method, uri, data, headers = null) {

  const localUrl = 'http://localhost:3001/user/';
  const url = `${localUrl}${uri}`.trim();
  const query = {
    method: method,
    url: url,
    timeout: 5000
  }
  if (method === 'post' || method === 'put' || method === 'delete') {
    query.data = data;
  } else if (method === 'get') {
    query.params = data
  }
  const response = await axios(query);
  return response;

}

