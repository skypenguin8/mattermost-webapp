// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import {imageURLForUser, isMobile, isGuest} from 'utils/utils.jsx';

import OverlayTrigger from 'components/overlay_trigger';
import ProfilePopover from 'components/profile_popover';
import BotBadge from 'components/widgets/badges/bot_badge';
import GuestBadge from 'components/widgets/badges/guest_badge';

export default class UserProfile extends PureComponent {
    static propTypes = {
        disablePopover: PropTypes.bool,
        displayName: PropTypes.string,
        displayUsername: PropTypes.bool,
        hasMention: PropTypes.bool,
        hideStatus: PropTypes.bool,
        isBusy: PropTypes.bool,
        isRHS: PropTypes.bool,
        overwriteName: PropTypes.node,
        overwriteIcon: PropTypes.node,
        user: PropTypes.object,
        userId: PropTypes.string,
    };

    static defaultProps = {
        disablePopover: false,
        displayUsername: false,
        hasMention: false,
        hideStatus: false,
        isRHS: false,
        overwriteImage: '',
        overwriteName: '',
    };

    hideProfilePopover = () => {
        if (this.overlay) {
            this.overlay.hide();
        }
    }

    setOverlaynRef = (ref) => {
        this.overlay = ref;
    }

    render() {
        const {
            disablePopover,
            displayName,
            displayUsername,
            isBusy,
            isRHS,
            hasMention,
            hideStatus,
            overwriteName,
            overwriteIcon,
            user,
            userId,
        } = this.props;

        let name;
        if (displayUsername) {
            name = `@${(user.username)}`;
        } else {
            name = overwriteName || `${user.position} - ${displayName}` /* 2020-10-19 회원관리 화면 수정 */ || '...';
        }

        if (disablePopover) {
            return <div className='user-popover'>{name}</div>;
        }

        let placement = 'right';
        if (isRHS && !isMobile()) {
            placement = 'left';
        }

        let profileImg = '';
        if (user) {
            profileImg = imageURLForUser(user.id, user.last_picture_update);
        }

        return (
            <React.Fragment>
                <OverlayTrigger
                    ref={this.setOverlaynRef}
                    trigger='click'
                    placement={placement}
                    rootClose={true}
                    overlay={
                        <ProfilePopover
                            className='user-profile-popover'
                            userId={userId}
                            src={profileImg}
                            isBusy={isBusy}
                            hide={this.hideProfilePopover}
                            hideStatus={hideStatus}
                            isRHS={isRHS}
                            hasMention={hasMention}
                            overwriteName={overwriteName}
                            overwriteIcon={overwriteIcon}
                        />
                    }
                >
                    <button
                        aria-label={name.toLowerCase()}
                        className='user-popover style--none'
                    >
                        {name}
                    </button>
                </OverlayTrigger>
                <BotBadge
                    show={Boolean(user && user.is_bot)}
                    className='badge-popoverlist'
                />
                <GuestBadge
                    show={Boolean(user && isGuest(user))}
                    className='badge-popoverlist'
                />
            </React.Fragment>
        );
    }
}
