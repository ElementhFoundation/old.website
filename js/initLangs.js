$('#lngSelect').on('change', function() {
  window.location.href = '?lng=' + this.value
})

function setCookie(key, value) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var lng = getParameterByName("lng")

if(lng) {
  setCookie("i18next", lng)
  var newUrl = window.location.href.replace('?lng=' + lng , '')
  window.location.href = newUrl
}
i18next.use(i18nextXHRBackend).use(i18nextBrowserLanguageDetector).init({
  'debug': false,
  'fallbackLng': 'en',
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    crossDomain: true
  }
}, function (err, t) {
  jqueryI18next.init(i18next, $);
  $('body').localize()
});

i18next.on('languageChanged', function(lng) {
  $('#lngSelect').find('option[value="'+ lng +'"]').prop('selected', true)
})