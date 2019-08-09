export const findByTestAttr = (component, attr) => {
  return component.find(`[data-test="${attr}"]`)
}


export const findByTestAttrElement = (component, attr, element = 'div') => {
  return component.find(`${element}[data-test="${attr}"]`)
}