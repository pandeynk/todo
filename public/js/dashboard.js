$(function () {
    $('.close').on('click', function (event) {
        var id = $(event.currentTarget).val();
        $.ajax({
            url: "/deleteTodo",
            method: "POST",
            data: {
                id: id,
                _csurf: $("#csrf").val()
            }
        });
    });
});