import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "../components/Intro";
import NotFound from "../components/NotFound"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Memo from "./Memo/Memo"
import TodoList from "./TodoList/Todolist"

function ProjectRouter () {

    function addToHomeScreen() {
      alert("Down Click")
      //@ts-ignore
      window.promptEvent.prompt();
      //@ts-ignore
      window.promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          alert("Ok")
          console.log('User accepted the A2HS prompt')
        } else {
          alert("No")
          console.log('User dismissed the A2HS prompt')
        }
      })
    }
  
    useEffect(() => {
        console.log("Listening for Install prompt");
        alert("beforeinstallprompt")
        window.addEventListener("beforeinstallprompt", (e) => {
          e.preventDefault();
          //@ts-ignore
          window.promptEvent = e;
        });
      }, []);

    return (
        <BrowserRouter>
            <Header />
            <div
                style={{margin:"40px"}}
                onClick={addToHomeScreen}
            >DownLoad Test Button</div>
            <Routes>
                <Route path="/" element={<Intro />}></Route>
                <Route path="/todo" element={<TodoList />}></Route>
                <Route path="/memo" element={<Memo />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default ProjectRouter
