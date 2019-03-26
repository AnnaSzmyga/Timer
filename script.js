class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0 
            }
        };
    }
    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0 
            }
        })
    }
    format() {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }
    start() {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.state.running) return;
        this.calculate();
    }
    calculate() {
        this.setState({times: {miliseconds: this.state.times.miliseconds + 1}});

        if (this.state.times.miliseconds >= 100) {
            this.setState({times: {seconds: this.state.times.seconds + 1, miliseconds: 0}});
        }
        if (this.state.times.seconds >= 60) {
            this.setState({times: {minutes: this.state.times.minutes + 1, seconds: 0}});
        }
    }
    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }
    clear() {
        if (this.state.running) this.stop();
        this.reset();
    }
    render() {
        return (
            <div className="app">
                <button className="button" id="start" onClick={this.start}>Start</button>
                <button className="button" id="stop" onClick={this.stop}>Stop</button>
                <button className="button" id="reset" onClick={this.clear}>Reset</button>
                <div className="stopwatch">{this.format}</div>
                <Results item={this.format} />
            </div>
        )
    }
};

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timesList: []
        };
    }
    saveResult() {
        let timesList = this.state.timesList.push(this.props.item);
        this.setState({
            timesList: timesList
        });    
    }
    deleteResults() {
        this.setState({
            timesList: []
        });
    }
    render() {
        let results = this.state.timesList.forEach(result => { return <li>{result}</li>});
        return (
                <div>
                    <button className="button" id="save-result" onClick={this.saveResult}>Save result</button>
                    <button className="button" id="delete" onClick={this.deleteResults}>Delete</button>
                    <ul className="results">{results}</ul>
                </div>
            )
    }
};


function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<App />, document.getElementById('app'));