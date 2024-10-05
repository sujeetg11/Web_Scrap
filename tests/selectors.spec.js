import { test, expect } from "@playwright/test";
import fs from 'fs'; // Import the file system module
import path from 'path'; // Import the path module for handling file paths

test("Selectors Demo", async ({ page }) => {

  test.setTimeout(60000);
  await page.goto("https://fhahoreca.com/exhibitor-list/");

  const mainClass = page.locator('.row-hover');
  const trElements = await mainClass.locator('tr'); // u cannot do forEach in this as it doesn't return an arry.
//                                                     if u want tu use forEach/for(const i){} then use .elementHandles().

  const data = []; 

  const count = await trElements.count();
  for (let i = 0; i < count; i++) {
    const row = trElements.nth(i); 
    
    
    const boothText = await row.locator('.column-1').innerText();
    const companyText = await row.locator('.column-2').innerText();
    const regionText = await row.locator('.column-3').innerText();

    
    data.push({
      booth: boothText,
      company: companyText,
      region: regionText
    });
  }

  
  const outputDir = path.join(__dirname, 'output'); 
  const outputFilePath = path.join(outputDir, 'exhibitorData.json'); 

  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

  
  console.log(`Data saved to ${outputFilePath}`);
});
