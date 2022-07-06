
// Get the button
let scrollButton = document.getElementById('btn-to-bottom');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Show button at specific scroll values on page
  if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
}

function scrollToBottom(){
  // Automatically scroll to bottom
  window.scrollTo(0, document.body.scrollHeight);
}