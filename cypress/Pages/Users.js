const { log } = require("cypress/lib/logger");

const logs = []
Cypress.on('log:added', (log) => {
  const message = `${log.consoleProps.Command}: ${log.message}`
  logs.push(message)
})


class Users {
  elements = {
    lnkUsers: () => cy.xpath("//a[text()='Users']", { timeout: 10000 }),
    lnkLogout: () => cy.xpath("//a[text()='Logout']"),
    txtUserEmail: () => cy.xpath('input[name=email]'),
    txtEmpId: () => cy.xpath("//input[@name='identifier']"),
    txtFirstName: () => cy.xpath("//input[@name='first_name']"),
    txtLstName: () => cy.xpath("//input[@name='last_name']"),
    txtEmail: () => cy.xpath("//input[@name='email']"),
    txtSearch: () => cy.xpath("//input[@placeholder='Search']"),
    btnSaveUser: () => cy.xpath("//button[text()='Save User']", { timeout: 10000 }),
    btnAddUser: () => cy.xpath("//span[text()='Add User']", {timeout: 10000}),
    btntoastClose: () => cy.xpath("//div[@id='toasts-root']//button[@class='self-start']", {timeout: 10000}),
    toastMsg: () => cy.xpath("//div[@id='toasts-root']//h4", {timeout: 10000})

  };

  verifyUserDisplay() {
    this.elements.lnkUsers().should("exist");
  }

  searchUser(searchItem) {
    this.elements.lnkUsers().click();
    this.elements.txtSearch().type(searchItem).type('{enter}');
  }

  adduser(empId, firstName, lastName, email) {

    this.elements.txtEmpId().type(empId);
    this.elements.txtFirstName().type(firstName);
    this.elements.txtLstName().type(lastName);
    this.elements.txtEmail().type(email);

  }

  searchByFirstName(firstName){
    this.navigateToGroups()
    cy.get('[placeholder="Search"]').clear().type(firstName+'{enter}')
    cy.get('.MuiDataGrid-renderingZone').find('div[role="row"]').each(tr =>{
        cy.wrap(tr).find('.MuiDataGrid-cell.MuiDataGrid-cell--textLeft').eq(1).invoke('text').should('contain',firstName)            
    })
  }

  searchByLastName(lastName){
    this.navigateToGroups()
    cy.get('[placeholder="Search"]').clear().type(lastName+'{enter}')
    cy.get('.MuiDataGrid-renderingZone').find('div[role="row"]').each(tr =>{
        cy.wrap(tr).find('.MuiDataGrid-cell.MuiDataGrid-cell--textLeft').eq(2).invoke('text').should('contain',lastName)            
    })
  }

  searchByEmail(email){
    this.navigateToGroups()
    cy.get('[placeholder="Search"]').clear().type(email+'{enter}')
    cy.get('.MuiDataGrid-renderingZone').find('div[role="row"]').each(tr =>{
        cy.wrap(tr).find('.MuiDataGrid-cell.MuiDataGrid-cell--textLeft').eq(3).invoke('text').should('contain',email)            
    })
  }

  
 
  NavigateToUsers() {
    cy.xpath("//li/a[text()='Users']", { timeout: 10000 }).click({force: true});
    //this.elements.lnkUsers().click({ multiple: true });
    //cy.get('nav').find('Users').click()
  }

  NavigateToAddUser() {
    this.elements.btnAddUser().click();
  }

  SubmitSave() {
    this.elements.btnSaveUser().click();
  }

  logout() {
    this.elements.lnkLogout().click();
   }

   verifyUserCreation(username, email){
     cy.wait(2000);

     try{
     cy.get('.css-xuudxc').invoke('text').then((msg)=>{
      cy.log(msg);
      cy.log(" User Details"+username);
      cy.get('.self-start').click({ multiple: true });        
     });
    } catch(e){
      cy.log(" User Details-> "+username + email);
      cy.wait(3000);
      cy.get('.self-start').click({ multiple: true });
    }
     
   }
}
module.exports = new Users();
