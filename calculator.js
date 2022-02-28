   
        $(document).ready(function(){
            // initializing "values"
            let currentNum = null;
            let currentNumLast = null;
            let result = null;
            let lastOperator = null;
            let lastOperatorAfterEqual = null;
            let afterEqual = false;
            let c_counter = 0;

            // Everytime a number is pressed, it begins to build a string.
            // This string is cleared out throughout the program after it is used.
            $(".number").click(function(){
                c_counter = 0;
                $("#C").text("C")
                if (currentNum == null) // prevents "null" from being the start of the string
                {
                    currentNum = "";
                }
                currentNum += ($(this).text()); // number-string builder
                $("#answertext").text(currentNum); // prints to the calculator after each press

                // REMOVE (Testing output)
                $(".result").text(result)
                $(".current_number").text(currentNum)
                $(".last_operator").text(lastOperator)
                $(".afterEqual").text(afterEqual)

            });
            
            // this next section encompases the operators
            // each operator calls the currentNumFunction which converts
            // the currentNum string into a number.
            // during the inital number-entry of a calculation,
            // currentNumFunction assigns result to the initial currentNum value.
            // this is done so that the calculation can be performed after pressing
            // another operator or the equal sign. 
            //
            // the operatorFunction passes the individual operator to the function
            // to perform the correct arithmetic.
            // 
            // after the arithmetic is performed, currentNum is set back to null
            // so that the next number can be entered.
            $("#plus").click(function(){
                currentNumFunction()
                operatorFunction('#plus');
                currentNum = null;
                afterEqual = false;
                
                // REMOVE (Testing output)
                $(".result").text(result)
                $(".current_number").text(currentNum)
                $(".last_operator").text(lastOperator)
                $(".afterEqual").text(afterEqual)

            });
            $("#minus").click(function(){
                currentNumFunction()
                operatorFunction('#minus');
                currentNum = null;
                afterEqual = false;

                // REMOVE (Testing output)
                $(".result").text(result)
                $(".current_number").text(currentNum)
                $(".last_operator").text(lastOperator)
                $(".afterEqual").text(afterEqual)

            });
            $("#multiply").click(function(){
                currentNumFunction()
                operatorFunction('#multiply');
                currentNum = null;
                afterEqual = false;

                // REMOVE (Testing output)
                $(".result").text(result)
                $(".current_number").text(currentNum)
                $(".last_operator").text(lastOperator)
                $(".afterEqual").text(afterEqual)

            });
            $("#divide").click(function(){
                currentNumFunction()
                operatorFunction('#divide');
                currentNum = null;
                afterEqual = false;

                // REMOVE (Testing output)
                $(".result").text(result)
                $(".current_number").text(currentNum)
                $(".last_operator").text(lastOperator)
                $(".afterEqual").text(afterEqual)

            });

            // performs the final arithmetic for the calculation
            // resets all values except for result
            // result is not reset so that it can be used in 
            // another calculation if desired.

            $(".operator_equal").click(function(){
                
                if (afterEqual == false) {
                    currentNumFunction()
                    $(".current_number").text(currentNumLast);

                    result = doMath();
                    $(".result").text(result)
                    $("#answertext").text(result)
                    lastOperatorAfterEqual = lastOperator;
                    currentNum = null;
                    lastOperator = null;
                    afterEqual = true;
                }
                else if (afterEqual == true) {
                    currentNum = currentNumLast;

                    $(".current_number").text(currentNumLast);

                    lastOperator = lastOperatorAfterEqual;
                    result = doMath();
                    $(".result").text(result);
                    $("#answertext").text(result);
                    currentNum = null;
                    lastOperator = null;
                    afterEqual = true;
                }

                // REMOVE (Testing output)
                $(".result").text(result);
                
                $(".last_operator").text(lastOperator);
                $(".afterEqual").text(afterEqual);

            });

            // first click clears the calculator output and any number
            // entered. also changes "C" to "AC"
            // second click clears all values, as if the page were refreshed
            $("#C").click(function(){
                c_counter++; // used to determine to use C or AC functionality

                //REMOVE (TESTING OUTPUT)
                $(".console").text("c_counter is " + c_counter)

                if (c_counter == 1) {
                    currentNum = null;
                    $("#answertext").text(0)
                    $("#C").text("AC")
                }
                else if (c_counter > 1) {
                    currentNum = null;
                    result = null;
                    lastOperator = null;
                    afterEqual = false;
                }

                // REMOVE (Testing output)
                $(".result").text(result);
                $(".current_number").text(currentNum);
                $(".last_operator").text(lastOperator);
                $(".afterEqual").text(afterEqual);
            });
            // The next two operators transform the current result
            // piggy-backs off of the operators set-up
            // uses currentNumFunction to get the appropriate
            // result value to perform the transformation on
            $("#plus_minus").click(function(){
                currentNumFunction()
                result = result * -1;
                currentNum = null;
                $("#answertext").text(result)

                // REMOVE (Testing output)
                $(".result").text(result);
                $(".current_number").text(currentNum);
                $(".last_operator").text(lastOperator);
                $(".afterEqual").text(afterEqual);
            });
            $("#percentage").click(function(){
                currentNumFunction()
                result = result * 100;
                currentNum = null;
                $("#answertext").text(result + "%")

                // REMOVE (Testing output)
                $(".result").text(result);
                $(".current_number").text(currentNum);
                $(".last_operator").text(lastOperator);
                $(".afterEqual").text(afterEqual);
            });

            // used to determine correct result to use in initial calcuation
            // and after pressing the equal button
            function currentNumFunction(){
                // if equal has been pressed -and- user directly types another number to start a new calculation
                if (afterEqual == true && currentNum != null)
                {
                    currentNum = Number(currentNum);
                    currentNumLast = currentNum;
                    result = currentNum;
                    $("#answertext").text(result);
                    afterEqual = false;
                }
                // if after first operator press after page refresh or after "C" button press
                else if (result == null && currentNum != null)
                {
                    currentNum = Number(currentNum);
                    currentNumLast = currentNum;
                    result = currentNum;
                    $("#answertext").text(result);
                }
                // if after second operator press (including equal) of a calculations
                else if (result != null && currentNum != null)
                {
                    currentNum = Number(currentNum);
                    currentNumLast = currentNum;
                    $("#answertext").text(result);
                }

                // REMOVE (TESTING OUTPUT)
                $(".result").text(result);
                $(".current_number").text(currentNum);
                $(".last_operator").text(lastOperator);
                $(".afterEqual").text(afterEqual);
            }
            
            // because of the way a user enters the input, the calculation 
            // cannot be performed until after the second number (i.e. currentNum)
            // has been entered and then either the next operator is pressed
            // or the equal button is pressed.
            // 
            // if it is the very first time an operator is pressed, that operator
            // is stored as lastOperator and then it is used to determine which
            // calculation to perform after the following operator or the equal button
            // has been pressed.
            function operatorFunction(operatorString){
                // very first operator
                if (lastOperator == null) {
                    lastOperator = $(operatorString).text();
                }
                // if a second operator is pressed in a row
                else if (lastOperator != null & currentNum == null){
                    lastOperator = $(operatorString).text();
                }
                else {
                    result = doMath();
                    $("#answertext").text(result);
                    lastOperator = $(operatorString).text();
                }

                // REMOVE: TESTING OUTPUT
                $(".result").text(result);
                $(".current_number").text(currentNum);
                $(".last_operator").text(lastOperator);
                $(".afterEqual").text(afterEqual);
            }

            // because math
            function doMath(){
                switch (lastOperator){
                        case "+": result = result + Number(currentNum); break;
                        case "-": result = result - Number(currentNum); break;
                        case "*": result = result * Number(currentNum); break;
                        case "/": result = result / Number(currentNum); break;
                    };
                    return result;
            }
        });