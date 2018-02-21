window.onload = function() {
    
    let array = localStorage.getItem('checked');
   
    
    checkColumns(array);
   
}


function addRow(memberinput, currentRow) {
       
        if (memberinput < 1) {
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
    let currentRow = "<span id='name'></span><span id='score'></span>";
    let row = "<span>Name Surname</span><span>Score</span>";
        array = Array.from(array);

    array.map(function(item) {
        if (item === "0") {
            row += "<span>Number of solved problems</span>";
            currentRow += "<span class='problems'></span>"
        }
        if (item === "1") {
            row += "<span>Number of read pages</span>";
            currentRow += "<span class='pages'></span>"
        }

        if (item === "2") {
            row += "<span>Spent time</span>";
            currentRow += "<span class='spent-time'></span>"
        }
    })
    row  += "<span></span><span></span>"
    currentRow += "<div class='button-div'><button class='edit'>EDIT</button><button class='delete'>DELETE</button></div>"
    addFirstLine(row, currentRow);
}


function addFirstLine(row, currentRow) {
    let boardname = localStorage.getItem('boardname');
    let number = localStorage.getItem('count');
    let div = document.getElementById("mainRow");
    
    document.getElementById("boardname").innerHTML = boardname;
        
        div.innerHTML =                                   
            row;
    
        addRow(number, currentRow);
        
        
        
}
let newMember = document.getElementsByClassName("addButton")[0];
newMember.addEventListener("click", addOneRow);

function addOneRow() {
    let addOneRow = document.getElementsByClassName("member")[0].innerHTML;
    addRow(1, addOneRow);
}

let edit = document.getElementsByClassName("edit")[0];

edit.addEventListener("click", function() {})
