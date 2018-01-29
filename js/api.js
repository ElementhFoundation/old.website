var user = null
var isUserLoaded = false
var apiUrl = 'https://api.elementh.io/'
var crowdAddresses = null
var isCrowdAddressesLoaded = null
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/XQF4D1KpJZSQXYZOZxIX'))

function getBalance (addrToken, addr, callback) {
  var tknAddress = (addr).substring(2)
  var contractData = ('0x70a08231000000000000000000000000' + tknAddress)
  var balance = 0
  if (addr) {
    web3.eth.call({
      to: addrToken,
      data: contractData
    }, function (err, result) {
      if (result) {
        balance = web3.utils.fromWei(result, 'ether')
        callback(null, balance)
      }
      else {
        callback(err, null)
      }
    })
  }
}

function getUser (callback) {
  if(!user && !isUserLoaded){
    getProfile(function (err, data) {
      if (err) {
        callback(err, null)
        return null
      }
      user = data
      isUserLoaded = true
      callback(null, user)
    })
  }else{
    callback(null, user)
  }
}

function getCrowdAddresses (callback) {
  if(!crowdAddresses && !isCrowdAddressesLoaded){
    getAddress(function (err, data) {
      if (err) {
        callback(err, null)
        return null
      }
      crowdAddresses = data
      isCrowdAddressesLoaded = true
      callback(null, crowdAddresses)
    })
  }else{
    callback(null, crowdAddresses)
  }
}

function authFacebook (access_token, callback) {
  makeApiRequest('auth/facebook', 'POST', {access_token}, callback)
}

function sendVerification (callback) {
  makeApiRequest('sendVerification', 'GET', null, callback)
}

function sendRecovery (email, callback) {
  makeApiRequest('sendRecovery', 'GET', {email}, callback)
}

function checkRecovery (code, callback) {
  makeApiRequest('checkRecovery/email/' + code, 'GET', null, callback)
}

function checkVerification (code, callback) {
  makeApiRequest('checkVerification/email/' + code, 'GET', null, callback)
}

function getAddress (callback) {
  makeApiRequest('getAddress', 'GET', null, callback)
}
function setPassword (password, callback) {
  makeApiRequest('setPassword', 'POST', {password}, callback)
}

function setWalletETH (data, callback) {
  makeApiRequest('setWalletETH', 'POST', data, callback)
}

function setWalletBTC (data, callback) {
  makeApiRequest('setWalletBTC', 'POST', data, callback)
}

function setRound (data, callback) {
  makeApiRequest('setRound', 'POST', data, callback)
}

function setProfile (data, callback) {
  makeApiRequest('setProfile', 'POST', data, callback)
}

function setInfo (data, callback) {
  makeApiRequest('setInfo', 'POST', data, callback)
}

function signUp (data, callback) {
  makeApiRequest('signUp', 'POST', data, callback)
}

function signIn (data, callback) {
  makeApiRequest('signIn', 'POST', data, callback)
}

function signOut (callback) {
  makeApiRequest('signOut', 'POST', null, callback)
}

function getProfile (callback) {
  makeApiRequest('getProfile', 'GET', null, callback)
}

function makeApiRequest (url, method, data, callback) {
  var request = $.ajax({
    url: apiUrl + url,
    method: method,
    dataType: 'json',
    data: data,
    tryCount: 0,
    retryLimit: 3,
    xhrFields: {
      withCredentials: true
    }
  })
  request.done(function (result) {
    if (!result.response) {
      callback('Empty response', null)
      return
    }
    if (result.response.error) {
      callback(result.response.error, null)
      return
    }
    callback(null, result.response.result)
  })

  request.fail(function (jqXHR, textStatus) {
    if (textStatus == 'timeout') {
      this.tryCount++
      if (this.tryCount <= this.retryLimit) {
        //try again
        $.ajax(this)
      } else {
        callback(textStatus, null)
      }
    } else {
      callback(textStatus, null)
    }
  })
}