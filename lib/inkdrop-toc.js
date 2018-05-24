'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// noinspection ES6CheckImport


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remarkToc = require('remark-toc');

var _remarkToc2 = _interopRequireDefault(_remarkToc);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TocPlugin {

  constructor(MDEPreview) {
    this.MDEPreview = MDEPreview;
  }

  start() {
    if (this.MDEPreview) {
      this.MDEPreview.remarkPlugins.push(_remarkToc2.default);
      this.setTocComponent();
    }
  }

  stop() {
    if (this.MDEPreview) {
      this.MDEPreview.remarkPlugins = this.MDEPreview.remarkPlugins.filter(plugin => plugin !== _remarkToc2.default);
      this.unsetTocComponent();
    }
  }

  setTocComponent() {
    // noinspection JSUnresolvedVariable
    const OrigA = this.MDEPreview.remarkReactOptions.remarkReactComponents.a;
    // noinspection JSUnresolvedVariable
    this.MDEPreview.remarkReactOptions.remarkReactComponents.a = props => {
      const hash = '#';
      if (props.href && props.href.startsWith(hash)) {
        return _react2.default.createElement(
          'a',
          _extends({}, props, { onClick: () => this.onTocEntryClick(props) }),
          props.children
        );
      } else if (OrigA) {
        return _react2.default.createElement(
          OrigA,
          props,
          props.children
        );
      } else {
        return _react2.default.createElement(
          'a',
          props,
          props.children
        );
      }
    };
  }

  unsetTocComponent() {
    // noinspection JSUnresolvedVariable
    const OrigA = this.MDEPreview.remarkReactOptions.remarkReactComponents.a;
    // noinspection JSUnresolvedVariable
    this.MDEPreview.remarkReactOptions.remarkReactComponents.a = props => {
      if (props.href && props.href.startsWith(hash)) {
        if (OrigA) {
          return _react2.default.createElement(
            OrigA,
            props,
            props.children
          );
        } else {
          return _react2.default.createElement(
            'a',
            props,
            props.children
          );
        }
      }
    };
  }

  // noinspection JSMethodCanBeStatic
  onTocEntryClick(props) {
    const duration = 200;
    const entry = `#user-content-${props.href.substr(1, props.href.length)}`;
    const offset = 300;
    const mdePreview = (0, _jquery2.default)('.mde-preview');
    // noinspection JSUnresolvedFunction
    mdePreview.stop().animate({ scrollTop: (0, _jquery2.default)(entry).first().offset().top + mdePreview.scrollTop() - offset }, duration);
  }

}

// noinspection JSUnusedGlobalSymbols
module.exports = {

  toc: null,

  activate() {
    // noinspection JSUnresolvedVariable
    const { MDEPreview } = inkdrop.components.classes;
    if (MDEPreview) {
      this.toc = new TocPlugin(MDEPreview);
      this.toc.start();
    }
  },

  deactivate() {
    // noinspection JSUnresolvedVariable
    this.toc.stop();
    this.toc = null;
  }

};
//# sourceMappingURL=inkdrop-toc.js.map