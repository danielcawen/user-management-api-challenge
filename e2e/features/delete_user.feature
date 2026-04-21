Feature: Delete User
  As an API consumer
  I want to delete a user
  So that I can remove users from an environment

  Scenario: Delete an existing user with valid auth returns 204
    Given a user exists with name "To Be Deleted", email "todelete@example.com" and age 30
    When I delete user with email "todelete@example.com" using valid authentication
    Then the response status should be 204

  Scenario: Deleted user no longer exists
    Given a user exists with name "Delete Verify", email "deleteverify@example.com" and age 30
    When I delete user with email "deleteverify@example.com" using valid authentication
    Then the response status should be 204
    When I get user with email "deleteverify@example.com"
    Then the response status should be 404

  Scenario: Delete a user without authentication returns 401
    Given a user exists with name "Auth Required", email "authrequired@example.com" and age 30
    When I delete user with email "authrequired@example.com" without authentication
    Then the response status should be 401
    And the response body contains an error message

  Scenario: Delete a user with an invalid token returns 401
    Given a user exists with name "Bad Token User", email "badtoken@example.com" and age 30
    When I delete user with email "badtoken@example.com" using token "wrongtoken"
    Then the response status should be 401
    And the response body contains an error message

  Scenario: Delete a non-existent user returns 404
    When I delete user with email "doesnotexist@example.com" using valid authentication
    Then the response status should be 404
    And the response body contains an error message
