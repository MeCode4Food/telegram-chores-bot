import chalk from 'chalk'
import SIGNALE from 'signale'

// voodoo ts process env type override + field checking
const EnvironmentFields = ['TELEGRAM_BOT_KEY', 'NODE_ENV'] as const

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnvironment {}
  }
}

interface IEnvironment extends EnvironmentType {}

type EnvironmentType = Record<typeof EnvironmentFields[number], string>

const checkFields = (processEnv: NodeJS.ProcessEnv) => {
  let hasEmptyFields = false
  for (const key in EnvironmentFields) {
    if (processEnv[key] === '') {
      SIGNALE.log(`Field ${chalk.red(key)} is missing`)
      hasEmptyFields = true
    }
  }

  return !hasEmptyFields
}

export const validateProcessEnvironmentFields = () => {
  const hasValidFields = checkFields(process.env)

  if (!hasValidFields) {
    throw new Error('Required environment variables not present during runtime')
  }
}
