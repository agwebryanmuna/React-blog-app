// Origins accepted by CORS
const whitelist = [process.env.LOCALHOST_URL, process.env.PRODUCTION_URL]
export const corsOptions = {
  origin: async (origin, callback) => {
    if(whitelist.includes(origin) && origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} 
