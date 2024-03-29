import React,{Component} from 'react';
import {Link} from 'react-react-dom';
import firebase from '../../Services/firebase';

import LoginString from '../Login/LoginStrings';
import './login.css';
import {Card} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/core/LockOutlinedIcon';
import Typography from '@material-ui/core/Typography';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoading : true,
            error: "",
            email: "",
            password:""
        }
    }
    handlechange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentDidMount(){
        if(localStorage.getItem(loginString.ID)){
            this.setState({isLoading:false},()=>{
                this.setState({isLoading:false})
                this.props.showToast(1,'login successful')
                this.props.history.push('./chat')
            })
        }
        else{
            this.setState({isLoading:false})
        }
    }
    async handleSubmit(event){
        event.preventDefault();
        this.setState({error:""});
        await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(async result=>{
            let user=result.user;
            if(user){
                await firebase.firestore().collection('users')
                .where('id',"==",user.uid)
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        const currentdata = doc.data();
                        localStorage.setItem(LoginString.FirebaseDocumentId,doc.id)
                        localStorage.setItem(LoginString.ID,currentdata.id);
                        localStorage.setItem(LoginString.Name,currentdata.name);
                        localStorage.setItem(LoginString.Email,currentdata.email);
                        localStorage.setItem(LoginString.Password,currentdata.password);
                        localStorage.setItem(LoginString.PhotoURL,currentdata.URL);
                        localStorage.setItem(LoginString.Description,currentdata.Description);
                       
                    })
                })
            }
            this.props.history.push('./chat')
        }).catch(function(error){
               this.setState({
                  error:
               })
    })
}
    render(){
        const paper={
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            paddingLeft:'10px',
        }
        const rightcomponent={
            boxShadow:"0 80px 80px #808888",
            backgroundColor:'smokegrey',
        }
        const root={
            height:'100vh',
            background:"linear-gradient(90deg,#e3ffe7 0%,#d9e7ff 100%)",
            marginBottom:'50px',
        }
        const Signinsee={
                display:'flex',
                flexDirection:'column',
                 alignItems:'center',
                 color:'White',
                 marginBottom:'20px',
                 backgroundColor:'#lebea5',
                 width:'100%',
                 boxShadow:"0 5px 5px #808888",
                 height:"10rem",
                 paddingTop:"48px",
                 opacity:"0.5",
                 borderBottom:'5px solid green',

        }
        const form={
            width:'100%',
            marginTop:'50px'
        }
        const avatar={
            backgroundColor:'green',
        }
        return(
        <Grid container component="main" style={root}>
          <CssBaseLine/>
          <Grid item xs={1} sm={4} md={7}  className="image"></Grid>
          <div className="image1"></div>
          <Grid item xs={12} sm={4} md={5} style={rightcomponent} elevation={6}square>
             <Card style={Signinsee}>
               <div>
                <Avatar style={avatar}>
                    <LockOutlinedIcon width="50px" height="50px"/>
                </Avatar>
               </div>
               <div>
                <Typography component="h1" variant="h5">
                    Sign in
                    To
                </Typography>
               </div>
               <div>
                <Link to="/">
                    <button class="button">
                        <i class="fa fa-home"></i>
                        Webchat
                    </button>
                </Link>
               </div>
             </Card>
             <div style={paper}>
                <form style={form} noValidate onSubmit={this.handleSubmit}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                     <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="current-password"
                    autoFocus
                    onChange={this.handleChange}
                    value={this.state.password}
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                    />
                    <Typography component="h6" variant="h5">
                        {this.state.error ?(
                           <p className='text-danger'>{this.state.error}</p>
                        ):null }
                    </Typography>
                    <div className="CenterAliningItems">
                         <button class="button1" type="submit"><span>Login In</span></button>
                    </div>
                    <div className="CenterAliningItems">
                         <p>Don't have an account?</p>
                         <Link to="/signup" variant="body2">
                            Signup
                         </Link>
                    </div>
                    

                </form>
             </div>
          </Grid>
        </Grid>)
    }
}


