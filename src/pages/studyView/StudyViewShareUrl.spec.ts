import { assert } from 'chai';
import { parse } from 'query-string';
import { buildStudyViewShareUrl } from './StudyViewShareUrl';

describe('buildStudyViewShareUrl', () => {
    it('builds wrapper URL with encoded query params', () => {
        const filterJson = JSON.stringify({
            clinicalDataFilters: [
                {
                    attributeId: 'STATUS',
                    values: ['A&B', '100%', 'x#y'],
                },
            ],
        });

        const url = buildStudyViewShareUrl(
            'http://localhost:9000/wrapper/',
            {
                pathname: '/study',
                search: '?id=test_study',
            },
            { filters: filterJson }
        );

        assert.equal(
            url,
            'http://localhost:9000/wrapper/study?id=test_study&filters=%7B%22clinicalDataFilters%22%3A%5B%7B%22attributeId%22%3A%22STATUS%22%2C%22values%22%3A%5B%22A%26B%22%2C%22100%25%22%2C%22x%23y%22%5D%7D%5D%7D'
        );

        const builtUrl = new URL(url);
        const searchParams = parse(builtUrl.search);
        assert.equal(searchParams.filters, filterJson);
        assert.equal(builtUrl.hash, '');
    });
});
