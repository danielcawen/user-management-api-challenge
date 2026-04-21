Feature: Get User by Email
  As an API consumer
  I want to retrieve a user by email
  So that I can view user details

  @smoke
  Scenario: Get an existing user returns 200
    Given a user exists with name "Get Test User", email "gettest@example.com" and age 35
    When I get user with email "gettest@example.com"
    Then the response status should be 200

  Scenario: Get an existing user returns full user data
    Given a user exists with name "Full Data User", email "fulldata@example.com" and age 40
    When I get user with email "fulldata@example.com"
    Then the response status should be 200
    And the response body contains a user with email "fulldata@example.com"
    And the response body contains the user name "Full Data User"
    And the response body contains the user age 40

  Scenario: Get a non-existent user returns 404
    When I get user with email "nonexistent@example.com"
    Then the response status should be 404
    And the response body contains an error message
