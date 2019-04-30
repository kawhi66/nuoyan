const NuoYan = require('..')
const noop = function() {
    // do nothing
}

test('catch error thrown in NuoYan', done => {
    const testStr = 'this is a catch test'
    const p = new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            reject(testStr)
        }, 0)
    }).then(noop).then(function(result) {
        console.log('hello nuoyan') // this won't work
    }).catch(function(error) {
        console.error(error)
        expect(error).toBe(testStr)
        done()
    })

    console.log(p)
    expect(p).toBeInstanceOf(NuoYan)
}, 1000)

test('catch error thrown in then', done => {
    const testStr = 'this is a catch test'
    const p = new NuoYan(function(resolve, reject) {
        resolve(testStr)
    }).then(noop).then(function(result) {
        throw testStr
    }).then(function(result) {
        console.log('hello nuoyan') // this won't work
    }).catch(function(error) {
        console.error(error)
        expect(error).toBe(testStr)
        done()
    })

    console.log(p)
    expect(p).toBeInstanceOf(NuoYan)
}, 1000)
