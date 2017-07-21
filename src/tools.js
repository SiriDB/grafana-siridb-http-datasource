function wrapTarget(target) {
    let c = target.length ? target[0] : '_';  // use a fake char when target is empty
    return (c === '"' || c === "'" || c === '`' || c === '/') ? target : `"${target.replace(/"/g, '""')}"`;
}

function buildQuery(target) {
    if (target.query === 'list') {
        return `list ${target.list} ${target.props.join(', ')}`;
    }
    let group = (target.group) ? `${target.aggr}(${target.group}) => ` : '';
    let diff = (target.diff) ? ` => difference()` : '';
    return `select
${group}limit(__MAX_DATA_POINTS__, ${target.aggr})${diff}
from
${wrapTarget(target.target)}
between __START__ and __END__`;
}

export {
    wrapTarget as wrapTarget,
    buildQuery as buildQuery
};