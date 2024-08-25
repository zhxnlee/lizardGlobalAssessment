
import Root from "./Root";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import PostDetail from "./PostDetail";


import styles from "./App.module.css";
function App() {

  const router = createBrowserRouter([
    {path: '/', element: <Root/> },
    { path: '/posts/:id', element: <PostDetail /> },
  ])

  return <div className = {styles.container} >{
    
    <RouterProvider router = {router}/>
    /* Complete the exercise here. */}</div>;
}

export default App;
