const Clova = require('@line/clova-cek-sdk-nodejs');
const uuid = require('uuid').v4
const _ = require('lodash')
const { DOMAIN, ExtensionId } = require('../config')
var verifier = require('../util/verifier.js')

function resultText({ midText, sum, diceCount }) {
  if (diceCount == 1) {
    return `結果は ${sum} です。`
  } else if (diceCount < 4) {
    return `結果は ${midText} で、合計 ${sum} です。`
  } else {
    return `${diceCount}個のサイコロの合計は ${sum} です。`
  }
}

function throwDice(diceCount) {
  const results = []
  let midText = ''
  let resultText = ''
  let sum = 0
  console.log(`throw ${diceCount} times`)
  for (let i = 0; i < diceCount; i++) {
    const rand = Math.floor(Math.random() * 6) + 1
    console.log(`${i + 1} time: ${rand}`)
    results.push(rand)
    sum += rand
    midText += `${rand}, `
  }

  midText = midText.replace(/, $/, '')
  return { midText, sum, diceCount }
}

const clovaSkillHandler = Clova.Client
  .configureSkill()
  .onLaunchRequest(responseHelper => {
    responseHelper.setSimpleSpeech(
      Clova.SpeechBuilder.createSpeechText('いくつのサイコロを投げますか?')
    );
  })
  .onIntentRequest(async responseHelper => {
    const intent = responseHelper.getIntentName();
    const slots = responseHelper.getSlots();

    switch (intent) {
      case 'ThrowDiceIntent':
        let diceCount = 1
        if (!!slots) {
          const diceCountSlot = slots.diceCount
          if (slots.length != 0 && diceCountSlot) {
            diceCount = parseInt(diceCountSlot.value)
          }

          if (isNaN(diceCount)) {
            diceCount = 1
          }
        }
        const throwResult = throwDice(diceCount)

        responseHelper.setSpeechList([
          Clova.SpeechBuilder.createSpeechText(`サイコロを ${diceCount}個 投げます。`),
          Clova.SpeechBuilder.createSpeechUrl(`${DOMAIN}/rolling_dice_sound.mp3`),
          Clova.SpeechBuilder.createSpeechText(resultText(throwResult))
        ]);
        break
      case 'Clova.GuideIntent':
      default:
        responseHelper.setSpeechList(
          Clova.SpeechBuilder.createSpeechText("サイコロを1個投げて、と言ってみてください。")
        );
        break;
    }
  })
  .onSessionEndedRequest(responseHelper => {
    const sessionId = responseHelper.getSessionId();

    // Do something on session end
    responseHelper.endSession();
  })
  .handle();

module.exports = clovaSkillHandler;
