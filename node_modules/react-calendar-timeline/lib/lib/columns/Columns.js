'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendar = require('../utility/calendar');

var _TimelineStateContext = require('../timeline/TimelineStateContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var passThroughPropTypes = {
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  lineCount: _propTypes2.default.number.isRequired,
  minUnit: _propTypes2.default.string.isRequired,
  timeSteps: _propTypes2.default.object.isRequired,
  height: _propTypes2.default.number.isRequired,
  verticalLineClassNamesForTime: _propTypes2.default.func
};

var Columns = function (_Component) {
  _inherits(Columns, _Component);

  function Columns() {
    _classCallCheck(this, Columns);

    return _possibleConstructorReturn(this, (Columns.__proto__ || Object.getPrototypeOf(Columns)).apply(this, arguments));
  }

  _createClass(Columns, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.height === this.props.height && nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          canvasWidth = _props.canvasWidth,
          minUnit = _props.minUnit,
          timeSteps = _props.timeSteps,
          height = _props.height,
          verticalLineClassNamesForTime = _props.verticalLineClassNamesForTime,
          getLeftOffsetFromDate = _props.getLeftOffsetFromDate;

      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);

      var lines = [];

      (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);

        var classNamesForTime = [];
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(time.unix() * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
          nextTime.unix() * 1000 - 1);
        }

        // TODO: rename or remove class that has reference to vertical-line
        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ' rct-day-' + time.day() + ' ' : '') + classNamesForTime.join(' ');

        var left = getLeftOffsetFromDate(time.valueOf());
        var right = getLeftOffsetFromDate(nextTime.valueOf());
        lines.push(_react2.default.createElement('div', {
          key: 'line-' + time.valueOf(),
          className: classNames,
          style: {
            pointerEvents: 'none',
            top: '0px',
            left: left + 'px',
            width: right - left + 'px',
            height: height + 'px'
          }
        }));
      });

      return _react2.default.createElement(
        'div',
        { className: 'rct-vertical-lines' },
        lines
      );
    }
  }]);

  return Columns;
}(_react.Component);

Columns.propTypes = _extends({}, passThroughPropTypes, {
  getLeftOffsetFromDate: _propTypes2.default.func.isRequired
});


var ColumnsWrapper = function ColumnsWrapper(_ref) {
  var props = _objectWithoutProperties(_ref, []);

  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref2) {
      var getLeftOffsetFromDate = _ref2.getLeftOffsetFromDate;
      return _react2.default.createElement(Columns, _extends({ getLeftOffsetFromDate: getLeftOffsetFromDate }, props));
    }
  );
};

ColumnsWrapper.defaultProps = _extends({}, passThroughPropTypes);

exports.default = ColumnsWrapper;