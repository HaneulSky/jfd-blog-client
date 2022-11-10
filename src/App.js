// чтобы запустить проект локально на фронтенде поменять:
// в конфиге значение "apiEndpoint" на "http://localhost:8080/api"
// при деплое поменять обратно на "https://jfd-blog.herokuapp.com/api"
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Main from "./layout/main";
import NotFound from "./layout/notFound";
import Login from "./layout/login";
import AddNewArticleForm from "./components/ui/addNewArticleForm";
import LogOut from "./layout/logOut";
import AdminPage from "./components/pages/adminPage/adminPage";
import Articles from "./layout/articles";
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/ui/navBar/navBar";

function App() {
    return (
        <>
            <NavBar />

            <Switch>
                <ProtectedRoute
                    path="/articles/:articleId?/:edit?"
                    component={Articles}
                />
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login} />
                <Route path="/addArticle" component={AddNewArticleForm} />
                <Route path="/logout" component={LogOut} />
                <ProtectedRoute path="/:userId" component={AdminPage} />
                <Route path="/" exact component={Main} />

                <Redirect to="/404" />
            </Switch>
        </>
    );
}

export default App;
