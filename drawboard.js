window.onload = function() {
    let array = JSON.parse(localStorage.getItem('checked'));
    checkColumns(array);

}

function createFields() {
    let editBtn = document.getElementsByClassName('edit');
    let member = document.getElementsByClassName('member');
    let deleteBtn = document.getElementsByClassName('delete');
    let background = document.getElementById("background");
    let score = document.getElementsByClassName('score');
    editBtn = Array.from(editBtn);
    member = Array.from(member);
    deleteBtn = Array.from(deleteBtn);
    score = Array.from(score);

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', deleteMember);

        function deleteMember() {
            background.removeChild(member[i]);
        }
    }

    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', inputFields);

        function inputFields() {
            let mainRow = document.getElementById('mainRow');
            let div = document.createElement('div');
            let span = document.createElement('span');
            let divContent = document.createElement('div');
            let inputName = document.createElement('input');
            let inputSurname = document.createElement('input');
            let inputSolvedTasks = document.createElement('input');
            let inputReadPages = document.createElement('input');
            let inputSpentTime = document.createElement('input');
            let button = document.createElement('button');
            let inputArray = [inputName, inputSurname, inputSolvedTasks, inputReadPages, inputSpentTime];

            inputName.className = "modalName";
            inputSurname.className = "modalSurname";
            inputSolvedTasks.className = "modalSolvedTasks";
            inputReadPages.className = "modalReadPages";
            inputSpentTime.className = "modalSpentTime";
            button.className = "modalSave";
            button.innerText = "Save";
            inputName.placeholder = "Member Name";
            inputSurname.placeholder = "Member Surname";
            inputSolvedTasks.placeholder = "Member SolvedTasks";
            inputReadPages.placeholder = "Member ReadPages";
            inputSpentTime.placeholder = "Member SpentTime";

            for (let j = 0; j < inputArray.length; j++) {
                inputArray[j].classList.add('input');
                divContent.appendChild(inputArray[j]);
            }

            divContent.appendChild(button);
            span.className = 'close';
            span.innerHTML = '&times;'
            div.className = 'modal';
            divContent.className = 'modal-content';


            div.appendChild(divContent);
            div.appendChild(span);
            let nodes = member[i].childNodes;
            nodes = Array.from(nodes);
            nodes.map(function(item) {
                item.style.display = 'none';
            })
            member[i].appendChild(div);


            button.addEventListener('click', function() {
                div.style.display = 'none';
                Array.from(member[i].childNodes).map(function(item) {
                    if (item.className !== 'modal') {
                        score[i].innerText = parseFloat((inputSolvedTasks.value / 5 + inputReadPages.value / 10 + inputSpentTime.value / 3).toFixed(2));
                        document.getElementsByClassName("name")[i].innerText = inputName.value;
                        document.getElementsByClassName("surname")[i].innerText = inputSurname.value;
                        document.getElementsByClassName("problems")[i].innerText = inputSolvedTasks.value;
                        document.getElementsByClassName("pages")[i].innerText = inputReadPages.value;
                        document.getElementsByClassName("spent-time")[i].innerText = inputSpentTime.value;
                        document.getElementsByClassName("number")[i].innerText = i + 1;
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }

                })

            })

            span.addEventListener('click', function() {
                div.style.display = 'none';
                Array.from(member[i].childNodes).map(function(item) {
                    if (item.className !== 'modal') {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                })
            })
        }
    }
}



function addRow(memberinput, currentRow) {

    if (memberinput < 1) {
        createFields();
        return;
    }

    let div = document.createElement('div');

    div.className = 'member';

    div.innerHTML = currentRow;

    document.getElementById('background').appendChild(div);
    return addRow(memberinput - 1, currentRow);

}



/*function removeRow(input) {
    document.getElementById('content').removeChild(input.parentNode);
}*/


function checkColumns(array) {
    let currentRow = "<span class='number'></span><span class='name'></span><span class='surname'></span><span class='score'></span>";
    let row = "<span>Number</span><span>Name</span><span>Surname</span><span>Score</span>";

    array.map(function(item) {
        if (item === 0) {
            row += "<span>Number of solved problems</span>";
            currentRow += "<span class='problems'></span>"
        }
        if (item === 1) {
            row += "<span>Number of read pages</span>";
            currentRow += "<span class='pages'></span>"
        }

        if (item === 2) {
            row += "<span>Spent time</span>";
            currentRow += "<span class='spent-time'></span>"
        }
    })
    row += "<span></span><span></span>"
    currentRow += "<div class='button-div'><button class='edit'>EDIT</button><button class='delete'>DELETE</button></div>"
    addFirstLine(row, currentRow);
}


function addFirstLine(row, currentRow) {
    let boardname = JSON.parse(localStorage.getItem('boardname'));
    boardname = boardname[boardname.length - 1];
    let number = localStorage.getItem('count');
    let div = document.getElementById("mainRow");

    document.getElementById("boardname").innerHTML = boardname;

    div.innerHTML =
        row;

    addRow(number, currentRow);
    let newMember = document.getElementsByClassName("addButton")[0];
    newMember.onclick = function() { addRow(1, currentRow) };


}