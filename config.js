exports.DATABASE_URL = process.env.DATABASE_URL ||
                        global.DATABASE_URL ||
                        (process.env.NODE_ENV === 'production' ? 
                        'mongodb://brian-shopping-list:mongo2016@ds061076.mlab.com:61076/mongo-shopping-list' :
                        'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;