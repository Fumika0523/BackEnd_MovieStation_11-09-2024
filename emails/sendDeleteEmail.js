const nodemailer = require('nodemailer')

const htmlTemplate=(name)=>{
    return `    <div>
        <div style="width:82%;margin:0 5%; padding:4% 4%;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(to bottom, #6c97b5, #011233);color:white">
            <h1 style="color:rgb(247, 207, 4);font-size: 50px">🛋️🍷MovieStation</h1>
            <h4 style="font-size:200%;margin-bottom: 0px;">Hi, <span style="color:rgb(214, 183, 24)">Fumika</span></h4>
            <h1 style="font-size: 330%;margin-top:20px;">📣The Movie has been deleted</h1>
        
                <a href="https://moviestation-23.netlify.app/"target="_blank" style="text-decoration: none;"><button
                style="background-color:rgb(245, 208, 23);height: 75%;width:50%;font-size: 200%;color:white;font-weight: bold;display: block;margin: auto;text-wrap: nowrap;border-radius: 10px;color: black;text-wrap: wrap;text-align: center; padding:1.5% 0;">Go to Explore the movies✔️</button></a>
    
            <p style="font-size: 165%;text-align: center;">Enjoy the movie!🍿📽️</p>
         
            <a href="https://moviestation-23.netlify.app/"target="_blank"><img src="https://www.vfx-courses.com/wp-content/uploads/2020/02/h13.jpg" alt="" style="height:150px;width:32.5%"></a>
            <a href="https://moviestation-23.netlify.app/"target="_blank"><img src="https://wallpaper.forfun.com/fetch/be/be3f7aa111c32a314d8015c8c8c5e22b.jpeg" style="height:150px;width:32.5%" alt=""></a>
            <a href="https://moviestation-23.netlify.app/"target="_blank"><img src="https://images.alphacoders.com/111/1119553.jpg" style="height:150px;width:32.5%" alt=""></a>
            <a href="https://moviestation-23.netlify.app/"target="_blank"><img src="https://images7.alphacoders.com/112/1120946.jpg" alt="" style="height:150px;width:32.5%"></a>
            <a href="https://moviestation-23.netlify.app/"target="_blank"><img src="https://wallpapers.com/images/hd/wolf-of-wall-street-1280-x-800-background-jvta0mk65ixz7q55.jpg" alt="" style="height:150px;width:32.5%"></a>
            <a href="https://moviestation-23.netlify.app/"target="_blank"><img src="https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg" alt="" style="height:150px;width:32.5%"></a>
       
        </div>
        <div style="width:82%;margin:0 5%; padding:0;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <p style="font-size: 155%;color:black">Regards,</p>
        <p style="font-size: 155%;color:black">MovieStation</p>
        </div>
    </div>
  `
}

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"fumicha.3fan1@gmail.com",
        pass:"gdys zixk gzxo lbxy"
    }
})

let sendDeleteEmail=(email,name)=>{
    // console.log(`Hi ${name}, Welcome to MovieStation!`)
    let html=htmlTemplate(name)
    const mailOptions={
        from:"fumicha.3fan1@gmail.com",
        to:email,
        subject:"Welcome to MovieStation!",
        html:html
    }
    transporter.sendMail(
        mailOptions),(error,info)=>{
            if(error){
                console.log("error",error)
            }else{
                console.log("Email send",info.response)
            }
        }}

    module.exports=sendDeleteEmail