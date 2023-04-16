const path = require('path')
const weatherCall = require('./utils/weatherCall.js')
const geoCode = require('./utils/geoCode.js')

const express = require('express')
const hbs = require('hbs')
const { decode } = require('querystring')
//const geoCode = require('../../weather-app/utils/geoCode')
const app = express()        //creates express application


//Define Paths 
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//Serves a static folder
app.use(express.static(publicDirectoryPath)) // Here we tell engine that make the default view engine to a particular directory

//Setup handleBars engine and views location
app.set('view engine', 'hbs')           //SetUp HandleBars hence we tell engine to set he view engine aas hbs
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)        //now the express engine with by default look for our custom directory instead of views for templates



//Set the differenet routes for home,help,about,weather
app.get('', (req, res) => {                     //Here we send dynamic value to our temaplte from here
    res.render('index', {
        title: 'Home Page',
        name: "Kshitij Chauhan"

    })                                    /// With render we can render handlebar template
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Kshitij Chauhan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Kshitij Chauhan"
    })
})
app.get('/weather', (req, res) => {
    const location = req.query.address
    if (!location) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(location, (error, data={}) => {
        if (error) {
      //      console.log("called in app")
            res.send({ message: error })

        } else if (!data) {
     //       console.log("called in app")
            res.send({ message: error })

        }

        else {

            weatherCall(data.latitude, data.longitude, (error, response) => {
                if (error) {
                    res.send(error)
                }
                else {
                    const forcastData = JSON.parse(response.body)
                    const keys = Object.keys(forcastData)
                    res.send(forcastData.current)
                    console.log(keys)
                }

            })

        }
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error Page",
        name: "Kshitij Chauhan",
        message: "Page not found!! Please go to help page and try again"


    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "Error Page",
        name: "Kshitij Chauhan",
        message: "Page not found!!"


    })
})



//Listens to request at port 3000
app.listen(3000, () => {
    console.log("Server Started at port 3000!!")
})


