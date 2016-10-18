exports.DATABASE_URL = process.env.DATABASE_URL ||
                        global.DATABASE_URL ||
                        (process.env.NODE_ENV === 'production' ? 
                        'mongodb://localhost/shopping-list' :
                        'mongodb://mongodb://,briancbarrow>:<code2016>ds061076.mlab.com:61076/mongo-shopping-list');
exports.PORT = process.env.PORT || 8080;