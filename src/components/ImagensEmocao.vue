<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <span class="md-title">{{msg}}</span>
        </div>
      </md-app-toolbar>
      <md-app-content class="custom-app-content md-scrollbar" style="overflow: hidden;">
        <p><b>Insira a url da imagem:</b></p>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label>Url:</label>
              <md-input v-model="url"></md-input>
            </md-field>
             <md-button class="md-raised md-primary" @click="buscarArquivo" :disabled="pesquisando">Buscar Minha Emoção</md-button>
             <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate" style="margin-top: 10px;" v-if="pesquisando"></md-progress-spinner>
            <p><b>Minha Emoção: <h2 style="color: #336699;">{{emocao}}</h2></b></p>
          </div>
          <div class="md-layout-item">
            <img :src="url" style="max-height: 200px;" />
          </div>
        </div>
          <hr>
          <h3 v-if="imagens.length > 0">Imagens Relacionadas a sua emoção</h3>
          <div class="md-layout md-gutter md-alignment-center" style="background-color: rgba(0,0,0,0.7);">
            <div class="md-layout-item md-size-25" v-for="(imagem, index) in imagens" :key="index" style="padding: 5px;">
              <img :src="imagem.contentUrl" style="max-height: 200px;" />
            </div>
          </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import faceApiService from '@/services/face_api_service'
import translateApiService from '@/services/translate_api_service'

export default {
  name: 'ImagensEmocao',
  data () {
    return {
      msg: 'Busca de imagens por sua emoção',
      menuVisible: false,
      url: '',
      emocao: '',
      imagens: [],
      pesquisando: false
    }
  },
  methods: {
    buscarArquivo () {
      let self = this
      self.pesquisando = true
      self.imagens = []
      faceApiService.buscar_arquivo(this.url, function (data) {
        if (data.length > 0) {
          let face = data[0]
          let emocao = self.buscarMaiorEmocao(Object.keys(face.faceAttributes.emotion), face.faceAttributes.emotion)
          self.emocao = self.traduzirEmocao(emocao)
          self.buscarImagens(emocao)
        } else {
          self.emocao = 'Não foi encontrada nenhuma emoção nessa image, por favor informe uma imagem com rostos de pessoas.'
          self.pesquisando = false
        }
      }, function () {
        self.emocao = 'Erro ao buscar imagem, provalvelmente a url é invalida'
        self.pesquisando = false
      })
    },
    buscarMaiorEmocao (listaEmocoes, objetoEmocoes) {
      return listaEmocoes.reduce(function (prev, current) {
        return (objetoEmocoes[prev] > objetoEmocoes[current]) ? prev : current
      })
    },
    traduzirEmocao (emocao) {
      let self = this
      translateApiService.traduzir_texto(emocao, function (data) {
        self.emocao = data.translations[0].translatedText.capitalize()
        self.pesquisando = false
      })
    },
    buscarImagens (texto) {
      let self = this
      faceApiService.buscar_imagens(texto, function (data) {
        console.log(data)
        self.imagens = data.value
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .custom-app-content {
    min-height: 2500px;
    overflow: auto;
  }

  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
