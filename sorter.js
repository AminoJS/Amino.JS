/**
 * A File for various Sorting out Variables.
 * @author RobStyling
 * @version 0.0.0
 * @beta
 */

module.exports = {
	/**
	 * If the public Chat 
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
    publicChat: (type) => {
    	if(typeof(type) != "number") {
    		throw new Error("The Sorter Failed!");
    	}
        if (type == 2) {
            return true;
        } else {
            return false;
        }
    },

    groupChat: (type) => {
        if(typeof(type) != "number") {
            throw new Error("The Sorter Failed!");
        }
        if(type == 1 || type == 2) {
            return true;
        }
        else return false;
    },

    didJoin: (membershipStatus) => {
        if(typeof(membershipStatus) != "number") {
            throw new Error("The Sorter failed!");
        }
        if(membershipStatus == 1) {
            return true;
        }
        else return false;
    },

    didMute: (alertOption) => {
        if(typeof(alertOption) != "number") {
            throw new Error("")
        }
    },

    threadSort: (element, joined, public, group, muted, unread) => {
        return {
            'threadId': element.threadId,
                            'memberCount': element.membersCount,
                            'title': element.title,
                            'joined': joined,
                            'public': public,
                            'group': group,
                            'muted': muted,
                            'unread': unread,
                            'lastMessage': {
                                'senderId': element.lastMessageSummary.uid,
                                'message': element.lastMessageSummary.content
                            },
                            'members': element.membersSummary
        };
    }
}