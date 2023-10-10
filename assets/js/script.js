// Initialize the Current Date -- Updates in the self-invoking function
var today = dayjs();
console.log(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));
$('#currentDay').text(today.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));
var currentHourState = today.format('HH') * 1;  // Used to monitor the hour past/present/future


// Initialize scheduler container that holds all the hour row containers
var schedulerEl = $('.scheduler');  // added scheduler class attribute to the 'scheduler' div container


// Initialize the scheduler container with all the hours (9am-5pm) listed then call renderHourBackground
// using military time (24HR clock)as past hours (present/future hours set in the current time event handler)
for(var i = 9; i <= 17; i++){
    
    // Create hour row container and add html id="hour-HH" (military time)
    var hourEl = $('<div class="row time-block past">');
    var idName = ("hour-" + i);
    hourEl.attr("id",idName);

    // Create the hour label and add it to the hour row container
    var hourTimeEl = $('<div class="col-2 col-md-1 hour text-center py-3">');
    if(i < 12){ hourTimeEl.text(i + "AM"); }
    else if(i === 12){ hourTimeEl.text(i + "PM"); }
    else if(i > 12){ hourTimeEl.text((i%12) + "PM"); }
    else {console.log("hourTimeEl text value is being miscalculated.");}
    hourEl.append(hourTimeEl);
    
    // Create the hour input text element and add it to the hour row container
    var hourInputEl = $('<textarea class="col-8 col-md-10 description" rows="3">');
    var hourInputText = localStorage.getItem(idName); // Get information from local storage if exists
    if(!hourInputText){hourInputText=""}
    hourInputEl.text(hourInputText);
    hourEl.append(hourInputEl);
    
    // Create the save inputs button and add it to the hour row container
    var hourSaveBtnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    var hourSaveIconEl = $('<i class="fas fa-save" aria-hidden="true">');
    hourSaveBtnEl.append(hourSaveIconEl);
    hourEl.append(hourSaveBtnEl);
    
    // Append the hour row container to the scheduler container
    schedulerEl.append(hourEl);
}
renderHourBackground();  


// render the current hour row colors (this function is being hoisted)
function renderHourBackground(tempHour){
    
    var currentHour = tempHour || currentHourState;  //tempHour used for debugging code to change the rendering as needed
    
    console.log("Rendering Hour Background for the " + currentHour + "th hour...");
    
    // Render the past/present/future background
    for(var i = 9; i <= 17; i++){
        var idName = ("#hour-" + i);
        $(idName).attr('class');
        console.log("Rendering Hour: ", idName, " ... ");
        console.log("Original Classes: " + $(idName).attr('class'));

        // reset the class block...this essentially removes past/present/future from the old class values
        $(idName).attr('class', 'row time-block');

        // add class past || present || future
        if(i < currentHour){ $(idName).addClass("past"); } 
        else if (i == currentHour){ $(idName).addClass("present"); } 
        else if (i > currentHour){ $(idName).addClass("future"); } 
        else { console.log(idName, "Cannot compare to currentHourState"); }
        
        console.log("New Classes: " + $(idName).attr('class'));
    }
}


// User clicks on a save button
schedulerEl.on('click','.saveBtn', function(event){
    
    // Preventing any funkiness with clicking on a save button in the scheduler container
    event.preventDefault();
    event.stopPropagation();

    // Get the hour id from html class
    var saveBtnEl = $(this);
    var updateHourEl = saveBtnEl.parent();
    var hourID = updateHourEl.attr('id');
    console.log('User Saving Text for ID: ' + hourID);
    
    // Save the text to localStorage
    var calendarItem = updateHourEl.children('textarea').val();
    localStorage.setItem(hourID, calendarItem);
    if(!calendarItem){console.log("Save button clicked, Empty Str Input");} else{console.log("Saved Text: " + calendarItem);}

    // Future To-do: Make one localStorage key for the entire application 
});



// Update the current time every second, check if there has been an hour change
setInterval(function() {
    
    // new current time
    var newTime = dayjs();
    $('#currentDay').text(newTime.format('dddd, MMMM DD, YYYY -- HH:mm:ss'));

    // new current hour used to monitor change in hour
    var newHour = newTime.format('HH') * 1;

    // Upon hour change, re-render the background of each hour block
    if(newHour !== currentHourState){
        console.log('Change to the new hour:' + newHour, typeof newHour);
        currentHourState = newHour;
        renderHourBackground();
    }

}, 1000);




