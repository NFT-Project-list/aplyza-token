import Home from './page/Home';
import BlindBox from './page/BlindBox';
import Presale from './page/Presale';
import NFT from './page/NFT';
import NFTDetail from './page/NFTDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import ConnectButton from "./component/ConnectButton";
import {login,logout} from './reducer/user';
import {connect} from "react-redux";
import {Component} from "react";
import {moralisClient} from "./index";
import Logo from './img/logo.svg';
import QR from './img/frame.png';
import {Image} from "react-bootstrap";
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
      let user = moralisClient.User.current();
      if (user) {
          const address = user.get("ethAddress")
          this.props.dispatch(login({
              address: address.toString()
          }))
      }
  }

  async connect(){
        await moralisClient.authenticate({signingMessage: "Login to Aplyza"})
            .then((user) => {
                const address = user.get("ethAddress")
                this.props.dispatch(login({
                    address: address.toString()
                }))
            }).catch((error) => {
                console.log(error)
            })
  }
  async disconnect(){
    await moralisClient.User.logOut().then(() => {
        this.props.dispatch(logout())
    });
  }
  render() {
    return (
        <Router>
            <Navbar className={"bg-aplyza"} bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <Image src={Logo} height={50} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/presale">Pre-sale</Nav.Link>
                            <Nav.Link href="/blindbox">Blind Box</Nav.Link>
                            <Nav.Link href="/nft">My NFT</Nav.Link>
                            <Nav.Link href="#">Marketplace (Coming Soon)</Nav.Link>
                        </Nav>
                        <div className={"pull-right text-white"}>
                            {
                                (this.props.user!=null)? (<button onClick={()=>{
                                    this.disconnect()
                                }} className={"btn btn-outline-light"}>{this.props.user.address+" (Logout)"}</button>) : <ConnectButton onClick={()=>this.connect()}/>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/blindbox">
                    <BlindBox />
                </Route>
                <Route path="/presale">
                    <Presale />
                </Route>
                <Route exact path="/nft">
                    <NFT />
                </Route>
                <Route path="/nft/detail/:contract/:id" component={NFTDetail}>
                </Route>
            </Switch>
            <div className={"container-fluid"}>
                <div className={"footer"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-sm-6"}>
                                <h3>Project Donation From Aplyzer Angel</h3>
                                <p className={"donation-detail"}>
                                    Receiving Address：0xcaAC892428982B4837b0e84898D8A69887978bb7 <br/>
                                    Accepted Token：Any BEP20 (BSC) <br/>
                                    Preferred Token：APZ <br/>
                                </p>
                                <Image src={QR} className={"qr"} />
                            </div>
                            <div className={"col-sm-6 d-flex flex-column align-items-end"}>
                                <Image src={Logo} className={"pull-right footer-logo"} />
                                <div className={"social-list"}>
                                    <i className="fab fa-telegram social-icon"/>
                                    <i className="fab fa-twitter social-icon"/>
                                    <i className="fab fa-medium social-icon"/>
                                </div>
                                <p className={"copyright"}>
                                    &copy; 2021 Aplyza Game Token
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
  }
}
const mapStateToProps = (state) => (
    {
      ...state.user
    }
)
export default connect(mapStateToProps)(App);
