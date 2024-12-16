import { test, expect } from '@playwright/test'

    
    test('Task #1', async ({ page }) => {
      await page.goto('https://the-internet.herokuapp.com/login')
      
      await page.fill('#username', 'invalidUser')
      await page.fill('#password', 'invalidPassword')
      await page.click('button[type="submit"]')
      
      const errorMessage = await page.locator('#flash').textContent()
      expect(errorMessage).toContain('Your username is invalid!')
      await page.fill('#username', 'tomsmith')
      await page.fill('#password', 'SuperSecretPassword!')
      await page.click('button[type="submit"]')
    
      const successMessage = await page.locator('#flash').textContent()
      expect(successMessage).toContain('You logged into a secure area!')
    
      await page.click('a[href="/logout"]')
      const logoutMessage = await page.locator('#flash').textContent()
      expect(logoutMessage).toContain('You logged out of the secure area!')
    })

    test('Task #2', async ({ page }) => {
        await page.goto('https://demo.guru99.com/test/radio.html')

        const checkbox1 = page.locator('id=vfb-6-0')
        const checkbox2 = page.locator('id=vfb-6-1')
        const checkbox3 = page.locator('id=vfb-6-2')

        await page.click('#vfb-6-0')
        await page.click('#vfb-6-1')
        await page.click('#vfb-6-2')

        expect(checkbox1.isChecked).toBeTruthy
        expect(checkbox2.isChecked).toBeTruthy
        expect(checkbox3.isChecked).toBeTruthy

        await page.click('#vfb-6-0')
        await page.click('#vfb-6-1')
        await page.click('#vfb-6-2')

        expect(checkbox1.isChecked).toBeFalsy
        expect(checkbox2.isChecked).toBeFalsy
        expect(checkbox3.isChecked).toBeFalsy
    })

test('Task #3', async ({ page }) => {
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select')

    const frame = page.frameLocator('#iframeResult')

    const dropdown = frame.locator('select[name="cars"]')
    await dropdown.selectOption('saab')


    const selectedValue = await dropdown.inputValue()
    expect(selectedValue).toBe('saab')

    await frame.locator('input[type="submit"]').click()


    const resultDiv = frame.locator('div.w3-container.w3-large.w3-border')
    const resultText = await resultDiv.textContent()
    expect(resultText).toContain('cars=saab')
})

test('Task #4', async ({ page }) => {
    await page.goto('http://formy-project.herokuapp.com/form')

    await page.getByPlaceholder('Enter first name').fill('Sam')
    await page.getByPlaceholder('Enter last name').fill('Robertson')
    await page.getByPlaceholder('Enter your job title').fill('Test Automation Engineer')

    await page.check('#radio-button-2')
    await page.check('#checkbox-1')

    await page.selectOption('#select-menu', '3')
    await page.fill('#datepicker', '14/12/2024')

    await page.click('a.btn.btn-lg.btn-primary')


    const successMessage = await page.locator('.alert').textContent()
    expect(successMessage).toContain('The form was successfully submitted!')
})