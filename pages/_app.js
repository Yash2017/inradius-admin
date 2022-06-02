import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo_client";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Login from "./login";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let loggedIn;
  if (typeof window !== "undefined") {
    loggedIn = localStorage.getItem("loggedIn");
  }
  return (
    <>
      <ApolloProvider client={client}>
        {loggedIn === "true" ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Login />
        )}
      </ApolloProvider>
    </>
  );
}

export default MyApp;
