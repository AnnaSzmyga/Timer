class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.timesList = [];
        this.reset();
        this.print(this.times);
    }
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    print() {
        this.display.innerText = this.format(this.times);
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    clear() {
        if (this.running) this.stop();
        this.reset();
        this.print();
    }
    saveResult() {
        this.timesList.push(this.format(this.times));
        let result = document.createElement('li');
        result.innerText = this.timesList[this.timesList.length - 1];
        this.results.appendChild(result);
    }
    deleteResults() {
        this.timesList = [];
        this.results.innerHTML = '';
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

let stopwatchElement = document.querySelector('.stopwatch');
let resultsList = document.querySelector('.results');
const stopwatch = new Stopwatch(stopwatchElement, resultsList);

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.clear());

let saveResultButton = document.getElementById('save-result');
saveResultButton.addEventListener('click', () => stopwatch.saveResult());

let deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => stopwatch.deleteResults());
