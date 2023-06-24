import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import dotenv from "dotenv";
dotenv.config();

puppeteer.use(StealthPlugin());

const openPage = async () => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    slowMo: 10,
  });
  const page = await browser.newPage();

  await page.goto("http://181.224.238.51/quipux/");

  await page.waitForSelector('input[name="txtnip"]');
  await page.type('input[name="txtnip"]', "2021205145.est@unaj.edu.pe", {
    delay: 0,
  });

  const submit = await page.waitForSelector('input[name="txtLogin"]');
  submit.click();

  await page.waitForSelector("table");

  const result = await page.evaluate(() => {
    const envolvents = document.querySelectorAll("tr");
    const data = [...envolvents].map((envolvent) => {
      const contents = [...envolvent.querySelectorAll("td")].map((content) => {
        const text = content.innerText != "" ? content.innerText : "";
        return text;
      });
      return {
        contents,
      };
    });
    return data;
  });
  return result;
};

export { openPage };
