Feature: Create user

Scenario: Creating a user
  Given I provide valid user details
  When I attempt to create a user
  Then the user should be saved successfully 

Scenario: Invalid password
  Given I provide an invalid password
  When I attempt to create a user
  Then I should get an invalid details error 