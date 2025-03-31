import { createHashRouter, redirect, useLoaderData } from "react-router";
import { useWords } from "./words";
import App from "./App";

const Root = () => {
  useLoaderData<number>();
  return <></>;
}

export const router = createHashRouter([
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
