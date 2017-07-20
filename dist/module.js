'use strict';

System.register(['./datasource', './query_ctrl'], function (_export, _context) {
  "use strict";

  var SiriDBDatasource, SiriDBDatasourceQueryCtrl, SiriDBConfigCtrl, SiriDBQueryOptionsCtrl, SiriDBAnnotationsQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_datasource) {
      SiriDBDatasource = _datasource.SiriDBDatasource;
    }, function (_query_ctrl) {
      SiriDBDatasourceQueryCtrl = _query_ctrl.SiriDBDatasourceQueryCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', SiriDBConfigCtrl = function SiriDBConfigCtrl() {
        _classCallCheck(this, SiriDBConfigCtrl);
      });

      SiriDBConfigCtrl.templateUrl = 'partials/config.html';

      _export('QueryOptionsCtrl', SiriDBQueryOptionsCtrl = function SiriDBQueryOptionsCtrl() {
        _classCallCheck(this, SiriDBQueryOptionsCtrl);
      });

      SiriDBQueryOptionsCtrl.templateUrl = 'partials/query.options.html';

      _export('AnnotationsQueryCtrl', SiriDBAnnotationsQueryCtrl = function SiriDBAnnotationsQueryCtrl() {
        _classCallCheck(this, SiriDBAnnotationsQueryCtrl);
      });

      SiriDBAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

      _export('Datasource', SiriDBDatasource);

      _export('QueryCtrl', SiriDBDatasourceQueryCtrl);

      _export('ConfigCtrl', SiriDBConfigCtrl);

      _export('QueryOptionsCtrl', SiriDBQueryOptionsCtrl);

      _export('AnnotationsQueryCtrl', SiriDBAnnotationsQueryCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
