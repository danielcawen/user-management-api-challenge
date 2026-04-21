Feature: List Users
  As an API consumer
  I want to list all users in an environment
  So that I can see who is registered

  Scenario: List users returns HTTP 200
    When I list all users
    Then the response status should be 200

  Scenario: List users response body is a JSON array
    When I list all users
    Then the response status should be 200
    And the response body is a JSON array

  Scenario: Newly created user appears in the list
    Given a user exists with name "List Test User", email "listtest@example.com" and age 25
    When I list all users
    Then the response status should be 200
    And the response body is a JSON array
    And the list includes a user with email "listtest@example.com"
