Feature: Update User
  As an API consumer
  I want to update an existing user
  So that I can keep user information current

  Scenario: Update an existing user returns 200
    Given a user exists with name "Original Name", email "updatetest@example.com" and age 25
    When I update user with email "updatetest@example.com" to name "Updated Name" and age 26
    Then the response status should be 200
    And the response body contains the user name "Updated Name"
    And the response body contains the user age 26

  Scenario: Update preserves the email field
    Given a user exists with name "Email Keeper", email "emailkeeper@example.com" and age 30
    When I update user with email "emailkeeper@example.com" to name "Email Keeper Updated" and age 31
    Then the response status should be 200
    And the response body contains a user with email "emailkeeper@example.com"

  Scenario: Update a user to a new email returns 200
    Given a user exists with name "Email Changer", email "oldemail@example.com" and age 22
    When I update user with email "oldemail@example.com" to new email "newemail@example.com", name "Email Changer" and age 22
    Then the response status should be 200
    And the response body contains a user with email "newemail@example.com"

  Scenario: Update a non-existent user returns 404
    When I update user with email "ghost@example.com" to name "Ghost" and age 99
    Then the response status should be 404
    And the response body contains an error message

  Scenario: Update a user with missing name returns 400
    Given a user exists with name "Valid User", email "validupdate@example.com" and age 28
    When I update user with email "validupdate@example.com" with missing "name" field
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Update a user with missing age returns 400
    Given a user exists with name "Valid User 2", email "validupdate2@example.com" and age 28
    When I update user with email "validupdate2@example.com" with missing "age" field
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Update a user with duplicate email returns 409
    Given a user exists with name "User A", email "usera@example.com" and age 20
    And a user exists with name "User B", email "userb@example.com" and age 21
    When I update user with email "usera@example.com" to new email "userb@example.com", name "User A" and age 20
    Then the response status should be 409
    And the response body contains an error message
