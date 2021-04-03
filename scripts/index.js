import TinyReact from '../src/tiny-react'

const app = document.getElementById('app')

const virtualDOM = (
  <div className="container">
    <h1>Hello Tiny React</h1>
    <div className="has-class">
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
  </div>
)

const newVirtualDOM = (
  <div className="container">
    <h1>Hello Tiny React</h1>
    <div className="new-class">
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h1>(观察: 这个已经被改变)</h1>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好!!!!')}>点击我</button>
    2, 3
  </div>
)

const Fnc = ({ title }) => <div>{title} Functional Component</div>

class ClassComponent extends TinyReact.Component {
  state = {
    title: '',
  }

  textInput = null

  constructor(props) {
    super(props)
  }

  setTextInputRef = (ref) => {
    console.log(ref)
    this.textInput = ref
  }

  componentWillMount() {}

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return true
  }

  // DOM 没更新，虚拟 DOM 没有渲染出来
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
  }

  // DOM 已经更新
  componentDidUpdate(prevProps, preState) {
    console.log('componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = () => {
    if (this.textInput) this.textInput.focus()
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
          onInput={this.handleInput}
        />
        <button onClick={this.handleClick}>获取焦点</button>
      </div>
    )
  }
}

class NewClassComponent extends TinyReact.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

// TinyReact.render(<Fnc title="Best" />, app)
TinyReact.render(<ClassComponent />, app)
// setTimeout(() => {
//   TinyReact.render(<ClassComponent title="New" />, app)
// }, 3000)

// TinyReact.render(virtualDOM, app)
// setTimeout(() => {
//   TinyReact.render(newVirtualDOM, app)
// }, 3000)
