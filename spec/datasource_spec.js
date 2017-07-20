import {Datasource} from "../module";
import Q from "q";

describe('SiriDBDatasource', function() {
    var ctx = {};

    beforeEach(function() {
        ctx.$q = Q;
        ctx.backendSrv = {};
        ctx.templateSrv = {};
        ctx.ds = new Datasource({}, ctx.$q, ctx.backendSrv, ctx.templateSrv);

    });

    it('should return an empty array when no targets are set', function(done) {
        ctx.ds.query({targets: []}).then(function(result) {
            expect(result.data).to.have.length(0);
            done();
        });
    });

    it ('should return the metric target results when a target is set', function(done) {
        let req = {target: 'search'};
        ctx.backendSrv.datasourceRequest = function(request) {
            var result = {series: [[req.target + "_0"], [req.target + "_1"], [req.target + "_2"]]};

            return ctx.$q.when({
                _request: request,
                data: result
            });
        };

        ctx.templateSrv.replace = function(data) {
            return data;
        }

        ctx.ds.metricFindQuery(req).then(function(result) {
            expect(result).to.have.length(3);
            expect(result[0].text).to.equal(req.target + "_0");
            expect(result[0].value).to.equal(req.target + "_0");
            expect(result[1].text).to.equal(req.target + "_1");
            expect(result[1].value).to.equal(req.target + "_1");
            expect(result[2].text).to.equal(req.target + "_2");
            expect(result[2].value).to.equal(req.target + "_2");
            done();
        });
    });

    it ('should return the metric results when the target is an empty string', function(done) {
        ctx.backendSrv.datasourceRequest = function(request) {
            return ctx.$q.when({
                _request: request,
                data: {series: [
                    ["metric_0"],
                    ["metric_1"],
                    ["metric_2"],
                ]}
            });
        };

        ctx.templateSrv.replace = function(data) {
            return data;
        }

        ctx.ds.metricFindQuery({target: ''}).then(function(result) {
            expect(result).to.have.length(3);
            expect(result[0].text).to.equal('metric_0');
            expect(result[0].value).to.equal('metric_0');
            expect(result[1].text).to.equal('metric_1');
            expect(result[1].value).to.equal('metric_1');
            expect(result[2].text).to.equal('metric_2');
            expect(result[2].value).to.equal('metric_2');
            done();
        });
    });

    it ('should return the metric results when the args are an empty object', function(done) {
        ctx.backendSrv.datasourceRequest = function(request) {
            return ctx.$q.when({
                _request: request,
                data: {series: [
                    ["metric_0"],
                    ["metric_1"],
                    ["metric_2"],
                ]}
            });
        };

        ctx.templateSrv.replace = function(data) {
            return data;
        }

        ctx.ds.metricFindQuery({}).then(function(result) {
            expect(result).to.have.length(3);
            expect(result[0].text).to.equal('metric_0');
            expect(result[0].value).to.equal('metric_0');
            expect(result[1].text).to.equal('metric_1');
            expect(result[1].value).to.equal('metric_1');
            expect(result[2].text).to.equal('metric_2');
            expect(result[2].value).to.equal('metric_2');
            done();
        });
    });

    it ('should throw error when args are undefined', function(done) {
        global.assert.throw(ctx.ds.metricFindQuery, Error, "Cannot read property 'target' of undefined");
        done();
    });

    it ('should throw error when args are null', function(done) {
        global.assert.throw(function() { ctx.ds.metricFindQuery(null); }, Error, "Cannot read property 'target' of null");
        done();
    });

    it ('should return the metric target results when the args are a string', function(done) {
        ctx.backendSrv.datasourceRequest = function(request) {
            var target = request.data.target;
            var result = {series: [
                    ["search_0"],
                    ["search_1"],
                    ["search_2"],
                ]};

            return ctx.$q.when({
                _request: request,
                data: result
            });
        };

        ctx.templateSrv.replace = function(data) {
            return data;
        }

        ctx.ds.metricFindQuery('search').then(function(result) {
            expect(result).to.have.length(3);
            expect(result[0].text).to.equal('search_0');
            expect(result[0].value).to.equal('search_0');
            expect(result[1].text).to.equal('search_1');
            expect(result[1].value).to.equal('search_1');
            expect(result[2].text).to.equal('search_2');
            expect(result[2].value).to.equal('search_2');
            done();
        });
    });

    it ('should return series as text and as value', function(done) {
        var result = ctx.ds.extractSeries({data: {series: [["zero"], ["one"], ["two"]]}});

        expect(result).to.have.length(3);
        expect(result[0].text).to.equal('zero');
        expect(result[0].value).to.equal('zero');
        expect(result[1].text).to.equal('one');
        expect(result[1].value).to.equal('one');
        expect(result[2].text).to.equal('two');
        expect(result[2].value).to.equal('two');
        done();
    });

});
