import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import ViedoUploadPage from "./views/ViedoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import MelonChartPage from "./views/MelonChartPage/MelonChartPage";
import BoardUploadPage from "./views/BoardUploadPage/BoardUploadPage";
import BoardPage from "./views/BoardPage/BoardPage"; 
import BoardDetailPage from "./views/BoardDetailPage/BoardDetailPage"; 


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />   
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/board" component={Auth(BoardPage)}/>
          <Route exact path="/board/upload" component={Auth(BoardUploadPage)} />
          <Route exact path="/board/:boardId" component={Auth(BoardDetailPage)} />
          <Route exact path="/video/upload" component={Auth(ViedoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage,null)} />
          <Route exact path="/melonchart" component={MelonChartPage}/>
        </Switch>
      </div>

    </Suspense>
  );
}

export default App;
