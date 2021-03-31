import isComponent from './isComponent'

export default function isFunctionComponent(virtualDOM) {
  // 为了模块的独立性，不假定外部状态
  const type = virtualDOM.type

  return type && isComponent(virtualDOM) && hasNoRender(type)
}

function hasNoRender(type) {
  const hasRender = type.prototype && type.prototype.render
  return !hasRender
}
