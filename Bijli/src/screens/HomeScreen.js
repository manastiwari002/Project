import React , { Component }  from 'react';
import {Text,StyleSheet,View,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import { Card } from 'react-native-elements';
import RNSpeedometer from 'react-native-speedometer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase'
// import firebase from 'firebase';
export default class HomeScreen extends Component{
    state = {
        name:"",
        data: 0,
        fc: 47.48,
        uc: 2.47,
        mc: 40,
        budget: "",
        maxValue: 100,
        show: true,
        rstshow: false,
        budgetValidate: true,
        errorMessage: null
    }
    componentDidMount(){
        const user=firebase.auth().currentUser;
        var ud = user.uid
        var usersRef = firebase.database().ref('Readings');
        usersRef.on('value', (snapshot) => {
            this.setState({
                data: snapshot.val()
            })
        });
        var usersRe = firebase.database().ref('users');
        usersRe.on('value' , (snapshot) => {
          var did = snapshot.val()
          var nm = did[`${ud}`].firstName
          var hor = did[`${ud}`].toHide     //hor is hide or not
          var hor1 = did[`${ud}`].rstshow
          var bud = did[`${ud}`].budget
          var unit = Math.floor((bud - (this.state.fc + this.state.mc))/this.state.uc)
          if(unit>0){
            this.setState({
                maxValue: unit
            })
          }else{
          this.setState({
            name: nm,
            show: hor,
            rstshow: hor1,
            budgetValidate: true,
            budget: bud
          })
        }
        });
    }
    validate(text,type){
        const budget = /^[0-9]+$/
        if(type=='bid'){
            if(budget.test(text)){
                this.setState({
                    budgetValidate: true,
                    budget: text,
                    errorMessage: null
                });
            }
            else{
                this.setState({
                    budgetValidate: false,
                    budget: text
                });
            }
        }
    }
    render(){   
        return(
            <View>
                <ScrollView>
                    <View style={styles.top}>
                        <Ionicons name='ios-contact' size={30} style={styles.icon}/> 
                        <Text style ={styles.heading}>Hi <Text style={styles.bld}>{this.state.name}</Text>,</Text>
                    </View>
                    <Card title="Energy Readings">
                        <RNSpeedometer 
                            value = {this.state.data}
                            maxValue = {this.state.maxValue}
                            size={350}
                        />
                        <View style = {styles.displayBill}>
                            <Text>Total Units Consumed:</Text>
                            <Text>{this.state.data}</Text>
                        </View>
                        <Text style={{textAlign:"center",marginTop:-20}}>{this.state.data > this.state.maxValue ?<Text style={{color:"red",}}>Limit Exceeded!!</Text> : null}</Text>
                        {this.state.rstshow?<View style = {{flexDirection: "row",justifyContent:"space-between"}}>
                            <Text>Budget Units:</Text>
                            <Text>{this.state.maxValue}</Text>
                        </View>:null}
                    </Card>
                    <Card title="Set Budget">
                        <View style={styles.errorMessage}>     
                            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                        </View>
                    {this.state.show ? 
                        <View>
                            <TextInput style={[styles.input,!this.state.budgetValidate ? styles.errorline : null]} 
                            autoCapitalize="none" 
                            onChangeText={(text)=>this.validate(text,'bid')}
                            value={this.state.budget}
                            placeholder="₹ Enter amount Here"
                            />
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                if(this.state.budgetValidate===true && (this.state.budget.length>0 && this.state.budget.length<=4)){
                                    const user = firebase.auth().currentUser;
                                    firebase.database().ref('users/' + user.uid).update({
                                        budget: this.state.budget,
                                        toHide: false,
                                        rstshow: true,
                                        maxValue: this.state.maxValue
                                    })
                                    this.setState({
                                        show: false,
                                        budget: "",
                                        rstshow: true,
                                        errorMessage: null,
                                        budget: this.state.budget
                                    })
                                }else{
                                    var err = "Please Enter a valid value for setting budget"
                                    this.setState({
                                        errorMessage: err
                                    })
                                }}}
                            >
                                <Text style={styles.textStyle}>Set Budget</Text>
                            </TouchableOpacity>
                        </View>
                    :null}
                    {this.state.rstshow ?
                         <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                            const user = firebase.auth().currentUser;
                            firebase.database().ref('users/' + user.uid).update({
                                toHide: true,
                                rstshow:false
                            })
                            this.setState({
                                show: true,
                                rstshow: false
                            })
                        }}>
                            <Text style={styles.textStyle}>Reset Budget</Text>
                        </TouchableOpacity>
                    :null}
                        </Card>
                    <Card title="Total Consumption">
                        <View style={styles.displayBills}>
                            <Text style={{color: "#202646"}}>Fixed Charges:</Text>
                            <Text >₹{this.state.fc}</Text>
                        </View>
                        <View style={styles.displayBills}>
                            <Text style={{color: "#202646"}}>Unit Charges</Text>
                            <Text >₹{this.state.uc}</Text>
                        </View>
                        <View style={styles.displayBills}>
                            <Text style={{color: "#202646"}}>Consumed Unit Charge({this.state.data} * ₹2.47)</Text>
                            <Text >₹{(this.state.data * this.state.uc)}</Text>
                        </View>
                        <View style={styles.displayBills}>
                            <Text style={{color: "#202646"}}>Miscellaneous Charges:</Text>
                            <Text >₹{this.state.mc}</Text>
                        </View>
                        <View style={styles.displayBills}>
                            <Text style={{fontSize:20,color:"red",fontFamily:"sans-serif",fontWeight:"bold",marginTop: 10}}>Total Charges</Text>
                            <Text style={{marginTop: 10,fontSize: 20,color:"red",fontWeight:"bold"}}>₹{(this.state.fc + this.state.uc + (this.state.data * this.state.uc) + this.state.mc).toFixed(2)}</Text> 
                        </View>
                        <View style={styles.displayBills}>
                            <Text style={{fontSize:20,color:"green",fontFamily:"sans-serif",fontWeight:"bold",marginTop: 10}}>Budget Amount:</Text>
                            <Text style={{marginTop: 10,fontSize: 20,color:"green",fontWeight:"bold"}}>₹{this.state.budget}</Text> 
                        </View>
                        {(this.state.fc + this.state.uc + (this.state.data * this.state.uc) + this.state.mc) < this.state.budget ?<View style={styles.displayBills}>
                            <Text style={{fontSize:20,color:"green",fontFamily:"sans-serif",fontWeight:"bold",marginTop: 10}}>Total Amount Left:</Text>
                            <Text style={{marginTop: 10,fontSize: 20,color:"green",fontWeight:"bold"}}>₹{(this.state.budget-(this.state.fc + this.state.uc + (this.state.data * this.state.uc) + this.state.mc)).toFixed(2)}</Text> 
                        </View>: <View style={styles.displayBills}>
                            <Text style={{fontSize:20,color:"red",fontFamily:"sans-serif",fontWeight:"bold",marginTop: 10}}>Total Amount Left:</Text>
                            <Text style={{marginTop: 10,fontSize: 20,color:"red",fontWeight:"bold"}}>-₹{(Math.abs(this.state.budget-(this.state.fc + this.state.uc + (this.state.data * this.state.uc) + this.state.mc))).toFixed(2)}</Text> 
                        </View>}
                    </Card>
                </ScrollView>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    icon: {
        marginTop: 10,
        marginLeft: 10
    },
    top: {
        flexDirection: "row",
        alignItems: "flex-start" 
    },
    heading:{
        marginTop: 7,
        marginLeft: 10,
        fontSize: 25
    },
    bld:{
        fontWeight: "bold"
    },
    buttonStyle: {
        margin: 20,
          padding:10,
          backgroundColor: 'rgb(250,98,122)',
          borderRadius:5
        },
    textStyle: {
        fontSize:20,
        color: '#ffffff',
        textAlign: 'center'
    },
    input:{
        borderBottomColor:"#fe5196",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"#161F3D"
    },
    errorline: {
        borderBottomColor:"red",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"red"
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:'center'

    },
    errorMessage:{
        height:25,
        alignItems:'center',
        justifyContent:'center'
    },
    displayBill:{
        height: 50,
        marginTop: 60,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    displayBills:{
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
});