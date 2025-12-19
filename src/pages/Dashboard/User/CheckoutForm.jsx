import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error(err));
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setCardError(error.message);
        } else {
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    }
                }
            }
        );

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                bookingId: booking._id,
                serviceName: booking.serviceName,
                status: 'service pending'
            }

            const res = await axiosSecure.post('/payments', payment);
            if (res.data.insertResult?.insertedId || res.data.updateResult?.modifiedCount > 0) {
                alert("Payment Successful!");
                setProcessing(false);
                navigate('/dashboard/paymentHistory');
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full md:w-2/3 mx-auto mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Card Details</label>
                    <div className="p-3 border border-gray-600 rounded bg-black/30">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#ffffff',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#ef4444' },
                                },
                            }}
                        />
                    </div>
                </div>
                <button 
                    className="btn btn-sm bg-brand-teal text-black hover:bg-white border-none w-full font-bold h-10" 
                    type="submit" 
                    disabled={!stripe || !clientSecret || processing}
                >
                    {processing ? "Processing..." : `Pay $${price}`}
                </button>
            </form>
            {cardError && <p className="text-red-500 mt-4 text-center text-sm">{cardError}</p>}
            {transactionId && <p className="text-green-400 mt-4 text-center text-sm">Transaction Complete! ID: <span className="font-mono text-white">{transactionId}</span></p>}
        </>
    );
};

export default CheckoutForm;