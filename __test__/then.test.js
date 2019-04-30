const NuoYan = require('..')

jest.setTimeout(1000)
test('then.resolve', done => {
    const testStr = 'this is then resolve test'
    const p = new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            resolve(testStr)
        }, 0)
    }).then(function(result) {
        console.log(result)
        expect(result).toBe(testStr)
        done()
    })

    console.log(p)
    expect(p).toBeInstanceOf(NuoYan)
})

test('then.reject', done => {
    const testStr = 'this is then reject test'
    const p = new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            reject(testStr)
        }, 0)
    }).then(null, function(error) {
        console.error(error)
        expect(error).toBe(testStr)
        done()
    })

    console.log(p)
    expect(p).toBeInstanceOf(NuoYan)
})
