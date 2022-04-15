const MyReact = (function () {
  const states = [],
    stateSetters = []

  let stateIndex = 0

  const createState = (initState, stateIndex) => {
    return states[stateIndex] === undefined ? initState : states[stateIndex]
  }

  const createStateSetter = stateIndex => {
    return function (newState) {
      if (typeof newState === 'function') {
        states[stateIndex] = newState(states[stateIndex])
      } else {
        states[stateIndex] = newState
      }

      render()
    }
  }

  const useState = initState => {
    states[stateIndex] = createState(initState, stateIndex)
    stateSetters[stateIndex] = createStateSetter(stateIndex)

    const _state = states[stateIndex],
      _setState = stateSetters[stateIndex]

    stateIndex++
    return [_state, _setState]
  }

  const render = () => {
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
  const [name, setName] = useState([])
  return (
    <div id="app">
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(state => state - 1)}>-</button>
      <button
        onClick={() =>
          setName(state => [
            ...state,
            ['张三', '李四', '王麻子', '李沁'][Math.floor(Math.random() * 4)]
          ])
        }>
        增加一组数据
      </button>
      <h1>{count}</h1>
      <ul>
        {name.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
