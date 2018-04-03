import { transform } from 'transformobject'

const whatifRules = {
  id: 'id',
  whatif: (obj) => obj.choices[0].text,
  but: (obj) => obj.choices[1].text,
  stats: 'stats',
}

export function transformWhatifQuestion(object) {
  return transform(object, whatifRules)
}
