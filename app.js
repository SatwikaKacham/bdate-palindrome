const dateInput = document.querySelector(".date-input");
const checkBtn = document.querySelector(".check-btn");
const outPut = document.querySelector(".output");


function IsreverseStringPalindrome(dateStr)
{
    var allChars = dateStr.split('');
    var reverseAllChars = allChars.reverse();
    var reversedString = reverseAllChars.join('');

    return  reversedString===dateStr;

}

function dateToString(date)
{
    var dateArr = { day:'',month:'',year:''}
    if(date.day<10)
    {
        dateArr.day="0"+date.day;
    }
    else 
    {
        dateArr.day=date.day.toString();
    }

    if(date.month<10)
    {
        dateArr.month="0"+date.month;
    }
    else 
    {
        dateArr.month=date.month.toString();
    }
    dateArr.year=date.year.toString();
    return dateArr;
}

function allPosibilities(date)
{
    var dateArr = dateToString(date);
    var ddmmyyyy = dateArr.day+dateArr.month+dateArr.year;
    var mmddyyyy = dateArr.month+dateArr.day+dateArr.year;
    var yyyymmdd = dateArr.year+dateArr.month+dateArr.day;
    var ddmmyy = dateArr.day+dateArr.month+dateArr.year.slice(-2);
    var mmddyy = dateArr.month+dateArr.day+dateArr.year.slice(-2);
    var yymmdd = dateArr.year.slice(-2)+dateArr.month+dateArr.day;
    formatsArr =[ddmmyyyy , mmddyyyy,yyyymmdd,ddmmyy, mmddyy,yymmdd ];
    return formatsArr;
}

function isPosibilitiesPalindrome(date)
{
    formatArr = allPosibilities(date);
    var sol=false;

     for(i=0;i<formatArr.length;i++)
     {
         sol=IsreverseStringPalindrome(formatArr[i]);
         if(sol)
         {
             return sol ;
             break;
         }
         
     }
     return sol;
}

function leapYear(year)
{
    if(year%400===0){
        return true;
    }
    if(year%100===0){
        return false;
    }
    if(year%4===0){
        return true;
    }

    return false;
}

 function getNextDate(date)
 {
     var day =date.day+1;
     var month =date.month;
     var year =date.year;
    var totalDaysArr=[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month==2)
    {
        if(leapYear(year))
        {
            if(day>29)
            {
                day=1;
                month++
            }
        }
        else 
        {
            if(day>totalDaysArr[month-1])
            {
                day=1;
                month++;

            }
        }
    }
    else if(day>totalDaysArr[month-1])
    {
        day=1;
        month++;
    }

    if(month>12)
    {
        month=1;
        year++;
    }
    return {
        day:day, month:month,year:year
    };
 }
//  function getNextPalindromeOccurance(date)
//  {
//      var count=0;
//      do
//      {
//           count++;
//     var  nextDate=getNextDate(date);
//     var sol=isPosibilitiesPalindrome(nextDate);

        
//      }while(!sol);

//      return [count,nextDate];
//  }

function getNextPalindromeOccurance(date){
    var count = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      count++;
      var isPalindrome =isPosibilitiesPalindrome(nextDate); ;
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [count, nextDate];
  }

function clickEvent(){
var bdaydate = dateInput.value;
  if(bdaydate!== '')
  {
    datearr = bdaydate.split('-');
    var date ={
     day : Number(datearr[2]),
     month: Number(datearr[1]),
     year: Number(datearr[0]),
    }
  }
  else 
  {
    outPut.innerText = "Please enter some valid input😥"
  }
 var sol = isPosibilitiesPalindrome(date);
     if(sol)
      {
         outPut.innerText = "Yahh!! your birthday is palindrome, band bajao!!🥁🥳";
        }
    else{
         var [count,nextDate] = getNextPalindromeOccurance(date);
         outPut.innerText= `The next palindrome is at ${nextDate.day}-
         ${nextDate.month}-${nextDate.year},oh!oh! u missed palindrome by ${count} days!😞`
    
        } 


}







checkBtn.addEventListener('click',clickEvent);