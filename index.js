module.exports = NuoYan

/**
 * States:
 *
 * 0 - pending
 * 1 - fulfilled with _value
 * 2 - rejected with _value
 *
 * Remember that once the state is no longer pending (0) it is immutable
 */
function NuoYan(mutator) {
    let _state = 0
    let _value = null
    let _handlers = []

    function fulfill(result) {
        _state = 1
        _value = result
        _handlers.forEach(handle)
        _handlers = null
    }

    function reject(error) {
        _state = 2
        _value = error
        _handlers.forEach(handle)
        _handlers = null
    }

    function resolve(result) {
        try {
            let then = getThen(result)
            if (then) {
                doResolve(then.bind(result), resolve, reject)
                return
            }

            fulfill(result)
        } catch (e) {
            reject(e)
        }
    }

    function handle(handler) {
        if (_state === 0) {
            _handlers.push(handler)
        } else {
            if (_state === 1 && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(_value)
            } else if (_state === 2 && typeof handler.onRejected === 'function') {
                handler.onRejected(_value)
            }
        }
    }

    this.done = function(onFulfilled, onRejected) {
        setTimeout(function() {
            handle({
                onFulfilled,
                onRejected
            })
        }, 0)
    }

    this.then = function(onFulfilled, onRejected) {
        const self = this
        return new NuoYan(function(resolve, reject) {
            return self.done(function(result) {
                if (typeof onFulfilled === 'function') {
                    try {
                        return resolve(onFulfilled(result))
                    } catch (e) {
                        return reject(e)
                    }
                } else {
                    return resolve(result)
                }
            }, function(error) {
                if (typeof onRejected === 'function') {
                    try {
                        return resolve(onRejected(error))
                    } catch (e) {
                        return reject(e)
                    }
                } else {
                    return reject(error)
                }
            })
        })
    }

    doResolve(mutator, resolve, reject)
}

/**
 * Check if a value is a Promise and, if it is,
 * return the `then` method of that promise.
 *
 * @param {Promise|Any} value
 * @return {Function|Null}
 */
function getThen(value) {
    var t = typeof value
    if (value && (t === 'object' || t === 'function')) {
        var then = value.then
        if (typeof then === 'function') {
            return then
        }
    }
    return null
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 *
 * @param {Function} fn A resolver function that may not be trusted
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
function doResolve(fn, onFulfilled, onRejected) {
    var done = false
    try {
        fn(function(value) {
            if (done) return
            done = true
            onFulfilled(value)
        }, function(reason) {
            if (done) return
            done = true
            onRejected(reason)
        })
    } catch (ex) {
        if (done) return
        done = true
        onRejected(ex)
    }
}
