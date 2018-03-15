var apiUrl = 'http://testapi.elementh.io/'

var isCrowdAddressesLoaded = null
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/XQF4D1KpJZSQXYZOZxIX'))
var jsonInterface = [{"constant":true,"inputs":[{"name":"","type":"bytes16"}],"name":"BTCTransactions","outputs":[{"name":"amount","type":"uint256"},{"name":"hash","type":"bytes16"},{"name":"wallet","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_BTCRate","type":"uint256"}],"name":"setBTCRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_goalETH","type":"uint256"}],"name":"setGoalETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bonusStage2FirstDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"satoshiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"toRemove","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bonusStage1","type":"uint256"},{"name":"_bonusStage2FirstDay","type":"uint256"},{"name":"_bonusStage2SecondDay","type":"uint256"}],"name":"setBonuses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"goal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountSatoshi","type":"uint256"},{"name":"_hashTransaction","type":"bytes16"},{"name":"_walletETH","type":"address"}],"name":"addBTCTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_capETH","type":"uint256"}],"name":"setCapETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAllowed","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"goalReached","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusStage1","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isFinalized","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusStage2SecondDay","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_weiAmount","type":"uint256"}],"name":"getTokenAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_endTime","type":"uint256"}],"name":"setEndTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_stage","type":"uint8"}],"name":"setStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"address"}],"name":"setWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"hasEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"BTCRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_startTime","type":"uint256"},{"name":"_endTime","type":"uint256"},{"name":"_rate","type":"uint256"},{"name":"_capETH","type":"uint256"},{"name":"_goalETH","type":"uint256"},{"name":"_wallet","type":"address"},{"name":"_BTCRate","type":"uint256"},{"name":"_token","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"holder","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Refunded","type":"event"},{"anonymous":false,"inputs":[],"name":"Finalized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"}]
var myContract = null
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

function initContract (contractAddr) {
  myContract = new web3.eth.Contract(jsonInterface, contractAddr)
}

function getCollected (callback) {
  myContract.methods.weiRaised().call(function (err, value) {
    if(err){
      callback(err, null)
    }
    if(value) {
      callback(null, parseFloat(web3.utils.fromWei(value, 'ether')).toFixed(2))
    }
  })
}

function getCap (callback) {
  myContract.methods.cap().call(function (err, value) {
    if(err){
      callback(err, null)
    }
    if(value) {
      callback(null, parseFloat(web3.utils.fromWei(value, 'ether')).toFixed(2))
    }
  })
}


function checkAddress (callback) {
  makeApiRequest('checkAddress', 'GET', null, callback)
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

function getInit (callback) {
  makeApiRequest('init', 'GET', null, callback)
}
function setPassword (data, callback) {
  makeApiRequest('setPassword', 'POST', data, callback)
}

function setEmail (data, callback) {
  makeApiRequest('setEmail', 'POST', data, callback)
}

function setCountry (data, callback) {
  makeApiRequest('setCountry', 'POST', data, callback)
}

function checkAirdrop (callback) {
  makeApiRequest('checkAirdrop', 'GET',null, callback)
}

function getReferralsInfo (callback) {
  makeApiRequest('getReferralsInfo', 'GET',null, callback)
}
function getPrefundTokens (callback) {
  makeApiRequest('getPrefundTokens', 'GET',null, callback)
}

function setWalletETH (data, callback) {
  makeApiRequest('setWalletETH', 'POST', data, callback)
}

function setUsername (data, callback) {
  makeApiRequest('setUsername', 'POST', data, callback)
}

function setTelegramUsername (data, callback) {
  makeApiRequest('setTelegramUsername', 'POST', data, callback)
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

function getToken (callback) {
  makeApiRequest('getToken', 'GET', null, callback)
}

function setApplicant (data,callback) {
  makeApiRequest('setApplicant', 'POST', data, callback)
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