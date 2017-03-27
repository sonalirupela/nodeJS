var messagesModel = require('./messageModel');
var messagesQuery = {};

//get the messages read
messagesQuery.findAnyField = function (query,reteriveOnly) {
    return messagesModel.find(query,reteriveOnly).exec();
};

//save the messages create
messagesQuery.addData = function (data) {
    return messagesModel(data).save();
};

//update
messagesQuery.updateAnyField = function (query,updateOnly) {
    return messagesModel.update(query,updateOnly).exec();
};

//delete 
messagesQuery.removeAnyField = function (query) {
    return messagesModel.remove(query).exec();
};


module.exports = messagesQuery;