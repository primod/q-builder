$('#fromBtn').on('click', function(e) {
    addFrom(this, e);
});
$('#selectBtn').on('click', function(e) {
    var flag = $('.select-lines').children('#Select');
    if(flag.length > 0){
        return false;
    }
    addSelect(this, e);
});

var addFrom = function(that, e) {
    var flag = $(that).next().children('#frm');
    if(flag.length >0){
        return false;
    }
    from = $('[target="cloneFrom"]').clone();
    option(from);
    from.removeAttr('target');
    from.removeAttr('style');
    from.attr('id', 'frm');
    $(from).appendTo($(that).siblings('.from-model')).delegate('#removeFrom', 'click', function(e) {
        $(from).remove();
    }).delegate('#fromClear', 'click', function(e) {
       $(from).find('#fromTxt').val('');
    }).delegate('#fromModel','change',function(){
        var val = $('#fromModel').val();
         $(from).find('#fromTxt').val(val);
    }).delegate('#fromSubmit','click',function(e){
        fromSubmit(this, e);
    });

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();



}
var fromSubmit = function(that,e){
    
    
}

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
    var flag = $('.select-lines').children('#Select');
    if(flag.length >1){
        $(this).closest('#Select').remove();
        return false;
    }else{
        $('.select-lines').removeClass('')
    $(this).closest('#Select').remove();
    }
    
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
}
var selectValue = function(that,e){
    var val = $(that).val();
    $(that).siblings('#selectTxt').val(val);
    
}