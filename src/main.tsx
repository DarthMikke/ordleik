import {
  createHashRouter,
  redirect,
  RouterProvider,
  useLoaderData,
} from "react-router";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { useWords } from "./words.ts";
import App from './App.tsx'


const Root = () => {useLoaderData<number>();
  return <></>;
}

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    loader: (() => {
      const wordList = useWords();
      const gameId = Math.floor(Math.random()*(wordList.length - 1));
      console.debug("Redirecting to ", gameId);
      return redirect(`${gameId}`);
    })
  },
  {
    path: "/:word",
    element: <App />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
