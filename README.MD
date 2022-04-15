## 前言

> 该系列为用自己的理解手写实现 React-hooks 的一些基本 hooks，包括但不限于`useState`、`useEffect`、`useMemo`等等

```react
const MyReact = (function () {
  const states = [],
    stateSetters = []

  let stateIndex = 0

  function createState(initState, stateIndex) {
    return states[stateIndex] !== undefined ? states[stateIndex] : initState
  }

  function createStateSetter(stateIndex) {
    return function (newState) {
      if (typeof newState === 'function') {
        states[stateIndex] = newState(states[stateIndex])
      } else {
        states[stateIndex] = newState
      }

      render()
    }
  }

  function useState(initState) {
    states[stateIndex] = createState(initState, stateIndex)

    if (!stateSetters[stateIndex]) {
      stateSetters.push(createStateSetter(stateIndex))
    }

    const _state = states[stateIndex],
      _setState = stateSetters[stateIndex]

    stateIndex++

    return [_state, _setState]
  }

  function render() {
    stateIndex = 0
    ReactDOM.render(<App />, document.getElementById('app'))
  }

  return {
    useState
  }
})()

const { useState } = MyReact

function App() {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)
  return (
    <div>
      <span>{count}</span>
      <h1>{flag ? '打开' : '关闭'}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(state => state - 1)}>-</button>
      <button onClick={() => setFlag(state => (state = !state))}>切换状态</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

```

> useEffect

