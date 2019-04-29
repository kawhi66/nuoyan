const NuoYan = require('.')

jest.setTimeout(10000)
test('NuoYan.done', done => {
    new NuoYan(function(resolve, reject) {
        setTimeout(function() {
            resolve(123)
        }, 1000)
    }).done(function(result) {
        expect(result).toBe(123)
        done()
    }, function(error) {
        console.error(error)
        done()
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
