var fields = ['Points', 'Goals', 'Assists', 'Shots', 'Shot%', 'PPG', 'SHG', 'Penalty Mins'];
var comparisons = ['=', '<>', '<', '<=', '>', '>='];
var logicalOperators = ['AND', 'OR'];
var fromList = ['address', 'inventory', 'catogory', 'city', 'country', 'customer', 'sales_by_store'];
var orderBy = ['Ascending', 'Descending'];
var paginateAs = ['Lazy', 'Normal'];
var virtual = 0;

function processWhere(dom, where, prevOp) {
    var len = $(dom).find('[rel="Group"]').length;
    var lastOp = null;
    var finalResult = {};
    // var prevResult = result;
    for (i = len - 1; i >= 0; i--) {
        result = {};
        var group = $(dom).find('[rel="Group"]')[i];
        //do processing here and put result in finalResult
        var currentOperator = $(group).children('#logicalOperators').val();
        console.log(currentOperator);
        var condition = $(group).find('.group-conditions')[0];
        $(condition).children().each(function() {
            if ($(this).attr('id') == 'condition') {
                //  console.log($(this))
                var field = $(this).find('#fields').val();
                var value = $(this).find('#Value').val();
                if (result[field]) {
                    if ($.isArray(result[field])) {
                        result[field].push(value);
                    } else {
                        var val = [];
                        val.push(result[field]);
                        val.push(value);
                        result[field] = val;
                    }
                } else {
                    result[field] = value;
                }


            }
        });
        if (lastOp == null) {
            if (currentOperator == 'AND') {
                finalResult = result;
            } else if (currentOperator == 'OR') {
                finalResult['OR'] = result;
            }
        } else {
           if (lastOp == 'AND' && currentOperator == 'AND') {
                for (x in result) {
                    if (x in finalResult) {
                        var prev = finalResult[x];
                        if ($.isArray(prev)) {
                            if ($.isArray(result[x])) {
                                finalResult[x] = prev.concat(result[x]);
                            } else {
                                finalResult[x].push(result[x]);
                            }

                        } else {
                            var newArr = [];
                            newArr.push(prev);
                            if (isArray(result[x])) {
                               newArr =  newArr.concat(result[x]);
                                finalResult[x] = newArr;
                            } else {
                                newArr.push(result[x]);
                                finalResult[x] = newArr;
                            }
                        }
                    } else {
                        finalResult[x] = result[x];
                    }
                }
            } else if (lastOp == 'OR' && currentOperator == 'AND') {
                for (x in result) {
                    finalResult[x] = result[x];
                }
            } else if (lastOp == 'OR' && currentOperator == 'OR') {
                for (x in result) {
                    if (x in finalResult['OR']) {
                        var prev = finalResult['OR'][x];
                        if ($.isArray(prev)) {
                            if (isArray(result[x])) {
                                finalResult['OR'][x] = prev.concat(result[x]);
                            } else {
                                finalResult['OR'][x].push(result[x]);
                            }
                        } else {
                            var newArr = [];
                            newArr.push(prev);
                            if ($.isArray(result[x])) {
                           newArr =   newArr.concat(result[x]);
                                finalResult['OR'][x] = newArr;
                            } else {
                                newArr.push(result[x]);
                                finalResult['OR'][x] = newArr;
                            }
                        }
                    } else {
                        finalResult['OR'][x] = result[x];
                    }
                }
            } else if (lastOp == 'AND' && currentOperator == 'OR') {
                var zz = {};
                virtual++;
                zz[String(virtual)] = finalResult;
                for (x in result) {
                    zz[x] = result[x];
                }
                finalResult = {}
                finalResult['OR'] = zz;
            }
        }
        lastOp = currentOperator;
    }

    return finalResult;
}

var processSelect = function(dom) {
    var select_lines = $(dom).find('.select-lines');
    var field = [];
    $(select_lines).children().each(function(e) {
        if ($(this).attr('id') == 'Select') {
            var x = $(this).find('#selectTxt').val();
            if ($.inArray(x, field) == -1)
            {
                field.push(x);
            }
        }

    });
    return field;
}

var processOrder = function(dom) {
    var order_by = $(dom).find('#Order');
    var order = {};
    fiel = $(order_by).find('#orderTxt').val();
    val = $(order_by).find('#orderBy').val();
    if (val == 'Ascending') {
        val = 'ASC';
    } else if (val == 'Descending') {
        val = 'DSC';
    }
    order[fiel] = val;
    return order;
}

var processLimit = function(dom) {
    var limit = $(dom).find('#limitTxt').val();
    return limit;
}
var processPage = function(dom) {
    var page = $(dom).find('#pageTxt').val();
    return page;
}
var processPaginate = function(dom) {
    var paginate = $(dom).find('#paginateBy').val();
    if (paginate == 'Lazy') {
        paginate = 'lazy';
    } else if (paginate == 'Normal') {
        paginate = 'normal'
    }
    return paginate;
}


var updateJson = function(clause, e) {
    var query = $('#output').text();
    if (query == '' || query == null) {
        query = {};
    } else {
        query = JSON.parse(query);
    }
    if (clause == 'where') {
        where = {};
        var where_con = $('#where');
        // var group = $(where_con).find('#group')[0];
        var where = processWhere(where_con, where);
        query[clause] = where;
        if (JSON.stringify(where) == '{}') {

            delete query[clause];
        }
    }
    else if (clause == 'select') {
        var select_con = $('#select');
        var select = processSelect(select_con);
        query['fields'] = select;
        if (JSON.stringify(select) == '[]') {
            delete query['fields'];
        }
    }
    else if (clause == 'order') {
        var order_by = $('#order');
        var order = processOrder(order_by);
        query['order'] = order;
        if (JSON.stringify(order) == '{}') {

            delete query[clause];
        }
    }
    else if (clause == 'limit') {
        var limit_d = $('#limit');
        var limit = processLimit(limit_d);
        query[clause] = limit;
    }
    else if (clause == 'page') {
        var page_d = $('#page');
        var page = processPage(page_d);
        query[clause] = page;
    }
    else if (clause == 'paginate_as') {
        var paginate_d = $('#paginate');
        var paginate = processPaginate(paginate_d);
        query[clause] = paginate;
    }
    update(query)
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
}

var update = function(where) {
    where = JSON.stringify(where);
    $('#output').text(where);
}
var option = function(div) {
    var option = '';
    for (i in fields) {
        option += '<option>' + fields[i] + '</option>'
    }
    $(div).find('select#fields').html(option);
    $(div).find('select#selectFields').html(option);
    $(div).find('select#orderFields').html(option);
    var option = '';
    for (i in comparisons) {
        option += '<option>' + comparisons[i] + '</option>'
    }
    $(div).find('select#comparisons').html(option);
    var option = '';
    for (i in logicalOperators) {
        option += '<option>' + logicalOperators[i] + '</option>'
    }
    $(div).find('select#logicalOperators').html(option);
    var option = '';
    for (i in fromList) {
        option += '<option>' + fromList[i] + '</option>'
    }
    $(div).find('select#fromModel').html(option);
    var option = '';
    for (i in orderBy) {
        option += '<option>' + orderBy[i] + '</option>'
    }
    $(div).find('select#orderBy').html(option);
    var option = '';
    for (i in paginateAs) {
        option += '<option>' + paginateAs[i] + '</option>'
    }
    $(div).find('select#paginateBy').html(option);
}




        