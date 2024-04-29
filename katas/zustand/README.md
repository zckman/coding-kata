# Welcoe to the Zustand Coding Kata
Let's have a look at how Zustand state management works in react.
## Why state management?
* **Centralized Data**
    All your app's data is in one place. Easier to manage changes in different parts of the app.
* **Consistency**
  UI stays consistent across all components. When data changes the UI updates everywhere it's needed at the same time.
* **Debugging Ease**
  Easier to trace changes and bugs, as you can see data changes over time.
* **Performance Optimisation**
  Reduces unnecessary data processing and rerendering. Your app will run faster and smoother.

But first, what is Zustand?
## Zustand state management
[Here's](https://github.com/pmndrs/zustand) the git repo. If you're interested, [here's](https://codesandbox.io/p/devbox/demo-2jzd2g?file=%2Findex.html) a small demo.

The idea behind zustand is to manage global state in react in all your react files. This makes the global state accessible both in React components and JS files. Zustand also can inform your components without causing a rerender.
Zustand also deals with common pitfalls like react concurrency, context loss and zombie child problem. It also has minimalistic boilerplate and is un-opinionated.

Let's have a look at how it works.
## How it works
### Step 1 - Create a store
Every store is a hook. Use either primitives, objects or functions. Use the set function to merge states.
```js
import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
```
### Step 2 - Use the hook
Now you can use the hook without any providers. The component will only rerender on state change.
```js
function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```




## Get started

In the project directory, you can run:

### `npm start`


