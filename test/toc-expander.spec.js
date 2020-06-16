/// <reference types="Cypress" />

//Test suite is performing check of toc-expander expanding and collapsing after clicking on it.
describe('test of toc-expander', () => {
    //For first layer menu items
    it('test toc-expander of element Introduction', () => {
        checkTocExpander('Discover_IntelliJ_IDEA',
        ['product__educational_tools'],
        'https://www.jetbrains.com/help/idea/working-with-source-code.html');
    });

    it('test toc-expander of element Installation guide', () => {
        checkTocExpander('Installation_guide',
        ['Run_for_the_first_time',
        'Register',
        'Update',
        'Uninstall'],
        'https://www.jetbrains.com/help/idea/working-with-source-code.html');
    });
    //and etc...

    //For second layer menu items
    it('test toc-expander of element Projects﻿', () => {
    checkTocExpander('Creating_and_Managing_Projects',
    ['New_Project_Wizard',
    'Import_Project_or_Module_Wizard',
    'Configure_project_settings',
    'Project_settings_and_structure',
    'Saving_Project_as_Template'],
    'https://www.jetbrains.com/help/idea/working-with-projects.html');
    });
    //and etc...

    //For third layer menu items...
    it('test toc-expander Asset', () => {
    checkTocExpander('Asset_Studio',
    ['Asset_Studio_Page_1',
    'Asset_Studio_Page_2'],
    'https://www.jetbrains.com/help/idea/choose-device-dialog.html');
    });
    //and etc...

});

/** Function checks that expanders work correctly after clicking on it.
*
* menuElement - element for test
* subMenuElements - elements from subMenu
* baseUrl - url of visible same level element(not equal to menuElement)
*/
function checkTocExpander (menuElement, subMenuElements, baseUrl) {
    cy.visit(baseUrl);
    checkSubMenuElements(subMenuElements, 'not.be.visible');
    clickOnTocExpander(menuElement);
    checkSubMenuElements(subMenuElements, 'be.visible');
    clickOnTocExpander(menuElement);
    checkSubMenuElements(subMenuElements, 'not.be.visible');
}

/** Function perform clicking on expander of menu element.
*
* menuElement - element with expander
*/
function clickOnTocExpander (menuElement) {
    cy.get('[data-test=toc]').should('be.visible')
       .find('[data-toc-scroll=' + menuElement + ']').should('be.visible')
       .find('[data-test=toc-expander]').should('be.visible')
       .click();
}

/** Function checks if subMenu elements are visible.
*
* subMenuElements - elements from subMenu
* state - expected state of elements
*/
function checkSubMenuElements (subMenuElements, state) {
    for(var i = 0; i < subMenuElements.length; i++){
        cy.get('[data-test=toc]')
            .find('[data-toc-scroll=' + subMenuElements[i] + ']').should(state);
    }
}
