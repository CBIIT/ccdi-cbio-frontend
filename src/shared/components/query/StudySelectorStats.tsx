import * as React from 'react';
import { QueryStore } from 'shared/components/query/QueryStore';
import { Observer, observer } from 'mobx-react';
import { expr } from 'mobx-utils';
import LoadingIndicator from 'shared/components/loadingIndicator/LoadingIndicator';

export const StudySelectorStats: React.FunctionComponent<{
    store: QueryStore;
}> = observer(props => {
    if (
        !props.store.cancerTypes.isPending &&
        !props.store.cancerStudies.isPending &&
        !props.store.profiledSamplesCount.isPending
    ) {
        return (
            <Observer>
                {() => {
                    let numSelectedStudies = expr(
                        () => props.store.selectableSelectedStudyIds.length
                    );
                    let numAllStudies = expr(
                        () => props.store.selectableStudies.length
                    );

                    return (
                        <>
                            <a
                                onClick={() => {
                                    if (numSelectedStudies)
                                        props.store.showSelectedStudiesOnly = !props
                                            .store.showSelectedStudiesOnly;
                                }}
                                // TODO: (CBIO-730) I think this color change should be done using a variable from src/globalStyles/variables.scss.
                                // We'll improve this later when we finish all the 508 fixes.
                                style={{ color: '#2F73A7' }}
                            >
                                {props.store.selectableSelectedStudies.length ==
                                    0 && (
                                    <div>
                                        <b>{numAllStudies}</b> studies available
                                        (
                                        <b>
                                            {
                                                props.store
                                                    .sampleCountForAllStudies
                                            }
                                        </b>{' '}
                                        samples)
                                    </div>
                                )}

                                {props.store.selectableSelectedStudies.length >
                                    0 && (
                                    <div>
                                        <b>{numSelectedStudies}</b>{' '}
                                        {numSelectedStudies === 1
                                            ? 'study'
                                            : 'studies'}{' '}
                                        selected (
                                        <b>
                                            {
                                                props.store
                                                    .sampleCountForSelectedStudies
                                            }
                                        </b>{' '}
                                        samples)
                                    </div>
                                )}
                            </a>
                            {props.store.selectableSelectedStudies.length >
                                0 && (
                                <a
                                    data-test="globalDeselectAllStudiesButton"
                                    style={{ marginLeft: 10 }}
                                    onClick={() =>
                                        props.store.studyListLogic.mainView.clearAllSelection()
                                    }
                                >
                                    Deselect all
                                </a>
                            )}
                        </>
                    );
                }}
            </Observer>
        );
    } else {
        return (
            <LoadingIndicator isLoading={true} size={'small'} center={false} />
        );
    }
});
