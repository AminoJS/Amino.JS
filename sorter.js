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
    }
}