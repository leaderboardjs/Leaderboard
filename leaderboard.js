let plusButton = document.getElementsByClassName("button")[1];
let modal = document.getElementById("sign");
let span = document.getElementsByClassName("close")[0];
let save = document.getElementById("save");
let boardname = document.getElementById("sign-board");
let number = document.getElementById("sign-number");
let check = document.getElementsByClassName("check");
let boardinput = document.getElementById("boardinput");
let memberinput = document.getElementById("memberinput");
let checkinput = document.getElementById("checkinput");

let arr = JSON.parse(localStorage.getItem('boardname')) || [];

window.onload = function() {

    if (arr !== []) {
        arr.map(function(item) {
            let a = document.createElement('a');
            a.innerHTML = item;
            document.getElementsByClassName('boards')[0].appendChild(a);
            a.addEventListener("click", createBoard);
        })
    }
}

plusButton.addEventListener("click", function() {
    document.getElementById("sign").style.display = 'flex';

});

span.addEventListener("click", function() {
    modal.style.display = "none";
    clearAllFields();
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearAllFields();
    }
}

function clearAllFields() {
    check = Array.from(check);
    boardname.value = "";
    number.value = "";
    check.map(function(item) {
        item.checked = false;
    })
    boardinput.innerHTML = "";
    memberinput.innerHTML = "";
    checkinput.innerHTML = "";
}

save.onclick = function(event) {
    event.preventDefault();
};

save.addEventListener("click", checkFields);

function checkFields() {

    check = Array.from(check);

    let every = check.every(function(currentCheck) {
        return currentCheck.checked === false;
    })

    if (!every && boardname.value !== "" && number.value !== "") {
        let checkArray = [];
        check.map(function(item) {
            if (item.checked === true) {
                checkArray.push(check.indexOf(item));
            }
        });
        localStorage.setItem('checked', JSON.stringify(checkArray));
        localStorage.setItem('count', number.value);
        arr = JSON.parse(localStorage.getItem('boardname')) || [];
        if (arr.includes(boardname.value)) {
            boardinput.innerHTML = "* Such name already exists!";
            return;
        } else {
            arr.push(boardname.value);
            localStorage.setItem('boardname', JSON.stringify(arr));
            createBoard();
            return;
        }

    }

    if (every) {
        checkinput.innerHTML = "* Please check at least one checkbox!";
    }

    if (boardname.value === "") {
        boardinput.innerHTML = "* Please insert leaderboard name";
    }

    if (number.value === "") {
        memberinput.innerHTML = "* Please insert count of members";

    }
}



function createBoard() {

    window.location.href = "input.html";
}