const { Before, After } = require("@cucumber/cucumber");
const { apiRequest } = require("./utils");

Before(async function () {
  this.baseURL = process.env.BASE_URL;
  this.apiEnv = process.env.API_ENV;
  this.authToken = process.env.AUTH_TOKEN;
  this.createdUsers = [];
  this.status = null;
  this.responseBody = null;
});

After(async function () {
  for (const email of this.createdUsers) {
    try {
      await apiRequest(this, "DELETE", `/users/${encodeURIComponent(email)}`, {
        headers: { Authentication: this.authToken },
      });
    } catch (error) {
      console.log(
        "error trying to deleted the created data at the after hook: " + error
      );
    }
  }
});
