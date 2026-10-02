const express = require('express')
const cors = require('cors')
const twilio = require('twilio')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const crypto = require('crypto')
const Razorpay = require('razorpay')



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)


app.get('/', (req, res) => {
  res.json({
    message: 'Hara Bhara Backend is running'
  })
})

const PORT = process.env.PORT || 5000

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })

    res.json(order)
  } catch (error) {
    console.error('Razorpay order error:', error)

    res.status(500).json({
      message: 'Failed to create Razorpay order',
    })
  }
})




app.post('/api/payment/verify', async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
    } = req.body

    console.log('================================')
    console.log('🔐 VERIFYING PAYMENT')
    console.log('Order ID:', razorpay_order_id)
    console.log('Payment ID:', razorpay_payment_id)
    console.log('Customer:', customer)
    console.log('================================')

    // Generate expected signature
    const body =
      razorpay_order_id +
      '|' +
      razorpay_payment_id

    const expectedSignature = crypto
      .createHmac(
        'sha256',
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest('hex')

    // Verify signature
    if (
      expectedSignature !==
      razorpay_signature
    ) {

      console.log('❌ Payment signature invalid')

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      })
    }

    console.log('✅ PAYMENT VERIFIED')

    // =========================
    // SEND EMAIL
    // =========================

    console.log('📧 Sending email...')

    await emailTransporter.sendMail({
      from: `"Hara Bhara" <${process.env.EMAIL_USER}>`,

      to: customer.email,

      subject:
        'Hara Bhara - Order Confirmed 🌿',

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 30px;
          "
        >

          <h2 style="color:#1f6b45;">
            Order Confirmed 🎉
          </h2>

          <p>
            Hi ${customer.name},
          </p>

          <p>
            Your payment was successful and
            your Hara Bhara food order has
            been confirmed.
          </p>

          <hr />

          <p>
            <strong>Payment ID:</strong>
            ${razorpay_payment_id}
          </p>

          <p>
            <strong>Order ID:</strong>
            ${razorpay_order_id}
          </p>

          <p>
            Thank you for ordering from
            Hara Bhara 🌿
          </p>

        </div>
      `,
    })

    console.log('✅ Email sent successfully')


    // =========================
    // SEND SMS
    // =========================

    console.log('📱 Sending SMS...')

    await twilioClient.messages.create({

      body:
        `Hara Bhara 🌿\n\n` +
        `Hi ${customer.name}, your food order ` +
        `has been confirmed successfully.\n\n` +
        `Payment ID: ${razorpay_payment_id}\n\n` +
        `Thank you for ordering!`,

      from:
        process.env.TWILIO_PHONE_NUMBER,

      to:
        customer.phone,
    })

    console.log('✅ SMS sent successfully')


    // =========================
    // FINAL RESPONSE
    // =========================

    res.json({
      success: true,

      message:
        'Payment verified and notifications sent',

      paymentId:
        razorpay_payment_id,
    })

  } catch (error) {

    console.error(
      '❌ Payment verification error:',
      error
    )

    res.status(500).json({
      success: false,

      message:
        error.message ||
        'Payment verified but notification failed',
    })
  }
})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
