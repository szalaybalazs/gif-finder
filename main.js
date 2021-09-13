const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Chromium.app/Contents/MacOS/Chromium",
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.goto(
    "https://www.google.com/search?q=.net+core&rlz=1C1GGRV_enUS785US785&oq=.net+core&aqs=chrome..69i57j69i60l3j69i65j69i60.999j0j7&sourceid=chrome&ie=UTF-8"
  );

  const IMAGE_SELECTOR = "#tsf > div:nth-child(2) > div > div.logo > a > img";
  let imageHref = await page.evaluate((sel) => {
    return document.querySelector(sel).getAttribute("src").replace("/", "");
  }, IMAGE_SELECTOR);

  console.log("https://www.google.com/" + imageHref);
  var viewSource = await page.goto("https://www.google.com/" + imageHref);
  fs.writeFile(
    ".googles-20th-birthday-us-5142672481189888-s.png",
    await viewSource.buffer(),
    function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    }
  );

  browser.close();
}

run();
