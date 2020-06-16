/// <reference types="Cypress" />

//Test suite is performing check of redirection by hyperlink of menu element after clicking on it.
describe('test redirection by hyperlink of menu element after clicking', () => {
    // Menu item with sub menu items
    it('test click on menu element Getting started', () => {
        checkRedirectbleElement('Getting_started',
            'https://www.jetbrains.com/help/idea/getting-started.html',
            ['Guided_Tour_Around_the_User_Interface',
            'Creating_and_Running_Your_First_Java_Application',
            'mastering_keyboard_shortcuts',
            'Managing_Plugins',
            'Working_Offline',
            'Accessibility',
            'Pro_Tips'],
            'https://www.jetbrains.com/help/idea/working-with-source-code.html');
    });
    //and etc...

    // Menu item without sub menu items
    it('test click on menu element Create your first Java application', () => {
        checkRedirectbleElement('Creating_and_Running_Your_First_Java_Application',
            'https://www.jetbrains.com/help/idea/creating-and-running-your-first-java-application.html',
            [],
            'https://www.jetbrains.com/help/idea/guided-tour-around-the-user-interface.html');
    });
    //and etc...

    // Element with no reference inside
    it('test click on menu element Scala', () => {
        checkNotRedirectableElement('d10e513',
            ['Discover_Intellij_IDEA_for_Scala',
            'Edit_Scala_code',
            'Work_with_Scala_formatter',
            'Run__debug_and_test_Scala',
            'Troubleshoot_common_Scala_issues',
            'SBT_support',
            'BSP_support',
            'Akka_support',
            'Getting_Started_with_Play_2_x',
            'Getting_Started_with_Typesafe_Activator'],
            'https://www.jetbrains.com/help/idea/working-with-source-code.html');
    });
    //and etc...

})

/** Function checks that redirection occurs after clicking on TOC menu element, which has hyperlink.
*
* menuElement - element for test
* expectedUrl - url of element for test
* subMenuElements - elements from subMenu
* baseUrl - url of visible same level element(not equal to menuElement)
*/
function checkRedirectbleElement (menuElement, expectedUrl, subMenuElements, baseUrl) {
    cy.visit(baseUrl);
    checkSubMenuElements(subMenuElements, 'not.be.visible');
    clickOnElement(menuElement);
    checkUrl(expectedUrl);
    checkSubMenuElements(subMenuElements, 'be.visible');
    clickOnElement(menuElement);
    checkSubMenuElements(subMenuElements, 'be.visible');
    checkUrl(expectedUrl);
}

/** Function checks that no redirection occurs after clicking on TOC menu element with no hyperlink.
*
* menuElement - element for test
* subMenuElements - elements from subMenu
* baseUrl - url of visible same level element(not equal to menuElement)
*/
function checkNotRedirectableElement (menuElement, subMenuElements, baseUrl) {
    cy.visit(baseUrl);
    checkSubMenuElements(subMenuElements, 'not.be.visible');
    clickOnElement(menuElement);
    checkUrl(baseUrl);
    checkSubMenuElements(subMenuElements, 'be.visible');
}

/** Function perform clicking on TOC menu element.
*
* menuElement - element for click
*/
function clickOnElement (menuElement) {
    cy.get('[data-test=toc]').should('be.visible')
       .find('[data-toc-scroll=' + menuElement + ']').should('be.visible')
       .click();
}

/** Function checks state of subMenu elements.
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

/** Function current url.
*
* url - url address for check
*/
function checkUrl (url) {
   cy.url().should('eq', url);
}