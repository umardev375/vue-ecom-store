import { tint, shade } from 'tint-shade-color'
import kebabCase from 'lodash-es/kebabCase'
export function generateRootStyle(variables) {
  let cssText = ''
  for (const color of Object.keys(variables)) {
    cssText += `--theme-${kebabCase(color)}-color :${variables[color]};`
  }

  return `:root { ${cssText} }`
}

/**
 * Adds tint and shade to each color which is in the object
 * @param currentVariables
 * @param percent
 * @returns {{}}
 */

export function generateExtraVariables(
  currentVariables,
  percent = { tint: 0.3, shade: 0.3 }
) {
  for (const color of Object.keys(currentVariables)) {
    currentVariables[`${color}-tint`] = tint(
      currentVariables[color],
      percent.tint
    )
    currentVariables[`${color}-shade`] = shade(
      currentVariables[color],
      percent.shade
    )
  }
  // Sort by name
  return Object.keys(currentVariables)
    .sort()
    .reduce((obj, key) => {
      obj[key] = currentVariables[key]
      return obj
    }, {})
}

export function generateStyleSheetFromTheme(theme) {
  const states = ['', 'hover:hover', 'focus', 'disabled']
  const propByPrefix = {
    text: 'color',
    bg: 'background-color',
    border: 'border-color'
  }

  const createStyles = (classNames) => {
    const createStyleLine = (line) => {
      const extractedKey = line[0].split('-')[1]

      const colors = {
        default: theme[extractedKey],
        'hover:hover': theme[`${extractedKey}-shade`],
        focus: theme[`${extractedKey}-shade`],
        disabled: theme[`${extractedKey}-tint`]
      }

      return line
        .map((l) => {
          const suffix = l.split('--')[1]
          const prefix = l.split('-')[0].replace('.', '')

          if (suffix) {
            return ` ${l} {${propByPrefix[prefix]}: ${colors[suffix]};}`
          } else {
            return ` ${l} { ${propByPrefix[prefix]}: ${colors.default};}`
          }
        })
        .join('')
    }

    return classNames.map(createStyleLine).join('')
  }

  const createCssClassNames = (key) => {
    const classPrefixes = ['bg', 'text']

    return classPrefixes.map((prefix) => {
      const name = `.${prefix}-${key}`

      return name
    })
  }

  const attacheStates = (classNames) => {
    return classNames.map((className) => {
      return states.map((state) => {
        if (state.length !== 0) {
          return `${className}--${state}`
        } else {
          return className
        }
      })
    })
  }

  const themeKeys = Object.keys(theme).filter((the) => {
    return the
  })

  const classNames = []

  for (let i = 0; i < themeKeys.length; i++) {
    const key = themeKeys[i]
    const themeColor = theme[key]
    const createdClassNames = createCssClassNames(key, themeColor)

    classNames.push(createdClassNames)
  }

  const classesWithState = attacheStates(classNames.flat())

  return createStyles(classesWithState)
}
