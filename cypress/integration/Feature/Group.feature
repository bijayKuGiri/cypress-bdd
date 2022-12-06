Feature: Group Functionality

    Feature This Feature is required to check the Group related functionality

    Background: Login
        Given Logged in to potal with email as "bijaykumargiri+qaportal@gmail.com" and password as "Test123!"

    Scenario: Add a new Group
        When try add a new Group by using Group Data
        Then Groups should be created

    @focus
    Scenario: Delete Group
        When trying to Delete Group
            | groupName     |
            | OnGo_GROUP_41 |
        Then Group should be Deleted

