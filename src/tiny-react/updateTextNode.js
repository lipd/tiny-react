export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    // 更新文本内容
    oldDOM.textContent = virtualDOM.props.textContent
    // 更新 VDOM
    oldDOM._virtualDOM = virtualDOM
  }
}
