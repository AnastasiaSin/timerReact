import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import './main.global.css';
import { Content } from "./shared/Content";
import { Header } from "./shared/Header";
import { Layout } from "./shared/Layout";
import { MainPage } from "./shared/MainPage";
import { CounterBlock } from "./shared/CounterBlock";
import { TasksBlock } from "./shared/TasksBlock";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StatisticsPage } from "./shared/pages/StatisticsPage";

import store, { persistor } from "./store";
import { Loading } from "./shared/Loading";


function AppComponent() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)

    }, [])


    return (
        <Provider store={store}>
            <PersistGate loading={<Loading/>} persistor={persistor}>
                {mounted && (
                    <BrowserRouter>
                        <Layout>
                            <Header />

                            <Content>
                                <Routes>
                                    <Route path="/" element={
                                        <MainPage>
                                            <TasksBlock />
                                            <CounterBlock />
                                        </MainPage>} />
                                    <Route path="/statistics" element={<StatisticsPage />} />
                                </Routes>
                            </Content>

                        </Layout>
                    </BrowserRouter>
                )}

            </PersistGate>
        </Provider>
    )
}
// export const App = hot(AppComponent)
export const App = hot(() => <AppComponent />)