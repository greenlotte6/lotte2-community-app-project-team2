import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Membership } from "../../components/membership/Membership";

export const MembershipPage = () => {
  return (
    <MainLayout>
      <section id="membership">
        <Membership />
      </section>
    </MainLayout>
  );
};
