$(function () {
  
  let scheduleHistory = ['','','','','','','','',''];
  if (localStorage.getItem('JSONscheduleHistory') !== null) scheduleHistory = JSON.parse(localStorage.getItem('JSONscheduleHistory'));
  for (let i = 0; i < scheduleHistory.length; i++) {
    let hour = '#hour-' + (i + 9) + ' textarea';
    $(hour).val(scheduleHistory[i]);
  }

  function saveText() {
    let id = ($(this).parent().attr('id')).slice(5) - 9;
    let text = $(this).prev().val();
    scheduleHistory.splice(id, 1, text);
    let JSONscheduleHistory = JSON.stringify(scheduleHistory);
    localStorage.setItem('JSONscheduleHistory', JSONscheduleHistory);
  }
  $('.saveBtn').on('click', saveText);
  
  function changeTime() {
    let currentHour = dayjs().hour();
    for (let i = 0; i < scheduleHistory.length; i++) {
      let hour = '#hour-' + (i + 9);
      $(hour).removeClass('past present future')
      if ((i + 9) < currentHour) $(hour).addClass('past');
      else if ((i + 9) == currentHour) $(hour).addClass('present');
      else $(hour).addClass('future');
    }
    setTimeout(function () {
      changeTime();
    }, 60000*(60 - dayjs().minute()));
  }
  changeTime();

  $('#currentDay').text(dayjs().format('dddd, MMMM Do'));
});