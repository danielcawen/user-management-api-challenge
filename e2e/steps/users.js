const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const {
  listUsers,
  createUser,
  createUserWithMissingField,
  getUser,
  updateUser,
  updateUserWithMissingField,
  deleteUser,
} = require("../pages/users");

Given(
  "a user exists with name {string}, email {string} and age {int}",
  async function (name, email, age) {
    await deleteUser(this, email, { Authentication: this.authToken }).catch(
      () => {}
    );
    await createUser(this, name, email, age);
    this.createdUsers.push(email);
  }
);

When("I list all users", async function () {
  await listUsers(this);
});

When(
  "I create a user with name {string}, email {string} and age {int}",
  async function (name, email, age) {
    await createUser(this, name, email, age);
    if (this.status === 201) this.createdUsers.push(email);
  }
);

When(
  "I create a user with missing {string} field using email {string} and age {int}",
  async function (missingField, email, age) {
    await createUserWithMissingField(this, missingField, { email, age });
  }
);

When(
  "I create a user with missing {string} field using name {string} and age {int}",
  async function (missingField, name, age) {
    await createUserWithMissingField(this, missingField, { name, age });
  }
);

When(
  "I create a user with missing {string} field using name {string} and email {string}",
  async function (missingField, name, email) {
    await createUserWithMissingField(this, missingField, { name, email });
  }
);

When("I get user with email {string}", async function (email) {
  await getUser(this, email);
});

When(
  "I update user with email {string} to name {string} and age {int}",
  async function (email, name, age) {
    await updateUser(this, email, { name, email, age });
  }
);

When(
  "I update user with email {string} to new email {string}, name {string} and age {int}",
  async function (oldEmail, newEmail, name, age) {
    await updateUser(this, oldEmail, { name, email: newEmail, age });
    if (this.status === 200) {
      this.createdUsers = this.createdUsers.filter((e) => e !== oldEmail);
      this.createdUsers.push(newEmail);
    }
  }
);

When(
  "I update user with email {string} with missing {string} field",
  async function (email, missingField) {
    await updateUserWithMissingField(this, email, missingField);
  }
);

When(
  "I delete user with email {string} using valid authentication",
  async function (email) {
    await deleteUser(this, email, { Authentication: this.authToken });
    this.createdUsers = this.createdUsers.filter((e) => e !== email);
  }
);

When(
  "I delete user with email {string} without authentication",
  async function (email) {
    await deleteUser(this, email);
  }
);

When(
  "I delete user with email {string} using token {string}",
  async function (email, token) {
    await deleteUser(this, email, { Authentication: token });
  }
);

Then("the response status should be {int}", function (expectedStatus) {
  assert.strictEqual(
    this.status,
    expectedStatus,
    `Expected status ${expectedStatus} but got ${this.status}. Body: ${JSON.stringify(this.responseBody)}`
  );
});

Then("the response body is a JSON array", function () {
  assert.ok(
    Array.isArray(this.responseBody),
    `Expected a JSON array but got: ${JSON.stringify(this.responseBody)}`
  );
});

Then("the list includes a user with email {string}", function (email) {
  assert.ok(
    Array.isArray(this.responseBody) &&
      this.responseBody.some((u) => u.email === email),
    `Expected list to include user with email "${email}" but got: ${JSON.stringify(this.responseBody)}`
  );
});

Then("the response body contains a user with email {string}", function (email) {
  assert.strictEqual(
    this.responseBody && this.responseBody.email,
    email,
    `Expected email "${email}" but got: ${JSON.stringify(this.responseBody)}`
  );
});

Then("the response body contains the user name {string}", function (name) {
  assert.strictEqual(
    this.responseBody && this.responseBody.name,
    name,
    `Expected name "${name}" but got: ${JSON.stringify(this.responseBody)}`
  );
});

Then("the response body contains the user age {int}", function (age) {
  assert.strictEqual(
    this.responseBody && this.responseBody.age,
    age,
    `Expected age ${age} but got: ${JSON.stringify(this.responseBody)}`
  );
});

Then(
  'the response body contains fields "name", "email" and "age"',
  function () {
    const body = this.responseBody;
    assert.ok(
      body && "name" in body,
      `Missing "name" in response: ${JSON.stringify(body)}`
    );
    assert.ok(
      body && "email" in body,
      `Missing "email" in response: ${JSON.stringify(body)}`
    );
    assert.ok(
      body && "age" in body,
      `Missing "age" in response: ${JSON.stringify(body)}`
    );
  }
);

Then("the response body contains an error message", function () {
  assert.ok(
    this.responseBody && typeof this.responseBody.error === "string",
    `Expected response to contain an "error" string but got: ${JSON.stringify(this.responseBody)}`
  );
});
