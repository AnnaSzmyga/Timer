"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "pad0", function (value) {
      var result = value.toString();

      if (result.length < 2) {
        result = '0' + result;
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "start", function (e) {
      if (!_this.state.running) {
        _this.setState({
          running: true
        });

        _this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "step", function () {
      if (!_this.state.running) return;

      _this.calculate();
    });

    _defineProperty(_assertThisInitialized(_this), "calculate", function () {
      _this.setState({
        times: {
          miliseconds: _this.state.times.miliseconds + 1,
          seconds: _this.state.times.seconds,
          minutes: _this.state.times.minutes
        }
      });

      if (_this.state.times.miliseconds >= 100) {
        _this.setState({
          times: {
            miliseconds: 0,
            seconds: _this.state.times.seconds + 1,
            minutes: _this.state.times.minutes
          }
        });
      }

      if (_this.state.times.seconds >= 60) {
        _this.setState({
          times: {
            miliseconds: 0,
            seconds: 0,
            minutes: _this.state.times.minutes + 1
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function (e) {
      _this.state.running = false;
      clearInterval(_this.watch);
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function (e) {
      if (_this.state.running) _this.stop();

      _this.reset();
    });

    _this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    };
    return _this;
  }

  _createClass(App, [{
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: "format",
    value: function format() {
      return "".concat(this.pad0(this.state.times.minutes), ":").concat(this.pad0(this.state.times.seconds), ":").concat(this.pad0(Math.floor(this.state.times.miliseconds)));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "app"
      }, React.createElement("button", {
        className: "button",
        id: "start",
        onClick: this.start
      }, "Start"), React.createElement("button", {
        className: "button",
        id: "stop",
        onClick: this.stop
      }, "Stop"), React.createElement("button", {
        className: "button",
        id: "reset",
        onClick: this.clear
      }, "Reset"), React.createElement("div", {
        className: "stopwatch"
      }, this.format()), React.createElement(Results, {
        item: this.format()
      }));
    }
  }]);

  return App;
}(React.Component);

;

var Results =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Results, _React$Component2);

  function Results(props) {
    var _this2;

    _classCallCheck(this, Results);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Results).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "saveResult", function (e) {
      var timesList = _this2.state.timesList;
      timesList.push(_this2.props.item);

      _this2.setState({
        timesList: timesList
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "deleteResults", function (e) {
      _this2.setState({
        timesList: []
      });
    });

    _this2.state = {
      timesList: []
    };
    return _this2;
  }

  _createClass(Results, [{
    key: "render",
    value: function render() {
      var results = this.state.timesList.map(function (result) {
        return React.createElement("li", null, result);
      });
      console.log(this.state.timesList);
      return React.createElement("div", null, React.createElement("button", {
        className: "button",
        id: "save-result",
        onClick: this.saveResult
      }, "Save result"), React.createElement("button", {
        className: "button",
        id: "delete",
        onClick: this.deleteResults
      }, "Delete"), React.createElement("ul", {
        className: "results"
      }, results));
    }
  }]);

  return Results;
}(React.Component);

;
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
