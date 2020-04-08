const nodeMailer = require('nodemailer');
const utils = require("../../config/utils");
const sentMail = (req, res) => {
    // if(req.headers.key !== utils.key){
    //     return res.status(401).send({message: "UNAUTHORIZED"})
    // }
    if(req.body == undefined || req.body == null){
        return res.status(403).send({message: "UNAUTHORIZED"})
    }
    if(req.body.company == null|| req.body.company == undefined ||req.body.company.trim() == "" ){
        return res.status(201).send({message: "company is required"});
    }
    if(req.body.email == null||req.body.email == undefined ||req.body.email.trim() == "" ){
        return res.status(202).send({message: "company is required"});
    }

    if(!validateEmail(req.body.email)){
        return res.status(203).send({message: "email is wrong fomat"});
    }

    const subject = "Thông tin tuyển dụng";
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: utils.username,
            pass: utils.password
        }
    });
    let mailOptions = {
        from: '"tuyen dung Alphaway"'+utils.username, // sender address
        to: utils.to, // list of receivers
        subject: subject, // Subject line
        html: '<h3 style="ext-center">Thông tin tuyển dụng</h3><br/>'
            +'<p>Họ tên:'+req.body.name+'<p>'
            +'<p>Số điện thoại: '+req.body.phone+'<p>'
            +'<p>Email: '+req.body.email+'<p>'
            +'<p>Company: '+req.body.company+"<p>"
            +'<p>Message: '+req.body.message+"<p>"
            +'<img'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({message: "That bai"});

        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        return res.status(200).send({message: "Thanh cong"});
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

module.exports = sentMail;