var xhr = new XMLHttpRequest();
var url = "http://localhost:8080/";

function retrieveServerData(){
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                document.getElementById("display").innerHTML = xhr.responseText;
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}


function update(){
    var getData = setInterval( retrieveServerData, 20);
}

