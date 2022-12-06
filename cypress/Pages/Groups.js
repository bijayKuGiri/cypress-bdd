

class Groups{

    elements={
        lnkGroups:() => cy.xpath("//a[text()='Groups']"),
        lnkLogout:() => cy.xpath("//a[text()='Logout']"),
        txtGrouptName:()=>cy.xpath("//input[@name='name']"),
        txtLocation:()=>cy.xpath("//input[@name='location']"),
        txtDescription:()=>cy.xpath("//input[@name='description']"),
        txtSearch:()=>cy.xpath("//input[@placeholder='Search']"),
        btnSaveGroup:()=>cy.xpath("//span[text()='Add Group']", { timeout: 10000 }),
        btnAddGroups:()=>cy.xpath("//span[text()='Add New Group']", { timeout: 10000 })
    }

    searchGroups(searchItem){
        this.elements.lnkGroups().click()
        this.elements.txtSearch().type(searchItem).type('{enter}')
    }
    navigateToGroups(){
        cy.get('.flex').find('a:contains(Groups)').click()
    }

    navigateToProfile(){
        cy.get('.flex').find('a:contains(Profile)').click()
    }

    login(email,password){
        cy.get('[action="#"]').then(loginFrm =>{
            cy.wrap(loginFrm).find('[name="email"]').type(email)
            cy.wrap(loginFrm).find('[name="password"]').type(password)
            cy.wrap(loginFrm).find('.MuiButton-label','Sign In').click()})            
    }

    addgroups(group_name,location,description){
        
        cy.get('button:contains(Add New Group)').click();
        cy.get('aside:contains(New group)').find('form').then(newgroup=>{
            cy.wrap(newgroup).find('[name="name"]').type(group_name)
            cy.wrap(newgroup).find('[name="description"]').type(description)
            cy.wrap(newgroup).find('[name="location"]').type(location)
            cy.wrap(newgroup).find('button:contains(Add Group)').click()                
        })
    } 

    searchByGroupName(groupName){
        this.navigateToGroups()
        cy.get('[placeholder="Search"]').clear().type(groupName+'{enter}')
        cy.get('.MuiDataGrid-renderingZone').find('div[role="row"]').each(tr =>{
            cy.wrap(tr).get('.MuiDataGrid-cell.MuiDataGrid-cell--textLeft').eq(0)
            .invoke('text')
            .should('contain',groupName) 
            
        })
    }

    getRow(groupName,rowNo){
        this.navigateToGroups()
        cy.get('[placeholder="Search"]').clear().type(groupName+'{enter}')
        cy.wait(2000)
        cy.get('.MuiDataGrid-dataContainer > .MuiDataGrid-viewport > .MuiDataGrid-renderingZone > .Mui-even:nth-child(1) > .MuiDataGrid-cell:nth-child('+rowNo+')').click()
        cy.wait(3000)
    }

    searchByLocation(location){
        this.navigateToGroups()
        cy.get('[placeholder="Search"]').clear().type(location+'{enter}')
        cy.get('.MuiDataGrid-renderingZone').find('div[role="row"]').each(tr =>{
            let item=cy.wrap(tr).find('.MuiDataGrid-cell.MuiDataGrid-cell--textLeft').eq(1)    
            item.invoke('text').should('contain',location)        
            item.click()
        })
    }

    DeleteGroup(){
        // cy.get('.MuiDataGrid-renderingZone').find('div[role="row"]').each(tr =>{
        //     cy.wrap(tr).find('.MuiDataGrid-cell.MuiDataGrid-cell--textLeft').eq(1).click({force:true})         
        // }) 
        //cy.get('.px-16 > .navbar_navbar__1jQaM > .flex > li:nth-child(4)').click()
        this.navigateToProfile()        
        cy.get('.mb-4 > div > .MuiButtonBase-root').click()
        cy.get('ul[role="menu"]').contains('Delete Group').click()
        cy.get('.flex.justify-between').find('button:contains("Delete")').click()
    }

    AddUserToGroup(){
        
    }
}
module.exports = new Groups();