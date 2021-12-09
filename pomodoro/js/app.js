"use strict";
/**Command in root directory to start a web server locally, tested with VS Code
 * npm run serve
 */
class Timer
{
    /**
     * Represents a single Timer.
     * @param {String} name Timer display name.
     * @param {Number} duration_in_seconds Length of timer in seconds.
     */
    constructor(name, duration_in_seconds)
    {
        this._name = name;
        this._duration_in_seconds = duration_in_seconds;
    }

    get name()
    {
        return this._name;
    }

    get duration()
    {
        return this._duration_in_seconds;
    }
}

/**
 * Represents a queue of Timer objects.
 */
class TimerQueue
{
    /**
     * Represents a queue of Timer objects.
     */
    constructor()
    {
        this.queue = [];
    }

    /**
     * Append a timer on to the queue.
     * @param {Timer} timer A new timer.
     */
    push(timer)
    {
        this.queue.push(timer);
    }

    /**
     * Removes the first timer and returns it.
     * @returns {Timer}
     */
    pop()
    {
        return this.queue.shift();
    }

    /**
     * Returns the first timer without removing it.
     * @returns {Timer}
     */
    peek()
    {
        return this.queue.slice(0, 1);
    }

    /**
     * Returns whether the queue is currently empty.
     * @returns {Boolean}
     */
    isEmpty()
    {
        return !this.queue.length;
    }

    /**
     * Returns how many timers are in the queue.
     * @returns {Number}
     */
    count()
    {
        return this.queue.length;
    }

    /**
     * Clears all timers from the queue.
     */
    clear()
    {
        this.queue = [];
    }
}

/**
 * PomodoroTimer component.
 */
class PomodoroTimerComponent
{
    static get STATE_STOPPED() {
        return 1;
    }
    static get STATE_RUNNING() {
        return 2;
    }

    /**
     * PomodoroTimer component.
     * @param {Object} options Options: defaultTimerQueue.
     */
    constructor(options={})
    {
        this.timerDurationElem = document.getElementById('timer_display_duration');
        this.timerButtonElem = document.getElementById('timer_button');
        this.breakButtonElem = document.getElementById('break_button');

        this.timerQueue = new TimerQueue();

        this.defaultTimerQueue = options.defaultTimerQueue || [
            new Timer("Work", 25*60),
            new Timer("Rest", 5*60)
        ];

        this.defaultBreakQueue = options.defaultBreakQueue || [
          new Timer("Rest", 5*60),
          new Timer("Work", 25*60),
          new Timer("Rest", 5*60),
          new Timer("Rest", 5*60),
          new Timer("Work", 25*60),
          new Timer("Rest", 5*60),
          new Timer("Rest", 5*60),
          new Timer("Rest", 15*60)
      ];

        this.currentTimer = null; // no timer until user starts timer queue
        this.currentTimerStart = 0;
        this.currentTimerSecondsLeft = 0; //TODO create a timer queue from beginning and never quits?

        this.state = PomodoroTimerComponent.STATE_STOPPED;

        this.initEventHandlers();
    }

    initEventHandlers()
    {
        //Listen to the Start/Stop button
        document.addEventListener('click', function(e){
            if (e.target.id === this.timerButtonElem.id) {
                if (this.state === PomodoroTimerComponent.STATE_STOPPED) {
                    this.event_startTimer.call(this);
                } else if (this.state === PomodoroTimerComponent.STATE_RUNNING) {
                    this.event_stopTimer.call(this);
                }
            }
        }.bind(this), false);

        this.createBreakQueue();

        //Listen to the Short break/Long Break button
        document.addEventListener('click', function(e){
          if (e.target.id === this.breakButtonElem.id) {
              if (this.state === PomodoroTimerComponent.STATE_STOPPED) {
                  this.event_startBreak.call(this);
              } else if (this.state === PomodoroTimerComponent.STATE_RUNNING) {
                  this.event_stopBreak.call(this);
              }
          }
      }.bind(this), false);
    }

    render()
    {
        if (this.state === PomodoroTimerComponent.STATE_STOPPED) {
            this.timerButtonElem.textContent = "START WORK";
            this.breakButtonElem.textContent = "START BREAK ";
            if (this.timerQueue.isEmpty()) {
                //this.timerNameElem.textContent = "Finished";
                this.timerDurationElem.textContent = this.formatDuration(0);
            }
            if (this.currentTimerSecondsLeft >= 0) {
              this.timerDurationElem.textContent = this.formatDuration(this.currentTimerSecondsLeft);
            }
        } else if (this.state === PomodoroTimerComponent.STATE_RUNNING) {
            this.timerButtonElem.textContent = "STOP";
            this.breakButtonElem.textContent = " ... ";
            if (this.currentTimer) {
                //this.timerNameElem.textContent = this.currentTimer.name;
            }
            if (this.currentTimerSecondsLeft >= 0) {
                //every seconds, this is the time displayed
                this.timerDurationElem.textContent = this.formatDuration(this.currentTimerSecondsLeft);
            }
        }
    }

    /**
     * Returns a duration in seconds as minutes and seconds.
     * @param {Number} duration_in_seconds Duration in seconds.
     * @returns {String} Duration formatted as "MM:SS"
     */
    formatDuration(duration_in_seconds)
    {
        let minutes = (duration_in_seconds / 60) | 0;
        let seconds = (duration_in_seconds % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return minutes + ":" + seconds;
    }

    /**
     * Re-create the timer queue using the default timer queue option.
     */
    createTimerQueue()
    {
        this.timerQueue.clear();
        Array.prototype.map.call(this.defaultTimerQueue, function(timer){
            this.timerQueue.push(timer);
        }.bind(this));
    }
    createBreakQueue()
    {
        this.timerQueue.clear();
        Array.prototype.map.call(this.defaultBreakQueue, function(timer){
            this.timerQueue.push(timer);
        }.bind(this));
    }

    /**
     * Fetches the next timer in the queue and sets it as the current timer
     * to be rendered on screen.
     */
    getNextTimerFromQueue()
    {
        this.currentTimer = this.timerQueue.pop();
        if (this.currentTimer) {
            this.currentTimerStart = Date.now();
            this.currentTimerSecondsLeft = this.currentTimer.duration;
        }
        return this.currentTimer;
    }
    getNextBreakFromQueue()
    {
        this.currentTimer = this.timerQueue.pop();
        if (this.currentTimer) {
            this.currentTimerStart = Date.now();
            this.currentTimerSecondsLeft = this.currentTimer.duration;
        }
        return this.currentTimer;
    }

    /**
     * User action: Start timer.
     */
    event_startTimer()
    {
        function timerUpdate() {
            this.currentTimerSecondsLeft = (this.currentTimer.duration - (((Date.now() - this.currentTimerStart) / 1000) | 0));

            // Update UI
            requestAnimationFrame(function(){
                this.render();
            }.bind(this));

            // If it reaches the end, look for next timer
            if (this.currentTimerSecondsLeft <= 0) {
                //if (!this.getNextTimerFromQueue()) { // TODO: Do not auto start until pressed again
                    // We are at the end of the queue
                    this.event_stopTimer.call(this);  // TODO: GO BACK TO WAITING
                //}
            }
        }

        this.createTimerQueue();
        this.getNextTimerFromQueue();

        this.state = PomodoroTimerComponent.STATE_RUNNING;

        // The following will call render() at 1s intervals
        timerUpdate.call(this);
        this.timerInterval = setInterval(timerUpdate.bind(this), 1000);
    }

    event_startBreak()
    {
        function timerUpdate() {
            this.currentTimerSecondsLeft = (this.currentTimer.duration - (((Date.now() - this.currentTimerStart) / 1000) | 0));

            // Update UI
            requestAnimationFrame(function(){
                this.render();
            }.bind(this));

            // If it reaches the end, look for next timer
            if (this.currentTimerSecondsLeft <= 0) {
                //if (!this.getNextTimerFromQueue()) { // TODO: Do not auto start until pressed again
                    // We are at the end of the queue
                    this.event_stopTimer.call(this);  // TODO: GO BACK TO WAITING
                //}
            }
        }

        if(!this.getNextBreakFromQueue()){  // we are NOT at the end of the queue 
          this.createBreakQueue();
          this.getNextBreakFromQueue();
        } else {
            this.event_stopTimer.call(this);  // TODO: GO BACK TO WAITING
        }

        this.state = PomodoroTimerComponent.STATE_RUNNING;

        // The following will call render() at 1s intervals
        timerUpdate.call(this);
        this.timerInterval = setInterval(timerUpdate.bind(this), 1000);
    }

    /**
     * User action: Stop timer.
     */
    event_stopTimer()
    {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.currentTimer = null;         //TODO: do not nullify currentTimer, make it pop from queue instead
        this.getNextTimerFromQueue();
        //this.currentTimerSecondsLeft = 0; //TODO: make this 5:00 and 25:00 alternatively

        this.state = PomodoroTimerComponent.STATE_STOPPED;

        requestAnimationFrame(function(){
            this.render();
        }.bind(this));
    }
    event_stopBreak()
    {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        //this.currentTimer = null;         //TODO: do not nullify currentTimer, make it pop from queue instead
        this.getNextTimerFromQueue();
        //this.currentTimerSecondsLeft = 0; //TODO: make this 5:00 and 25:00 alternatively

        this.state = PomodoroTimerComponent.STATE_STOPPED;

        requestAnimationFrame(function(){
            this.render();
        }.bind(this));
    }
}
/** Credit & References
 * Bill Hung (@billhung), the original coder, © 2021-12-04 under BSD free software license
 * <!--Ref:David Jordan's Pomodoro javascript tutorial article https://david-jordan.medium.com/coding-a-pomodoro-timer-in-html-js-css-61b5b89b5948-->
 * <!--Ref:Gary Simon's PWA tutorial YouTube video https://youtu.be/PL2DG9LJoVQ?t=297-->
 * <!--Google Workbox (PWA)-->
 */