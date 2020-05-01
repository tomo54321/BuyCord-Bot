exports.deleteMessage = (msg) => {
    try {
        msg.delete();
    } catch (ex) {
        msg.reply("BuyCord doesn't have the required permissions.");
    }
};