// create a Todo store
// use the todoTypes as types

import {DarkModeState} from "../types/darkmodeTypes";
import {Todo, TodoState} from "../types/todoTypes"
import {create} from 'zustand'

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (text: string) => set((state) => {
    const id = (Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).toString(16)
    const todos = [...state.todos]
    todos.push({
      text,
      id,
      isCompleted: false,
    })
    return { todos }
  }),
  deleteTodo: (id: string) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  completeTodo: (id: string) => set((state) => {
    const todos = state.todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = true
      }
      return todo
    })

    return { todos }
  }),
}))
