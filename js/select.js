$('#selectBtn').on('click', function(e) {
    var flag = $('.select-lines').children('#Select');
    if(flag.length > 0){
        return false;
    }
    addSelect(this, e);
});

$(document).on('change', '#select', function(e) {
    updateJson('select',e);

});
/*var updateSelect = function(){
    var whr = $('#output').html();
    if(whr){
        whr = JSON.parse(whr);
    }
    else whr = {};
    whr['select'] = $('#selectTxt').val();
    update(whr);
    
} */


var addSelect = function(that,e){
    select = $('[target="cloneSelect"]').clone();
    option(select);
    select.removeAttr('target');
    select.removeAttr('style');
    select.attr('id', 'Select');
    $(that).siblings('.select-lines').addClass('');
    $(select).appendTo($(that).siblings('.select-lines')).delegate('#selectRemove', 'click', function(e) {
        selectRemove(this,e);
        $(this).closest('#Select').remove();
    }).delegate('#selectAdd', 'click', function(e) {
       addSelect($('#selectBtn'), e);
    }).delegate('#selectFields','change',function(e){
        selectValue(this,e);
    }).delegate('#selectClear','click',function(e){
        $(this).siblings('#selectTxt').val('');
    });

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

}
var selectRemove = function(that,e){
    $(that).closest('#Select').remove();
     updateJson('select',e);
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
     
}
var selectValue = function(that,e){
    var val = $(that).val();
    $(that).siblings('#selectTxt').val(val);
    
}