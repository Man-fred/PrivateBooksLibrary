//const RSH = require('./request-signature-helper').RequestSignatureHelper;
//exports.RequestSignatureHelper = require('./request-signature-helper').RequestSignatureHelper;
////const Throttler = require('./throttler');
//const locale = require('./locale');

//const http = require('http');
//const xml2js = require('xml2js');

//var crypto = require('crypto');

class RSH {

    constructor(params) {
        RSH.kAWSAccessKeyId = 'AWSAccessKeyId'
        RSH.kAWSSecretKey = 'AWSSecretKey'
        RSH.kEndPoint = 'EndPoint'
        RSH.kRequestMethod = 'RequestMethod'
        RSH.kRequestUri = 'RequestUri'
        RSH.kTimestampParam = 'Timestamp'
        RSH.kSignatureParam = 'Signature'
        //init(params);
        // enforce required params
        if (typeof (params[RSH.kAWSAccessKeyId]) === 'undefined') {
            throw new Error('Need access key id argument')
        }
        if (typeof (params[RSH.kAWSSecretKey]) === 'undefined') {
            throw new Error('Need secret key argument')
        }
        if (typeof (params[RSH.kEndPoint]) === 'undefined') {
            throw new Error('Need end point argument')
        }

        // set params
        this[RSH.kAWSAccessKeyId] = params[RSH.kAWSAccessKeyId]
        this[RSH.kAWSSecretKey] = params[RSH.kAWSSecretKey]
        this[RSH.kEndPoint] = params[RSH.kEndPoint].toLowerCase()
        this[RSH.kRequestMethod] = params[RSH.kRequestMethod] || 'GET'
        this[RSH.kRequestUri] = params[RSH.kRequestUri] || '/onca/xml'
    }

    init(params) {
        // enforce required params
        if (typeof (params[RSH.kAWSAccessKeyId]) === 'undefined') {
            throw new Error('Need access key id argument')
        }
        if (typeof (params[RSH.kAWSSecretKey]) === 'undefined') {
            throw new Error('Need secret key argument')
        }
        if (typeof (params[RSH.kEndPoint]) === 'undefined') {
            throw new Error('Need end point argument')
        }

        // set params
        this[RSH.kAWSAccessKeyId] = params[RSH.kAWSAccessKeyId]
        this[RSH.kAWSSecretKey] = params[RSH.kAWSSecretKey]
        this[RSH.kEndPoint] = params[RSH.kEndPoint].toLowerCase()
        this[RSH.kRequestMethod] = params[RSH.kRequestMethod] || 'GET'
        this[RSH.kRequestUri] = params[RSH.kRequestUri] || '/onca/xml'
    }

    sign(params) {
        // append params
        params[RSH.kTimestampParam] = this.generateTimestamp()
        // generate signature
        var canonical = this.canonicalize(params)
        var stringToSign = [
            this[RSH.kRequestMethod],
            this[RSH.kEndPoint],
            this[RSH.kRequestUri],
            canonical
        ].join('\n')
        params[RSH.kSignatureParam] = this.digest(stringToSign)

        return params
    }

    zeroPad(num, length) {
        num = num + ''
        while (num.length < length) {
            num = '0' + num
        }
        return num
    }

    generateTimestamp() {
        var now = new Date(),
                year = now.getUTCFullYear(),
                month = this.zeroPad(now.getUTCMonth() + 1, 2),
                day = this.zeroPad(now.getUTCDate(), 2),
                hours = this.zeroPad(now.getUTCHours(), 2),
                mins = this.zeroPad(now.getUTCMinutes(), 2),
                secs = this.zeroPad(now.getUTCSeconds(), 2);
        return [year, month, day].join('-') + 'T' +
                [hours, mins, secs].join(':') + 'Z';
    }

    /**
     * Port of PHP rawurlencode().
     */
    escape(x) {
        return encodeURIComponent(x).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A')
    }

    digest(x) {
        var test_string = "GET\nwebservices.amazon.com\n/onca/xml\nAWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&AssociateTag=mytag-20&ItemId=0679722769&Operation=ItemLookup&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews&Service=AWSECommerceService&Timestamp=2014-08-18T12%3A00%3A00Z&Version=2013-08-01"
        var signature2 = CryptoJS.HmacSHA256(test_string, "1234567890");
        console.log(signature2.toString(CryptoJS.enc.Base64));
        signature2 = CryptoJS.HmacSHA256(x, this[RSH.kAWSSecretKey]);
        return signature2.toString(CryptoJS.enc.Base64);
        var secretKey = this[RSH.kAWSSecretKey];
        var hmac = Crypto.createHmac('sha256', secretKey)
        hmac.update(x)
        return hmac.digest('base64')
    }

    canonicalize(params) {
        var parts = []
        for (var key in params) {
            parts.push([this.escape(key), this.escape(params[key])].join('='))
        }
        return parts.sort().join('&')
    }
    static AWSAccessKeyId() {
        return RSH.kAWSAccessKeyId;
    }
    static AWSSecretKey() {
        return RSH.kAWSSecretKey;
    }
    static EndPoint() {
        return RSH.kEndPoint;
    }
    static RequestMethod() {
        return RSH.kRequestMethod;
    }
    static RequestUri() {
        return RSH.kRequestUri;
    }
    static Timestamp() {
        return RSH.kTimestampParam;
    }
    static Signature() {
        return RSH.kSignatureParam;
    }

}

// http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Locales.html


class locale {
    static getEndpointForLocale(param) {
        const ENDPOINTS_BY_LOCALE = {
            BR: 'webservices.amazon.com.br',
            CA: 'webservices.amazon.ca',
            CN: 'webservices.amazon.cn',
            FR: 'webservices.amazon.fr',
            DE: 'webservices.amazon.de',
            IN: 'webservices.amazon.in',
            IT: 'webservices.amazon.it',
            JP: 'webservices.amazon.co.jp',
            MX: 'webservices.amazon.com.mx',
            ES: 'webservices.amazon.es',
            UK: 'webservices.amazon.co.uk',
            US: 'webservices.amazon.com'
        };
        const DEFAULT_ENDPOINT = ENDPOINTS_BY_LOCALE['US']
        return ENDPOINTS_BY_LOCALE[param] || DEFAULT_ENDPOINT;
    }
}

const getNowMillis = () => {
    return (new Date()).getTime()
}

class Throttler {
    constructor(maxRequestsPerSecond) {
        this.maxRequestsPerSecond = maxRequestsPerSecond || 0
        this._timeBetweenRequestsInMilliSeconds = 1 / this.maxRequestsPerSecond * 1000
        this._nextAvailableRequestMillis = getNowMillis()
    }

    execute(cb) {
        let nowMillis = getNowMillis()
        if (this.maxRequestsPerSecond === 0) {
            return Promise.resolve(cb())
        } else if (nowMillis >= this._nextAvailableRequestMillis) {
            this._nextAvailableRequestMillis = getNowMillis() + this._timeBetweenRequestsInMilliSeconds
            return Promise.resolve(cb())
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(cb())
                }, this._nextAvailableRequestMillis - nowMillis)
                this._nextAvailableRequestMillis += this._timeBetweenRequestsInMilliSeconds
            })
        }
    }

    getQueueSize() {
        let nowMillis = getNowMillis()
        if (this.maxRequestsPerSecond === 0) {
            return (-1)
        } else if (this._nextAvailableRequestMillis <= nowMillis) {
            return 0
        } else {
            return Math.floor((this._nextAvailableRequestMillis - nowMillis) / (this.maxRequestsPerSecond * 1000))
        }
    }
}

const defaultXml2JsOptions = {
    explicitArray: false
}

class OperationHelper {
    constructor(params) {
        OperationHelper.version = '2013-08-01'
        OperationHelper.service = 'AWSECommerceService'
        OperationHelper.defaultBaseUri = '/onca/xml'
        params = params || {}

        // check requried params
        if (typeof (params.awsId) === 'undefined') {
            throw new Error('Missing AWS Id param')
        }
        if (typeof (params.awsSecret) === 'undefined') {
            throw new Error('Missing AWS Secret param')
        }
        if (typeof (params.assocId) === 'undefined') {
            throw new Error('Missing Associate Id param')
        }

        // set instance variables from params
        this.awsId = params.awsId
        this.awsSecret = params.awsSecret
        this.assocId = params.assocId
        this.endPoint = params.endPoint || locale.getEndpointForLocale(params.locale)
        this.scheme = params.scheme
        this.baseUri = params.baseUri || OperationHelper.defaultBaseUri
        this.xml2jsOptions = Object.assign({}, defaultXml2JsOptions, params.xml2jsOptions)
        this.throttler = new Throttler(params.maxRequestsPerSecond)

        // set version
        if (typeof (params.version) === 'string')
            OperationHelper.version = params.version
    }

    getSignatureHelper() {
        if (typeof (this.signatureHelper) === 'undefined') {
            var params = {};
            params[RSH.AWSAccessKeyId()] = this.awsId;
            params[RSH.AWSSecretKey()] = this.awsSecret;
            params[RSH.EndPoint()] = this.endPoint;
            this.signatureHelper = new RSH(params);
        }
        return this.signatureHelper;
    }

    generateParams(operation, params) {
        params.Service = OperationHelper.service
        params.Version = OperationHelper.version
        params.Operation = operation
        params.AWSAccessKeyId = this.awsId
        params.AssociateTag = this.assocId
        return params
    }

    generateUri(operation, params) {
        params = this.generateParams(operation, params)
        var helper = this.getSignatureHelper()
        params = helper.sign(params)
        var queryString = helper.canonicalize(params)
        return this.baseUri + '?' + queryString
    }

    execute(operation, params, callback) {
        const throttledAction = () => this._execute(operation, params, callback)
        return this.throttler.execute(throttledAction)
    }

    getQueueSize() {
        return this.throttler.getQueueSize()
    }
    getUri(operation, params) {
        if (typeof (operation) === 'undefined') {
            throw new Error('Missing operation parameter')
        }
        if (typeof (params) === 'undefined') {
            params = {}
        }
        return this.generateUri(operation, params);
    }
    getHost(){
        return this.endPoint;
    }
    _execute(operation, params, callback) {
        if (typeof (operation) === 'undefined') {
            throw new Error('Missing operation parameter')
        }
        if (typeof (params) === 'undefined') {
            params = {}
        }

        var uri = this.generateUri(operation, params)
        var host = this.endPoint
        var scheme = this.scheme
        var xml2jsOptions = this.xml2jsOptions

        var options = {
            hostname: host,
            path: uri,
            method: 'GET'
        }

        if (scheme)
            options['scheme'] = scheme;

        var responseBody = ''

        const promise = new Promise((resolve, reject) => {
            var request = http.request(options, function (response) {
                response.setEncoding('utf8')

                response.on('data', function (chunk) {
                    responseBody += chunk
                })

                response.on('end', function () {
                    xml2js.parseString(responseBody, xml2jsOptions, function (err, result) {
                        if (callback)
                            callback(err, result, responseBody)
                        else if (err)
                            reject(err)
                        else
                            resolve({
                                result,
                                responseBody
                            })
                    })
                })
            })

            request.on('error', function (err) {
                if (callback)
                    callback(err)
                else
                    reject(err)
            })

            request.end()
        })

        if (!callback)
            return promise
    }
}


