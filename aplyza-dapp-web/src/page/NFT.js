import React from "react";
import {moralisClient} from "../index";
import {connect} from "react-redux";
import {CHAINID_Main, CONTRACT_NFT} from "../contracts/presale";
import {Image} from "react-bootstrap";
class NFT extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nft: []
        }
    }
    async nft(){
        let user = moralisClient.User.current();
        if (user) {
            const nfts = await moralisClient.Web3API.account
                .getNFTs({ chain: CHAINID_Main, address: user.get('ethAddress') });
            this.state.nft=nfts.result
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
                            <div className={"col-sm-12"}>
                                <h1>Your NFT</h1>
                                <div className={"nft-list"}>
                                {this.state.nft.map(function(object, i){
                                    const data=JSON.parse(object.metadata)
                                    if(data!=null){
                                        if(object.token_address.toLowerCase()===CONTRACT_NFT.toLowerCase()) {
                                            return (<div className={"nft-box"} key={i}>
                                                <Image src={data.image}/>
                                                <br/>
                                                <h4>{data.name}</h4>
                                                <a href={"/nft/detail/" + object.token_address + "/" + object.token_id}
                                                   className={"btn btn-outline-light"}>DETAIL</a>
                                            </div>);
                                        }
                                    }
                                    return (<div key={i}/>)
                                })}
                                </div>
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
export default connect(mapStateToProps)(NFT);
