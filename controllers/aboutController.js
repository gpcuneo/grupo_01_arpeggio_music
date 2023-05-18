let getAbout = (req, res) => {
    res.render('about')
}

const aboutControllers = {
    index: getAbout
}

module.exports = aboutControllers;