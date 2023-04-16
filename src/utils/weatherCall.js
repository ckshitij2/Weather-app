const { response } = require('express')
const request = require('postman-request')

// const weatherCall=(error,{latitude,longitude,location})=>{
//   //console.log("called from weatherLati"+latitude)

//      if(error){
//         return("Error in calling the Maps API")
//     }
//     else{

//    //   const {latitude,longitude,location}=data
//   //   console.log(data)
//      const url = `http://api.weatherstack.com/current?access_key=2f429bdcd99015ac382bd5a6dd760028&query=${latitude},${longitude}`
      
//         request({ url: url, json: true }, (error, response, body) => {
//         if (error) {
//             return("CAnnot reach to WeatherStack API")
        
//           }
//           else if (response.body.error) {
        
//             return(response.body)
        
        
//           }
        
//           else {
//        //     console.log("Called From Here")
//        console.log("Returned")
//             return( body.current)
        
//             // console.log(`
//             // ${body.current.weather_descriptions[0]}.
//             // It is currenltly ${body.current.temperature} degrees out.
//             // There is${body.current.precip}% chances of rain`)
        
//           }
        
        
        
//         })
//     }


// }



const weatherCall=(latitude,longitude,callback)=>{
  const url = `http://api.weatherstack.com/current?access_key=2f429bdcd99015ac382bd5a6dd760028&query=${latitude},${longitude}`
  request({url:url},(error,response,body)=>{
    if(error){
      callback(error)
    }
    else{
      callback(undefined,response)
    }

  })    

}

module.exports=weatherCall