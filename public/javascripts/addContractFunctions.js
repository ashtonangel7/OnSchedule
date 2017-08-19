$(function () {

    InitializeYears();
    InitializeMonths();
    InitializeDays();

    $('#month').change(function () {
        InitializeDays();
    });
});

function InitializeDays() {

    $('#startday').empty();
    $('#endday').empty();

    let startMonthValue = $('#startmonth').val();
    let endMonthValue = $('#endmonth').val();
    let startDaysInMonth = moment().month(startMonthValue).daysInMonth();
    let endDaysInMonth = moment().month(endMonthValue).daysInMonth();

    for (let loop = 1; loop <= startDaysInMonth; loop++) {
        $('#startday').append('<option value="' + loop + '">' + loop + '</option>');    
    }

    for (let loop = 1; loop <= endDaysInMonth; loop++) {
        $('#endday').append('<option value="' + loop + '">' + loop + '</option>');
    }

    if (startMonthValue == moment().month()) {
        $('#startday').val(moment().date());
    }

    if (endMonthValue == moment().month()) {
        $('#endday').val(moment().date());
    }
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
        $('#startmonth').append('<option value="' + value.value + '">' + value.name + '</option>');
        $('#endmonth').append('<option value="' + value.value + '">' + value.name + '</option>');
    });

    let currentMonthValue = moment().month();

    $('#startmonth').val(currentMonthValue);
    $('#endmonth').val(currentMonthValue);
}

function InitializeYears() {

    let currentYear = moment().year();

    for (let loop = currentYear - 5; loop < currentYear + 5; loop++) {
        $('#startyear').append("<option value=" + loop + ">" + loop + "</option>");
        $('#endyear').append("<option value=" + loop + ">" + loop + "</option>");
    }

    $('#startyear').val(currentYear);
    $('#endyear').val(currentYear);
}