import {QueryCtrl} from 'app/plugins/sdk';
import './css/query-editor.css!'
import {buildQuery} from "./tools.js";

export class SiriDBDatasourceQueryCtrl extends QueryCtrl {

  constructor($scope, $injector, uiSegmentSrv)  {
    super($scope, $injector);

    this.scope = $scope;
    this.uiSegmentSrv = uiSegmentSrv;
    this.target.target = this.target.target || '';
    this.target.aggr = this.target.aggr || 'mean';
    this.target.group = this.target.group || '';
    this.target.raw = this.target.raw || null;
    this.target.diff = this.target.diff || false;
    this.target.diffps = this.target.diffps || false;
    this.target.query = this.target.query || 'select';
    this.target.list = this.target.list || 'servers';
    this.target.props = this.target.props || [];

    this.listProps = {
      servers: [
        'active_handles',
        'address',
        'buffer_path',
        'buffer_size',
        'dbpath',
        'ip_support',
        'libuv',
        'log_level',
        'max_open_files',
        'mem_usage',
        'name',
        'online',
        'open_files',
        'pool',
        'port',
        'received_points',
        'reindex_progress',
        'startup_time',
        'status',
        'sync_progress',
        'uptime',
        'uuid',
        'version'],
      users: [
        'access',
        'name'],
      series: [
        'end',
        'length',
        'name',
        'pool',
        'start',
        'type'],
      pools: [
        'pool',
        'series',
        'servers'],
      shards: [
        'end',
        'pool',
        'server',
        'sid',
        'size',
        'start',
        'status',
        'type'],
      groups: [
        'expression',
        'name',
        'series']
    }
  }

  getOptions() {
    return this.datasource.metricFindQuery(this.target)
      .then(this.uiSegmentSrv.transformToSegments(false));
      // Options have to be transformed by uiSegmentSrv to be usable by metric-segment-model directive
  }

  toggleEditorMode() {
    this.target.raw = (this.target.raw === null) ? buildQuery(this.target) : null;
    if (this.target.target) {
      this.panelCtrl.refresh();
    }
  }

  removeProp(prop, idx) {
    this.target.props.splice(idx, 1);
    this.panelCtrl.refresh();
  }

  appendProp() {
    this.target.props.push(this.listProps[this.target.list][0]);
    this.panelCtrl.refresh();
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}

SiriDBDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';

