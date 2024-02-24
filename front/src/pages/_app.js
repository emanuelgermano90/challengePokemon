// Styles
import "../styles/globals.css";

import React from "react";
import App from "next/app";
import RootLayout from "../app/layout"; // Importa tu RootLayout

export default class TailwindApp extends App {

    render() {
        const { Component, pageProps } = this.props;

        return (
            <RootLayout> {/* Envuelve tu aplicación con RootLayout */}
                <Component {...pageProps} />
            </RootLayout>
        );
    }
}
