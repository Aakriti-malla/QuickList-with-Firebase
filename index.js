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
  shoppingList.innerHTML += `<li>${itemValue}</li>`;
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
  addItemList(inputValue);
});

onValue(shoppingListInDB, function (snapshot) {
  let itemsArray = Object.values(snapshot.val());

  for (let i = 0; i < itemsArray.length; i++) {
    addItemList(itemsArray[i]);
  }
});
