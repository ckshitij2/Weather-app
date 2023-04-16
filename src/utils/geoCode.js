const request = require('postman-request')
const weatherCall=require('./weatherCall.js')

const geoCode = (city, callback) => {
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiY2tzaGl0aWoiLCJhIjoiY2xnZ2J3MHFmMGE0dDNlbW1oaDAwOXIzdyJ9.-PlXQhOOaKt3pAmHzTuTxg&limit=1`
  
    request({ url: geoCodeUrl, json: true }, (error,response) => {
      if (error) {
        callback("Unable to reach to Maps API")
      }
      else if (response.body.features.length===0) {
     //   console.log("Called from geoCode")

      
        callback("No Valid location provided")
        
      }
      else {
       
        const coord = (response.body.features[0].center)
        const [longitude, latitude] = coord
        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
           location: response.body.features[0].place_name
        })
      }
    })
  
  }



  module.exports=geoCode