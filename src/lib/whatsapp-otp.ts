export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendWhatsAppOTP(mobile: string, otp: string): Promise<{ success: boolean; error?: string }> {
  try {
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
    const COUNTRY_CODE = process.env.WHATSAPP_COUNTRY_CODE ?? '91'

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      console.warn('[WhatsApp OTP] Missing credentials in .env. Faking OTP send for development.')
      console.log(`[WhatsApp OTP - FAKE DEV MODE] OTP for ${mobile} is: ${otp}`)
      return { success: true }
    }

    console.log(`[WhatsApp OTP] Sending to: ${COUNTRY_CODE}${mobile}`)
    console.log(`[WhatsApp OTP] OTP: ${otp}`)
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: `${COUNTRY_CODE}${mobile}`,
          type: 'template',
          template: {
            name: 'auth_login_verification',
            language: {
              code: 'en'
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: otp
                  }
                ]
              },
              {
                type: 'button',
                sub_type: 'url',
                index: 0,
                parameters: [
                  {
                    type: 'text',
                    text: otp
                  }
                ]
              }
            ]
          }
        }),
      }
    )

    const data = await response.json()
    console.log('[WhatsApp OTP] Response:', data)

    if (!response.ok) {
      console.error('WhatsApp API Error:', data)
      const errorMsg = data.error?.message || 'Failed to send OTP'
      
      // Check for specific errors
      if (errorMsg.includes('no phone number')) {
        return { success: false, error: 'Phone number not found on WhatsApp. Please ensure the number has a WhatsApp account.' }
      }
      
      return { success: false, error: errorMsg }
    }

    console.log('[WhatsApp OTP] Successfully sent')
    return { success: true }
  } catch (error) {
    console.error('Error sending WhatsApp OTP:', error)
    return { success: false, error: 'Failed to send OTP' }
  }
}

export async function sendVoteConfirmation(mobile: string, voterName: string, restaurantName: string): Promise<{ success: boolean; error?: string }> {
  try {
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
    const COUNTRY_CODE = process.env.WHATSAPP_COUNTRY_CODE ?? '91'

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      console.warn('[WhatsApp OTP] Missing credentials in .env. Faking vote confirmation send for development.')
      return { success: true }
    }

    console.log(`[WhatsApp Vote Confirmation] Sending to: ${COUNTRY_CODE}${mobile}`)
    console.log(`[WhatsApp Vote Confirmation] Voter: ${voterName}, Restaurant: ${restaurantName}`)
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: `${COUNTRY_CODE}${mobile}`,
          type: 'template',
          template: {
            name: 'vote_confirmation',
            language: {
              code: 'en'
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: voterName
                  },
                  {
                    type: 'text',
                    text: restaurantName
                  }
                ]
              }
            ]
          }
        }),
      }
    )

    const data = await response.json()
    console.log('[WhatsApp Vote Confirmation] Response:', data)

    if (!response.ok) {
      console.error('WhatsApp API Error:', data)
      const errorMsg = data.error?.message || 'Failed to send vote confirmation'
      
      // Check for specific errors
      if (errorMsg.includes('no phone number')) {
        return { success: false, error: 'Phone number not found on WhatsApp.' }
      }
      
      return { success: false, error: errorMsg }
    }

    console.log('[WhatsApp Vote Confirmation] Successfully sent')
    return { success: true }
  } catch (error) {
    console.error('Error sending WhatsApp vote confirmation:', error)
    return { success: false, error: 'Failed to send vote confirmation' }
  }
}
