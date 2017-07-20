import {SiriDBDatasource} from './datasource';
import {SiriDBDatasourceQueryCtrl} from './query_ctrl';

class SiriDBConfigCtrl {}
SiriDBConfigCtrl.templateUrl = 'partials/config.html';

class SiriDBQueryOptionsCtrl {}
SiriDBQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

class SiriDBAnnotationsQueryCtrl {}
SiriDBAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html'

export {
  SiriDBDatasource as Datasource,
  SiriDBDatasourceQueryCtrl as QueryCtrl,
  SiriDBConfigCtrl as ConfigCtrl,
  SiriDBQueryOptionsCtrl as QueryOptionsCtrl,
  SiriDBAnnotationsQueryCtrl as AnnotationsQueryCtrl
};
