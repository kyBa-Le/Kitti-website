const ordered = document.getElementById('ordered-product');
const note = document.getElementById('exampleFormControlTextarea1');
console.log(note.offsetHeight);
ordered.style.height = note.offsetHeight + 'px';
const payButton = document.getElementById('pay-button');

payButton.addEventListener('click', () => {
    console.log("click on pay button");
    document.getElementById('orderModal').classList.remove("invisible");
});
const cancelButton = document.getElementById("cancelOrder");
console.log(cancelButton);
cancelButton.addEventListener('click', () => {
    console.log("clicked");
    document.getElementById("paymentForm").classList.add("invisible");
})