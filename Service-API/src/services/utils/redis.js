
const Redis = require('ioredis');
const redis = new Redis({port: 63790, host: '172.17.0.1'});

const deleteCache = async (key) =>{
  try {
    await redis.del(key);
  } catch (error) {
    console.log(error);
  }
}

const setCache = (key, value, expirationTime, isJson = true) => {
  return new Promise((resolve, reject) => {
      if(isJson)
        if(value){
          value = JSON.stringify(value)
        }else{
          reject()
        }

        try {
          if(expirationTime){
            redis.setex(key, expirationTime, value)
          }else{
            redis.set(key, value)
          }
          resolve()    
        } catch (error) {
          reject();
        }
  })
}

const getCache = (key, isJson = true) => {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, data) => {
        if(err){
          reject()
        }

        if(data != null) {

          if(isJson){
            if(data)
              data = JSON.parse(data)
            else
              reject()
          }
            
          resolve(data)
        }

        else
          reject()
    })
  })

}


module.exports = {
  setCache,
  getCache,
  deleteCache,
}
