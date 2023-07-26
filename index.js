import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import config from "./config.js";

function clearInput() {
  inputFieldEl.value = "";
}

function addItemList(itemValue) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;
  shoppingList.append(newEl);
}

const appSettings = {
  ...config,
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "QuickList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);
  clearInput();
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.entries(snapshot.val());
  clearShoppingList();

  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
    addItemList(currentItemValue);
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = "";
}
