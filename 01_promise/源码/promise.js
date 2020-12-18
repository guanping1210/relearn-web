class CustomPromise {

}

const createPromise = function(time) {
  return new CustomPromise(function(resolve, reject) {
    return setTimeout(resolve, time)
  })
}

const instance = createPromise(1000)

instance.then(function() {
  console.log('hello world')
})

