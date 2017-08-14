$(function () {

    InitializeYears();
    InitializeMonths();
    SetDaysInMonth();
});

function SetDaysInMonth() {
    let monthValue = $('#month').val();
    console.log(monthValue);
}


function InitializeMonths() {
    let months = [{
        name: "January",
        value: 0
    },
{
    name: "February",
    value: 1
},
{
    name: "March",
    value: 2
},
{
    name: "April",
    value: 3
},
{
    name: "May",
    value: 4
},
{
    name: "June",
    value: 5
},
{
    name: "July",
    value: 6
},
{
    name: "August",
    value: 7
},
{
    name: "September",
    value: 8
},
{
    name: "October",
    value: 9
},
{
    name: "November",
    value: 10
},
{
    name: "December",
    value: 11
}];

    $.each(months, function (index, value) {
        $('#month').append("<option value=" + value.value + ">" + value.name + "</option>");
    });

    let currentMonthValue = moment().month();

    $('#month').val(currentMonthValue);
}

function InitializeYears() {

    let currentYear = moment().year();

    for (let loop = currentYear - 5; loop < currentYear + 5; loop++) {
        $('#year').append("<option value=" + loop+ ">" + loop + "</option>");
    }

    $('#year').val(currentYear);
}