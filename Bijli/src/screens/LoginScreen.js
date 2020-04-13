import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image,StatusBar,LayoutAnimation} from 'react-native';


import firebase from 'firebase';

export default class LoginScreen extends React.Component{
    static navigationOptions={
        header:null
    }
    state={
        email:"",
        password:"",
        errorMessage:null
    }
    handleLogin = () => {
        const {email,password}=this.state

        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(error => this.setState({errorMessage:error.message}));
    };
    render(){
        LayoutAnimation.easeInEaseOut();
        return(
            <View>
            <Text style = {styles.header}>Login</Text>
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                {/* <Image source={require("../assets/authHeader.png")} style={{marginTop:-175,marginLeft:-50}}></Image>
                <Image source={require("../assets/authFooter.png")} style={{position:"absolute",bottom:-325,right:-225}}></Image>
                <Image source={require("../assets/loginLogo.png")} style={{marginTop:-110,alignSelf:'center'}}></Image> */}
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input}
                         autoCapitalize="none" 
                         onChangeText={email=>this.setState({email})}
                         value={this.state.email}  />
                    </View>
                    <View styles={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} 
                        autoCapitalize="none" 
                        secureTextEntry={true}
                        onChangeText={password=>this.setState({password})}
                        value={this.state.password} />
                    </View>
                    
                </View>
                <View style={styles.errorMessage}>
                  {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color:"#FFF",fontWeight:"500"}}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:"center",marginTop:32}}
                                  onPress={()=> this.props.navigation.navigate("Register")}>
                    <Text style={{color:"#414595",fontSize:13}}>
                        New to Bijli App?<Text style={{fontWeight:"500",color:"#E9446A"}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        marginTop: 50,
        // flex:1,
   //     justifyContent:'center',
  //      alignItems:'center'
    },
    errorMessage:{
        height:25,
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 10
    },
    error:{
        color:"#E9446A",
        fontSize:10,
        fontWeight:"600",
        textAlign:'center'
    },
    form:{
        marginBottom:50,
        marginHorizontal:30

    },
    inputTitle:{
        color:"#8ABF9E",
        marginTop: 20,
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
    header:{
        marginHorizontal: 20,
        marginTop: 100,
        fontSize: 30,
        fontWeight: "bold",
        // fontFamily: "comic-sans",
    }
});