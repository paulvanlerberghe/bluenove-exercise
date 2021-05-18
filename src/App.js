import React from "react";
import "./App.css";

import MessageList from "./components/MessageList/MessageList";
import MessageForm from "./components/MessageForm/MessageForm";

//import translate from "translate";

const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;


class App extends React.Component {
  constructor(props) {
    super(props);
    
    //let's populate our state with some messages
    this.state = {
      //can be "off", "en", or "fr"
      translateMode: "off",
      pending: false,
      username: "Jack",
      messages: [
        {
          author: "John",
          date: new Date(1621257595841),
          text: "Bonjour !",
        },
        {
          author: "Jack",
          date: new Date(1621257666260),
          text: "Goodbye.",
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(text, translateMode) {
    //handle the message typed by the user and translate it if necessary 
    const url = `https://translation.googleapis.com/language/translate/v2`;
    const target = translateMode;
    const source = translateMode === "en" ? "fr" : "en";

    let data = new URLSearchParams();
    data.append("q", text);
    data.append("target", target);
    data.append("source", source);
    data.append("key", apiKey);

    const options = {
      method: `POST`,
      body: data
    };

    this.setState({pending: true}, () => {
      fetch(url, options)
        .then(response => response.json())
        .then(response => {

          this.setState({
            pending: false,
            //let's keep immutable...
            messages: [
              ...this.state.messages,
              {
                author: this.state.username,
                date: new Date(),
                text: response.data.translations[0].translatedText,
              },
            ],
          });
        })
        // catch any error in the network call.
        .catch(error => {
          this.setState({
            pending: false,
            //show error returned by google if necessary
            messages: [
              ...this.state.messages,
              {
                author: "Système",
                date: new Date(),
                text: `ERROR GOOGLE TRAD: ${error}`,
              },
            ],
          });
        });
    });
  }

  render() {
    const { messages, pending } = this.state;

    return (
      <div>
        <MessageList messages={messages} />
        <MessageForm onHandleSubmit={this.handleSubmit} pending={pending} />
      </div>
    );
  }
}

export default App;
