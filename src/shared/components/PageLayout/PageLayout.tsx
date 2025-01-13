import * as React from 'react';
// import RightBar from '../rightbar/RightBar';
// import { Component } from 'react';
import classNames from 'classnames';
import { inject } from 'mobx-react';
import { AppStore } from '../../../AppStore';
// import PortalFooter from '../../../appShell/App/PortalFooter';

interface IPageLayout {
    rightBar?: any;
    className?: string;
    noMargin?: boolean;
    appStore?: AppStore;
    hideFooter?: boolean;
}

@inject('appStore')
export class PageLayout extends React.Component<IPageLayout, {}> {
    // // CCDI-TODO: Make the iframe height fit for the content
    // setHeight() {
    //     setTimeout(() => {
    //         const height = document.querySelectorAll(".cbioportal-frontend")[0].scrollHeight;
    //         console.log('height:', height)
    //         window.parent.postMessage(["setHeight", height], "*");
    //     }, 10000);
    // }
    // componentDidMount() {
    //     this.setHeight();
    // }
    // componentDidUpdate(prevProps: Readonly<IPageLayout>, prevState: Readonly<{}>, snapshot?: any): void {
    //     this.setHeight();
    // }
    render() {
        const noMargin = this.props.noMargin ? 'noMargin' : '';

        return (
            <div className={'mainContainer'}>
                <div
                    className={classNames(
                        'contentWidth',
                        this.props.className,
                        noMargin
                    )}
                >
                    <div id="mainColumn" data-tour="mainColumn">
                        <div>{this.props.children}</div>
                    </div>
                    {this.props.rightBar && (
                        <div id="rightColumn">{this.props.rightBar}</div>
                    )}
                </div>

                {/* {!this.props.hideFooter && (
                    <PortalFooter appStore={this.props.appStore!} />
                )} */}
            </div>
        );
    }
}
