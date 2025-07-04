// Origins accepted by CORS
const whitelist = [process.env.LOCALHOST_URL, process.env.PRODUCTION_URL, ]
 const corsOptions = {
  origin: async (origin, callback) => {
    if(origin && whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} 

export default corsOptions
