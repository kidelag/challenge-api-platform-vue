<?php

namespace App\Controller;

use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PaymentCourseController extends AbstractController
{
    /**
     * @throws ApiErrorException
     */
    public function __invoke()
    {
        Stripe::setApiKey('sk_test_51MRvy2I8On5YmTNNSW1T6vjY1Qf27P8l62eZgOEECJYbSKaRXlP6HoBHnHmHB7adcGZHNfbuCnTjROFEQOXjummg00kZ0bQcBv');
        $checkout_session = Session::create([
            'line_items' => [[
                'price_data' => '20',
                'quantity' => '1'
            ]],
            'mode' => 'payment',
            'success_url' => 'https://localhost:8080/checkout/success/',
            'cancel_url' => 'https://localhost:8080/checkout/cancel/'
        ]);
        return $checkout_session;
    }
}
