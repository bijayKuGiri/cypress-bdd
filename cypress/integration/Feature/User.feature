Feature: Login Functionality
  Feature This Feature is required to check User functionality

  Background: Login

    Given Login potal with email as "bijaykumargiri+qaportal@gmail.com" and password as "Test123!"

  Scenario: Create a New User with Existing Data
    When try to Create a new user by passing EmployeeId as "2022030064", firstName as " cySecond5", lastName as "cylastname4" and Email as "bijaykumargiri+30403@gmail.com"
    Then user should be added successfully.

  Scenario: Search for an user
    When try to Search as "Bijay"
    Then Result should displays searched item


  # Scenario: Create Users with bulk data from excel
  #   When try to Create user by using data from excel
  #   Then Users should be created sucessfully

  @focus
  Scenario: Create Users with bulk Data
    When try to Create a new user by passing
      | EmpID | FirstName | LastName  | Email                               |
      | 38    | Srikant1  | Mahapatro | bijaykumargiri+intrivo131@gmail.com |
      | 39    | Nibedita1 | Goswamy   | bijaykumargiri+intrivo141@gmail.com |
      | 40    | Neeraj1   | Mourya    | bijaykumargiri+intrivo151@gmail.com |
      | 41    | Bijay2    | Giri      | bijaykumargiri+intrivo121@gmail.com |
      | 43    | Srikant2  | Mahapatro | bijaykumargiri+intrivo131@gmail.com |
      | 44    | Nibedita2 | Goswamy   | bijaykumargiri+intrivo141@gmail.com |
      | 45    | Neeraj2   | Mourya    | bijaykumargiri+intrivo251@gmail.com |


    Then user should be added successfully.