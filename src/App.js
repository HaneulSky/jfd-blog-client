import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Main from "./layout/main";
import NotFound from "./layout/notFound";
import Login from "./layout/login";
import AddNewArticleForm from "./components/ui/addNewArticleForm";
import LogOut from "./layout/logOut";
import AdminPage from "./components/pages/adminPage";
import Articles from "./layout/articles";
import ProtectedRoute from "./components/common/protectedRoute";
import NavBar from "./components/ui/navBar";

function App() {
    console.log(window.outerHeight, window.outerWidth);
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
