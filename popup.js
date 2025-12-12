const input = document.getElementById("noteInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("notesList");


// Load saved notes
chrome.storage.sync.get(["notes"], (res) => {
if (res.notes) renderList(res.notes);
});


btn.addEventListener("click", () => {
const text = input.value.trim();
if (!text) return;


chrome.storage.sync.get(["notes"], (res) => {
const arr = res.notes || [];
arr.push({ text, done: false });
chrome.storage.sync.set({ notes: arr }, () => {
renderList(arr);
input.value = "";
});
});
});


function renderList(arr) {
list.innerHTML = "";
arr.forEach((item, index) => {
const li = document.createElement("li");
li.textContent = item.text;
if (item.done) li.classList.add("done");


li.addEventListener("click", () => toggleStrike(index));
list.appendChild(li);
});
}


function toggleStrike(i) {
chrome.storage.sync.get(["notes"], (res) => {
const arr = res.notes;
arr[i].done = !arr[i].done;
chrome.storage.sync.set({ notes: arr }, () => renderList(arr));
});
}