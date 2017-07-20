"use strict";

System.register(["lodash", "./tools.js"], function (_export, _context) {
  "use strict";

  var _, wrapTarget, buildQuery, _createClass, SiriDBDatasource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_toolsJs) {
      wrapTarget = _toolsJs.wrapTarget;
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

      _export("SiriDBDatasource", SiriDBDatasource = function () {
        function SiriDBDatasource(instanceSettings, $q, backendSrv, templateSrv) {
          _classCallCheck(this, SiriDBDatasource);

          this.type = instanceSettings.type;
          this.url = instanceSettings.url;
          this.timePrecision = instanceSettings.jsonData && instanceSettings.jsonData.timePrecision ? instanceSettings.jsonData.timePrecision : 'ms';
          this.factor = this.timePrecision === 's' ? 1000.0 : this.timePrecision === 'ms' ? 1.0 : this.timePrecision === 'us' ? 0.001 : this.timePrecision === 'ns' ? 0.000001 : -1; // error
          this.name = instanceSettings.name;
          this.q = $q;
          this.backendSrv = backendSrv;
          this.templateSrv = templateSrv;
          this.headers = { 'Content-Type': 'application/json' };
          if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
            this.headers['Authorization'] = instanceSettings.basicAuth;
          }
        }

        _createClass(SiriDBDatasource, [{
          key: "buildSiriDBQuery",
          value: function buildSiriDBQuery(target, start, end, maxDataPoints) {
            var rawQuery = target.raw === null ? buildQuery(target) : target.raw;
            var query = rawQuery.replace(/__START__/g, start).replace(/__END__/g, end).replace(/__MAX_DATA_POINTS__/g, maxDataPoints);
            return query;
          }
        }, {
          key: "buildTargets",
          value: function buildTargets(targets) {
            targets = targets.filter(function (t) {
              return !t.hide;
            });

            if (!targets.length) {
              return [];
            }

            var pivot = targets[0];
            var tmp = targets.filter(function (t) {
              return t.aggr === pivot.aggr && t.group === pivot.group && t.diff === pivot.diff && t.raw === null;
            });

            if (tmp.length === targets.length) {
              targets = [{
                aggr: pivot.aggr,
                group: pivot.group,
                diff: pivot.diff,
                raw: pivot.raw,
                target: targets.map(function (t) {
                  return wrapTarget(t.target);
                }).join(',')
              }];
            }

            return targets;
          }
        }, {
          key: "query",
          value: function query(options) {
            var _this = this;

            var targets = this.buildTargets(options.targets);

            if (!targets.length) {
              return this.q.when({ data: [] });
            }

            var start = parseInt(options.range.from.valueOf() / 1000) + 's';
            var end = parseInt(options.range.to.valueOf() / 1000) + 's';
            var promises = [];

            targets.forEach(function (t) {
              var query = _this.buildSiriDBQuery(t, start, end, options.maxDataPoints);

              promises.push(_this.backendSrv.datasourceRequest({
                url: _this.url + '/query',
                data: { query: query },
                method: 'POST',
                headers: _this.headers
              }));
            });

            return this.q.all(promises).then(this.processQueryResult.bind(this));
          }
        }, {
          key: "processQueryResult",
          value: function processQueryResult(responses) {
            var _this2 = this;

            var data = [];

            responses.forEach(function (res) {
              for (var seriesName in res.data) {
                var points = res.data[seriesName].map(function (point) {
                  return [point[1], point[0] * _this2.factor];
                });

                data.push({
                  target: seriesName,
                  datapoints: points
                });
              }
            });

            return { data: data };
          }
        }, {
          key: "testDatasource",
          value: function testDatasource() {
            var _this3 = this;

            return this.backendSrv.datasourceRequest({
              url: this.url + '/query',
              method: 'POST',
              data: { query: 'show time_precision' },
              headers: this.headers
            }).then(function (response) {

              if (response.status === 200) {
                var tp = response.data.data[0].value;
                if (tp !== _this3.timePrecision) {
                  return { status: "failed", message: "Database seems to have a '" + tp + "' time precision", title: "Failed" };
                }
                return { status: "success", message: "Data source is working", title: "Success" };
              }
            });
          }
        }, {
          key: "metricFindQuery",
          value: function metricFindQuery(options) {
            var target = typeof options === "string" ? options : options.target;
            var query = { query: "list series /" + target + ".*/ limit 1" };

            return this.backendSrv.datasourceRequest({
              url: this.url + '/query',
              data: query,
              method: 'POST',
              headers: this.headers
            }).then(this.extractSeries);
          }
        }, {
          key: "extractSeries",
          value: function extractSeries(result) {
            return result.data.series.map(function (arr, i) {
              return { text: arr[0], value: i };
            });
          }
        }, {
          key: "mapToTextValue",
          value: function mapToTextValue(result) {
            return _.map(result.data, function (d, i) {
              if (d && d.text && d.value) {
                return { text: d.text, value: d.value };
              } else if (_.isObject(d)) {
                return { text: d, value: i };
              }
              return { text: d, value: d };
            });
          }
        }]);

        return SiriDBDatasource;
      }());

      _export("SiriDBDatasource", SiriDBDatasource);
    }
  };
});
//# sourceMappingURL=datasource.js.map
