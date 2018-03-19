$("#addTask").on("click", function () {
    var taskNumber = $("span.task").length;
    var newTask = taskNumber + 1;
    $('#startTask').append("<span class='task' draggable='true' id='task" + newTask + "'>Task " + newTask + "</span>").trigger('create');
    dragndrop();
    editableSpan();
});
$("#addPerson").on("click", function () {
    $('#kanban tr:last').after('<tr><td><span>User</span></td><td></td><td></td><td></td><td></td></tr>').trigger('create');
    dragndrop();
    editableSpan();
});

function dragndrop() {
    $('.task').on("dragstart", function (event) {
        $(this).css("background-color", "black");
        var dt = event.originalEvent.dataTransfer;
        dt.setData('Text', $(this).attr('id'));
    });
    $('table td').not("td:first-child").on("dragenter dragover drop", function (event) {
        event.preventDefault();
        if (event.type === 'drop') {
            var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
            var taskState = $(this).closest('table').find('th').eq($(this).index())[0].id;
            switch (taskState) {
                case "wait": $('#' + data).css("background-color", "gray"); break;
                case "loading": $('#' + data).css("background-color", "orange"); break;
                case "finished": $('#' + data).css("background-color", "green"); break;
                case "delivered": $('#' + data).css("background-color", "black"); break;
            }
            var de = $('#' + data).detach();
            de.appendTo($(this));
        }
    });
}

function editableSpan() {
    $('span').bind('dblclick',
        function () {
            $(this).attr('contentEditable', true);
            var oldBg = $(this).css("background-color");
            $(this).attr("oldBg", oldBg);
            $(this).css("background-color", "white");
            $(this).css("color", "black");

        }).blur(
        function () {
            $(this).attr('contentEditable', false);
            var oldBg = $(this).attr("oldBg");
            $(this).css("background-color", oldBg);
            $(this).css("color", "white");
        });
}

$().ready(function () {
    dragndrop();
    editableSpan();
});