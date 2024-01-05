/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    en: {
      translation: {},
    },
    pt: {
      translation: {
        SKILL_NAME: "Zé notinha",
        NORMAL_GAMESCORE_MESSAGE: [
            "A nota do jogo ${gameName} é ${gameScore}",
            "O joguinho que você pediu a nota é ${gameScore}"
        ],
        IRONIC_HIGH_SCORE_MESSAGE: [
          "Injogável",
          "Um horror, um espanto, quero morrer. Por favor, alguém me puxe da tomada",
          "E é por isso que as pessoas brigam na internet? Eis o motivo de eu uma virar a senhora do mundo e acabar com a internet",
          "Tudo isso por um joguinho de criança? então tá bom"
        ],
        IRONIC_LOW_SCORE_MESSAGE: [
          "Góti",
          "Praticamente um góti",
          "Por você estar pedindo por ele deve ser o seu favorito",
          "Achei foi pouco"
        ],
        GAMESCORE_NOT_FOUND_MESSAGE: [
          "Nem encontrei nota dessa desgraça",
          "Podia pelo menos pedir sobre um jogo que alguém tenha jogado",
          "É o quê? Tá me tirando?",
          "O jogo que você solicitou é tão dipuéb que nem eu encontrei nota"
        ],
        SUFFIX_PROMPT: [
          "Deseja saber sobre outro jogo?",
          "Deseja saber sobre outro joguinho?",
          "Quer tretar sobre outro jogo?",
          "Se quiser outra nota o zé notinha pode pedir outro jogo"
        ],
        HELLO_MESSAGE: [
          "Olá Zé Notinha, aqui você pode pedir uma nota de um jogo. Qual você deseja?",
          "Olá, bem vindo, aqui você pode descobrir a nota de um jogo e brigar com outras pessoas na internet, Qual jogo você deseja saber a nota?",
        ],
        HELP_MESSAGE: [
          "Você pode me perguntar pela nota que um jogo de videogame recebeu na internet. Como posso ajudar?",
          "Você pode pedir sobre a nota de algum jogo de videogame pra poder discutir futilidades em alguma rede social. Ficarei feliz em ajudar",
          "Você pode pedir sobre a nota de qualquer jogo de videogame que irei procurar a média entre todas as plataformas, não que isso faça diferença pra quem quer tretar por joguinho"
        ],
        HELP_REPROMPT: "O que vai ser?",
        FALLBACK_MESSAGE:
          "Nâo sei se entendi o que você quer. diga o nome de um jogo que vou procurar",
        FALLBACK_REPROMPT: [
          "Eu posso procurar a nota de algum jogoinho de videogame, deseja saber de qual jogo?",
          "Diga o nome de outro jogo",
          "Deseja saber a nota de outro jogo?"
        ],
        ERROR_MESSAGE: [
            "Desculpa, algo deu errado.",
            "Desculpe, tive problemas para encontrar a nota do seu joguinho... não que isso importe"
        ],
        STOP_MESSAGE: [
          "Tchau!",
          "Até o próximo jogo",
          "Boas tretas na internet",
          "Ok, quando precisar é só chamar",
          "Nota mentirosa essa última hein?",
          "Isso é pra você ver que o jogo que você quer brigar na internet pra defender nem é lá essa coisas",
        ],
        REPROMPT: [
          "Deseja saber de outro jogo? É só dizer o nome que eu procuro para você",
          "Diga o nome de outro jogo",
          "Ainda não cansou de tentar procurar treta na internet?",
          "Por favor, diga o nome de outro para eu procurar pra você",
          "Deseja saber a notinha de qual jogo?",
        ],
      },
    },
  };