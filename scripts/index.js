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

TinyReact.render(virtualDOM, app)
