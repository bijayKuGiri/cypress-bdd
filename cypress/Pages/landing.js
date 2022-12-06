function login(){
    cy.fixture('Credential').then(data => {
    cy.get('[action="#"]').then(loginFrm =>{
        cy.wrap(loginFrm).find('[name="email"]').type(data.email)
        cy.wrap(loginFrm).find('[name="password"]').type(data.Password)
        cy.wrap(loginFrm).find('.MuiButton-label','Sign In').click()
    })})
}

class landing{ 
    
    elements={
        txtUserEmail:() => cy.get('input[name=email]'),
        txtPassword:() => cy.get('input[name=password]'),
        btnSubmit:() => cy.get('span.MuiButton-label'),
        lblMsgDetails:() => cy.get('div.css-8najj4'),
        lnkUsers:() => cy.xpath("//a[text()='Users']"),
        lnkDashboard:() => cy.xpath("//a[text()='Dashboard']", { timeout: 10000 })
       // lnkDashboard:() => cy.xpath("//a[text()='Dashboard']")
    }

    typeEmailAndPwd(email,password){
        this.elements.txtUserEmail().type(email)
        this.elements.txtPassword().type(password)
        this.elements.btnSubmit().click()
        
    }

    loginToPortal(){
        login()
    }
    verifySuccessMsg(){
        this.elements.lblMsgDetails().should("have.text","One-time passcode is algorithmically invalid. Must be 4 digits and be used within 300 seconds (5 mins).")
    }
    verifyUserDisplay(){
        this.elements.lnkUsers().should('have.focus')
    }
    VerifyDashboardActive(){
        //cy.focused().should('have.text','Dashboard')
        this.elements.lnkDashboard().should('exist')
    }

    VerifyErrorMsg(){
        this.elements.lblMsgDetails().should("have.text","Invalid username or password. Please try again.")
    }

    
}
module.exports = new landing();