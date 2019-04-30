const NuoYan = require('..')

jest.setTimeout(1000)
test('NuoYan.done.resolve', done => {
    const testStr = 'this is a resolve test'
    new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            resolve(testStr)
        }, 0)
    }).done(function(result) {
        expect(result).toBe(testStr)
        done()
    })
})

test('NuoYan.done.reject', done => {
    const testStr = 'this is a reject test'
    new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            reject(testStr)
        }, 0)
    }).done(null, function(error) {
        expect(error).toBe(testStr)
    })
})

test('NuoYan.then', done => {
    new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            resolve(124)
        }, 1000)
    }).then(function(result) {
        expect(result).toBe(124)
        done()
    }, function(error) {
        console.error(error)
        done()
    })
})

// test('NuoYan.then.then', done => {
//     const p = new NuoYan(function(resolve, reject) {
//         try {
//             setTimeout(function() {
//                 resolve(125)
//             }, 200)
//         } catch (e) {
//             reject(e)
//         }
//     })
//
//     p.then(result => {
//         expect(result).toBe(123)
//         done()
//     })
// })
