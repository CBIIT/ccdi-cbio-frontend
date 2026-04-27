import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { buildCBioPortalPageUrl } from '../../../shared/api/urls';

type StudyLinkProps = {
    studyId: string;
    className?: string;
    studyName?: string;
};

class StudyLinkComponent extends React.Component<
    StudyLinkProps & RouteComponentProps,
    {}
> {
    private handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.altKey ||
            event.ctrlKey ||
            event.shiftKey
        ) {
            return;
        }

        event.preventDefault();
        this.props.history.push(`/study?id=${this.props.studyId}`);
    };

    render() {
        const absoluteStudyUrl = buildCBioPortalPageUrl('study', {
            id: this.props.studyId,
        });

        return (
            <a
                href={absoluteStudyUrl}
                className={this.props.className}
                onClick={this.handleClick}
                aria-label={`Open the study summary page for ${this.props.studyName} in a new tab`}
            >
                {this.props.children}
            </a>
        );
    }
}

export const StudyLink = withRouter(StudyLinkComponent);
