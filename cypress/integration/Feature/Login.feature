Feature: Login Functionality

    Feature This Feature is required to check login functionality for valid and invalid user

    Scenario: Login check for a valid user
        Given Appliction up and Running
        When try to login with valid credentails
        Then user should able to login to the application


    Scenario: Login check for a invalid user
        Given Appliction up and Running
        When try to login with email as "Test@intrivo.com" and password as "WrongPwd"
        Then error message should display