'use strict';

System.register(['app/plugins/sdk', './css/query-editor.css!', './tools.js'], function (_export, _context) {
  "use strict";

  var QueryCtrl, buildQuery, _createClass, SiriDBDatasourceQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }, function (_cssQueryEditorCss) {}, function (_toolsJs) {
      buildQuery = _toolsJs.buildQuery;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('SiriDBDatasourceQueryCtrl', SiriDBDatasourceQueryCtrl = function (_QueryCtrl) {
        _inherits(SiriDBDatasourceQueryCtrl, _QueryCtrl);

        function SiriDBDatasourceQueryCtrl($scope, $injector, uiSegmentSrv) {
          _classCallCheck(this, SiriDBDatasourceQueryCtrl);

          var _this = _possibleConstructorReturn(this, (SiriDBDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(SiriDBDatasourceQueryCtrl)).call(this, $scope, $injector));

          _this.scope = $scope;
          _this.uiSegmentSrv = uiSegmentSrv;
          _this.target.target = _this.target.target || '';
          _this.target.aggr = _this.target.aggr || 'mean';
          _this.target.group = _this.target.group || '';
          _this.target.raw = _this.target.raw || null;
          _this.target.diff = _this.target.diff || false;
          _this.target.diffps = _this.target.diffps || false;
          _this.target.query = _this.target.query || 'select';
          _this.target.list = _this.target.list || 'servers';
          _this.target.props = _this.target.props || [];

          _this.listProps = {
            servers: ['active_handles', 'address', 'buffer_path', 'buffer_size', 'dbpath', 'ip_support', 'libuv', 'log_level', 'max_open_files', 'mem_usage', 'name', 'online', 'open_files', 'pool', 'port', 'received_points', 'reindex_progress', 'startup_time', 'status', 'sync_progress', 'uptime', 'uuid', 'version'],
            users: ['access', 'name'],
            series: ['end', 'length', 'name', 'pool', 'start', 'type'],
            pools: ['pool', 'series', 'servers'],
            shards: ['end', 'pool', 'server', 'sid', 'size', 'start', 'status', 'type'],
            groups: ['expression', 'name', 'series']
          };
          return _this;
        }

        _createClass(SiriDBDatasourceQueryCtrl, [{
          key: 'getOptions',
          value: function getOptions() {
            return this.datasource.metricFindQuery(this.target).then(this.uiSegmentSrv.transformToSegments(false));
            // Options have to be transformed by uiSegmentSrv to be usable by metric-segment-model directive
          }
        }, {
          key: 'toggleEditorMode',
          value: function toggleEditorMode() {
            this.target.raw = this.target.raw === null ? buildQuery(this.target) : null;
            if (this.target.target) {
              this.panelCtrl.refresh();
            }
          }
        }, {
          key: 'removeProp',
          value: function removeProp(prop, idx) {
            this.target.props.splice(idx, 1);
            this.panelCtrl.refresh();
          }
        }, {
          key: 'appendProp',
          value: function appendProp() {
            this.target.props.push(this.listProps[this.target.list][0]);
            this.panelCtrl.refresh();
          }
        }, {
          key: 'onChangeInternal',
          value: function onChangeInternal() {
            this.panelCtrl.refresh(); // Asks the panel to refresh data.
          }
        }]);

        return SiriDBDatasourceQueryCtrl;
      }(QueryCtrl));

      _export('SiriDBDatasourceQueryCtrl', SiriDBDatasourceQueryCtrl);

      SiriDBDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
