

import {Given,When,And,Then} from "cypress-cucumber-preprocessor/steps";
import landing from "../../../Pages/landing";
const logInPage = require('../../../Pages/landing'),
 user=require('../../../Pages/Users')


Given('Appliction up and Running',()=>{
    cy.visit("/")
})
When('try to login with valid credentails',()=>{
    landing.loginToPortal()
})

When('try to login with email as {string} and password as {string}',(email,password)=>{
    logInPage.typeEmailAndPwd(email,password)
})

Then('user should able to login to the application',()=>{
    logInPage.VerifyDashboardActive()
    user.logout()
})

Then('error message should display',()=>{
    logInPage.VerifyErrorMsg()
})