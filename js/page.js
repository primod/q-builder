$(document).on('change', '#page', function(e) {
    updateJson('page', e);
});
$(document).on('change', '#paginate', function(e) {
    updateJson('paginate_as', e);
});




$('#pageBtn').on('click', function(e) {
    var flag = $('.page-line').children('#Limit');
    if(flag.length > 0){
        return false;
    }
    addPage(this, e);
});

$('#paginateBtn').on('click', function(e) {
    var flag = $('.paginate-line').children('#Paginate');
    if(flag.length > 0){
        return false;
    }
    addPaginate(this, e);
});

var addPage = function(that, e) {
   
    page = $('[target="clonePage"]').clone();
    page.removeAttr('target');
    page.removeAttr('style');
    page.attr('id', 'Page');
    $(page).appendTo($(that).siblings('.page-line')).delegate('#pageRemove', 'click', function(e) {
        $(page).remove();
         updateJson('page', e);
    }).delegate('#pageClear', 'click', function(e) {
        $(page).find('#pageTxt').val('');
    });

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();



}

var addPaginate = function(that, e) {
   
    paginate = $('[target="clonePaginate"]').clone();
    option(paginate);
    paginate.removeAttr('target');
    paginate.removeAttr('style');
    paginate.attr('id', 'Paginate');
    $(paginate).appendTo($(that).siblings('.paginate-line')).delegate('#paginateRemove', 'click', function(e) {
        $(paginate).remove();
        updateJson('paginate_as', e);
    });

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();



}