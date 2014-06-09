var calculator = (function () {
    function calculate(){
        var txt = $('#text');
        var val = txt.val();
        $('#text_out').text(val);
        //console.log(val);
        }
    
    return {
        calculate: calculate
    };
})();