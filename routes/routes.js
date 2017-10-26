module.exports = [
    ['/', require('./index')],
    ['/login', require('./users/login')],
    ['/register', require('./users/register')],
    ['/users', require('./users/users')],
    ['/learn', require('./learn/index')],
    ['/task', require('./task/index')],
    ['/learn/components', require('./learn/components')],
    ['/learn/websites', require('./learn/websites')],
    ['/learn/plugins', require('./learn/plugins')]
]