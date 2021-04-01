export default function updateNodeElement(
  newElement, // 需要挂载更新的对象
  virtualDOM,
  oldVirtualDOM = {},
) {
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}

  for (let propName in newProps) {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]

    // 只有新值和旧值不同才进行更新
    if (newPropsValue !== oldPropsValue) {
      // 是事件属性
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        newElement.addEventListener(eventName, newPropsValue)
        // 旧事件存在则删除
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }
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

  // 判断属性被删的情况
  for (let propName in oldProps) {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 需要被删
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLocaleLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  }
}
