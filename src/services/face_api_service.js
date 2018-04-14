const urlBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect'
const subscriptionKey = '785e2f33de164bad9e40876a8ec3b2bc'

export default {
  /*eslint-disable*/
  buscar_arquivo (imagem, callbackSucesso, callBackErro) {
    var params = {
      'returnFaceId': 'true',
      'returnFaceLandmarks': 'false',
      'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    }

    // Display the image.
    var sourceImageUrl = imagem

    $.ajax({
      url: urlBase + '?' + $.param(params),

      // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/json')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey)
      },

      type: 'POST',

      // Request body.
      data: '{"url": ' + '"' + sourceImageUrl + '"}'
    })

      .done(function (data) {
        callbackSucesso(JSON.parse(JSON.stringify(data, null, 2)))
      })

      .fail(function (jqXHR, textStatus, errorThrown) {
        callBackErro(jqXHR)
      })
	},
	buscar_imagens (texto, callbackSucesso, callBackErro) {
		var sourceImageUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + texto
		var subscriptionKeyImagem = 'e763e24e3802454183ee5194636d4d87'

    $.ajax({
      url: sourceImageUrl,

      // Request headers.
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader('Content-Type', 'application/json')
        xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKeyImagem)
      },

      type: 'GET',
    })
      .done(function (data) {
        callbackSucesso(JSON.parse(JSON.stringify(data, null, 2)))
      })

      .fail(function (jqXHR, textStatus, errorThrown) {
        callBackErro(jqXHR)
      })
  }
}
