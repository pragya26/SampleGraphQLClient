import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";


const timer = 2;
let i=0;
const client = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache()
});

function AuthorDetail() {
  const { loading, error, data } = useQuery(gql`
    {
      querySingleAuthor(bookName:"a1" ) {
        bookName
        Author
        NumberOfBook
        email
      }
    }`);

    const [addAuthor] = useMutation(ADD_AUTHOR);
    while(i<timer){
      addAuthor({ variables: { bookName: `SampleBook${i}`,
      Author: `sampleAuthor${i}`,
      NumberOfBook:5,
      email: "email" } });
      i++;
    }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
      <table style={{border:"1px solid"}}>
        <tr>
          <td style={{border:"1px solid"}}>
            {data.querySingleAuthor.bookName}
          </td>
          <td style={{border:"1px solid"}}>
            {data.querySingleAuthor.Author}
          </td>
          <td style={{border:"1px solid"}}>
            {data.querySingleAuthor.NumberOfBook}
          </td>
          <td style={{border:"1px solid"}}>
            {data.querySingleAuthor.email}
          </td>
        </tr>
      </table>
  );
}

const ADD_AUTHOR = gql`
mutation addAuthor(
  $bookName: String!,
  $Author: String!,
  $NumberOfBook:Int!
  $email: String!){
  addAuthor(
    bookName: $bookName,
    Author: $Author,
    NumberOfBook:$NumberOfBook,
    email: $email
   ) {
    bookName
    Author
    NumberOfBook,
    email
  }
}
`;

function App() {
  return (
    <div>
      <h2>Sample apollo client</h2>
      <AuthorDetail />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
