import {  Given,  When,  And,  Then} from "cypress-cucumber-preprocessor/steps"
//import {  element } from "wd/lib/commands"

const fs = require("fs")
const csvToJson=require('csvtojson')
let csv2Json = require('convert-csv-to-json')
const logInPage = require('../../../Pages/landing')
const user = require('../../../Pages/Users')


Given('Login potal with email as {string} and password as {string}', (email, password) => {
  cy.visit("/");
  logInPage.typeEmailAndPwd(email, password);
  logInPage.VerifyDashboardActive();
});



When('try to Create a new user by passing', (datatable) => {
  user.NavigateToUsers();
  datatable.hashes().forEach(ele => {
    user.NavigateToAddUser();
    user.adduser(ele.EmpID, ele.FirstName, ele.LastName, ele.Email);
    user.SubmitSave();
    user.verifyUserCreation()
    user.NavigateToUsers();
  });
});

When('try to Search as {string}', (username) => {
  user.searchUser(username);
  cy.wait(3000);
});
Then('user should be added successfully.', () => {
  user.logout();
});

Then('Result should displays searched item', () => {
  cy.wait(5000);
  user.logout();
});

Then('user should be added successfully',()=>{
  cy.wait(3000);
  cy.get('.css-xuudxc').invoke('text').then((msg)=>{
    cy.wrap(msg).should('have.text',"Success!")})
    cy.get('.css-qvaxuq').invoke('text').then((msg)=>{
      cy.wrap(msg).should('have.text',"Group deleted sucessfully") 
    }) 
  user.logout(); 
})

Then('Users should be created sucessfully',()=>{
  cy.wait(5000);
  user.logout(); 
})


When('try to Create user by using data from excel', () => {
  
  cy.parseXlsx('cypress/fixtures/sample-users-test-data-1-2.xlsx').then((jsonData) =>{
    const rowLength = Cypress.$(jsonData[0].data).length;
    var jsonData = jsonData[0].data;
    var data = []
    //data.table = []
    for (let i=1; i <rowLength ; i++){
      var obj = {
        EmpId:jsonData[i][0],
        FirstName:jsonData[i][1],
        LastName:jsonData[i][2],
        Email:jsonData[i][3],
        MobileNo:jsonData[i][4]

        // Identifier:jsonData[i][0],
        // FirstName:jsonData[i][1],
        // LastName:jsonData[i][2],
        // Email:jsonData[i][3],
        // MobileNo:jsonData[i][4]
      }
      data.push(obj)}
    cy.writeFile("cypress/fixtures/TestData.json", JSON.stringify(data), function(err) {
      if (err) throw err;
      console.log('complete');
      })
    user.NavigateToUsers();
    cy.wait(1000);
    cy.fixture('TestData').then(data => {
      
      for ( let j = 0; j < rowLength-1; j++) {
        
        user.NavigateToAddUser();
        
        user.adduser(data[j].EmpId, data[j].FirstName, data[j].LastName, data[j].Email);
        user.SubmitSave();
        user.verifyUserCreation(data[j].FirstName + data[j].LastName,data[j].Email);
        cy.wait(2000);
        user.NavigateToUsers();
        
      }
    })
  });
  
})


When('try to Create user by using data from csv', () => {
  // csvToJson()
  //   .fromFile('cypress/fixtures/UserData.csv')
  //   .then((jsonData) =>{
  //     console.log("bijay")
  //     console.log(jsonData)
  //     });


  cy.readFile('cypress/fixtures/UserData.csv')
  .then((data) => {
     cy.task('csvToJson', data).then((data) => {
            console.log(data)
        })
   })
  //csv2Json.generateJsonFileFromCsv('cypress/fixtures/UserData.csv','cypress/fixtures/UserData.json')
    

    // csv = fs.readFileSync("cypress/fixtures/UserData.csv","utf8");
    // var array = csv.toString().split("\r");

    // let result = [];

    // let headers = array[0].split(", ")


    // for (let i = 1; i < array.length - 1; i++) {
    // let obj = {}


    // let str = array[i]
    // let s = ''

    // let flag = 0
    // for (let ch of str) {
    //   if (ch === '"' && flag === 0) {
    //   flag = 1
    //   }
    //   else if (ch === '"' && flag == 1) flag = 0
    //   if (ch === ', ' && flag === 0) ch = '|'
    //   if (ch !== '"') s += ch
    // }
    // let properties = s.split("|")

    // for (let j in headers) {
    //   if (properties[j].includes(", ")) {
    //   obj[headers[j]] = properties[j]
    //     .split(", ").map(item => item.trim())
    //   }
    //   else obj[headers[j]] = properties[j]
    // }

    // result.push(obj)
    // }

    // let json = JSON.stringify(result);
    // fs.writeFileSync('cypress/fixtures/UserData.json', json);
  
  
    user.NavigateToUsers();
    cy.wait(1000);
    cy.fixture('UserData').then(data => {
      
      for ( let j = 0; j < rowLength-1; j++) {
        
        user.NavigateToAddUser();
        cy.wait(1000);
        user.adduser(data[j].EmpId, data[j].FirstName, data[j].LastName, data[j].Email);
        user.SubmitSave();
        user.verifyUserCreation(data[j].FirstName + data[j].LastName,data[j].Email);
        user.NavigateToUsers();
      }
    })
  });
  
