# Buscar Imagens relacionadas a Emoção

## Para Iniciar o projeto

1. Gere uma chave no Azure da sua FaceApi <a href="https://azure.microsoft.com/pt-br/services/cognitive-services/face/">Documentação</a> e Altera no arquivo: src/services/face_api_service.js a variavel ``` const subscriptionKey = '{subscriptionKey}' ```

2. Gere uma chave no Azure da sua BingSearchApi <a href="https://azure.microsoft.com/pt-br/services/cognitive-services/bing-web-search-api/">Documentação</a> e Altera no arquivo: src/services/face_api_service.js a variavel ``` var subscriptionKeyImagem = '{subscriptionKeyImagem}' ```

3. Gere uma chave no Google Tranlate Api<a href="https://cloud.google.com/translate/docs/?hl=pt-br">Documentação</a> e Altera no arquivo: src/services/translate_api_service.js a variavel subscriptionKey:  ``` axios.get(urlBase + 'v2?q=' + texto + '&target=pt-br&key={subscriptionKey}').then(function (response) { ```

``` bash
# Instale as dependecias (necessario o npm e node instalados)
npm install

# rode o comando a seguir para rodar o projeto vai ser acessado em http://localhost:8081/#/
npm run dev
