/*

    [X] 1. Render all the hour-block elements (24-blocks)
    [X] 2. Figure out clicking the save button event handler, saving to local storage, reading from local storage
    [ ] 3. Add time event handler where it monitors a change in hour then calls render hour backgrounds

*/

// Initialize the Current Date -- Updates in the self-invoking function
var today = dayjs();
console.log(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));
$('#currentDay').text(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));

// var currentHourState = 9;
var currentHourState = today.format('HH') * 1;

// Initialize all the hour block containers in 24HR time as past hours (present/future hours set in the current time event handler)
var schedulerEl = $('.scheduler');  // added scheduler class attribute to the 'scheduler' div container

function renderHourBackground(tempHour){
    
    var currentHour = tempHour || currentHourState;
    
    console.log("Rendering Hour Background for the " + currentHour + " hour...");
    
    for(var i = 9; i <= 17; i++){
        var idName = ("#hour-" + i);
        $(idName).attr('class');
        console.log("Rendering Hour: ", idName, " ... ");
        console.log("Classes:" + $(idName).attr('class'));
        // var hasPast = $(idName).hasClass("past");
        // var hasPresent = $(idName).hasClass("present");
        // var hasFuture = $(idName).hasClass("future");
        // console.log("hasPast:", hasPast);
        // console.log("hasPresent:", hasPresent);
        // console.log("hasFuture:", hasFuture);

        $(idName).attr('class', 'row time-block');

        // Remove current past/present/future classes in case if the element has multiple time classes
        // if(hasPast){ $(idName).removeClass("past"); }
        // if(hasPresent){ $(idName).removeClass("present"); }
        // if(hasPresent){ $(idName).removeClass("future"); }
        
        console.log("Classes:" + $(idName).attr('class'));

        if(i < currentHour){
            console.log(idName, "past");
            $(idName).addClass("past");
            console.log("Classes:" + $(idName).attr('class'));

        } else if (i == currentHour){
            console.log(idName, "present");
            $(idName).addClass("present");
            console.log("Classes:" + $(idName).attr('class'));

        } else if (i > currentHour){
            console.log(idName, "future");
            $(idName).addClass("future");
            console.log("Classes:" + $(idName).attr('class'));

        } else {
            console.log(idName, "Cannot compare to currentHourState");
        }

    }
}



for(var i = 9; i <= 17; i++){
    
    var idName = ("hour-" + i);
    console.log(idName, typeof idName, (i%12));

    var hourEl = $('<div class="row time-block past">');
    hourEl.attr("id",idName);

    var hourTimeEl = $('<div class="col-2 col-md-1 hour text-center py-3">');
    if(i < 12){ hourTimeEl.text(i + "AM"); }
    else if(i === 12){ hourTimeEl.text(i + "PM"); }
    else if(i > 12){ hourTimeEl.text((i%12) + "PM"); }
    else {console.log("hourTimeEl text value is being miscalculated.");}
    hourEl.append(hourTimeEl);
    
    var hourInputEl = $('<textarea class="col-8 col-md-10 description" rows="3">');
    var hourInputText = localStorage.getItem(idName); // Get information from local storage if exists
    if(!hourInputText){hourInputText=""}
    hourInputEl.text(hourInputText);
    hourEl.append(hourInputEl);
    
    var hourSaveBtnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    var hourSaveIconEl = $('<i class="fas fa-save" aria-hidden="true">');
    hourSaveBtnEl.append(hourSaveIconEl);
    hourEl.append(hourSaveBtnEl);
    
    schedulerEl.append(hourEl);
}
renderHourBackground();

schedulerEl.on('click','.saveBtn', function(event){
    
    event.preventDefault();
    event.stopPropagation();

    var saveBtnEl = $(this);
    var updateHourEl = saveBtnEl.parent();
    var hourID = updateHourEl.attr('id');

    console.log(updateHourEl);
    console.log('Hour ID: ' + hourID);
    
    var calendarItem = updateHourEl.children('textarea').val();
    localStorage.setItem(hourID, calendarItem);
    if(!calendarItem){console.log("Save button clicked, Empty Str Input");} else{console.log("Save: " + calendarItem);}

    // Future To-do: Make one localStorage key for the entire application 

});


// function renderHourBackground(){
//     console.log("Rendering Hour Background...");
    
//     for(var i = 9; i <= 17; i++){
//         var idName = ("#hour-" + i);
//         $(idName).attr('class');
//         console.log( $(idName).attr('class'));
//         var hasPast = $(idName).hasClass("past");
//         var hasPresent = $(idName).hasClass("present");
//         var hasFuture = $(idName).hasClass("future");
//         console.log(hasPast, hasPresent, hasFuture);

//         // Remove current past/present/future classes in case if the element has multiple time classes
//         if(hasPast){ $(idName).removeClass("past"); }
//         if(hasPresent){ $(idName).removeClass("present"); }
//         if(hasPresent){ $(idName).removeClass("future"); }
        
//         if(i < currentHourState){
//             console.log(idName, "past");
//             $(idName).addClass("past");

//         } else if (i === currentHourState){
//             console.log(idName, "present");
//             $(idName).addClass("present");

//         } else if (i > currentHourState){
//             console.log(idName, "future");
//             $(idName).addClass("future");

//         } else {
//             console.log(idName, "Cannot compare to currentHourState");
//         }
//     }
// }


// var currentHourState = 11;
// var currentHourState = today.format('HH') * 1;

// $(function () {

//     setInterval(function() {
//         var newTime = dayjs();
//         // console.log(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));
//         $('#currentDay').text(newTime.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));

//         var newHour = newTime.format('HH') * 1;
//         console.log('Current Hour:' + newHour, typeof newHour);
//         // if(newHour === currentHourState){
//         //     console.log("Still the current hour");
//         // } else {
//         //     console.log("The hour has changed");
//         //     // Re-render the background of each hour block
//         //     renderHourBackground();
//         // }
//         if(newHour !== currentHourState){
//             console.log("The hour has changed");
//             // Re-render the background of each hour block
//             renderHourBackground();
//         }

//     }, 1000);

// });





setInterval(function() {
    var newTime = dayjs();
    // console.log(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));
    $('#currentDay').text(newTime.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));

    var newHour = newTime.format('HH') * 1;
    console.log('Current Hour:' + newHour, typeof newHour);
    // if(newHour === currentHourState){
    //     console.log("Still the current hour");
    // } else {
    //     console.log("The hour has changed");
    //     // Re-render the background of each hour block
    //     renderHourBackground();
    // }
    if(newHour !== currentHourState){
        console.log("The hour has changed");
        // Re-render the background of each hour block
        currentHourState = newHour;
        renderHourBackground();
    }

}, 1000);






// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
