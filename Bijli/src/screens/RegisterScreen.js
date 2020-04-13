import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image,StatusBar, NativeMethodsMixin} from 'react-native';
// import {Ionicons} from '@expo/vector-icons'

import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class RegisterScreen extends React.Component{
    static navigationOptions={
        header:null
    }
    state={
        name:"",
        email:"",
        password:"",
        cid:"",
        cidValidate: true,
        nameValidate: true,
        emalValidate: true,
        errorMessage:null
    }
    handleSignup = () => {
        if(this.state.cid.length>12){
            this.setState({
                cidValidate: false
            })
        }
        if(this.state.cidValidate===true && this.state.nameValidate===true && this.state.emalValidate===true && this.state.cid.length===12){
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then((res) => {
                firebase.database().ref('users/' + res.user.uid).set({
                    firstName: this.state.name,
                    email: this.state.email,
                    cid: this.state.cid,
                    budget:0,
                    maxValue: 100,
                    rstshow: false,
                    toHide: true
                })
            })
        }else{
            if(this.state.nameValidate === false){
                var err = "Cannot Register Consumer Please check your Name"
                this.setState({
                    errorMessage: err
                })
            }
            else if(this.emalValidate === false){
                var err = "Cannot Register Consumer Please check your Emails"
                this.setState({
                    errorMessage: err
                })
            }
            else{
                var err = "Cannot Register Consumer Please Check Consumer ID (It should be 12 digits)"
                this.setState({
                    errorMessage: err
                })
            }
        }
    };
    validate(text,type){
        const alph = /^[a-zA-Z ]+$/
        const emal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const cid = /^[0-9]+$/
        if(type=='username'){
            if(alph.test(text)){
                this.setState({
                    nameValidate: true,
                });
                this.setState({
                    name: text,
                });
                this.setState({
                    errorMessage: null,
                })
            }
            else{
                this.setState({
                    nameValidate: false,
                });
                this.setState({
                    name: text,
                });
            }
        }
        else if(type=='email'){
            if(emal.test(text)){
                this.setState({
                    emalValidate: true,
                });
                this.setState({
                    email: text,
                });
                this.setState({
                    errorMessage: null,
                })
            }
            else{
                this.setState({
                    emalValidate: false,
                });
                this.setState({
                    email: text,
                });
            }
        }
        else if(type=='cid'){
            if(cid.test(text) && text.length<=12){
                this.setState({
                    cidValidate: true,
                });
                this.setState({
                    cid: text,
                });
                this.setState({
                    errorMessage: null,
                })
            }
            else{
                this.setState({
                    cidValidate: false,
                });
                this.setState({
                    cid: text,
                });
            }
        }
    }
    render(){
        return(
            <View>
                <Text style = {styles.header}>Register</Text>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.errorMessage}>     
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                        </View>
                        <View style={styles.form}>
                            <View>
                                <Text style={styles.inputTitle}>Name</Text>
                                <TextInput style={[styles.input,!this.state.nameValidate ? styles.errorline : null]}
                                    autoCapitalize="none" 
                                    onChangeText={(text)=>this.validate(text,'username')}
                                    value = {this.state.name}
                                />  
                            </View>
                            <View style={{marginTop:32}}>
                                <Text style={styles.inputTitle}>Email Address</Text>
                                <TextInput style={[styles.input,!this.state.emalValidate ? styles.errorline : null]}
                                autoCapitalize="none" 
                                onChangeText={(text)=>this.validate(text,'email')}
                                value = {this.state.email}
                                />
                            </View>
                            <View style={{marginTop:32}}>
                                <Text style={styles.inputTitle}>Consumer ID</Text>
                                    <TextInput style={[styles.input,!this.state.cidValidate ? styles.errorline : null]}
                                    autoCapitalize="none" 
                                    onChangeText={(text)=>this.validate(text,'cid')}
                                    value = {this.state.cid}
                                />
                            </View>
                            <View style={{marginTop:32}}>
                                <Text style={styles.inputTitle}>Password</Text>
                                <TextInput style={styles.input} 
                                    autoCapitalize="none" 
                                    secureTextEntry={true}
                                    onChangeText={password=>this.setState({password})}
                                    value={this.state.password}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
                            <Text style={{color:"#FFF",fontWeight:"500"}}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignSelf:"center",marginTop:32}}
                                        onPress={()=> this.props.navigation.navigate("Login")}>
                            <Text style={{color:"#414595",fontSize:13}}>
                                Already have an account?<Text style={{fontWeight:"500",color:"#E9446A"}}>Sign in</Text>
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        // flex:1,
        marginTop: 30,
   //     justifyContent:'center',
  //      alignItems:'center'
    },
    errorMessage:{
        height:25,
        alignItems:'center',
        justifyContent:'center'
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:'center'

    },
    form:{
        marginBottom:50,
        marginHorizontal:30
    },
    inputTitle:{
        color:"#8ABF9E",
        fontSize:10,
        textTransform:'uppercase'
    },
    input:{
        borderBottomColor:"#8ABF9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:'#E9446A',
        borderRadius:5,
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    back:{
        position:"absolute",
        top:48,
        left:32,
        width:32,
        height:32,
        borderRadius:16,
        alignItems:"center",
        justifyContent:"center"
    },
    plus:{
        width:100,
        height:100,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:48
    },
    errorline: {
        borderBottomColor:"red",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"red"
    },
    header:{
        marginHorizontal: 20,
        marginTop: 40,
        fontSize: 30,
        fontWeight: "bold",
        // fontFamily: "comic-sans",
    }
});