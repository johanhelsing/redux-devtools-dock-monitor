'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDock = require('react-dock');

var _reactDock2 = _interopRequireDefault(_reactDock);

var _constants = require('./constants');

var _actions = require('./actions');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _parseKey = require('parse-key');

var _parseKey2 = _interopRequireDefault(_parseKey);

var DockMonitor = (function (_Component) {
  _inherits(DockMonitor, _Component);

  _createClass(DockMonitor, null, [{
    key: 'reducer',
    value: _reducers2['default'],
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      defaultPosition: _react.PropTypes.oneOf(_constants.POSITIONS).isRequired,
      defaultIsVisible: _react.PropTypes.bool.isRequired,
      defaultSize: _react.PropTypes.number.isRequired,
      toggleVisibilityKey: _react.PropTypes.string.isRequired,
      changePositionKey: _react.PropTypes.string.isRequired,
      fluid: _react.PropTypes.bool,
      children: _react.PropTypes.element,

      dispatch: _react.PropTypes.func,
      monitorState: _react.PropTypes.shape({
        position: _react.PropTypes.oneOf(_constants.POSITIONS).isRequired,
        size: _react.PropTypes.number.isRequired,
        isVisible: _react.PropTypes.bool.isRequired,
        childMonitorState: _react.PropTypes.any
      })
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      defaultIsVisible: true,
      defaultPosition: 'right',
      defaultSize: 0.3,
      fluid: true
    },
    enumerable: true
  }]);

  function DockMonitor(props) {
    _classCallCheck(this, DockMonitor);

    _Component.call(this, props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  DockMonitor.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  DockMonitor.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  DockMonitor.prototype.matchesKey = function matchesKey(key, event) {
    var charCode = event.keyCode || event.which;
    var char = String.fromCharCode(charCode);
    return key.name.toUpperCase() === char.toUpperCase() && key.alt === event.altKey && key.ctrl === event.ctrlKey && key.meta === event.metaKey && key.shift === event.shiftKey;
  };

  DockMonitor.prototype.handleKeyDown = function handleKeyDown(e) {
    var visibilityKey = _parseKey2['default'](this.props.toggleVisibilityKey);
    var positionKey = _parseKey2['default'](this.props.changePositionKey);

    if (this.matchesKey(visibilityKey, e)) {
      e.preventDefault();
      this.props.dispatch(_actions.toggleVisibility());
    } else if (this.matchesKey(positionKey, e)) {
      e.preventDefault();
      this.props.dispatch(_actions.changePosition());
    }
  };

  DockMonitor.prototype.handleSizeChange = function handleSizeChange(requestedSize) {
    this.props.dispatch(_actions.changeSize(requestedSize));
  };

  DockMonitor.prototype.render = function render() {
    var _props = this.props;
    var monitorState = _props.monitorState;
    var children = _props.children;
    var fluid = _props.fluid;

    var rest = _objectWithoutProperties(_props, ['monitorState', 'children', 'fluid']);

    var position = monitorState.position;
    var isVisible = monitorState.isVisible;
    var size = monitorState.size;

    var childProps = _extends({}, rest, {
      monitorState: monitorState.childMonitorState
    });

    return _react2['default'].createElement(
      _reactDock2['default'],
      { position: position,
        isVisible: isVisible,
        size: size,
        fluid: fluid,
        onSizeChange: this.handleSizeChange,
        dimMode: 'none' },
      _react.cloneElement(children, childProps)
    );
  };

  return DockMonitor;
})(_react.Component);

exports['default'] = DockMonitor;
module.exports = exports['default'];