var isRandom = true; // Globally Initiallization of Variable
var a = [];
function createrows(data) {
    // first Intialalization data using function
    let rows = `<tr >
   <td contenteditable>${data.id} </td>
   <td><img src="${data.thumbnailUrl} "/> </td>
   <td>${data.name} </td>
   <td>${data.price} </td> 
   <td><button class="edit btn btn-primary" > Edit </button> 
   <button class="delt btn btn-danger" > Delete </button>
   </td>
 </tr>`;
    return rows;
}
// value="Delete Row" onclick="document.getElementById('rows').deleteRow(0)"
function buildTable(data) {
    var table = document.getElementById('rows')
    table.innerHTML = ""
    for (var i = 0; i < data.length; i++) {
        table.innerHTML += createrows(data[i]);
    }
}
//  Sort Table In Assending Order
function arrange() {
    TABLE_DATA.sort((a, b) => { return a.id - b.id; });
    var rows = "";
    for (var i in TABLE_DATA) {
        rows += createrows(TABLE_DATA[i]);
    }
    document.getElementById("rows").innerHTML = rows;
}

function generateNew(i) {
    if (!a.includes(i)) {
        a.push(i);
        return i;
    }
    return generateNew(Math.floor(Math.random() * 10));
}
function random() {
    if (isRandom) {
        isRandom = false;
        intr = setInterval(() => {
            a = [];
            var rows = "";
            for (var i in TABLE_DATA) {
                i = generateNew(Math.floor(Math.random() * 10));
                {
                    rows += createrows(TABLE_DATA[i])
                }
                document.getElementById("rows").innerHTML = rows;
            }
        }
            , 100);
    }
}
function stp() {
    isRandom = true;
    clearInterval(intr);
}

$('#serch').on('click', function () {
    var value = $('#txt').val();
    console.log('value:', value)
    var data = serch(value, TABLE_DATA)
    buildTable(data);
});
buildTable(TABLE_DATA);
function serch(value, data) {
    var filterData = []
    for (var i = 0; i < data.length; i++) {
        value = value.toLowerCase()
        var name = data[i].name.toLowerCase()

        if (name.includes(value)) {
            filterData.push(data[i])
        }
    }
    return filterData
}
$(document).ready(function () {

    // code to read selected table row cell data (values).
    $("#rows").on('click', '.edit', function () {
        $('#my-modal').modal({
            show: 'false'
        });
        $('#editModal').modal('show');

        //   Colosest() get the first that matches the selector by selecting element itself
        var currentRow = $(this).closest("tr");
        // eq() Selector for matched required data
        //  .find() get the desecendants of each elements fillter by selector

        var id = currentRow.find("td:eq(0)").text();
        var name = currentRow.find("td:eq(2)").text();
        var price = currentRow.find("td:eq(3)").text();
        $("#txtrowid").val(id);
        $("#txtrowname").val(name);
        $("#txtrowprice").val(price);
    });
});
$("#btnupdate").click(function () {
    var Id = $("#txtrowid").val();
    var Name = $("#txtrowname").val();
    var Price = $("#txtrowprice").val();
    if (Id != "") {
        if (Name != "") {
            // .removeClass methods removes one or more class from selected elements
            $("#txtrowname").removeClass("errorclass");
            $("#errormessagename").hide();
            if (Price != "") {
                $("#txtrowprice").removeClass("errorclass");
                $("#errormessageprice").hide();
                debugger;
                $('#rows tr').each(function (row, tr) {
                    var RowId = $(tr).find('td:eq(0)').text();
                    // parseFloat() function parses a string and returns a floating point number.
                    if (parseFloat(RowId) == Id) {
                        $(tr).find('td:eq(2)').text(Name);
                        $(tr).find('td:eq(3)').text(Price);
                        alert("Row Update successfully");
                        $("#editModal").modal('hide');
                        ClearAllFields();
                    }
                });
            }
            else {
                // .addClass add specific class to each elements.
                $("#txtrowprice").addClass("errorclass");
                $("#txtrowprice").focus();
                $("#errormessageprice").text("This field is requried");
            }
        }
        else {
            $("#txtrowname").addClass("errorclass");
            // .focus() bind an event handler to focus JS event OR Trigger the event on element.
            $("#txtrowname").focus();
            $("#errormessagename").text("This field is requried");
        }
    }
    else {
        alert("Edit ID Not Null");
    }
});
function ClearAllFields() {
    $("#txtrowid").val('');
    $("#txtrowname").val('');
    $("#txtrowprice").val('');
}
$("#modlBody").on('click', '.edit1', function () {

    var id = document.getElementById(id).value;
    var name = document.getElementById(name).value;
    var price = document.getElementById(price).value;
    data.currentRow[index].cells[0].innerHTML = id;
    data.currentRow[index].cells[2].innerHTML = name;
    data.currentRow[index].cells[3].innerHTML = price;
});

$(document).ready(function () {
    $("#rows").on('click', '.delt', function () {
        $('#my-modal').modal({
            show: 'false'
        });
        $('#dltModal').modal('show');
        var Row = $(this).closest("tr");
        var id = Row.find("td:eq(0)").text();
        var name = Row.find("td:eq(2)").text();
        var price = Row.find("td:eq(3)").text();
        $("#userid").val(id);
        $("#username").val(name);
        $("#userprice").val(price);

    });

    // $(this).closest('tr').remove()
});

$("#btndelete").click(function () {
    var Id = $("#userid").val();
    var Name = $("#username").val();
    var Price = $("#userprice").val();
    if (Id != "") {
        $('#rows tr').each(function (row, tr) {
            var RowId = $(tr).find('td:eq(0)').text();
            if (parseFloat(RowId) == Id) {
                $(this).closest('tr').remove()
                $("#dlttModal").modal('hide');
                ClearAllFields();
            }
        });
    }
});
function ClearAllFields() {
    $("#userid").val('');
    $("#username").val('');
    $("#userprice").val('');
}
$("#modlBody").on('click', '.dlt1', function () {
    var id = document.getElementById(id).value;
    var name = document.getElementById(name).value;
    var price = document.getElementById(price).value;
    data.currentRow[index].cells[0].innerHTML = id;
    data.currentRow[index].cells[2].innerHTML = name;
    data.currentRow[index].cells[3].innerHTML = price;
});
buildTable(TABLE_DATA);
$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });
});
function onFormSubmit() {
    var formData = readFormData();
}

// function readFormData() {

//     var table = document.getElementById('rows');
//     var id = document.getElementById("idd").value;
//     var name = document.getElementById("usrname").value;
//     var x = new FileReader();
//     x.readAsDataURL(document.getElementById("myfile").files[0]);
//     x.onload = function (event) {
//         localStorage.setItem("data", event.target.result);
//     };
//     table.push(TABLE_DATA);

//     var Price = document.getElementById("price").value;
//     // var edit = '<td> '
//     var rows = '<tr>';
//     rows += '<td>' + id + '</td>';
//     rows += '<td><img src="' + localStorage.getItem('data') + '"/></td>';
//     // rows += '<td><img src="' + fileUrl + '"/></td>';
//     rows += '<td>' + name + '</td>';
//     rows += '<td>' + Price + '</td>';
//     rows += '<td><button class="btn btn-primary"> Edit </button> <button value="Delete Row" class="btn btn-danger" > Delete </button> </td>';
//     table.innerHTML += rows;

// }
// var x = new FileReader();
// x.readAsDataURL(document.getElementById("myfile").files[0]);
// x.onload = function (eve) {
//     localStorage.setItem("data", eve.target.result);
// };
// var loadFile = function(event) {
// 	var image = document.getElementById('myfile');
// 	image.src = URL.createObjectURL(event.target.files[0]);
// };
function FormSubmit(event) {
    // If this method is called, the default action of the event will not be triggered.
    event.preventDefault();
   
    var data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    
    // TABLE_DATA.push(formJSON)
    TABLE_DATA.push({
        "id": formJSON.id,
        "name": formJSON.name ,
        "thumbnailUrl": preview(),
        "price":formJSON.price
      })
      console.log(formJSON)
    buildTable(TABLE_DATA)
    // preview('')
    $('#myModal').modal('hide');
    
    
}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', FormSubmit);

function preview() {
    // const imgSrc = URL.createObjectURL(event.target.files[0]);
    const imgSrc = URL.createObjectURL(inputImg.files[0]);
    myfile.src= imgSrc;
    return imgSrc

}

