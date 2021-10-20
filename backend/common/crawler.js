const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config();

const crawler = async (username, password, id) => {
  // 인스타그램 열기
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://www.instagram.com/`, { waitUntil: 'networkidle2' });

  // 로그인
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', username, { delay: 50 });
  await page.type('input[name="password"]', password, { delay: 50 });

  const loginButton = await page.$x('//div[contains(text(), "로그인")]');
  await loginButton[0].click();
  await page.waitForNavigation();

  // 피드 이미지 src 저장
  await page.goto(`https://www.instagram.com/${id}`, {});
  await page.waitForSelector('article.ySN3v');

  const feedImages = await page.evaluate(() => {
    const feeds = document.querySelectorAll('article .KL4Bh img');
    const feedImgs = [];

    for (let feed of feeds) {
      feedImgs.push(feed.src);
    }
    return feedImgs;
  });

  // 브라우저 닫기
  await browser.close();
  return feedImages;
};

module.exports = crawler;
