# Bugs

## PROD

### Feature:Create User

```bash
    Scenario:Create a user with duplicate email returns 409
        Givena user exists with name "Original User", email "duplicate@efake.com" and age 201
        When I create a user with name "Another User", email "duplicate@efake.com" and age 22
        Then the response status should be 409

    Expected status 409 but got 500. Body: {"error":"Internal server error"}
```

### Feature:Delete User

```bash
    Scenario:Deleted user no longer exists
        Given a user exists with name "Delete Verify", email "deleteverify@example.com" and age 30
        When I delete user with email "deleteverify@example.com" using valid authentication
        Then the response status should be 204
        When I get user with email "deleteverify@example.com"
        Then the response status should be 404

    Expected status 404 but got 500. Body: {"error":"Internal server error"}
```

### Feature:Get User by Email

```bash
    Scenario:Get a non-existent user returns 404
        When I get user with email "nonexistent@example.com"
        Then the response status should be 404

    Expected status 404 but got 500. Body: {"error":"Internal server error"}
```

## DEV

### Feature:Create User

```bash
    Scenario:Create a user with duplicate email returns 409
        Givena user exists with name "Original User", email "duplicate@efake.com" and age 201
        When I create a user with name "Another User", email "duplicate@efake.com" and age 22
        Then the response status should be 409

    Expected status 409 but got 500. Body: {"error":"Internal server error"}
```

### Feature:Delete User

```bash
    Scenario:Deleted user no longer exists
        Given a user exists with name "Delete Verify", email "deleteverify@example.com" and age 30
        When I delete user with email "deleteverify@example.com" using valid authentication
        Then the response status should be 204
        When I get user with email "deleteverify@example.com"
        Then the response status should be 404

    Expected status 404 but got 500. Body: {"error":"Internal server error"}
```

```bash
    Scenario:Delete a user without authentication returns 401
        Givena user exists with name "Auth Required", email "authrequired@example.com" and age 30
        When I delete user with email "authrequired@example.com" without authentication
        Then the response status should be 401
    
    Expected status 401 but got 204. Body: null
```

```bash
    Scenario:Delete a user with an invalid token returns 401
        Given a user exists with name "Bad Token User", email "badtoken@example.com" and age 30
        When I delete user with email "badtoken@example.com" using token "wrongtoken"
        Then the response status should be 401

    Expected status 401 but got 204. Body: null
```

### Feature:Get User by Email

```bash
    Scenario:Get a non-existent user returns 404
        When I get user with email "nonexistent@example.com"
        Then the response status should be 404

    Expected status 404 but got 500. Body: {"error":"Internal server error"}
```