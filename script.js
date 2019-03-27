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
    pad0 = (value) => {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    format() {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }
    start = (e) => {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step = () => {
        if (!this.state.running) return;
        this.calculate();
    }
    calculate = () => {
        this.setState({
            times: {
                miliseconds: this.state.times.miliseconds + 1,
                seconds: this.state.times.seconds,
                minutes: this.state.times.minutes
            }
        });
        if (this.state.times.miliseconds >= 100) {
            this.setState({
                times: {
                    miliseconds: 0,
                    seconds: this.state.times.seconds + 1,
                    minutes: this.state.times.minutes    
                }
            });
        }
        if (this.state.times.seconds >= 60) {
            this.setState({
                times: {
                    miliseconds: 0,
                    seconds: 0,
                    minutes: this.state.times.minutes + 1    
                }
            });
        }
    }
    stop = (e) => {
        this.state.running = false;
        clearInterval(this.watch);
    }
    clear = (e) => {
        if (this.state.running) this.stop();
        this.reset();
    }
    render() {
        return (
            <div className="app">
                <button className="button" id="start" onClick={this.start}>Start</button>
                <button className="button" id="stop" onClick={this.stop}>Stop</button>
                <button className="button" id="reset" onClick={this.clear}>Reset</button>
                <div className="stopwatch">{this.format()}</div>
                <Results item={this.format()} />
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
    saveResult = (e) => {
        let timesList = this.state.timesList;
        timesList.push(this.props.item);
        this.setState({
            timesList: timesList
        });  
    }
    deleteResults = (e) => {
        this.setState({
            timesList: []
        });
    }
    render() {
        let results = this.state.timesList.map(result => { return <li>{result}</li>});
        console.log(this.state.timesList);
        return (
                <div>
                    <button className="button" id="save-result" onClick={this.saveResult}>Save result</button>
                    <button className="button" id="delete" onClick={this.deleteResults}>Delete</button>
                    <ul className="results">{results}</ul>
                </div>
            )
    }
};


ReactDOM.render(<App />, document.getElementById('app'));