const { Builder, By, Key, until } = require('selenium-webdriver');

(async function fillForm() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://demoqa.com/automation-practice-form');
    await driver.manage().window().maximize();

    await driver.executeScript(`
      document.querySelectorAll('#fixedban, .Advertisement-300x250').forEach(el => el.remove());
    `);

    await driver.findElement(By.id("firstName")).sendKeys("John");
    await driver.findElement(By.id("lastName")).sendKeys("Doe");
    await driver.findElement(By.id("userEmail")).sendKeys("john.doe@example.com");

    let gender = await driver.findElement(By.css("label[for='gender-radio-1']"));
    await driver.executeScript("arguments[0].click();", gender);

    await driver.findElement(By.id("userNumber")).sendKeys("9876543210");

    await driver.findElement(By.id("dateOfBirthInput")).click();
    await driver.findElement(By.className("react-datepicker__month-select")).sendKeys("March");
    await driver.findElement(By.className("react-datepicker__year-select")).sendKeys("1995");
    await driver.findElement(By.xpath("//div[contains(@class, 'react-datepicker__day--015') and not(contains(@class,'outside-month'))]")).click();

    let hobby = await driver.findElement(By.css("label[for='hobbies-checkbox-1']"));
    await driver.executeScript("arguments[0].click();", hobby);

    await driver.findElement(By.id("currentAddress")).sendKeys("123 Demo Street, Test City");

    await driver.executeScript("window.scrollBy(0, 300);");

    await driver.findElement(By.id("state")).click();
    await driver.findElement(By.xpath("//div[text()='NCR']")).click();

    await driver.findElement(By.id("city")).click();
    await driver.findElement(By.xpath("//div[text()='Delhi']")).click();

    let submitBtn = await driver.findElement(By.id("submit"));
    await driver.executeScript("arguments[0].click();", submitBtn);

    let modal = await driver.wait(until.elementLocated(By.id("example-modal-sizes-title-lg")), 5000);
    let modalText = await modal.getText();

    if (modalText.includes("Thanks for submitting the form")) {
      console.log(" Form submitted successfully!");
    } else {
      console.log(" Form submission might have failed.");
    }

  } catch (error) {
    console.error(" Error during form automation:", error);
  } finally {
    await driver.sleep(3000); 
    await driver.quit();
  }
})();
