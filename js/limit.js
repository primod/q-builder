$(document).on('change', '#limit', function(e) {
    updateJson('limit', e);
});

$('#LimitBtn').on('click', function(e) {
    var flag = $('.limit-line').children('#Limit');
    if(flag.length > 0){
        return false;
    }
    addLimit(this, e);
});

var addLimit = function(that, e) {
    limit = $('[target="cloneLimit"]').clone();
    limit.removeAttr('target');
    limit.removeAttr('style');
    limit.attr('id', 'Limit');
    $(limit).appendTo($(that).siblings('.limit-line')).delegate('#limitRemove', 'click', function(e) {
        $(limit).remove();
        updateJson('limit', e);
    }).delegate('#limitClear', 'click', function(e) {
        $(limit).find('#limitTxt').val('');
    });

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();



}