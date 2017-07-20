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
  }

  getOptions() {
    return this.datasource.metricFindQuery(this.target)
      .then(this.uiSegmentSrv.transformToSegments(false));
      // Options have to be transformed by uiSegmentSrv to be usable by metric-segment-model directive
  }

  toggleEditorMode() {
    this.target.raw = (this.target.raw === null) ? buildQuery(this.target) : null;
    this.panelCtrl.refresh();
  }

  onChangeInternal() {
    this.panelCtrl.refresh(); // Asks the panel to refresh data.
  }
}

SiriDBDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';

