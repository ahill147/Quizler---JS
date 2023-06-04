import fs from 'fs'


export const chooseRandom = (items = [], numItems = 0) => {
  if (items.length <= 1) {
    return items
  }
  let randAmount = numItems
  if (randAmount == 0) {
    randAmount = 1
  }
  else if (randAmount > items.length) {
    randAmount = Math.floor(Math.random() * items.length) + 1
  }

  let randomIndexes = []
  let x
  for (let i = 1; i <= randAmount; i++) {
    x = Math.floor(Math.random() * items.length)
    if (randomIndexes.length == 0){
      randomIndexes.push(x)
    }
    else if (randomIndexes.includes(x) == false) {
      randomIndexes.push(x)
    }
    else {
      while (randomIndexes.includes(x)== true) {
        x = Math.floor(Math.random() * items.length)
      }
      randomIndexes.push(x)
    }
  }
  let result = []
  for (let y of randomIndexes) {
    result.push(items[y])
  }
  return result
}


export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  let result = []

  for (let question = 1; question <= numQuestions; question++) {
    result.push({
      type: "input",
      name: `question-${question}`,
      message: `Enter question ${question}`,
    })

    for (let choice = 1; choice <= numChoices; choice++) {
      result.push({
        type: "input",
        name: `question-${question}-choice-${choice}`,
        message: `Enter answer choice ${choice} for question ${question}`,
      })
    }
  }

  return result
}

export const createQuestions = (question = {}) => {
  let questionKeys = Object.keys(question)

  let questions = {}

  questionKeys.forEach(element => {
    if (!element.includes('choice')) {
      questions[element] = {
        type: 'list',
        name: element,
        message: question[element],
        choices: []
      }
    } else {
      let splittedStringElement = 'question-' + element.split('-')[1]
      let temp = questions[splittedStringElement]
      temp['choices'].push(question[element])
    }
    return Object.values(questions)
  })

  return Object.values(questions)
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
