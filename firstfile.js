var calculator = (function () {
    function calculate(text){
        //var txt = $('#text');
        //var val = txt.val();
        //$('#text_out').text(val);
        //console.log(val);
        return text;
        }
    
    function setup(div){
        var input = $('<input></input>', {type: 'text', size: 50});
        var output = $('<div></div>');
        var button = $('<button>Calculate</button>');
        $(div).append(input, button, output);
        
        button.on('click', function (event) {
            output.text(calculate(input.val()));            
    });       
    }
    
    return {
        calculate: calculate,
        setup: setup
    };
})();

$(document).ready(function () {
    $('.calc').each(function () {
        calculator.setup(this);
    });
});
