const puppeteer = require("puppeteer");
const fs = require("fs");

const url =
  "https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj";

let cTab;

(async function () {
  try {
    let browserInstance = puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    let browserOpen = await browserInstance;
    let allTabsArr = await browserOpen.pages();
    cTab = allTabsArr[0];
    await cTab.goto(url);
    await cTab.waitForSelector(
      ".style-scope.yt-dynamic-sizing-formatted-string.yt-sans-28"
    );
    let playlistName = await cTab.evaluate(function (select) {
      return document.querySelector(select).innerText;
    }, ".style-scope.yt-dynamic-sizing-formatted-string.yt-sans-28");
    let playlistInfo = await cTab.evaluate(
      getData,
      ".byline-item.style-scope.ytd-playlist-byline-renderer"
    );
    console.log(
      playlistName,
      playlistInfo.noofVideos,
      playlistInfo.noofViews,
      playlistInfo.lastUpdated
    );
    let totalVideos = parseInt(playlistInfo.noofVideos.trim().split(" ")[0]);
    let currentVideos = await getCVideosLength();
    console.log(currentVideos);
    while (totalVideos - currentVideos >= 1) {
      await scrollToBottom();
      currentVideos = await getCVideosLength();
    }

    await setTimoutPromise(5000);

    let finalList = await getStats();
    console.log(finalList);
    browserOpen.close();
  } catch (error) {
    console.log(error);
  }
})();

function getData(selector) {
  let playlistInfo = document.querySelectorAll(selector);
  let noofVideos = playlistInfo[0].innerText;
  let noofViews = playlistInfo[1].innerText;
  let lastUpdated = playlistInfo[2].innerText;

  return {
    noofVideos,
    noofViews,
    lastUpdated,
  };
}

async function getCVideosLength() {
  let length = await cTab.evaluate(
    getLength,
    ".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer"
  );
  return length;
}

async function getStats() {
  let list = await cTab.evaluate(
    getNameAndDuration,
    ".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer",
    "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
  );
  return list;
}

function getLength(selector) {
  let durationElem = document.querySelectorAll(selector);
  return durationElem.length;
}

function getNameAndDuration(videoSelector, durationSelector) {
  // console.log("Reached here")
  let videoElem = document.querySelectorAll(videoSelector);
  let durationElem = document.querySelectorAll(durationSelector);

  // console.log(videoElem.length)
  // console.log(durationElem)
  // throw ""

  let currentList = [];

  for (let i = 0; i < Math.min(videoElem.length, durationElem.length); i++) {
    let videoTitle = videoElem[i].innerText;
    let duration = durationElem[i].innerText;

    currentList.push({ videoTitle, duration });
  }
  // console.log(currentList)
  return currentList;
}

async function scrollToBottom() {
  await cTab.evaluate(gotoBottom);
}

function gotoBottom() {
  window.scrollBy(0, window.innerHeight); 
}

const setTimoutPromise = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
