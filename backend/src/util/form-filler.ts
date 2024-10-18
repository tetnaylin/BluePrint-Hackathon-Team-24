import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { Attendee } from '../config/attendee';
//import { performance } from 'perf_hooks';

interface FormData {
  entryId: string,
  questionText: string,
  required: boolean,
  answerOptions?: string[],
  rules: number[][]
}

interface ResponseData {
  entryId: string,
  response: string,
}

/***
 * Returns "ok" on success, otherwise returns prefill url
 */
const submitForm = async(url: string, attendee: Attendee) => {
  const formDataArr = await scrapeGoogleForm(url);
  let canAuto = true;
  
  const formResponses = formDataArr.map((formData: FormData) => {
    let response = "";
    if(formData.answerOptions) {
      if(formData.questionText.includes("year")) {
        if(formData.answerOptions.includes(attendee.year.toString())) {
          response = attendee.year.toString();
        } else {
          response = formData.answerOptions[formData.answerOptions.length-1];
        }
      } else if(formData.questionText.includes("arc member")) {
        if(attendee.arcMember) {
          response = formData.answerOptions.find(option => option.toLowerCase() === "yes") || "";
          if(response === "") {
            canAuto = false;
          }
        } else {
          response = formData.answerOptions.find(option => option.toLowerCase() === "no") || "";
          if(response === "" && formData.required) {
            canAuto = false;
          }
        }
      } else if(formData.required) {
        canAuto = false;
      }
    } else {
      if(formData.questionText.includes("zid")) {
        if(formData.rules === null) {
          response = attendee.zId;
        } else {
          response = attendee.zId.slice(1);
        }
      } else if(formData.questionText.includes("discord")) {
        response = attendee.discord || "";
      } else if(formData.questionText.includes("full name") || formData.questionText.includes("name") ){
        response = attendee.name;
      } else if(formData.questionText.includes("email")) {
        response = attendee.email;
      } else if (formData.required){
        canAuto = false;
      }
    }

    return {
      entryId: formData.entryId,
      response: response
    }
  });


  const queries = formResponses.filter((responseData: ResponseData) => 
      responseData.response !== ""
          ).map((responseData: ResponseData) => 
              `entry.${responseData.entryId}=${responseData.response}`
  );

  const prefilledUrl = `${url}?${queries.join("&")}`;

  //console.log(formDataArr);
  // console.log(prefilledUrl);
  if(!canAuto) {
    return prefilledUrl;
  } 

  const submittedUrl = await completeSubmission(prefilledUrl);

  if(submittedUrl.includes("formResponse")) {
    return "ok";
  } else {
    return prefilledUrl;
  }

  //console.log(submittedUrl);
}

const completeSubmission = async (url: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['image', 'stylesheet', 'font'].includes(resourceType)) {
      req.abort();  // Block unnecessary resources
    } else {
      req.continue();
    }
  });
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url);

  const buttonClass = ".uArJ5e.UQuaGc.Y5sE8d.VkkpIf.QvWxOd";
  await page.waitForSelector(buttonClass);

  await page.click(buttonClass);
  
  await page.waitForSelector('.vHW8K');

  const submittedUrl = page.url();

  await browser.close();

  return submittedUrl;
}

// Function to scrape Google Form questions, input types, and IDs
const scrapeGoogleForm = async (url: string) => {
  // let startTime = performance.now();
  // console.log("starting...");
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['image', 'stylesheet', 'font', 'script'].includes(resourceType)) {
      req.abort();  // Block unnecessary resources
    } else {
      req.continue();
    }
  });
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url);

  // Get the HTML content of the form
  const html = await page.content();

  // Close the browser
  await browser.close();

  // Load the HTML into Cheerio
  const $ = cheerio.load(html);

  // Array to hold form data
  const formData: FormData[] = [];

  // Cheerio selectors to target form elements
  $('[jsmodel]').each((_, element) => {
    //const child = $(element).children()[0];
    const jsmodelValue = $(element).attr('jsmodel'); // Get the jsmodel attribute
    const dataParams = $(element).attr('data-params'); // Get the data-params attribute

    if (jsmodelValue === "CP1oW" && dataParams) {
      let cleanedDataParams = dataParams.replace(/^%.@\./, '');

      const lastIndex = cleanedDataParams.lastIndexOf(']');
      const secondLastIndex = cleanedDataParams.lastIndexOf(']', lastIndex - 1);
      cleanedDataParams = cleanedDataParams.slice(0, secondLastIndex + 1);
      
      const parsedParams = JSON.parse(cleanedDataParams);

      const entryId = parsedParams[4][0][0];; // 173401416
      const questionText = parsedParams[1]; // "are you an arc member?"
      const questionType = parsedParams[3]; // 0 === short answer, 2 === multi choice, 3 === dropdown
      const questionOptions = parsedParams[4][0][1]; // [["Yes", null, null, null, false], ["No", null, null, null, false]]
      const required = parsedParams[4][0][2];
      const rules = parsedParams[4][0][4];

      if(questionType !== 0) {
        const answerOptions = questionOptions.map((ansArr: any[]) => ansArr[0]);
        formData.push({
          entryId: entryId,
          questionText: questionText.toLowerCase(),
          required: required,
          answerOptions: answerOptions,
          rules: rules
        });
      } else {
        formData.push({
          entryId: entryId,
          questionText: questionText.toLowerCase(),
          required: required,
          rules: rules
        });
      }
    }
  });

//   // Output the extracted form data
//  let endTime = performance.now();
//  console.log(`time taken: ${endTime - startTime}`);
  return formData;
};
