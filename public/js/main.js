/* global newPrice $*/
$(document).ready(async function()
{

});
    var newPrice=0;
    var basePrice=0;
    
    $(".calculate").change(function() {
    newPrice = basePrice;
    $(".calculate option:selected").each(function() {
        newPrice += $(this).data('price')
    });
    
    $("#total").html(newPrice.toFixed(2));
});

