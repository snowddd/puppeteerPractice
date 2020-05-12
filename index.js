const puppeteer = require('puppeteer');

clear = async function ( selector) {
    await this.evaluate(selector => {
      document.querySelector(selector).value = "";
    }, selector);
  };

(async () => {
  const browser = await puppeteer.launch({
    //使用本機chorme來開啟
    executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--start-maximized'],
  }
  );
  const page = await browser.newPage();
  await page.goto('https://punchsystem-272703.firebaseapp.com/#/Login');
  //設定處理dialog alert的共用方法
    await page.on('dialog', async dialog => {
        await page.waitFor(500)
        await dialog.accept()
    }); 

  //調用上方的clear方法
    page.clear = clear;

  await page.setViewport({ width: 1280, height: 1200 });
  //首頁      
  await page.screenshot({ path: `${config.imgFolder}p1(first).png` });
  //輸入錯誤
  await page.waitFor(1000)
  await page.type('#input-1', 'James')
  await page.type('#input-2', '12345')
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > form > button.btn.btn-primary')
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > form > button.btn.btn-danger')
  await page.waitFor(1000)

  //輸入正確
  await page.waitFor(1000)
  await page.type('#input-1', 'James')
  await page.type('#input-2', '123456')
  await page.waitFor(2000)
  await page.click('#app > div.wrapper > form > button.btn.btn-primary')
  await page.waitFor(1000)
  //個人資訊頁
  await page.screenshot({ path: `${config.imgFolder}p2(member).png` });
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > table > tr:nth-child(9) > td:nth-child(1) > button')
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > div > button:nth-child(2)') 
  await page.waitFor(1000)
  //打卡
 await page.screenshot({ path: `${config.imgFolder}p3(punchin).png` });
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > div > button:nth-child(2)') 
  await page.waitFor(1000)
  //簽退
  await page.screenshot({ path: `${config.imgFolder}p4(punchout).png` });
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > div > button:nth-child(5)') 
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > table > tr:nth-child(9) > td:nth-child(2) > button') 
  await page.waitFor(1000)
  //請假
  await page.screenshot({ path: `${config.imgFolder}p5(leave).png` });
  await page.waitFor(1000)
  //點選datepickter
  await page.click('#app > div.wrapper > div > form > div:nth-child(1) > div > button') 
  //datepickter切換月份
//   await page.waitFor(1000)
//   await page.click('#__BVID__20__calendar-nav_ > button:nth-child(4)') 
  await page.waitFor(1000)
  //datepickter決定點選日期的button
  await page.click('#__BVID__20__cell-2020-05-24_') 
  await page.waitFor(2000)
  await page.select('#app > div.wrapper > div > form > div:nth-child(2) > select', '2')
  await page.waitFor(2000)
  //選擇完請假資訊後
  await page.screenshot({ path: `${config.imgFolder}p6(leaveChoose).png` });
  await page.waitFor(2000)
  await page.click('#app > div.wrapper > div > form > div:nth-child(3) > button') 
  await page.waitFor(1000)
  //請假成功
  await page.screenshot({ path: `${config.imgFolder}p7(leaveSuccess).png` });
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > div > button') 
  await page.waitFor(1000)
  //登出前(資訊頁)
  await page.screenshot({ path: `${config.imgFolder}p7(logout1).png` });
  await page.waitFor(1000)
  await page.click('#app > div.wrapper > div > table > tr:nth-child(10) > td > button') 
  await page.waitFor(1000)
  //登出後
  await page.screenshot({ path: `${config.imgFolder}p8(logout2).png` });
  await browser.close();
})();


const config ={
    imgFolder:'img/'
}