$(document).on('change', '#order', function(e) {
    updateJson('order', e);
});

$('#orderBtn').on('click', function(e) {
    var flag = $('.order-by').children('#Order');
    if (flag.length > 0) {
        return false;
    }
    addOrder(this, e);
});



var addOrder = function(that, e) {

    order = $('[target="cloneOrder"]').clone();
    option(order);
    order.removeAttr('target');
    order.removeAttr('style');
    order.attr('id', 'Order');
    $(order).appendTo($(that).siblings('.order-by')).delegate('#orderRemove', 'click', function(e) {
        $(order).remove();
        updateJson('order', e);
    }).delegate('#orderClear', 'click', function(e) {
        $(order).find('#orderTxt').val('');
    }).delegate('#orderFields', 'change', function() {
        var val = $('#orderFields').val();
        $(order).find('#orderTxt').val(val);
    });

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();



}