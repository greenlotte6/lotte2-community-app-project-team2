import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Checkout } from "../../components/membership/Checkout";

export const CheckoutPage = () => {
  return (
    <MainLayout>
      <section id="checkout">
        <Checkout />
      </section>
    </MainLayout>
  );
};
