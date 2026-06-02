import { assert } from 'chai';
import { StudyViewFilterQueryExtractor } from './StudyViewQueryExtractor';

describe('StudyViewFilterQueryExtractor', () => {
    describe('parseRawFilterJson', () => {
        const extractor = new StudyViewFilterQueryExtractor();

        it('parses decoded filter JSON', () => {
            const filter = {
                clinicalDataFilters: [
                    {
                        attributeId: 'STATUS',
                        values: ['100%', 'A&B'],
                    },
                ],
            };

            assert.deepEqual(
                extractor.parseRawFilterJson(JSON.stringify(filter)),
                filter
            );
        });

        it('parses encoded filter JSON', () => {
            const filter = {
                clinicalDataFilters: [
                    {
                        attributeId: 'STATUS',
                        values: ['x#y'],
                    },
                ],
            };

            assert.deepEqual(
                extractor.parseRawFilterJson(
                    encodeURIComponent(JSON.stringify(filter))
                ),
                filter
            );
        });
    });
});
