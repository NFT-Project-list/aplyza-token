import React from "react";
import {moralisClient} from "../index";
import {connect} from "react-redux";
import {ABI_blindbox, ABI_SS_Character_Detail, CHAINID_Main, CONTRACT_NFT} from "../contracts/presale";
import {Image} from "react-bootstrap";
import raid from '../img/raid.png'

class NFTDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nft: null,
            stats: []
        }
    }
    async nft(){
        let user = moralisClient.User.current();
        if (user) {
            const options = { address: this.props.match.params.contract, token_id: this.props.match.params.id, chain: CHAINID_Main };
            const tokenIdMetadata = await moralisClient.Web3API.token.getTokenIdMetadata(options);
            this.state.nft=tokenIdMetadata;
            this.state.nft.parsed=JSON.parse(tokenIdMetadata.metadata);
            this.setState(this.state)
            const web3 = await moralisClient.enableWeb3();
            await moralisClient.switchNetwork(CHAINID_Main);
            const contract = new web3.eth.Contract(ABI_SS_Character_Detail, CONTRACT_NFT);
            this.state.stats=await contract.methods.getCharacterStats(this.props.match.params.id).call();
            this.setState(this.state)
        }
    }
    componentDidMount() {
        this.nft();
    }
    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"header"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-sm-12"}>
                                <h1>Aplyza is The Future Game Token</h1>
                                <h5>
                                    Decentralize Meme Coin ,
                                    Blockchain Game Portal <br/>
                                    And Play to Earn Ecosystem
                                </h5>
                                <h5>
                                    Make Game Not Only For Fun But Also Can Make Money
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"countdown"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-sm-6"}>
                                { (this.state.nft!=null)? (<div className={"nft-box-detail"}>
                                    <Image src={this.state.nft.parsed.image}/>
                                    <br/>
                                    <h4>{this.state.nft.parsed.name}</h4>
                                    <p>
                                        {this.state.nft.parsed.description}
                                    </p>
                                </div>) : <div/> }
                            </div>
                            <div className={"col-sm-6"}>
                                { (this.state.stats.length>0)? (<div className={"nft-stats-detail"}>
                                    <div className={"row"}>
                                        <div className={"col-sm-12"}>
                                            <h1>DETAIL STATS</h1>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h5>Strength</h5>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h4>{this.state.stats[0]}</h4>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h5>Agility</h5>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h4>{this.state.stats[1]}</h4>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h5>Speed</h5>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h4>{this.state.stats[2]}</h4>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h5>Intelegence</h5>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h4>{this.state.stats[3]}</h4>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h5>Defendse</h5>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h4>{this.state.stats[4]}</h4>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h5>EXP Earn</h5>
                                        </div>
                                        <div className={"col-sm-6"}>
                                            <h4>{this.state.stats[5]}</h4>
                                        </div>
                                    </div>
                                </div>) : <div/> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        ...state.user
    }
)
export default connect(mapStateToProps)(NFTDetail);
