// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
 
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//var now = dayjs('hh')

//   setInterval(colorFunct, 1000)


$(function () {
    
    var now = dayjs().hour()
    colorFunct()
    setInterval(colorFunct, 10000)
    reCallStorage()
    timerHandler()
    setInterval(timerHandler, 1000)
    
    $('.saveBtn').on('click', function(){
        var keyId = $(this).parent().attr('id')
    var textAreaVal = $(this).siblings('.description').val()
    localStorage.setItem(keyId, textAreaVal)
    })

    function colorFunct(){
        
        var timeBlock = $('.time-block')
        //console.log(timeBlock)
        timeBlock.each(function(){
            var hourBlockText = this.children[0].textContent
            var textArea = $(this).find('.description')
            
            var hourBlock
            if (hourBlockText.includes('am')){
                hourBlock = parseInt(hourBlockText.replace('am','').trim())
                if (hourBlock === 12) {
                    hourBlock = 0
                }
            } else {
                hourBlock = parseInt(hourBlockText.replace('pm','').trim())
                if (hourBlock !== 12) {
                    hourBlock += 12
                }   
            }
            if (hourBlock === dayjs().hour()) {
                textArea.addClass("present")
                
            } 
            else if (now > hourBlock) {
                textArea.addClass("past")
            }
            else {
                textArea.addClass("future")
            }
            
        })
}

    function reCallStorage() {
        var timeBlock = $('.time-block')
        var storeStuff
        timeBlock.each(function(){
        var keyId = $(this).attr('id')
        storeStuff = localStorage.getItem(keyId)
    $(this).find('.description').val(storeStuff)
    })
    }
    function timerHandler(){
        var today = dayjs();
        $('#currentDay').text(today.format('dddd, MMMM D YYYY, h:mm:ss a'))
    }
    
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