async function apiRequest(world, method, path, { body, headers = {} } = {}) {
  const url = `${world.baseURL}/${world.apiEnv}${path}`;
  const options = {
    method,
    headers: { "Content-Type": "application/json", ...headers },
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  world.status = res.status;
  world.responseBody =
    res.status === 204 ? null : await res.json().catch(() => null);
  return res;
}

module.exports = { apiRequest };
