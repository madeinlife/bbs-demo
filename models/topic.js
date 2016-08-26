
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var TopicSchema = new mongoose.Schema({
    username: {type: String},
    tab: {type: String},
    title: {type: String},
    content: {type: String},
    author_id: {type: ObjectId},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false},
});

TopicSchema.statics.addTopic = function(topic,callback){
    return this.create(topic,callback);
};
// 获取话题详细信息
TopicSchema.statics.getTopic = function(topicId,callback){
    return this.findOne({_id:topicId},callback);
};

var Topic = mongoose.model('Topic',TopicSchema);

module.exports = Topic;
