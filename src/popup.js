import "./styles.css";

const resetProgress = document.getElementById("resetProgressbtn");
const resetProgressUtil = () => {
  console.log("Reset button clicked");

  const xpath = "/html/body/div[1]/div[1]/div/div/main/div/div[2]/section/div[2]/div/div/div/div[1]";
  const results = [];
  const query = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  results.map((el) => el.click());

  // Stores all checkboxes on the page, and clicks on any checkboxes on that currently checked
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.click();
    }
  });
  console.log("Reset button clicked");
};

resetProgress.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = tab.id;

    await chrome.scripting.executeScript({
      target: { tabId },
      func: resetProgressUtil,
    });
  } catch (error) {
    console.error(error);
  }
});

const markAsComplete = document.getElementById("markascompletebtn");
const markAsCompleteUtil = () => {
  console.log("Mark as complete button clicked");

  const xpath = "/html/body/div[1]/div[1]/div/div/main/div/div[2]/section/div[2]/div/div/div/div[1]";
  const results = [];
  const query = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  results.map((el) => el.click());

  // Stores all checkboxes on the page, and clicks on any checkboxes on that currently checked
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      checkbox.click();
    }
  });
  console.log("Mark as complete button clicked");
};
markAsComplete.addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = tab.id;

    await chrome.scripting.executeScript({
      target: { tabId },
      func: markAsCompleteUtil,
    });
  } catch (error) {
    console.error(error);
  }
});

document.getElementsByTagName("BODY")[0].onclick = function (e) {
  e = e || event;
  var target = e.target || e.srcElement;
  if (target.nodeName != "A") return;
  var href = target.href;
  chrome.tabs.create({ url: href });
  return false;
};
