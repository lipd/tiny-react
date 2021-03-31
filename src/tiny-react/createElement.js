export default function createElement(type, props, ...children) {
  const childElements = [...children].reduce((accu, child) => {
    if (child === false || child === true || child === null) {
      return accu
    } else if (child instanceof Object) {
      accu.push(child)
    } else {
      accu.push(createElement('text', { textContent: child }))
    }
    return accu
  }, [])

  return {
    type,
    props: { ...props, children: childElements },
    children: childElements,
  }
}
