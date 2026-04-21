Feature: Create User
  As an API consumer
  I want to create a user
  So that I can register new users in an environment

  Scenario: Create a user with valid data returns 201
    When I create a user with name "juan perez", email "juan.perez@efake.com" and age 30
    Then the response status should be 201
    And the response body contains a user with email "juan.perez@efake.com"
    And the response body contains the user name "juan perez"
    And the response body contains the user age 30

  Scenario: Create a user response contains all required fields
    When I create a user with name "juan perez", email "juan.perez@efake.com" and age 25
    Then the response status should be 201
    And the response body contains fields "name", "email" and "age"

  Scenario: Create a user with duplicate email returns 409
    Given a user exists with name "Original User", email "duplicate@efake.com" and age 20
    When I create a user with name "Another User", email "duplicate@efake.com" and age 22
    Then the response status should be 409
    And the response body contains an error message

  Scenario: Create a user with missing name returns 400
    When I create a user with missing "name" field using email "missingname@efake.com" and age 28
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Create a user with missing email returns 400
    When I create a user with missing "email" field using name "No Email User" and age 28
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Create a user with missing age returns 400
    When I create a user with missing "age" field using name "No Age User" and email "noage@efake.com"
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Create a user with age below minimum (0) returns 400
    When I create a user with name "Too Young", email "tooyoung@efake.com" and age 0
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Create a user with age above maximum (151) returns 400
    When I create a user with name "Too Old", email "tooold@efake.com" and age 151
    Then the response status should be 400
    And the response body contains an error message

  Scenario: Create a user with minimum valid age (1) returns 201
    When I create a user with name "Young Valid", email "youngvalid@efake.com" and age 1
    Then the response status should be 201

  Scenario: Create a user with maximum valid age (150) returns 201
    When I create a user with name "Old Valid", email "oldvalid@efake.com" and age 150
    Then the response status should be 201
