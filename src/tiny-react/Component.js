import diff from './diff'

export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)

    const virtualDOM = this.render()
    const oldDOM = this.getDOM()
    const container = oldDOM.parentNode

    diff(virtualDOM, container, oldDOM) // 此时 render 函数已经被用户实现
  }

  setDOM(dom) {
    this._dom = dom
  }

  getDOM() {
    return this._dom
  }
}
