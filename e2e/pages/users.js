const { apiRequest } = require("../support/utils");

async function listUsers(world) {
  return apiRequest(world, "GET", "/users");
}

async function createUser(world, name, email, age) {
  return apiRequest(world, "POST", "/users", { body: { name, email, age } });
}

async function createUserWithMissingField(world, missingField, partialBody) {
  const body = {
    name: "Test User",
    email: "noemail@example.com",
    age: 25,
    ...partialBody,
  };
  delete body[missingField];
  return apiRequest(world, "POST", "/users", { body });
}

async function getUser(world, email) {
  return apiRequest(world, "GET", `/users/${encodeURIComponent(email)}`);
}

async function updateUser(world, email, body) {
  return apiRequest(world, "PUT", `/users/${encodeURIComponent(email)}`, {
    body,
  });
}

async function updateUserWithMissingField(world, email, missingField) {
  const body = { name: "Updated Name", email, age: 30 };
  delete body[missingField];
  return apiRequest(world, "PUT", `/users/${encodeURIComponent(email)}`, {
    body,
  });
}

async function deleteUser(world, email, headers = {}) {
  return apiRequest(world, "DELETE", `/users/${encodeURIComponent(email)}`, {
    headers,
  });
}

module.exports = {
  listUsers,
  createUser,
  createUserWithMissingField,
  getUser,
  updateUser,
  updateUserWithMissingField,
  deleteUser,
};
