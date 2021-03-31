export default function updateNodeElement(newElement, virtualDOM) {
  const newProps = virtualDOM.props
  for (let propName in newProps) {
    const newPropsValue = newProps[propName]

    // 是事件属性
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2)
      newElement.addEventListener(eventName, newPropsValue)
    }
    // 需要赋值到 VDOM 上的属性
    else if (propName === 'value' || propName === 'checked') {
      newElement[propName] = newPropsValue
    }
    // 普通属性
    else if (propName !== 'children') {
      if (propName === 'className') {
        newElement.setAttribute('class', newPropsValue)
      } else {
        newElement.setAttribute(propName, newPropsValue)
      }
    }
  }
}
