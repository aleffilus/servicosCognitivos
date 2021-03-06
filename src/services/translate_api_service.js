import axios from 'axios'
const urlBase = 'https://translation.googleapis.com/language/translate/'

export default {
  traduzir_texto (texto, callbackSucesso, callBackErro) {
    axios.get(urlBase + 'v2?q=' + texto + '&target=pt-br&key={subscriptionKey}').then(function (response) {
      callbackSucesso(response.data.data)
    }).catch(function (error) {
      if (callBackErro) {
        callBackErro(error)
      } else {
        console.log(error)
      }
    })
  }
}
