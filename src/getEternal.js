import React, { Component } from 'react'
import './App.css';
import './table.css';


class GetEternal extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            mp: 0,
            workers: 0,
            eternalPrice: 0,
            updateTimer: 0,
            minepower: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
            planets: ["Odrocury","Thabbiter","Pulmeron","Ecryria","Searus","Gemia","Malphus","Neuter","Grarvis 022","Sorth 33A5","Dutrabos","Lustronides","Zullosie","Yimagua","Haostea","Kongebro","Vuruturn","Droxuyama","Miuq I11","Zapus 5M0","Begelia","Gochimars","Konvides","Donvillon","Ania","Aenerth","Tachiron","Cichurilia","Gagua 07","Sector G"],
            oracle_adjustment: [1,2,3,4.125,5.25,6.5,7.75,9,10.25,11.625,14.375,16.125,18,19.875,22.375,24.125,26.5,28.875,31.375,34,44.5,48.5,52.75,57.25,62,67.125,72.5,78.25,84.25,90.75],
            worker_count: [2,2,3,4,4,6,7,8,9,10,11,12,12,13,13,14,14,15,15,16,17,18,19,20,21,22,23,24,25,26],
            success_chance: [0.88,0.86,0.84,0.82,0.80,0.78,0.76,0.74,0.72,0.70,0.68,0.66,0.64,0.62,0.60,0.58,0.56,0.54,0.52,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50],
            visibilityNormal: "",
            visibilityVeteran: "d-none",
            sheetType: "Normal"
        }
        
        this.setMP = this.setMP.bind(this);
        this.setWorkers = this.setWorkers.bind(this);
    }

    async loadData(){
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=cryptomines-eternal&vs_currencies=usd"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({eternalPrice: data["cryptomines-eternal"]["usd"]})
        console.log(data);
    }

    async componentDidMount() {
        this.loadData()
        this.updateTimer = setInterval(() => this.loadData(), 2000);
    }

    async componentWillUnmount() {
        clearInterval(this.updateTimer);
    }


    // Normal

    getMinePower(i){
        return this.state.minepower[i]
    }

    getMineETL(i){
        return parseFloat(this.getMineUSD(i)/this.state.eternalPrice).toFixed(3)
    }

    getMineUSD(i){
        return parseFloat(5.0 * this.state.oracle_adjustment[i]).toFixed(2)
    }

    getSuccessChance(i){
        return parseFloat(this.state.success_chance[i] * 100).toFixed(0)
    }

    getRewardsVersusSuccess(i){
        return parseFloat(this.getMineUSD(i)*7 * this.state.success_chance[i]).toFixed(2)
    }

    getContractCost(i){
        return parseFloat(((7*this.state.worker_count[i])/this.state.eternalPrice)).toFixed(3)
    }

    getNetProfit(i){
        return parseFloat(this.getRewardsVersusSuccess(i) - (this.state.worker_count[i]*7)).toFixed(2)
    }
    
    // Veteran
    getVetContractCost(){
        return parseFloat(((7*this.state.workers)/this.state.eternalPrice)).toFixed(3)
    }
    getVetRewardsVersusSuccess(i){
        return parseFloat(this.getMineUSD(i)*7 * this.getMPvsSRforNET(i) / 100).toFixed(2)
    }
    getMPvsSR(i){
        if (this.state.mp > 4899) {
            return '88%'
        } else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return '88%'
            } else if (answer < 50 || this.state.mp < this.state.minepower[i]){
                return 'Not Enough MP'
            } else {
                return answer+'%'
            }
        } else if (this.state.mp < 1500) {
            return this.getSuccessChance(i)+'%'
        }
    }
    //Cloned MP vs SR to use for NetProfit Calculation
    getMPvsSRforNET(i){
        if (this.state.mp > 4899) {
            return 88
        } else if (this.state.mp > 1499 && this.state.mp < 4900) {
            const diff = this.state.mp - this.getMinePower(i);
            const divi = Math.floor(diff/50);
            const answer = parseFloat(this.state.success_chance[i] * 100 + divi).toFixed(0);
            if (answer > 88){
                return '88'
            } else if ( answer < 50){
                return 'Not Enough MP'
            } else {
                return answer
            }
        } else if (this.state.mp < 1500) {
            return this.getSuccessChance(i)
        }
    }

    getAdjustedNetProfit(i){
        return parseFloat(((this.getMineUSD(i)*7) * (this.getMPvsSRforNET(i)/100)) - (this.state.workers*7)).toFixed(2)
    }

    setMP(event){
        this.setState({mp : event.target.value})
    }

    setWorkers(event){
        this.setState({workers: event.target.value})
    }

    btnVisNrm = () => {
        this.setState({visibilityNormal: "", visibilityVeteran: "d-none", sheetType:"Normal Sheet"})
    }
    btnVisVet = () => {
        this.setState({visibilityVeteran: "", visibilityNormal: "d-none", sheetType:"Veteran/Input Sheet"})
    }

    render(){
        return(
            <div class="container-fixed mx-5">
                <div class="container-fluid mx-2">
                    <div class="container-fluid">
                        <div class="row align-items-start border border-2 border-dark"> 
                            <p class="col-4 getEternalHeader mt-3"> <b>USD/ETL</b> -{'>'} <span class="text-primary">{this.state.eternalPrice}</span></p>
                            <p class="col-4 getEternalHeader mt-3"> <b>Contract (7 Days) / Worker</b> -{'>'} <span class="text-primary">{parseFloat(7/this.state.eternalPrice).toFixed(3)} ETL</span> </p>
                            <p class="col-4 getEternalHeader mt-3"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.eternalPrice).toFixed(3)} ETL</span> </p>
                        </div>
                    </div>

                    <div class="my-3 row">
                        <div class="col-3 row">
                            <div class="col-3">
                                <button type="button" class="btn btn-primary" onClick={this.btnVisNrm}>Normal</button>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-secondary" onClick={this.btnVisVet}>Input MP</button>
                            </div>
                            <div class="col-5">
                                <p class="text-center mt-2">{this.state.sheetType}</p>
                            </div>
                        </div>
                        <div class="col-9 row">
                            <div class="col-1 pt-2">
                                <p class="text-left">MP:</p>
                            </div>
                            <div class="col-2">
                                <input type="text" class="input-group-text" onChange={this.setMP}></input>
                            </div>
                            <div class="col-1 pt-2">
                                <p class="text-left">Workers:</p>
                            </div>
                            <div class="col-2">
                                <input type="text" class="input-group-text" onChange={this.setWorkers}></input>
                            </div>
                    
                            
                        </div>
                    </div>

                    <div id="normal" class={this.state.visibilityNormal}>
                        <table>
                            <tr class="border border-dark">
                                <th class="border border-2 border-dark">#</th>
                                <th class="border border-2 border-dark">Planet</th>
                                <th class="border border-2 border-dark">MP</th>
                                <th class="border border-2 border-dark">Oracle Reward Multiplier</th>
                                <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                <th class="border border-2 border-dark">Mine Reward (USD)</th>
                                <th class="border border-2 border-dark">Success Rate (SR)</th>
                                <th class="border border-2 border-dark">7 Day Reward (USD) vs SR</th>
                                <th class="border border-2 border-dark">Est. Workers</th>
                                <th class="border border-2 border-dark">Worker Contract Upkeep / 7d </th>
                                <th class="border border-2 border-dark">Net Profit / 7d</th>
                            </tr>
                            {/* Normal */}
                            {(() => {
                                const print = [];
                                for (let i=0; i<30; i++){
                                    print.push(
                                        <tr>
                                            <td class="border border-secondary">{i+1}</td>
                                            <td class="border border-secondary">{this.state.planets[i]}</td>
                                            <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                            <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                            <td class="border border-secondary text-primary">{this.getMineETL(i)} ETL</td>
                                            <td class="border border-secondary">${this.getMineUSD(i)}</td>
                                            <td class="border border-secondary text-secondary"><b>{this.getSuccessChance(i)}%</b></td>
                                            <td class="border border-secondary">${this.getRewardsVersusSuccess(i)}</td>
                                            <td class="border border-secondary">{this.state.worker_count[i]}</td>
                                            <td class="border border-secondary text-primary">{this.getContractCost(i)} ETL</td>
                                            <td class="border border-secondary">${this.getNetProfit(i)}</td>
                                        </tr>
                                    )
                                }
                                return print
                            })()}
                            </table>
                        </div>

                        <div id="veteran" class={this.state.visibilityVeteran}>
                            <table>
                                <tr class="border border-dark">
                                    <th class="border border-2 border-dark">#</th>
                                    <th class="border border-2 border-dark">Planet</th>
                                    <th class="border border-2 border-dark">MP</th>
                                    <th class="border border-2 border-dark">Oracle Reward Multiplier</th>
                                    <th class="border border-2 border-dark">Mine Reward (ETL)</th>
                                    <th class="border border-2 border-dark">Mine Reward (USD)</th>
                                    <th class="border border-2 border-dark">Success Rate (SR)</th>
                                    <th class="border border-2 border-dark">7 Day Reward (USD) vs SR</th>
                                    <th class="border border-2 border-dark">Est. Workers</th>
                                    <th class="border border-2 border-dark">Worker Contract Upkeep / 7d </th>
                                    <th class="border border-2 border-dark">Net Profit / 7d</th>
                                </tr>
                                {/* Veteran */}
                                {(() => {
                                    const print = [];
                                    for (let i=0; i<30; i++){
                                        print.push(
                                            <tr>
                                                <td class="border border-secondary">{i+1}</td>
                                                <td class="border border-secondary">{this.state.planets[i]}</td>
                                                <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                                <td class="border border-secondary gray">{parseFloat(this.state.oracle_adjustment[i]).toFixed(3)}</td>
                                                <td class="border border-secondary text-primary">{this.getMineETL(i)} ETL</td>
                                                <td class="border border-secondary">${this.getMineUSD(i)}</td>
                                                <td class="border border-secondary text-secondary"><b>{this.getMPvsSR(i)}</b></td>
                                                <td class="border border-secondary">${this.getVetRewardsVersusSuccess(i)}</td>
                                                <td class="border border-secondary">{this.state.workers}</td>
                                                <td class="border border-secondary text-primary">{this.getVetContractCost()} ETL</td>
                                                <td class="border border-secondary">${this.getAdjustedNetProfit(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>
                        </div>


                        <div class="row align-items-start mt-2">
                            <div class="col-6">
                                <p class="disclaimer">
                                Disclaimer: ORM Matrix is based on observation and not actual value (unless the devs gives us the Data).
                                <br/>
                                All values are approximation and should only be used as a template. ETL/USD updates are every 2 seconds.
                                <br/>
                                Mobile View is currently non-existent. You have been warned. <strike>I'll get back to it if I'm not busy.</strike>
                                </p>
                                
                            </div>
                            <div class="col-6">
                                <p class="credits text-info">
                                Original Sheet and ORM Matrix by: Discord@starl3xx#2691
                                <br/>
                                Made by: Discord@Jucci#0007
                                <br/>
                                Found bugs? Want to help? Send us a message.
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default GetEternal
