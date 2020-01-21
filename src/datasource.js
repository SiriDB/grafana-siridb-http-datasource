import _ from "lodash";
import {wrapTarget, buildQuery} from "./tools.js";


export class SiriDBDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.timePrecision = (instanceSettings.jsonData && instanceSettings.jsonData.timePrecision) ?
      instanceSettings.jsonData.timePrecision : 'ms';
    this.factor =
        this.timePrecision === 's' ? 1000.0 :
        this.timePrecision === 'ms' ? 1.0 :
        this.timePrecision === 'us' ? 0.001 :
        this.timePrecision === 'ns' ? 0.000001 :
        -1  // error
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.headers = {'Content-Type': 'application/json'};
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  buildSiriDBQuery(target, start, end, maxDataPoints) {

    let rawQuery = (target.raw === null) ? buildQuery(target) : target.raw;
    let query = rawQuery
      .replace(/__START__/g, start)
      .replace(/__END__/g, end)
      .replace(/__MAX_DATA_POINTS__/g, maxDataPoints);
    return query;
  }

  buildTargets(targets) {
    targets = targets.filter(t => !t.hide && t.hasOwnProperty('raw') && (t.query !== 'select' || t.raw !== null || t.target));

    if (targets.length > 1) {
      let pivot = targets[0];
      let tmp = targets.filter(t => t.aggr === pivot.aggr &&
                                    t.group === pivot.group &&
                                    t.diff === pivot.diff &&
                                    t.diffps === pivot.diffps &&
                                    t.raw === null &&
                                    t.query === 'select');

      if (tmp.length === targets.length) {
        targets = [{
          query: pivot.query,
          aggr: pivot.aggr,
          group: pivot.group,
          diff: pivot.diff,
          diffps: pivot.diffps,
          raw: pivot.raw,
          target: targets.map(t => wrapTarget(t.target)).join(',')
        }];
      }
    }

    return targets;
  }

  query(options) {
    let targets = this.buildTargets(options.targets);

    if (!targets.length) {
      return this.q.when({data: []});
    }

    let start = parseInt(options.range.from.valueOf() / 1000) + 's';
    let end = parseInt(options.range.to.valueOf() / 1000) + 's';
    let promises = [];

    targets.forEach(t => {
      var query = this.buildSiriDBQuery(t, start, end, options.maxDataPoints);
      query = this.templateSrv.replace(query, options.scopedVars, 'regex');

      promises.push(this.backendSrv.datasourceRequest({
        url: this.url + '/query',
        data: {query: query},
        method: 'POST',
        headers: this.headers
      }));
    })

    return this.q.all(promises).then(this.processQueryResult.bind(this));
  }

  processQueryResult(responses) {
    var data = [];

    responses.forEach(res => {
      if (res.data &&
          res.data.columns !== undefined &&
          res.data.columns.length &&
          _.isString(res.data.columns[0])) {
          data.push(this.processTableResult(res.data));
      } else for (let seriesName in res.data) {
        let points = res.data[seriesName].map((point) => [point[1], point[0] * this.factor]);

        data.push({
          target: seriesName,
          datapoints: points
        });
      }
    });

    return {data: data};
  }

  processTableResult(res) {
    let table = {
      columns: res.columns.map(col => {
        return { text: col };
      }),
      rows: res.servers || res.pools || res.series || res.users || res.groups || res.shards,
      type: 'table'
    };

    return table;
  }

  testDatasource() {
    return this.backendSrv.datasourceRequest({
      url: this.url + '/query',
      method: 'POST',
      data: {query: 'show time_precision'},
      headers: this.headers
    }).then(response => {

      if (response.status === 200) {
        let tp = response.data.data[0].value;
        if (tp !== this.timePrecision) {
          return { status: "failed", message: `Database seems to have a '${tp}' time precision`, title: "Failed" };
        }
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }

  metricFindQuery(options) {
    var target = typeof (options) === "string" ? options : options.target;
    var query = { query: `list series /${target}.*/ limit 1` }

    return this.backendSrv.datasourceRequest({
      url: this.url + '/query',
      data: query,
      method: 'POST',
      headers: this.headers
    }).then(this.extractSeries);
  }

  extractSeries(result) {
    return result.data.series.map(arr => { return {text: arr[0], value: arr[0]};});
  }
}
