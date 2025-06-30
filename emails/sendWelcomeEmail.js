const nodemailer = require('nodemailer')

const htmlTemplate=(name)=>{
    return ` <div>
         <div style="width:90%;text-align: center; margin:0 2.5%; padding:5% 2.5%;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(to bottom, #3b4c67, #00040c);color:rgba(252, 252, 255, 0.708);text-wrap: none;">
            <!-- Title -->
            <h3 style="padding:0px 26%;text-align:start;color:rgb(247, 207, 4)">🛋️🍷MovieStation</h3>
            <!-- Name -->
            <h5 style="margin: 5% 0px; text-align: start;padding:0px 28%">Hi, <span style="color:rgb(247, 207, 4)">${name}</span>!</h5>
            <h1 style="color:white">Welcome to MovieStation!</h1>
                <!-- <p style="font-size: 15px;">Thank you for joining MovieStation!</p> -->
                <p style="font-size: 15px;">Your signup is completed and you are ready to start enjoing movies!</p>
                
                <a href="https://moviestation23.netlify.app/"target="_blank" style="text-decoration: none;">
                <button
                style="background-color:rgb(245, 208, 23);font-size: 16px;color:white;font-weight: bold;border-radius: 10px;color: black;text-wrap:nowrap;text-align: center; padding:1.5% 2% 2% 2%; margin:3% auto; display:flex; align-items:center;">Go to Explore MovieStation✔️</button>
            </a>
    
            <p style="font-size: 20px; text-align: center;color:aliceblue">Enjoy the movie!🍿📽️</p>
         
            <div>
            <div>
           
            <!-- 1st ROw -->
            <a href="https://moviestation23.netlify.app/"target="_blank"><img src="https://www.vfx-courses.com/wp-content/uploads/2020/02/h13.jpg" alt="" style="height:150px;width:300px"></a>
            <a href="https://moviestation23.netlify.app/"target="_blank"><img src="https://wallpaper.forfun.com/fetch/be/be3f7aa111c32a314d8015c8c8c5e22b.jpeg" style="height:150px;width:300px" alt=""></a>
           </div>
           <div>
            <a href="https://moviestation23.netlify.app/"target="_blank"><img src="https://images.alphacoders.com/111/1119553.jpg" style="height:150px;width:300px" alt=""></a>
            <a href="https://moviestation23.netlify.app/"target="_blank"><img src="https://images7.alphacoders.com/112/1120946.jpg" alt="" style="height:150px;width:300px"></a>
            </div>
            <div>
            <a href="https://moviestation23.netlify.app/"target="_blank"><img src="https://wallpapers.com/images/hd/wolf-of-wall-street-1280-x-800-background-jvta0mk65ixz7q55.jpg" alt="" style="height:150px;width:300px"></a>
            <a href="https://moviestation23.netlify.app/"target="_blank"><img src="https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg" alt="" style="height:150px;width:300px"></a>
            </div>
        </div>

        <div style="margin:5% 0px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <p style="font-size: 15px;">Regards,</p>
        <p style="font-size: 15px;">MovieStation</p>
        </div>
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

let sendWelcomeEmail=(email,name)=>{
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

    module.exports=sendWelcomeEmail