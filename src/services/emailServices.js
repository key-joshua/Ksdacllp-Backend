import nodemailer from 'nodemailer';

/**
* This class contains all methods (functions) required to handle
* sendVerifyAccountEmail function.
* sendSuccessEmail function.
*/
class EmailHelper {
  /**
   * Handle send verify a user account email.
   * @param {string} url verify a user account url.
   * @param {string} generatedPassword user password.
   * @param {string} name user name.
   * @param {string} to a user email.
   * @returns {null} .
   */
  static async sendVerifyAccountEmail(url, generatedPassword, name, to) {
    const transporter = await nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'saloneverywheres@gmail.com',
          pass: 'mmvyxqtbofoabfkq',
        },
        logger: false,
        debug: false,
      },
      {
        from: 'SalonEverywhere <saloneverywheres@gmail.com>',
      },
    );

    const messageObj = {
      to: `${name} <${to}>`,
      subject: 'Procced With SalonEverywhere',
      text: `Hello ${name}`,
      html: `<!DOCTYPE html>
      <html>
          <head>
              <style type="text/css">
                  body{ height: 100%; color: rgb(87, 87, 87)}
                  h2 { color: rgb(121, 120, 120)}
                  .pet-color{ color: rgb(175, 3, 3); }
                  a { color: rgb(175, 3, 3); }
                  a.button{ background-color:rgb(175, 3, 3); color: #ffff; border-radius: 10px; border: 0; padding: 10px 40px; text-decoration: none; display: inline-block; font-size: 16px;  margin: 20px 00px 20px 00px; }
                  /* a.button:hover{ background-color: rgb(175, 3, 3); color: #fff; } */
                  </style>
                  <title></title>
              </head>
              <body>
                  
                  <div>
                  
                  <h2> Welcome to SalonEverywhere <span class="pet-color"> ):</span></h2>
                  
                  <p> We're delighted to have you onboard </p>
                  
                  <p>
                  You have joined thousands of Berbers, who use and love SalonEverywhere.
                  <br>
                  Note: Keep this password (${generatedPassword}) you will use it after verifying your account successfully.
                  <br>
                  We have a powerful platform to help you manage your practice with ease. You can check us out at <a href="https://saloneverywhere.com/"> SalonEverywhere </a>.
                  </p>
                  
                  <p>To procced with SalonEverywhere, please click the link below.</p>
                  
                  <a class="button" href=${url}> Procced</a>
                  
                  <p>If the button is not working. Please copy the link below and paste the link to open the in browser.</p>
            
                  <a href=${url}> ${url} </a>
      
                  <p>
                    SalonEverywhere: Your Pro, Your Venue, Your Choice.
                  </p>
            
                  <p>
                  If you have any questions regarding your SalonEverywhere account, please contact us through <a href="https://saloneverywhere.com/"> SalonEverywhere </a>.
                  <br>
                  Our technical support team will assist you with anything you need.
                  </p>
      
                  <p>
                  Enjoy yourself, and Welcome to SalonEverywhere.
                  </p>
      
                  <p>
                  Cheers
                  </p>
      
                  <p>
                    SalonEverywhere
                  </p>
      
                  <p>
                  <a href="https://saloneverywhere.com/"> https://saloneverywhere.com/ </a>
                  </p>
      
                </div>
              </body>
      </html>`,
    };

    await transporter.sendMail(messageObj);
  }

  /**
   * Handle send verify a user account email.
   * @param {string} url verify a user account url.
   * @param {string} name user name.
   * @param {string} to a user email.
   * @returns {null} .
   */
  static async sendVerificationLinkEmail(url, name, to) {
    const transporter = await nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'saloneverywheres@gmail.com',
          pass: 'mmvyxqtbofoabfkq',
        },
        logger: false,
        debug: false,
      },
      {
        from: 'SalonEverywhere <saloneverywheres@gmail.com>',
      },
    );

    const messageObj = {
      to: `${name} <${to}>`,
      subject: 'Procced With SalonEverywhere',
      text: `Hello ${name}`,
      html: `<!DOCTYPE html>
      <html>
          <head>
              <style type="text/css">
                  body{ height: 100%; color: rgb(87, 87, 87)}
                  h2 { color: rgb(121, 120, 120)}
                  .pet-color{ color: rgb(175, 3, 3); }
                  a { color: rgb(175, 3, 3); }
                  a.button{ background-color:rgb(175, 3, 3); color: #ffff; border-radius: 10px; border: 0; padding: 10px 40px; text-decoration: none; display: inline-block; font-size: 16px;  margin: 20px 00px 20px 00px; }
                  /* a.button:hover{ background-color: rgb(175, 3, 3); color: #fff; } */
                  </style>
                  <title></title>
              </head>
              <body>
                  
                  <div>
                  
                  <h2> Welcome to SalonEverywhere <span class="pet-color"> ):</span></h2>
                  
                  <p> We're delighted to have you onboard </p>
                  
                  <p>
                  You have joined thousands of Berbers, who use and love SalonEverywhere.
                  <br>
                  We have a powerful platform to help you manage your practice with ease. You can check us out at <a href="https://saloneverywhere.com/"> SalonEverywhere </a>.
                  </p>
                  
                  <p>To procced with SalonEverywhere, please click the link below.</p>
                  
                  <a class="button" href=${url}> Procced</a>
                  
                  <p>If the button is not working. Please copy the link below and paste the link to open the in browser.</p>
            
                  <a href=${url}> ${url} </a>
      
                  <p>
                    SalonEverywhere: Your Pro, Your Venue, Your Choice.
                  </p>
            
                  <p>
                  If you have any questions regarding your SalonEverywhere account, please contact us through <a href="https://saloneverywhere.com/"> SalonEverywhere </a>.
                  <br>
                  Our technical support team will assist you with anything you need.
                  </p>
      
                  <p>
                  Enjoy yourself, and Welcome to SalonEverywhere.
                  </p>
      
                  <p>
                  Cheers
                  </p>
      
                  <p>
                    SalonEverywhere
                  </p>
      
                  <p>
                  <a href="https://saloneverywhere.com/"> https://saloneverywhere.com/ </a>
                  </p>
      
                </div>
              </body>
      </html>`,
    };

    await transporter.sendMail(messageObj);
  }

  /**
   * Handle send success email.
   * @param {string} message message.
   * @param {string} name user name.
   * @param {string} to a user email.
   * @returns {null} .
   */
  static async sendSuccessEmail(message, name, to) {
    const transporter = await nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: 'saloneverywheres@gmail.com',
          pass: 'mmvyxqtbofoabfkq',
        },
        logger: false,
        debug: false,
      },
      {
        from: 'SalonEverywhere <saloneverywheres@gmail.com>',
      },
    );

    const messageObj = {
      to: `${name} <${to}>`,
      subject: 'SalonEverywhere Successfully Email',
      text: `Hello Dear ${name}`,
      html: `<!DOCTYPE html>
      <html>
          <head>
              <style type="text/css">
                  body{ height: 100%; color: rgb(87, 87, 87)}
                  h2 { color: rgb(121, 120, 120)}
                  .pet-color{ color: rgb(175, 3, 3); }
                  a { color: rgb(175, 3, 3); }
                  a.button{ background-color:rgb(175, 3, 3); color: #ffff; border-radius: 10px; border: 0; padding: 10px 40px; text-decoration: none; display: inline-block; font-size: 16px;  margin: 20px 00px 20px 00px; }
                  /* a.button:hover{ background-color: rgb(175, 3, 3); color: #fff; } */
                  </style>
                  <title></title>
              </head>
              <body style="text-align: center; width: 60%; margin: auto; ">
                <div>
                <h2> Welcome to SalonEverywhere<span class="pet-color"> ):</span></h2>
    
                <p> ${message} </p>
          
                <p> ---Your supporter from SalonEverywhere</p>
                
              <a href="https://saloneverywhere.com/"> https://saloneverywhere.com/ </a>
              </p>
    
              </div>
              </body>
            </html>`,
    };

    await transporter.sendMail(messageObj);
  }
}

export default EmailHelper;
