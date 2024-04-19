import Stripe from "stripe";
import { usePathname } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";


// export async function GET(request) {
//   const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
//   const prices = await stripe.prices.list({
//     limit: 4,
//   })
//   console.log('prices', prices)
//   const { data } = prices;
//   const responseBody = JSON.stringify(prices.data.reverse());
//   return new NextResponse(responseBody)
// }

export async function POST(request) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const { data } = await request.json();
  console.log('data', data)
  const { amount, quantity, cancelUrl, successUrl } = data;
  try {
    const date = new Date().toISOString();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "INV-" + date,
            },
            unit_amount: amount * 100 || 10,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      cancel_url: cancelUrl,
      success_url: successUrl,
    });
    const responseBody = JSON.stringify(session);
    console.log('session', session)
    console.log('responseBody', responseBody)

    return new NextResponse(responseBody)
  } catch (err) {
    // res.status(500).json({ error: "Error checkout session" });
  }
  // try {
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: Number(amount) * 100,
  //     currency: "USD",
  //   });
  //   console.log('paymentIntent', paymentIntent)

  //   return new NextResponse(paymentIntent.client_secret, { status: 200 });
  // } catch (error: any) {
  //   return new NextResponse(error, {
  //     status: 400,
  //   });
  // }
}

// export default async function handler(req, res) {
//   console.log('req res', req, res)
//   const { method, body } = req;
//   if (method === "POST") {
//     try {
//       const date = new Date().toISOString();

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//           {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: "INV-" + date,
//               },
//               unit_amount: body?.amount * 100 || 100,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         cancel_url: `${host}`,
//         success_url: `${host}/success`,
//       });

//       res.status(200).json({ sessionId: session.id });
//     } catch (err) {
//       res.status(500).json({ error: "Error checkout session" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }