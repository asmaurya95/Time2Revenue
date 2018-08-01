$('#Dis_plan_strdt').datepicker({
    onSelect: function(dateText, inst){
        $('#Dis_plan_enddt').datepicker('option', 'minDate', new Date(dateText));
    },
});

$('#Dis_plan_enddt').datepicker({
    onSelect: function(dateText, inst){
        $('#Dis_plan_strdt').datepicker('option', 'maxDate', new Date(dateText));
    }
});
