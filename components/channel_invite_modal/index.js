// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getTeamStats} from 'mattermost-redux/actions/teams';
import {getProfilesNotInChannel, searchProfiles} from 'mattermost-redux/actions/users';
import {getProfilesNotInCurrentChannel, getProfilesNotInCurrentTeam} from 'mattermost-redux/selectors/entities/users';

import {addUsersToChannel} from 'actions/channel_actions';

import ChannelInviteModal from './channel_invite_modal.jsx';

function mapStateToProps(state) {
    const profilesNotInCurrentChannel = getProfilesNotInCurrentChannel(state);
    const profilesNotInCurrentTeam = getProfilesNotInCurrentTeam(state);

    return {
        profilesNotInCurrentChannel: profilesNotInCurrentChannel.sort(sortByNickname),
        profilesNotInCurrentTeam: profilesNotInCurrentTeam.sort(sortByNickname),
    };
}

function sortByNickname(a, b) {
    const nickNameA = a.nickname;
    const nickNameB = b.nickname;
    return nickNameA.localeCompare(nickNameB);
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addUsersToChannel,
            getProfilesNotInChannel,
            getTeamStats,
            searchProfiles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInviteModal);
