// Description: This file contains the function to send token to the client

const sendToken = (user, statusCode, res) => {
    // Create JWT token
    const token = user.getJwtToken();
    // Options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      };
      
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
    });
}

export default sendToken;