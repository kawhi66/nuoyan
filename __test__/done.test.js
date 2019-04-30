const NuoYan = require('..')

jest.setTimeout(1000)
test('done.resolve', done => {
    const testStr = 'this is a done resolve test'
    new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            resolve(testStr)
        }, 0)
    }).done(function(result) {
        console.log(result)
        expect(result).toBe(testStr)
        done()
    })
})

test('done.reject', done => {
    const testStr = 'this is a done reject test'
    new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            reject(testStr)
        }, 0)
    }).done(null, function(error) {
        console.error(error)
        expect(error).toBe(testStr)
        done()
    })
})
