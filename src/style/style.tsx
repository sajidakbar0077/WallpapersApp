import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../theme/Colors";
const width=Dimensions.get("window").width
const style = StyleSheet.create({
    bodyWrapper: {
        paddingTop: 0,
        padding: 10,
        backgroundColor: Colors.darkBG,
        flex:1
    },
    form: {
        backgroundColor: Colors.secondaryColor,
        padding: 20,
        width: "100%",
        borderRadius: 10
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingLeft: 7,
        marginBottom: 16
    },
    signBtn: {
        backgroundColor: "#575FCE",
        width: 150,
        padding: 10,
        borderRadius: 10,
        margin: "auto",
        elevation: 1
    },
    signBtnText: {
        color: "#ffffff",
        textAlign: "center"
    },
    formWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    mainTitle: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
        marginBottom: 20
    },
    header: {
        backgroundColor: Colors.darkBG,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 8
    },
    backArrow: {
        color: "#ffffff"
    },
    headerText: {
        color: "#ffffff",
        fontSize: 20,
        marginLeft: "auto",
        marginRight: "auto"
    },
    swiperContainer:{
        // height:200,
        backgroundColor:Colors.secondaryColor,
        margin:10,
        borderRadius:10,
        overflow:"hidden"
    },
   image:{
   flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:"100%",
    width:"100%"
   },
   tabsGroup:{
    display:"flex",
    alignItems:"center",
    flexDirection:"row",
    gap:25,
    height:50,
   },
   tabBtnText:{
       color:"#ffffff",
   },
   tabBtn:{},
   activeTabBtn:{
    backgroundColor:Colors.secondaryColor,
    padding:10,
    borderRadius:5
   },
   imageGrid:{
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    gap:10,
   },
   apiImage:{
    width:width/2 - 15,
    borderRadius:9,
    margin:5
},
imageLoader:{
       margin:5,
    width:(width/2) - 15,
    borderRadius:9,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#ee577680"
   },
   viewImage:{
  
   },
   modal:{
    backgroundColor:Colors.darkBG,
    borderWidth:1,
    borderColor:"#FFFFFF",
    borderRadius:10,
    flex:1,
    margin:10,
    padding:10
   },
   mainBtn:{
    backgroundColor:Colors.secondaryColor,
    borderRadius:8,
    padding:8
   },
   mainBtnText:{
    color:"#ffffff",
    fontSize:17,
    textAlign:"center"
   }
})
export default style