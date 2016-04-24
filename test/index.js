describe('angularjs homepage todo list', function () {
    it('should add a todo', function () {
        browser.get('http://localhost/food_share_frontend/app/#/app/auth');
        element(by.model('user.email')).sendKeys('user@gmail.com');
        element(by.model('user.password')).sendKeys('123');
        element(by.buttonText('Submit')).click().then(function () {
            browser.driver.sleep(2000);
            browser.waitForAngular();
            expect(browser.driver.getCurrentUrl()).toMatch('/users');
        });
    });
});