const {Builder, By, until} = require('selenium-webdriver');
const url = 'http://localhost:3000/';
const tabs = ["fifo", "sjf", "prioridad", "robin"];
const Quantum = 4;

var driver = new Builder()
    .forBrowser('chrome')
    .build();


function feed(driver, By, currentTab) {
  let once = false;
  for (let i = 0; i < 4; i++) {
    if(currentTab === "#panel4" && once == false) {
      driver.findElement(By.css(`#panel4 .wrap-quantum input`)).sendKeys(Quantum);
      once = true;
    } else if(currentTab !== "#panel4") {
      driver.findElement(By.css(`${currentTab} .wrap-tll input`)).sendKeys(i+1);
    }
    driver.findElement(By.css(`${currentTab} .wrap-process-name input`)).sendKeys(`p${i}`);
    driver.findElement(By.css(`${currentTab} .wrap-cpu-time input`)).sendKeys(i+2);
    driver.findElement(By.css(`${currentTab} .wrap-btn-submit button`)).click();
    driver.findElement(By.css(`${currentTab} .wrap-btn-calc button`)).click();
  }
}//end feed

driver.get(url)
    .then(function testFifo() {
      driver.findElement(By.className("robin")).click();
      for (let t = 0; t < tabs.length; t++) {
        let tab = tabs[t];
        let currentTab = `#panel${t+1}`;
        console.log('currentTab', currentTab);
        driver.findElement(By.className(tab)).click();
        feed(driver, By, currentTab);
      }
    })
    /*
    .then(_ => driver.findElement(By.name('btnG')).click())
    .then(_ => driver.wait(until.titleIs('webdriver - Google Search'), 1000))
    .then(_ => driver.quit());
    */
