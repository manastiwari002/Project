
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from 'firebase';

const iconSize = 20;

export default class UserProfileView extends Component {
  //const[data,update] = useState(0);
    state={
        email:"",
        name:"",
        cid:"",
        id:"",
        uid:""
    }
    componentDidMount(){
        const user=firebase.auth().currentUser;
        var ud = user.uid
        this.setState({
          uid: ud
        })
        var usersRe = firebase.database().ref('users');
        usersRe.on('value' , (snapshot) => {
          var did = snapshot.val()
          var cd = did[`${ud}`].cid
          var nm = did[`${ud}`].firstName
          var emal = did[`${ud}`].email
          this.setState({
            cid: cd,
            email: emal,
            name: nm
          })
        });
    }
    signOutUser=()=>{
        firebase.auth().signOut();
    };

  render(){
    return(
        <View style={styles.container}>
        {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
        {/* <Header title={"Profile"} renderMenu={true} navigation={this.props.navigation} /> */}
        <View style={styles.topContainer}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#f77062", "#fe5196"]}
                style={styles.gradientView}
                pointerEvents="none"
            />
            <Text style={styles.title}>{this.state.name.toUpperCase()}</Text>
            <Text style={styles.email}>{this.state.email}</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={this._onPressPorfilePic} activeOpacity={0.8}>
                <Image style={styles.image} source={require("../assests/User-icon.png")} />
            </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
        <ScrollView>
            <View style={styles.itemView}>
                <View style={styles.fab}>
                    <Ionicons style={styles.fabIcon} size={iconSize} name={"ios-speedometer"} color="#2196f3" />
                </View>
                <View style={styles.textsView}>
                    <Text style={styles.textTitle}>Consumer ID</Text>
                    <Text style={styles.textDescription}>{this.state.cid}</Text>
                </View>
            </View>
            <View style={styles.itemView}>
                <View style={styles.fab}>
                    <Ionicons style={styles.fabIcon} size={iconSize} name={"ios-person"} color="#009688" />
                </View>
                <View style={styles.textsView}>
                    <Text style={styles.textTitle}>Name</Text>
                    <Text style={styles.textDescription}>{this.state.name}</Text>
                </View>
            </View>
            <View style={styles.itemView}>
              <Text style={{marginLeft:20,fontSize:20}}>Help</Text>
            </View>
            <View style={styles.itemView}>
                <View style={styles.fab}>
                    <Ionicons style={styles.fabIcon} size={iconSize} name={"ios-mail"} color="#ff9800" />
                </View>
                <View style={styles.textsView}>
                    <Text style={styles.textTitle}>Bijli Help</Text>
                    <Text style={styles.textDescription}>bijli@gmail.com</Text>
                </View>
            </View>
            <View style={styles.itemView}>
                <View style={styles.fab}>
                    <Ionicons style={styles.fabIcon} size={iconSize} name={"ios-call"} color="#9c27b0" />
                </View>
                <View style={styles.textsView}>
                    <Text style={styles.textTitle}>Help Desk</Text>
                    <Text style={styles.textDescription}>+91-9561990181</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.signOutUser}>
			        <Text style={styles.textStyle}>Logout</Text>
		        </TouchableOpacity>
          </ScrollView>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: "column"
},
  topContainer: {
  height: "34%",
  flexDirection: "column"
},
  title: {
  fontSize: 22,
  fontWeight: "bold",
  color: "white",
  marginTop: 32,
  marginLeft: 32
},
  email: {
  fontSize: 14,
  fontWeight: "100",
  color: "white",
  marginLeft: 32
},
  imageContainer: {
  width: 120,
  height: 120,
  borderRadius: 60,
  position: "absolute",
  right: 32,
  top: 32
},
image: {
  width: 120,
  height: 120,
  borderRadius: 60,
  position: "absolute",
  borderColor: "rgba(255, 255, 255, 0.6)",
  borderWidth: 2
},
bottomContainer: {
  height: "66%"
},
gradientView: {
  height: "108%",
  borderBottomLeftRadius: 32,
  position: "absolute",
  top: -88,
  left: 0,
  right: 0,
  bottom: 0,
  transform: [{ rotate: "-30deg" }]
},
fab: {
  width: 44,
  height: 44,
  borderRadius: 22,
  elevation: 4,
  backgroundColor: "white",
  flexDirection: "column",
  justifyContent: "center"
},
fabIcon: {
  alignSelf: "center"
},
itemView: {
  flexDirection: "row",
  height: 78,
  alignItems: "center",
  marginLeft: 52
},
textsView: {
  marginLeft: 32,
  // backgroundColor: "white"
},
textTitle: {
  fontSize: 12,
  color: "#A9A9A9"
},
textDescription: {
  color: "black",
  fontSize: 16
},
buttonStyle: {
  margin: 20,
	padding:10,
	backgroundColor: '#202646',
	borderRadius:5
  },
  textStyle: {
  fontSize:20,
	color: '#ffffff',
	textAlign: 'center'
  }
});
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//             <View style={styles.headerContent}>
//                 <Image style={styles.avatar}
//                   source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

//                 <Text style={styles.name}> Manas Tiwari </Text>
//                 <Text style={styles.userInfo}>manastiwari002@gmail.com</Text>
//                 <Text style={styles.userInfo}>Nagpur</Text>
//             </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   header:{
//     backgroundColor: "#DCDCDC",
//   },
//   headerContent:{
//     padding:30,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom:10,
//   },
//   name:{
//     fontSize:22,
//     color:"#000000",
//     fontWeight:'600',
//   },
//   userInfo:{
//     fontSize:16,
//     color:"#778899",
//     fontWeight:'600',
//   },
//   body:{
//     backgroundColor: "#778899",
//     height:500,
//     alignItems:'center',
//   },
//   item:{
//     flexDirection : 'row',
//   },
//   infoContent:{
//     flex:1,
//     alignItems:'flex-start',
//     paddingLeft:5
//   },
//   iconContent:{
//     flex:1,
//     alignItems:'flex-end',
//     paddingRight:5,
//   },
//   icon:{
//     width:30,
//     height:30,
//     marginTop:20,
//   },
//   info:{
//     fontSize:18,
//     marginTop:20,
//     color: "#FFFFFF",
//   }
// });
 

// import React from 'react';
// import {View,Text,StyleSheet} from 'react-native';

// export default class ProfileScreen extends React.Component{
//     render(){
//         return(
//             <View style={styles.container}>
//                 <Text>profile screen</Text>
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center',
//     }
// })