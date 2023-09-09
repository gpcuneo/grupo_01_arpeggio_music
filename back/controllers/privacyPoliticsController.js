let getPrivacyPolitics = (req, res) => {
    res.render('privacyPolitics')
}

const privacyPoliticsController = {
    index: getPrivacyPolitics
}

module.exports = privacyPoliticsController;