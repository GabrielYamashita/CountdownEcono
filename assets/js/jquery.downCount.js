/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

$.fn.downCount = function (options, callback) {
    var settings = $.extend({
            date: null,
            offset: null
        }, options);

    // Throw error if date is not set
    if (!settings.date) {
        $.error('Date is not defined.');
    }

    // Throw error if date is set incorectly
    if (!Date.parse(settings.date)) {
        $.error('Incorrect date format, it should look like this, 03/04/2026 12:00:00.');
    }

    // Save container
    var container = this;

    /**
     * Change client's local date to match offset timezone
     * @return {Object} Fixed Date object.
     */
    var currentDate = function () {
        // get client's current date
        var date = new Date();

        return date;
    };

    /**
     * Main downCount function that calculates everything
     */
    function countdown () {
        var target_date = new Date(settings.date), // set target date
            current_date = currentDate(); // get fixed current date

        // difference of dates
        var difference = target_date - current_date;

        // if difference is negative than it's pass the target date
        if (difference < 0) {
            // stop timer
            clearInterval(interval);

            if (callback && typeof callback === 'function') callback();
                window.location.href = "video.html"
            return;
        }

        // basic math variables
        var _second = 1000,
            _minute = _second * 60,
            _hour = _minute * 60,
            _day = _hour * 24;

        // calculate dates
        var days = Math.floor(difference / _day),
            hours = Math.floor((difference % _day) / _hour),
            minutes = Math.floor((difference % _hour) / _minute),
            seconds = Math.floor((difference % _minute) / _second);

            // fix dates so that it will show two digets
            days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

        // based on the date change the refrence wording
        var ref_days = (days == 1) ? 'dia' : 'dias',
            ref_hours = (hours == 1) ? 'hora' : 'horas',
            ref_minutes = (minutes == 1) ? 'minuto' : 'minutos',
            ref_seconds = (seconds == 1) ? 'segundo' : 'segundos';

        // set to DOM
        container.find('.days').text(days);
        container.find('.hours').text(hours);
        container.find('.minutes').text(minutes);
        container.find('.seconds').text(seconds);

        container.find('.days_ref').text(ref_days);
        container.find('.hours_ref').text(ref_hours);
        container.find('.minutes_ref').text(ref_minutes);
        container.find('.seconds_ref').text(ref_seconds);
    };
    
    // start
    var interval = setInterval(countdown, 1000);
};

})(jQuery);


document.addEventListener('DOMContentLoaded', function() {
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
    
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
    
        // Time calculations for days, hours, minutes and seconds
        var days = Math.ceil(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        // Display the result in the element with id="demo"
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds last").innerHTML = seconds;
        
    
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            window.location.href = "video.html"
        }
    }, 1000);
})