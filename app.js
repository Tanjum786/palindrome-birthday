function reversestr(str){
    var listOFchar=str.split("");
    var reverselistOFchar=listOFchar.reverse();
    var reversedStr=reverselistOFchar.join("")
    return reversedStr
}
function isPalindrome(str){
    var reverse=reversestr(str);
    if (reverse==str){
        return true
    }
    else{
        return false
    }
}

function convertDate(date){
    var dateStr={day:"",month:"",year:""}
    if  (date.day<10){
        dateStr.day="0"+date.day;
    }else{
        dateStr.day=date.day.toString()
    }
    if  (date.month<10){
        dateStr.month="0"+date.month;
    }else{
        dateStr.month=date.month.toString()
    }
    dateStr.year=date.year.toString()

    return dateStr
}

function getAlldateformate(date){
    var dateStr=convertDate(date);


    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}
// console.log(getAlldateformate(date));

function checkpalindromeForalldateformate(date){
    var listofpalindrome=getAlldateformate(date);
    
    var ispalindrome=false
    for (let i = 0; i < listofpalindrome.length; i++) {
        if (isPalindrome(listofpalindrome[i])) {
            ispalindrome=true;
            break
            
        }    
        
    }
    return ispalindrome;

}
function isLeapYear(year){
    if (year%400===0) {
        return true 
        
    }if(year%100===0){
        return true
    }if(year%4===0){
        return true
    }
    return false
}
function getNextDate(date){
    var day=date.day+1;
    var month=date.month;
    var year=date.year;
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31 ];
    if(month==2){
        if (isLeapYear(year)) {
            if (day>29) {
                day=1
                month++
                
            }
        }else{
            if (day>28) {
                day=1
                month++
            }
        }
            
        
    }else{
        if (day>daysInMonth[month-1]) {

            day=1
            month++
        }
    }
    if (month>12) {
        month=1
        year++        
    }
    return {
        day:day,
        month:month,
        year:year
    }
}
function getNextPalindrome(date){
    var count=0
    var nextDate=getNextDate(date);
    while(1){
        count++
        var isPalindrome=checkpalindromeForalldateformate(nextDate)
        if (isPalindrome) {
            break
            
        }
        nextDate=getNextDate(nextDate);

    }
    return [count,nextDate];

}

// console.log(getNextPalindrome(date));

var dateInput=document.querySelector("#date-input");
var showBtn=document.querySelector("#show-btn");
var output=document.querySelector("#output");

function clickHandler(e){
   var bdayStr=dateInput.value ;
    if (bdayStr !==""){
        var listOfdate=bdayStr.split("-");
        var date={
            day:Number(listOfdate[2]),
            month:Number(listOfdate[1]),
            year:Number(listOfdate[0])
        };
        var isPalindrome=checkpalindromeForalldateformate(date);
        if (isPalindrome){
            output.innerText="yeah!! your BIRTHDAY is palindrome 🥳🥳"
            
        }else{
            var [count,nextDate]= getNextPalindrome(date);
            output.innerText=`The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days! 😔`
        }
    } 
}

showBtn.addEventListener("click",clickHandler)
