# Pintando o Sete 🎨

Site de colorir para o **Ciclo de Alfabetização (1º e 2º anos)** da Rede Municipal de São Paulo.
Funciona com o dedo (tablet) ou com o mouse (notebook), **sem precisar ler**, e continua funcionando **sem internet** depois do primeiro acesso.

- **465 figuras** em 15 categorias e 3 níveis de dificuldade
- Nenhuma dependência externa: só HTML, CSS e JavaScript puros (nada para instalar ou compilar)
- Leve: as figuras são geradas no próprio aparelho (vetores), o site inteiro tem menos de 200 KB

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `pintando-o-sete`) e envie **todo o conteúdo desta pasta** para a raiz dele.
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Após 1–2 minutos, o site fica em `https://SEU-USUARIO.github.io/pintando-o-sete/`.
4. Nos tablets, abra o endereço e use **“Adicionar à tela inicial”**: vira um ícone, abre em tela cheia e funciona offline.

> Ao publicar mudanças, altere `VERSAO` em `sw.js` (ex.: `p7-v2`) para os aparelhos baixarem a nova versão.

Para testar no computador sem GitHub, basta abrir o `index.html` no navegador (o modo offline só liga quando o site está em `https://`).

## Como a criança usa

| Ícone | Função |
|---|---|
| Bichinho no canto | “Quem está pintando?” — a criança escolhe seu avatar (e, se quiser, escreve o nome). Ele assina o desenho. |
| Faixa colorida | Categorias (cada uma mostra uma figura de exemplo). |
| ⭐ / ⭐⭐ / ⭐⭐⭐ | Dificuldade: traço grosso e áreas grandes → muitos detalhes. |
| Dado | Figura surpresa. |
| Pasta verde | Meus desenhos (galeria para continuar pintando). |
| Alto-falante | Liga/desliga sons e a fala do nome das figuras. |
| Pincel mágico | Pinta com o dedo **sem sair da linha** (ideal para os menores). |
| Lápis | Pinta livre. |
| Borracha | Apaga. |
| Seta, lixeira, pasta, seta para baixo | Desfazer, apagar tudo (com confirmação ✓/✗), guardar, baixar PNG. |

Não há balde de tinta: o objetivo é trabalhar a **coordenação motora fina**, então toda pintura é feita movendo o dedo ou o mouse. O pincel mágico ajuda os menores (não sai da linha); o lápis exige mais controle; os níveis de estrela vão de áreas grandes a áreas pequenas e precisas.

Há 24 cores, incluindo **6 tons de pele** e a cor **arco-íris**.

## Catálogo

| Categoria | Figuras | Destaques |
|---|---|---|
| Animais | 60 | inclui fauna brasileira: capivara, tucano, arara, bicho-preguiça, jacaré |
| Natureza | 26 | sol, lua, árvore, girassol, arco-íris, ilha, montanha… |
| Comidas | 32 | frutas, bolo, pizza, sorvete… |
| Transportes | 24 | carro, ônibus, trem, avião, foguete, bicicleta… |
| Brinquedos e casa | 34 | pipa, pião, peteca, ioiô, bola, castelo, mochila… |
| Tecnologia | 28 | computador, notebook, tablet, celular, mouse, teclado, pen drive, impressora, Wi-Fi, robô |
| Crianças | 17 | rostos com cabelos variados (cacheado, black power, tranças, lenço…) e “meu rosto” para autorretrato |
| Letras | 52 | A–Z em letra bastão; e cada letra com uma figura (A de abelha, B de bola…) |
| Números | 21 | 0–10 com objetos para contar; 11–20 com quadros de dez |
| Formas | 19 | formas geométricas e figuras montadas com formas |
| Mandalas | 48 | simetria, do simples ao muito detalhado |
| Padrões | 30 | quadrados, triângulos, favo de mel, escamas, ondas… |
| Robôs | 30 | combinações de cabeças, olhos, corpos e rodas |
| Monstrinhos | 24 | monstros simpáticos com 1, 2 ou 3 olhos |
| Cenas | 20 | fazenda, fundo do mar, espaço, festa, sala de tecnologia… |

Quase todas as figuras dos temas existem em duas versões: **sozinha** (mais fácil) e **com cenário** (mais difícil).

## Relação com o Currículo da Cidade — Tecnologias para Aprendizagem (TPA)

| Objetivo | Como o site apoia |
|---|---|
| EF01TPA01 / EF02TPA01 — dispositivos de hardware | Uso de toque, mouse e tela; categoria Tecnologia (computador, mouse, teclado, tablet, pen drive, impressora, fone). |
| EF01TPA02 / EF02TPA02 — identificar ícones | Toda a navegação é feita por ícones de função constante (casa, desfazer, lixeira, pasta, baixar). |
| EF01TPA03 / EF02TPA03 — lógica | Padrões, simetria das mandalas, formas e quadros de dez. |
| EF01TPA05 / EF02TPA05 — produções com imagens e sons | Pintura digital com retorno sonoro e nome falado das figuras. |
| EF01TPA10 / EF02TPA11 / EF02TPA12 — produções colaborativas | Desenhos em dupla, com mediação do professor; as cenas favorecem o trabalho conjunto. |
| EF01TPA12 / EF02TPA13 — propriedade intelectual / autoria | Assinatura do desenho com avatar e nome; a galeria mostra quem fez cada obra. |
| EF02TPA09 — organizar e armazenar informações | Galeria “Meus desenhos”, separada por criança. |
| EF01TPA14 / EF02TPA15 — mídias como linguagem de expressão | Escolha livre de cores, ferramentas e figuras. |

## Privacidade

Nada é enviado para a internet. Avatar, nome e desenhos ficam só no navegador do aparelho (localStorage e IndexedDB).
Na **área do professor** (ícone “i”) há um botão para apagar todos os desenhos guardados.

## Estrutura

```
index.html            telas e janelas
css/estilo.css        aparência (paisagem e retrato)
js/base.js            ferramentas de desenho SVG, catálogo e cenários
js/fig-animais.js     animais
js/fig-objetos.js     natureza, comidas, transportes, brinquedos, tecnologia
js/fig-geradores.js   letras, números, formas, mandalas, padrões, robôs, monstrinhos, crianças, cenas
js/icones.js          ícones da interface
js/pintura.js         motor de pintura (pincel mágico, lápis, borracha, desfazer)
js/app.js             navegação, galeria, autoria, som
sw.js, manifest.webmanifest   funcionamento offline e instalação
```

### Adicionar uma figura

Em qualquer arquivo `fig-*.js`, desenhe em um quadro 400×400 (contorno preto, áreas fechadas):

```js
F.obj({ id: 'sorriso', nome: 'Sorriso', cat: 'natureza', nivel: 1, cen: 'jardim', d: function () {
  return c(200, 200, 150) + eye(160, 170, 15) + eye(240, 170, 15) + smile(200, 230, 50, 15);
} });
```

`cen` (opcional) cria automaticamente a versão com cenário (`jardim`, `ceu`, `mar`, `fazenda`, `espaco`, `noite`, `cidade`, `sala`, `mesa`, `parque`, `floresta`, `estrada`, `praia`).
