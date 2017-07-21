'use strict';

System.register([], function (_export, _context) {
    "use strict";

    function wrapTarget(target) {
        var c = target.length ? target[0] : '_'; // use a fake char when target is empty
        return c === '"' || c === "'" || c === '`' || c === '/' ? target : '"' + target.replace(/"/g, '""') + '"';
    }

    function buildQuery(target) {
        if (target.query === 'list') {
            return 'list ' + target.list + ' ' + target.props.join(', ');
        }
        var group = target.group ? target.aggr + '(' + target.group + ') => ' : '';
        var diff = target.diff ? ' => difference()' : '';
        return 'select\n' + group + 'limit(__MAX_DATA_POINTS__, ' + target.aggr + ')' + diff + '\nfrom\n' + wrapTarget(target.target) + '\nbetween __START__ and __END__';
    }

    return {
        setters: [],
        execute: function () {
            _export('wrapTarget', wrapTarget);

            _export('buildQuery', buildQuery);
        }
    };
});
//# sourceMappingURL=tools.js.map
