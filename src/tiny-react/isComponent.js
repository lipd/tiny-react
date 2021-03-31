export default function isComponent(virtualDOM) {
  // class 和 function 的 typeof 结果都是 'function'
  return virtualDOM && typeof virtualDOM.type === 'function'
}
