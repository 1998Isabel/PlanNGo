'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HeadersContext = require('./HeadersContext');

var _TimelineStateContext = require('../timeline/TimelineStateContext');

var _calendar = require('../utility/calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomHeader = exports.CustomHeader = function (_React$Component) {
  _inherits(CustomHeader, _React$Component);

  function CustomHeader(props) {
    _classCallCheck(this, CustomHeader);

    var _this = _possibleConstructorReturn(this, (CustomHeader.__proto__ || Object.getPrototypeOf(CustomHeader)).call(this, props));

    _initialiseProps.call(_this);

    var canvasTimeStart = props.canvasTimeStart,
        canvasTimeEnd = props.canvasTimeEnd,
        canvasWidth = props.canvasWidth,
        unit = props.unit,
        timeSteps = props.timeSteps,
        showPeriod = props.showPeriod,
        getLeftOffsetFromDate = props.getLeftOffsetFromDate;


    var intervals = _this.getHeaderIntervals({
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
      canvasWidth: canvasWidth,
      unit: unit,
      timeSteps: timeSteps,
      showPeriod: showPeriod,
      getLeftOffsetFromDate: getLeftOffsetFromDate
    });

    _this.state = {
      intervals: intervals
    };
    return _this;
  }

  _createClass(CustomHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod || nextProps.children !== this.props.children || nextProps.headerData !== this.props.headerData) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod) {
        var canvasTimeStart = nextProps.canvasTimeStart,
            canvasTimeEnd = nextProps.canvasTimeEnd,
            canvasWidth = nextProps.canvasWidth,
            unit = nextProps.unit,
            timeSteps = nextProps.timeSteps,
            showPeriod = nextProps.showPeriod,
            getLeftOffsetFromDate = nextProps.getLeftOffsetFromDate;


        var intervals = this.getHeaderIntervals({
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          unit: unit,
          timeSteps: timeSteps,
          showPeriod: showPeriod,
          getLeftOffsetFromDate: getLeftOffsetFromDate
        });

        this.setState({ intervals: intervals });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.getStateAndHelpers();
      var Renderer = this.props.children;
      return _react2.default.createElement(Renderer, props);
    }
  }]);

  return CustomHeader;
}(_react2.default.Component);

CustomHeader.propTypes = {
  //component props
  children: _propTypes2.default.func.isRequired,
  unit: _propTypes2.default.string.isRequired,
  //Timeline context
  timeSteps: _propTypes2.default.object.isRequired,
  visibleTimeStart: _propTypes2.default.number.isRequired,
  visibleTimeEnd: _propTypes2.default.number.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  showPeriod: _propTypes2.default.func.isRequired,
  headerData: _propTypes2.default.object,
  getLeftOffsetFromDate: _propTypes2.default.func.isRequired,
  height: _propTypes2.default.number.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getHeaderIntervals = function (_ref4) {
    var canvasTimeStart = _ref4.canvasTimeStart,
        canvasTimeEnd = _ref4.canvasTimeEnd,
        unit = _ref4.unit,
        timeSteps = _ref4.timeSteps,
        getLeftOffsetFromDate = _ref4.getLeftOffsetFromDate;

    var intervals = [];
    (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, unit, timeSteps, function (startTime, endTime) {
      var left = getLeftOffsetFromDate(startTime.valueOf());
      var right = getLeftOffsetFromDate(endTime.valueOf());
      var width = right - left;
      intervals.push({
        startTime: startTime,
        endTime: endTime,
        labelWidth: width,
        left: left
      });
    });
    return intervals;
  };

  this.getRootProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var style = props.style;

    return {
      style: Object.assign({}, style ? style : {}, {
        position: 'relative',
        width: _this2.props.canvasWidth,
        height: _this2.props.height
      })
    };
  };

  this.getIntervalProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var interval = props.interval,
        style = props.style;

    if (!interval) throw new Error('you should provide interval to the prop getter');
    var startTime = interval.startTime,
        labelWidth = interval.labelWidth,
        left = interval.left;

    return {
      style: _this2.getIntervalStyle({
        style: style,
        startTime: startTime,
        labelWidth: labelWidth,
        canvasTimeStart: _this2.props.canvasTimeStart,
        unit: _this2.props.unit,
        left: left
      }),
      key: 'label-' + startTime.valueOf()
    };
  };

  this.getIntervalStyle = function (_ref5) {
    var left = _ref5.left,
        labelWidth = _ref5.labelWidth,
        style = _ref5.style;

    return _extends({}, style, {
      left: left,
      width: labelWidth,
      position: 'absolute'
    });
  };

  this.getStateAndHelpers = function () {
    var _props = _this2.props,
        canvasTimeStart = _props.canvasTimeStart,
        canvasTimeEnd = _props.canvasTimeEnd,
        unit = _props.unit,
        showPeriod = _props.showPeriod,
        timelineWidth = _props.timelineWidth,
        visibleTimeStart = _props.visibleTimeStart,
        visibleTimeEnd = _props.visibleTimeEnd,
        headerData = _props.headerData;
    //TODO: only evaluate on changing params

    return {
      timelineContext: {
        timelineWidth: timelineWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd
      },
      headerContext: {
        unit: unit,
        intervals: _this2.state.intervals
      },
      getRootProps: _this2.getRootProps,
      getIntervalProps: _this2.getIntervalProps,
      showPeriod: showPeriod,
      data: headerData
    };
  };
};

var CustomHeaderWrapper = function CustomHeaderWrapper(_ref) {
  var children = _ref.children,
      unit = _ref.unit,
      headerData = _ref.headerData,
      height = _ref.height;
  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref2) {
      var getTimelineState = _ref2.getTimelineState,
          showPeriod = _ref2.showPeriod,
          getLeftOffsetFromDate = _ref2.getLeftOffsetFromDate;

      var timelineState = getTimelineState();
      return _react2.default.createElement(
        _HeadersContext.TimelineHeadersConsumer,
        null,
        function (_ref3) {
          var timeSteps = _ref3.timeSteps;
          return _react2.default.createElement(CustomHeader, _extends({
            children: children,
            timeSteps: timeSteps,
            showPeriod: showPeriod,
            unit: unit ? unit : timelineState.timelineUnit
          }, timelineState, {
            headerData: headerData,
            getLeftOffsetFromDate: getLeftOffsetFromDate,
            height: height
          }));
        }
      );
    }
  );
};

CustomHeaderWrapper.propTypes = {
  children: _propTypes2.default.func.isRequired,
  unit: _propTypes2.default.string,
  headerData: _propTypes2.default.object,
  height: _propTypes2.default.number
};

CustomHeaderWrapper.defaultProps = {
  height: 30
};

exports.default = CustomHeaderWrapper;