
function update() {

    var selectTopic = document.getElementById('topic-select');

    // Store selected dropdown value in key
    localStorage.setItem("topic", selectTopic.options[selectTopic.selectedIndex].value);
    changeSelected()
} 

function changeSelected() {
    table = document.getElementById('table');
    topic = localStorage.getItem("topic");

    if (topic == "Largest Ecosystem") {
        table.setAttribute("style", "display:show");
    }
}

