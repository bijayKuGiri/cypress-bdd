import {Given,When,And,Then} from "cypress-cucumber-preprocessor/steps";

const user=require('../../../Pages/Users')
const group=require('../../../Pages/Groups')

let itemCount=0

function formatString(text) {
  return text.replace('kr', '').replace('1-20 of ','').trim();
}

Given('Logged in to potal with email as {string} and password as {string}', (email, password) => {
    cy.visit("/")
    group.login(email,password)
    //cy.wait(8000)
  })
  
When('try add a new Group by using Group Data', () => {
    group.navigateToGroups()
    // const countText=cy.get('.MuiTablePagination-spacer').parent().find('p').invoke('text').then(formatString)
    // console.log(countText)
    // itemCount+=parseInt(countText)
    // console.log(itemCount)
    //cy.wait(20000)
    cy.fixture('Groups').then(data => {
        data.forEach(element => {
          group.addgroups(element.GroupName,element.Location,element.Description)
          //cy.wait(3000)})
        })
      })
    })

When('trying to Delete Group', (datatable) => {
    
    //group.addgroups("AutoGroup","INIDA","Automation Testing purpose")
    //cy.fixture('Groups').then(data => {
       // data.forEach(element => {
      datatable.hashes().forEach(ele => {
        group.navigateToGroups()
        group.getRow(ele.groupName,2)
        group.DeleteGroup()       
 })
})

Then('Groups should be created', ()=>{
  cy.log('Bijay Giri')
  cy.log(cy.get('.css-xuudxc').invoke('text'))
  cy.get('.css-f3pdb3').then(msg=>{
    cy.wrap(msg).find('.css-qvaxuq').eq(4).invoke('text').should('have.text',"Group created sucessfully.") 
  })
  
})

Then('Group should be Deleted',()=> {
  cy.log(cy.get('.css-xuudxc').invoke('text'))  
    cy.get('.css-qvaxuq').invoke('text').then((msg)=>{
      cy.wrap(msg).should('have.text',"Group deleted sucessfully") 
    }) 
  })
