//Jhon wick
// decasa2471@youke1.com
// hyderabad

const email = "decasa2471@youke1.com";
const password = "hyderabad";
const puppeteer = require("puppeteer");
const url = "https://www.hackerrank.com/auth/login";

let page;
let browserOpen = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"]
});

browserOpen
  .then(function (browser) {
    return browser.pages();
  })
  .then(function (pages) {
    page = pages[0];
    return page.goto(url);
  })
  .then(function () {
    return page.waitForSelector(
      "input[placeholder = 'Your username or email']",
      { visible: true }
    );
  })
  .then(function () {
    return page.type("input[placeholder = 'Your username or email']", email, {
      delay: 50,
    });
  })
  .then(function () {
    return page.waitForSelector("input[placeholder = 'Your password']", {
      visible: true,
    });
  })
  .then(function () {
    return page.type("input[placeholder = 'Your password']", password, {
      delay: 50,
    });
  })
  .then(function () {
    return page.waitForSelector("button[data-analytics='LoginPassword']", {
      visible: true,
    });
  })
  .then(function () {
    return page.click("button[data-analytics='LoginPassword']", { delay: 50 });
  })
  .then(function () {
    return page.waitForSelector("div[data-automation='algorithms']", {
      visible: true,
    });
  })
  .then(function () {
    return page.click("div[data-automation='algorithms']", { delay: 50 });
  })
  .then(function () {
    return page.waitForSelector("input[value='warmup']", { visible: true });
  })
  .then(function () {
    return page.click("input[value='warmup']", { delay: 50 });
  })
  .then(function () {
    return page.waitForSelector(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled",
      { visible: true }
    );
  })
  .then(function () {
    return page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-styled");
  })
  .then(function (quesArr) {
    console.log(quesArr.length);
  })
  .then(function () {
    browserOpen.then(function (browser) {
      browser.close();
    });
  })
  .catch(function (err) {
    console.log(err);
  });
