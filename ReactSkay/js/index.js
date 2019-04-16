class SkyscannerWidgetComponent extends React.Component {
  render() {
    return (
      React.createElement("div", {
        ref: e => this.element = e,
        "data-skyscanner-widget": "SearchWidget",
        "data-locale": "en-US",
        "data-params": " ",
        "data-flight-inbound-date": "2019-04-22",
        "data-flight-outbound-date": "2019-4-20",
       "data-origin-name": this.props.origin && `'${this.props.origin}'`,
        "data-destination-name": this.props.destination && `'${this.props.destination}'` || undefined }));


  }
  componentDidMount() {
    skyscanner.widgets.load(() => [this.element]);
  }}


class ExampleApplication extends React.Component {
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", null, "Result for your trip"),
    
      React.createElement(SkyscannerWidgetComponent, { origin: "los angeles", destination: "vancover" })
  ));


  }}


ReactDOM.render(
React.createElement(ExampleApplication, null),
document.getElementById('react-app'));