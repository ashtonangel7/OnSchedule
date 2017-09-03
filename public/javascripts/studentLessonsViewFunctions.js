$(document).ready(function () {
    $('#dataTable').DataTable({
        "searching": false,
        "lengthChange": false,
        responsive: true
    });
});

function viewLessons(object) {
    let customer = $(object).data("id");
    let tenant_id = $(object).data("tenant");
    let contract_id = $(object).data("contract");

    let studentInput = $("<input>").attr("type", "hidden").attr("name", "customer").val(customer);
    let tenantInput = $("<input>").attr("type", "hidden").attr("name", "tenenat").val(tenant_id);
    let contractInput = $("<input>").attr("type", "hidden").attr("name", "contract").val(contract_id);

    $(".entryForm").append(studentInput);
    $(".entryForm").append(tenantInput);
    $(".entryForm").append(contractInput);
    $(".entryForm").submit();
}