$(document).ready(function () {
    $('#dataTable').DataTable({
        "searching": false,
        "lengthChange": false,
        responsive: true
    });
});

function viewLessons(object) {
    console.log(object);
}