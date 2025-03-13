const aiProcessor = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const { code: userCode } = req.body;
        if (!userCode) return res.status(400).send("Code input is required.");

        const reviewFeedback = await aiProcessor(userCode);
        res.send(reviewFeedback);
    } catch (error) {
        console.error("Error processing review:", error);
        res.status(500).send("Internal Server Error");
    }
};
