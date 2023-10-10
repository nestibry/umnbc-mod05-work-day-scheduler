/*

    1. Render all the hour-block elements (24-blocks)
    2. Figure out the saving to local storage, reading from local storage
    3. Add time event handler where it monitors a change in hour then calls render hour backgrounds

*/

var schedulerEl = $('.scheduler');  // added scheduler class attribute to the 'scheduler' div container

// Initialize all the hour block containers in 24HR time as past hours (present/future hours set in the current time event handler)
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
    hourEl.append(hourInputEl);
    
    var hourSaveBtnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    var hourSaveIconEl = $('<i class="fas fa-save" aria-hidden="true">');
    hourSaveBtnEl.append(hourSaveIconEl);
    hourEl.append(hourSaveBtnEl);
    
    schedulerEl.append(hourEl);

}


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Current Date (Placeholder for now, will need an event handler to monitor the time to help set the background of each hour block)
var today = dayjs();
console.log(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));

$('#currentDay').text(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));


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
