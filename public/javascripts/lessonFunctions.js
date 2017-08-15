$(function () {

    InitializeYears();
    InitializeMonths();
    InitializeDays();
    InitializeStartTime();
    InitializeLessonLength();

    $('#month').change(function () {
        InitializeDays();
    });
});

function InitializeDays() {

    $('#day').empty();

    let monthValue = $('#month').val();
    let daysInMonth = moment().month(monthValue).daysInMonth();

    for (let loop = 1; loop <= daysInMonth; loop++) {
        $('#day').append('<option value="' + loop + '">' + loop + '</option>');
    }

    if (monthValue == moment().month()) {
        $('#day').val(moment().date());
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
        $('#month').append('<option value="' + value.value + '">' + value.name + '</option>');
    });

    let currentMonthValue = moment().month();

    $('#month').val(currentMonthValue);
}

function InitializeYears() {

    let currentYear = moment().year();

    for (let loop = currentYear - 5; loop < currentYear + 5; loop++) {
        $('#year').append("<option value=" + loop + ">" + loop + "</option>");
    }

    $('#year').val(currentYear);
}

function InitializeStartTime() {
    let startTimes = ["06:00", "06:30", "07:00", "07:30",
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00"];

    $.each(startTimes, function (index, value) {
        $('#time').append('<option value="' + value + '">' + value + '</option>');
    });

    $('#time').val(moment().format('hh:00'));
}

function InitializeLessonLength() {
    let lessonLengths = [
        {
            name: "30 Minutes",
            value: 30
        },
        {
            name: "1 Hour",
            value: 60
        },
        {
            name: "1 Hour 30 Minutes",
            value: 90
        },
        {
            name: "2 Hours",
            value: 120
        },
        {
            name: "2 Hours 30 Minutes",
            value: 150
        },
        {
            name: "3 Hours",
            value: 180
        }
    ];

    $.each(lessonLengths, function (index, value) {
        $('#duration').append('<option value="' + value.value + '">' + value.name + '</option>');
    });
}