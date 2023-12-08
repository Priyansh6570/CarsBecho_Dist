import fetch from 'node-fetch';

export const postInsuranceRequest = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const { mobile } = req.body;

    const apiUrl = 'https://partnerapi.insurancedekho.com/iam-pos/api/v1/user/auth/partner';

    const apiKey = 'OvUHWMfY7M4x9MYnYrATIM8cXSYk';

    const correlationId = '1697455368351';

    // username and password
    const username = 'cars_becho';
    const password = 'WGpIiFVIVz';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-correlation-id': correlationId,
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      },
      body: JSON.stringify({
        referenceAuthId: userId,
        mobile: mobile,
      }),
    });

    if (!response.ok) {
      // non-successful responses
      const errorData = await response.json().catch(() => ({}));
      console.error(errorData);
      return res.status(response.status).json(errorData);
    }

    // Successful response
    const responseData = await response.text(); // Read response as text
    console.log(responseData);

    // Extract the OTT token
    const ottToken = response.headers.get('One-Time-Token');
    console.log('OTT Token:', ottToken);

    return res.status(200).json({ ottToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
