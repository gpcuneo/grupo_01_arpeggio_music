let getAbout = (req, res) => {
    res.render('about')
}

const aboutController = {
    index: getAbout
}

module.exports = aboutController;