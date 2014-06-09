var calculator = (function () {
    function calculate(text){
        //var txt = $('#text');
        //var val = txt.val();
        //$('#text_out').text(val);
        //console.log(val);
        //google REGULAR EXPRESSIONS JAVASCRIPT
        //just for integers
        //var pattern = /\d+|\+|\-|\*|\/|\(|\)/g;
        //for 
        var pattern = /[0-9]*\.?[0-9]+|\+|\-|\*|\/|\(|\)/g;       
        var tokens = text.match(pattern);
        //return JSON.stringify(tokens);
        try {
            var val = evaluate(tokens);
            if (tokens.length != 0){
                throw "ill-formed expression";
            }
            return String(val);
        }
        catch (err){
            return err;
        }
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
    
    function read_operand(tokenArray){
        var num = tokenArray[0];
        tokenArray.shift();
        if (num == "("){
            if (((tokenArray.indexOf(")") < tokenArray.indexOf("(")) &&(tokenArray.indexOf(")") > -1) && (tokenArray.indexOf("(") > -1)) || ((tokenArray.indexOf("(") == -1) && (tokenArray.indexOf(")") > -1))){
                return evaluate(tokenArray);
            }
            else{
                throw "missing parenthesis";
            }
        }
        if (num == "-"){
            var nextNum = tokenArray[0]*(-1);
            tokenArray.shift();
            return nextNum;
        }
        else{
        var intNum = parseFloat(num);
        if(isNaN(intNum)) {
            throw "number expected";
        }
        else {
            return intNum;
        }  
        }
    }
    
    function read_term(tokenArray){
        var value = read_operand(tokenArray);
        while ((tokenArray[0] == "*") || (tokenArray[0] == "/")){
            var operator = tokenArray[0];
            tokenArray.shift();
            var temp = read_operand(tokenArray);
            if (operator == "*"){
                value = value*temp;
            }
            else{
                value = value / temp;
            }
        }
        return value;
    }
                        
    
    
    function evaluate(tokenArray) {
        if (tokenArray.length == 0)
        {
            throw "missing operand";
        }
        var value = read_term(tokenArray);
        while (tokenArray.length > 0)
        {
            var operator = tokenArray[0];
            tokenArray.shift();
            if (operator == ")"){
                return value;
            }
            if ((operator != "+") && (operator != "-") && (operator != "*") && (operator != "/" )){
                throw "unrecognized operator";
                }
            if (tokenArray.length == 0){
                throw "missing operand";
            }
            var temp = read_term(tokenArray);          
        switch(operator){
                case "+": 
                value = value + temp;
                break;
                        
                case "-": 
                value = value - temp;
                break;
        }
        }
        return value;
}
    
    return {
        calculate: calculate,
        setup: setup,
        read_operand: read_operand, 
        evaluate: evaluate
    };
})();

$(document).ready(function () {
    $('.calc').each(function () {
        calculator.setup(this);
    });
});
