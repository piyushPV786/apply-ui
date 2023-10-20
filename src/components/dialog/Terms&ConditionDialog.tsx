/* eslint-disable react-hooks/exhaustive-deps */

// ** React Imports

import { useState } from "react";

//**  API Services

// ** MUI Imports

import {
  Box,
  Grid,
  Dialog,
  IconButton,
  DialogActions,
  Typography,
} from "@mui/material";

import StyledButton from "../../components/button/button";
// ** Third Party Library

export const EditGroup = ({
  showTerms,
  onClickShowTerms,
  updateTermsConditions,
}) => {
  // ** States

  return (
    <Grid>
      <label className="form-check-label terms-conditions">
        I have read and agreed to
        <a
          style={{ color: "Green", fontFamily: "roboto-medium" }}
          href="#"
          onClick={() => {
            onClickShowTerms();
          }}
        >
          {" "}
          terms and conditions
        </a>
      </label>

      <Dialog open={showTerms} scroll="body" onClose={() => onClickShowTerms}>
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography
            className="popup-title"
            sx={{ mb: 3, lineHeight: "2rem" }}
          >
            Terms and Conditions
          </Typography>
        </Box>
        <Grid sx={{ padding: 5 }}>
          <Box>
            <div className="elementor-container elementor-column-gap-default">
              <div
                className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-2b0ab16"
                data-id="2b0ab16"
                data-element_type="column"
              >
                <div
                  className="elementor-widget-wrap elementor-element-populated"
                  style={{ maxHeight: 400, overflowY: "auto" }}
                >
                  <div
                    className="elementor-element elementor-element-809c681 elementor-widget elementor-widget-text-editor"
                    data-id="809c681"
                    data-element_type="widget"
                    data-widget_type="text-editor.default"
                  >
                    <div className="elementor-widget-container">
                      <div className="fusion-column-wrapper fusion-flex-justify-content-flex-start fusion-content-layout-column">
                        <div className="fusion-text fusion-text-1">
                          <div className="post-content">
                            <div className="page" title="Page 3">
                              <div className="layoutArea">
                                <div className="column">
                                  <div className="page" title="Page 3">
                                    <div className="layoutArea">
                                      <div className="column">
                                        <h3
                                          className="fusion-responsive-typography-calculated"
                                          data-fontsize="34"
                                          data-lineheight="49.9833px"
                                        >
                                          <strong>
                                            A. Academic Regulations
                                          </strong>
                                        </h3>
                                        <p>
                                          All academic and accredited programmes
                                          are subject to academic rules,
                                          regulations and applicable domestic
                                          legislation as published and revised
                                          from time-to-time. Regenesys is
                                          obligated to make personal academic
                                          information available to regulatory
                                          and administrative bodies for academic
                                          and statistical purposes.
                                        </p>
                                        <h3
                                          className="fusion-responsive-typography-calculated"
                                          data-fontsize="34"
                                          data-lineheight="49.9833px"
                                        >
                                          <strong>B. Definitions</strong>
                                        </h3>
                                        <p>
                                          ‘Regenesys’ refers to Regenesys
                                          Business School, Regenesys School of
                                          Public Management, or Regenesys
                                          Management.
                                        </p>
                                        <p>
                                          ‘Academic programme’ shall mean CHE
                                          accredited courses conducted by
                                          Regenesys.
                                        </p>
                                        <p>
                                          ‘Management development course’ shall
                                          mean management programmes conducted
                                          over a period of 1-5 days by Regenesys
                                          on its premises or at a client’s
                                          premise.
                                        </p>
                                        <p>
                                          ‘Short course’ shall mean management
                                          development courses conducted by
                                          Regenesys. These courses may vary in
                                          length and are counted in days.
                                        </p>
                                        <p>
                                          ‘In-house’ shall mean a standard or
                                          customised Regenesys course, either
                                          short or academic, that is conducted
                                          as a package for a corporate or
                                          organisational client.
                                        </p>
                                        <p>
                                          ‘Acceptance’ shall mean that the
                                          individual has provided supporting
                                          documentation, where necessary, and
                                          has paid the application fee for the
                                          course in advance or provided
                                          documentation such as a purchase order
                                          proving commitment to pay.
                                        </p>
                                        <div className="page" title="Page 3">
                                          <div className="layoutArea">
                                            <div className="column">
                                              <p>
                                                ‘Roll-over/Returning Students’
                                                shall mean a student moving from
                                                one year of tuition to a
                                                following year of tuition for
                                                the same qualification.
                                              </p>
                                              <div
                                                className="page"
                                                title="Page 3"
                                              >
                                                <div className="layoutArea">
                                                  <div className="column">
                                                    <h3
                                                      className="fusion-responsive-typography-calculated"
                                                      data-fontsize="34"
                                                      data-lineheight="49.9833px"
                                                    >
                                                      <strong>
                                                        C. Course Applications
                                                      </strong>
                                                    </h3>
                                                    <p>
                                                      All applications submitted
                                                      by an individual, whether
                                                      for a short or academic
                                                      course, require a fully
                                                      completed and signed
                                                      application form and
                                                      acknowledgment of the
                                                      terms and conditions. All
                                                      supporting documentation
                                                      as laid out in the
                                                      application form must be
                                                      provided. An application
                                                      does not constitute the
                                                      full registration for a
                                                      course. An application
                                                      will be registered once
                                                      the full payment and
                                                      supporting documentation
                                                      (where necessary) have
                                                      been received or the
                                                      payment terms agreement
                                                      has been signed and all
                                                      entrance requirements have
                                                      been met.
                                                    </p>
                                                    <h3
                                                      className="fusion-responsive-typography-calculated"
                                                      data-fontsize="34"
                                                      data-lineheight="49.9833px"
                                                    >
                                                      <strong>
                                                        D. Application Fee*
                                                      </strong>
                                                    </h3>
                                                    <p>
                                                      A non-refundable fee of
                                                      R1100.00 is required in
                                                      order for an application
                                                      to be processed. Regenesys
                                                      reserves the right to
                                                      amend this fee from
                                                      time-to-time.
                                                    </p>
                                                    <h3
                                                      className="fusion-responsive-typography-calculated"
                                                      data-fontsize="34"
                                                      data-lineheight="49.9833px"
                                                    >
                                                      <strong>E. RMAT</strong>
                                                    </h3>
                                                    <p>
                                                      Please note that MBA,
                                                      International and
                                                      Recognition of Prior
                                                      Learning (RPL) students
                                                      are required to take our
                                                      RMAT test for an
                                                      additional fee of R250.
                                                      RPL students are also
                                                      required to pay an
                                                      additional R750 for the
                                                      RPL process. Terms and
                                                      conditions apply.
                                                    </p>
                                                    <h3
                                                      className="fusion-responsive-typography-calculated"
                                                      data-fontsize="34"
                                                      data-lineheight="49.9833px"
                                                    >
                                                      <strong>
                                                        F. Administration Fee*
                                                      </strong>
                                                    </h3>
                                                    <p>
                                                      For every qualification
                                                      enrolled, the student will
                                                      be required to register
                                                      for each calendar year,
                                                      and select relevant
                                                      modules to be taken during
                                                      that year. This
                                                      facilitates better
                                                      planning for tuition
                                                      demands and services
                                                      required. An annual
                                                      administration fee of R500
                                                      will be charged.
                                                    </p>
                                                    <div
                                                      className="page"
                                                      title="Page 3"
                                                    >
                                                      <div className="layoutArea">
                                                        <div className="column">
                                                          <div
                                                            className="page"
                                                            title="Page 3"
                                                          >
                                                            <div className="layoutArea">
                                                              <div className="column">
                                                                <h3
                                                                  className="fusion-responsive-typography-calculated"
                                                                  data-fontsize="34"
                                                                  data-lineheight="49.9833px"
                                                                >
                                                                  <strong>
                                                                    G. Payment
                                                                    of Study
                                                                    Fees*
                                                                  </strong>
                                                                </h3>
                                                                <ol>
                                                                  <li>
                                                                    <ol>
                                                                      <li>
                                                                        Regenesys
                                                                        Management
                                                                        offers
                                                                        the
                                                                        following
                                                                        payment
                                                                        options
                                                                        to
                                                                        students
                                                                        for the
                                                                        academic
                                                                        programmes:
                                                                        <br />
                                                                        i.
                                                                        Monthly(bycompulsorydebitorder)
                                                                        <br />
                                                                        ii. Per
                                                                        semesteriii.
                                                                        Upfront
                                                                        <br />
                                                                        iv.
                                                                        Annual
                                                                        <br />
                                                                        v. Bank
                                                                        loan
                                                                        through
                                                                        a
                                                                        regconised
                                                                        financial
                                                                        institution
                                                                        <br />
                                                                        vi.
                                                                        Regenesys
                                                                        student
                                                                        loan
                                                                        (terms
                                                                        and
                                                                        conditions
                                                                        apply)
                                                                        <br />
                                                                        b. If a
                                                                        student
                                                                        elects
                                                                        to pay
                                                                        on a
                                                                        monthly
                                                                        basis
                                                                        then the
                                                                        Regenesys
                                                                        Credit
                                                                        Application
                                                                        Form and
                                                                        an
                                                                        income
                                                                        expenditure
                                                                        statement
                                                                        are
                                                                        required
                                                                        for term
                                                                        repayments.
                                                                        <br />
                                                                        i. The
                                                                        first
                                                                        month’s
                                                                        payment
                                                                        must be
                                                                        paid in
                                                                        advance.
                                                                        <br />
                                                                        ii. A
                                                                        signed
                                                                        debit
                                                                        order
                                                                        needs to
                                                                        be
                                                                        completed.
                                                                        Should a
                                                                        payment
                                                                        be
                                                                        returned
                                                                        by the
                                                                        bank,the
                                                                        student
                                                                        needs to
                                                                        reimburse
                                                                        Regenesys
                                                                        within
                                                                        5(five)
                                                                        days of
                                                                        being
                                                                        informed
                                                                        thereof.
                                                                        Failure
                                                                        to do so
                                                                        will
                                                                        render
                                                                        the
                                                                        student’s
                                                                        studies
                                                                        suspended.
                                                                        <br />
                                                                        iii.
                                                                        Should a
                                                                        monthly
                                                                        debit
                                                                        order be
                                                                        returned
                                                                        by the
                                                                        bank on
                                                                        a second
                                                                        occasion,
                                                                        in
                                                                        addition
                                                                        to
                                                                        reimbursing
                                                                        Regenesys
                                                                        within
                                                                        5(Five)days,the
                                                                        student’s
                                                                        monthly
                                                                        payment.
                                                                        <br />
                                                                        arrangements
                                                                        will be
                                                                        forfeited
                                                                        immediately
                                                                        and the
                                                                        student
                                                                        will
                                                                        then
                                                                        have to
                                                                        pay in
                                                                        <br />
                                                                        advance
                                                                        for each
                                                                        module
                                                                        attended.
                                                                        <br />
                                                                        iv. A
                                                                        returned
                                                                        debit
                                                                        order
                                                                        administration
                                                                        fee will
                                                                        be
                                                                        charged
                                                                        (currently
                                                                        R150 +
                                                                        VAT)
                                                                        <br />
                                                                        v. An
                                                                        option
                                                                        for an
                                                                        extended
                                                                        monthly
                                                                        payment
                                                                        period
                                                                        is
                                                                        available,
                                                                        subject
                                                                        to
                                                                        approval.
                                                                        <br />
                                                                        c. If a
                                                                        student
                                                                        elects
                                                                        to pay
                                                                        for each
                                                                        semester,
                                                                        the fee
                                                                        for the
                                                                        semester
                                                                        has to
                                                                        be paid
                                                                        at least
                                                                        5 (five)
                                                                        days
                                                                        prior to
                                                                        commencement
                                                                        of teh
                                                                        semester,failing
                                                                        which,
                                                                        the
                                                                        student
                                                                        will not
                                                                        be
                                                                        allowed
                                                                        to
                                                                        attend
                                                                        className.
                                                                        Should a
                                                                        student
                                                                        attend
                                                                        className,
                                                                        he/she
                                                                        will be
                                                                        liable
                                                                        for
                                                                        fees.
                                                                        <br />
                                                                        d. In
                                                                        the case
                                                                        of
                                                                        upfront
                                                                        payments,
                                                                        course
                                                                        fees
                                                                        need to
                                                                        be paid
                                                                        prior to
                                                                        commencement
                                                                        and
                                                                        <br />
                                                                        attendance
                                                                        of the
                                                                        course.
                                                                        <br />
                                                                        e.
                                                                        Should
                                                                        the
                                                                        student
                                                                        elect to
                                                                        take a
                                                                        study
                                                                        loan
                                                                        through
                                                                        a
                                                                        recognised
                                                                        financial
                                                                        institution
                                                                        Regenesys
                                                                        will
                                                                        facilitate
                                                                        the
                                                                        necessary
                                                                        forms
                                                                        and
                                                                        contact
                                                                        details
                                                                        for a
                                                                        select
                                                                        number
                                                                        of these
                                                                        institutions.
                                                                        However,
                                                                        payment
                                                                        for the
                                                                        respective
                                                                        course
                                                                        needs to
                                                                        be
                                                                        received
                                                                        by
                                                                        Regenesys
                                                                        prior to
                                                                        the
                                                                        commencement
                                                                        of the
                                                                        course.
                                                                      </li>
                                                                    </ol>
                                                                  </li>
                                                                </ol>
                                                                <p className="p1">
                                                                  f. Access to
                                                                  the portal
                                                                  shall be
                                                                  blocked should
                                                                  a student’s
                                                                  fees not be
                                                                  paid as
                                                                  envisaged
                                                                  under point G.
                                                                  a. above.
                                                                </p>
                                                                <p className="p1">
                                                                  g. Should any
                                                                  money due by
                                                                  the student or
                                                                  the
                                                                  signatory/ies
                                                                  under his/her
                                                                  contract with
                                                                  Regenesys not
                                                                  be paid by the
                                                                  due date, the
                                                                  student may be
                                                                  excluded from:
                                                                  <br />
                                                                  i. Attending
                                                                  further
                                                                  lectures,
                                                                  and/or
                                                                  <br />
                                                                  ii. Submitting
                                                                  assessments
                                                                  (assignments
                                                                  and exams),
                                                                  and/or
                                                                </p>
                                                                <p className="p1">
                                                                  iii. Accessing
                                                                  the campus and
                                                                  all other
                                                                  facilities,
                                                                  and/or
                                                                  <br />
                                                                  iv. Receiving
                                                                  assessment
                                                                  results,
                                                                  and/or
                                                                  <br />
                                                                  v. Graduation
                                                                  until such
                                                                  time as all
                                                                  monies due
                                                                  have been paid
                                                                  in full.
                                                                  <br />
                                                                  vi. This is
                                                                  without
                                                                  prejudice to
                                                                  any other
                                                                  rights of
                                                                  Regenesys.
                                                                  Exclusion as
                                                                  set above,
                                                                  will
                                                                </p>
                                                                <p className="p1">
                                                                  not relieve
                                                                  the
                                                                  signatory/ies
                                                                  of any
                                                                  obligation to
                                                                  pay the
                                                                  contract
                                                                  amount, or any
                                                                  balance
                                                                </p>
                                                                <p className="p1">
                                                                  being informed
                                                                  thereof.
                                                                </p>
                                                                <ul className="ul1">
                                                                  <li className="li1">
                                                                    Should a
                                                                    monthly
                                                                    debit order
                                                                    be returned
                                                                    by the bank
                                                                    on a second
                                                                    occasion, in
                                                                    addition
                                                                    <br />
                                                                    arrangements
                                                                    will be
                                                                    forfeited
                                                                    immediately
                                                                    and the
                                                                    student will
                                                                    then have to
                                                                    pay in
                                                                    <br />
                                                                    advance for
                                                                    each module
                                                                    attended.
                                                                  </li>
                                                                  <li className="li1">
                                                                    A returned
                                                                    debit order
                                                                    administration
                                                                    fee will be
                                                                    charged
                                                                    (currently
                                                                    R150 + VAT)
                                                                  </li>
                                                                </ul>
                                                                <p className="p1">
                                                                  v. An option
                                                                  for an
                                                                  extended
                                                                  monthly
                                                                  payment period
                                                                  is available,
                                                                  subject to
                                                                  approval.
                                                                </p>
                                                                <p className="p1">
                                                                  c. If a
                                                                  student elects
                                                                  to pay for
                                                                  each semester,
                                                                  the fee for
                                                                  the semester
                                                                  has to be paid
                                                                  at least
                                                                </p>
                                                                <p className="p1">
                                                                  allowed to
                                                                  attend
                                                                  className.
                                                                  Should a
                                                                  student attend
                                                                  className,
                                                                  he/she will be
                                                                  liable for
                                                                  fees.
                                                                </p>
                                                                <ul className="ul1">
                                                                  <li className="li1">
                                                                    In the case
                                                                    of upfront
                                                                    payments,
                                                                    course fees
                                                                    need to be
                                                                    paid prior
                                                                    to
                                                                    commencement
                                                                    and
                                                                    <br />
                                                                    attendance
                                                                    of the
                                                                    course.
                                                                  </li>
                                                                  <li className="li1">
                                                                    Should the
                                                                    student
                                                                    elect to
                                                                    take a study
                                                                    loan through
                                                                    a recogni
                                                                    <br />
                                                                    Regenesys
                                                                    will
                                                                    facilitate
                                                                    the
                                                                    necessary
                                                                    forms and
                                                                    contact
                                                                    details for
                                                                    a select
                                                                    number of
                                                                    these
                                                                    institutions.
                                                                    However,
                                                                    payment for
                                                                    the
                                                                    respective
                                                                    course needs
                                                                    to be
                                                                    received by
                                                                    Regenesys
                                                                    prior to the
                                                                    commencement
                                                                    of the
                                                                    course.
                                                                  </li>
                                                                </ul>
                                                                <p className="p1">
                                                                  h. The
                                                                  signatory/ies
                                                                  will remain
                                                                  liable for all
                                                                  expenses
                                                                  incurred by
                                                                  Regenesys as a
                                                                  result of any
                                                                  breach of
                                                                  his/her/their
                                                                  part of this
                                                                  contract and
                                                                  acknowledge/s
                                                                  that this may
                                                                  include legal
                                                                  tracing and
                                                                  collection
                                                                  costs.
                                                                </p>
                                                                <p className="p1">
                                                                  i. In order
                                                                  for a student
                                                                  to graduate
                                                                  their fees
                                                                  need to be
                                                                  settled in
                                                                  full. No
                                                                  student will
                                                                  be invited to
                                                                  the graduation
                                                                  event until
                                                                  such a time as
                                                                  their account
                                                                  is settled.
                                                                </p>
                                                                <h3
                                                                  className="p1 fusion-responsive-typography-calculated"
                                                                  data-fontsize="34"
                                                                  data-lineheight="49.9833px"
                                                                >
                                                                  <b>
                                                                    H. Revised
                                                                    Fees to
                                                                    Applicable
                                                                    Year’s Rate
                                                                  </b>
                                                                </h3>
                                                                <p className="p1">
                                                                  Tuition will
                                                                  be charged at
                                                                  fees
                                                                  applicable to
                                                                  the
                                                                  current-year’s
                                                                  rate. For
                                                                  delayed,
                                                                  deferred and
                                                                  repeat
                                                                  modules, a
                                                                  top-up fee
                                                                  will be levied
                                                                  per module, to
                                                                  cover the
                                                                  shortfall
                                                                  between
                                                                  originally
                                                                  paid fees and
                                                                  the applicable
                                                                  rate when the
                                                                  student
                                                                  actually does
                                                                  the module. If
                                                                  the student
                                                                </p>
                                                                <p className="p1">
                                                                  only be
                                                                  applicable on
                                                                  studies e
                                                                  course.
                                                                </p>
                                                                <h3
                                                                  className="p1 fusion-responsive-typography-calculated"
                                                                  data-fontsize="34"
                                                                  data-lineheight="49.9833px"
                                                                >
                                                                  <b>
                                                                    I.
                                                                    Cancellation
                                                                    and
                                                                    Postponement
                                                                  </b>
                                                                </h3>
                                                                <p className="p1">
                                                                  Regenesys
                                                                  reserves the
                                                                  right to
                                                                  postpone or
                                                                  cancel a
                                                                  scheduled
                                                                  <br />
                                                                  numbers or any
                                                                  reason deemed
                                                                  fair by
                                                                  Regenesys.
                                                                  Registered
                                                                  students might
                                                                  be provided
                                                                  with an
                                                                  alternative
                                                                  course date or
                                                                  offered a
                                                                  refund.
                                                                </p>
                                                                <p className="p1">
                                                                  <i>
                                                                    Academic
                                                                    Programmes:
                                                                  </i>
                                                                </p>
                                                                <p className="p1">
                                                                  Should the
                                                                  student inform
                                                                  Regenesys in
                                                                  writing,
                                                                  within 7 days
                                                                  of
                                                                  Registration,
                                                                  that they want
                                                                  to cancel
                                                                  their studies
                                                                  then the
                                                                  following will
                                                                  apply:
                                                                  <br />– The
                                                                  fees paid by
                                                                  the student in
                                                                  relation to
                                                                  the cancelled
                                                                  studies will
                                                                  be refunded,
                                                                  subject to
                                                                </p>
                                                                <p className="p1">
                                                                  a cancellation
                                                                  fee of R750.
                                                                </p>
                                                                <p className="p1">
                                                                  Should a
                                                                  student want
                                                                  to cancel or
                                                                  postpone their
                                                                  studies for
                                                                  any reason,
                                                                  after the 7
                                                                  days notice
                                                                  period above,
                                                                  the following
                                                                  will apply:
                                                                  <br />– Notice
                                                                  of intention
                                                                  to
                                                                  cancel/postpone
                                                                  needs to be
                                                                  communicated
                                                                  in writing to
                                                                  the Personal
                                                                </p>
                                                                <p className="p1">
                                                                  Programme
                                                                  Advisor (PPA).
                                                                  The full
                                                                  year’s fees
                                                                  will still be
                                                                  due and
                                                                  payable,
                                                                  irrespective
                                                                  of
                                                                </p>
                                                                <p className="p1">
                                                                  the payment
                                                                  option.
                                                                  <br />– If no
                                                                  written
                                                                  cancellation
                                                                  is received,
                                                                  the student
                                                                  will also be
                                                                  liable for the
                                                                  following
                                                                  year’s
                                                                </p>
                                                                <p className="p1">
                                                                  fees.
                                                                  <br />–
                                                                  Non-attendance
                                                                  of className,
                                                                  non-submission
                                                                  or failure to
                                                                  submit or
                                                                  participate in
                                                                  an assessment
                                                                </p>
                                                                <p className="p1">
                                                                  does not
                                                                  constitute a
                                                                  cancellation,
                                                                  and the year’s
                                                                  fees are still
                                                                  due and
                                                                  payable.
                                                                  <br />–
                                                                  Written
                                                                  acceptance of
                                                                  the
                                                                  cancellation
                                                                  will be given
                                                                  to the student
                                                                  by the
                                                                  Personal
                                                                </p>
                                                                <p className="p1">
                                                                  Programme
                                                                  Advisor
                                                                </p>
                                                                <p className="p1">
                                                                  email or post.
                                                                  <br />–
                                                                  Regenesys will
                                                                  not be held
                                                                  liable for
                                                                  failure to
                                                                  receive faxed
                                                                  cancellation
                                                                  notices.
                                                                </p>
                                                                <p className="p1">
                                                                  <i>
                                                                    Individual
                                                                    Module:
                                                                  </i>
                                                                </p>
                                                                <p className="p1">
                                                                  If you have
                                                                  enroled for an
                                                                  individual
                                                                  module you
                                                                  will be liable
                                                                  for the full
                                                                  module fee.
                                                                </p>
                                                                <p className="p1">
                                                                  <i>
                                                                    Short
                                                                    Courses:
                                                                  </i>
                                                                </p>
                                                                <p className="p1">
                                                                  If a
                                                                  cancellation
                                                                  of a
                                                                  management
                                                                  development
                                                                  course or
                                                                  short course
                                                                  occurs with
                                                                  less than
                                                                </p>
                                                                <p className="p1">
                                                                  cancel the
                                                                  attendance of
                                                                  a short course
                                                                  the the
                                                                  cancellation
                                                                  administration
                                                                  fee of R1,000
                                                                  will be
                                                                  payable. If no
                                                                  advance
                                                                  payment or
                                                                  deposit has
                                                                  been made,
                                                                  then the tax
                                                                  invoice issued
                                                                  will be
                                                                  credited and a
                                                                  new tax
                                                                  invoice will
                                                                  be issued with
                                                                  a full
                                                                  administration
                                                                  fee of R1,000
                                                                  per person.
                                                                </p>
                                                                <h3
                                                                  className="p1 fusion-responsive-typography-calculated"
                                                                  data-fontsize="34"
                                                                  data-lineheight="49.9833px"
                                                                >
                                                                  <b>
                                                                    J. Tuition
                                                                    Commencement
                                                                  </b>
                                                                </h3>
                                                                <p className="p1">
                                                                  Once an
                                                                  application
                                                                  for any
                                                                  Regenesys
                                                                  programme has
                                                                  been processed
                                                                  and a tax
                                                                  invoice
                                                                  raised, the
                                                                  individual
                                                                  will be deemed
                                                                  to be an
                                                                  enrolled
                                                                  student and
                                                                  will be
                                                                  required to
                                                                  pay the course
                                                                  fees and any
                                                                  other
                                                                  associated
                                                                  costs (subject
                                                                  to meeting the
                                                                  National
                                                                  Credit Act
                                                                  requirements
                                                                  and the
                                                                  academic
                                                                  requirements).
                                                                </p>
                                                                <p className="p1">
                                                                  to pay the
                                                                  balance within
                                                                  an agreed time
                                                                  frame prior to
                                                                  commencement.
                                                                </p>
                                                                <h3
                                                                  className="p1 fusion-responsive-typography-calculated"
                                                                  data-fontsize="34"
                                                                  data-lineheight="49.9833px"
                                                                >
                                                                  <b>
                                                                    K. IT
                                                                    Requirement:
                                                                  </b>
                                                                </h3>
                                                                <p className="p1">
                                                                  • You need to
                                                                  be computer
                                                                  literate.
                                                                  <br />• You
                                                                  need to have a
                                                                  computer or
                                                                  tablet with
                                                                  webcam,
                                                                  speaker and 3G
                                                                  internet
                                                                  connectivity
                                                                </p>
                                                                <p className="p1">
                                                                  for the
                                                                  purpose of
                                                                  downloads and
                                                                  submissions.
                                                                </p>
                                                              </div>
                                                              <h3
                                                                className="p1 fusion-responsive-typography-calculated"
                                                                data-fontsize="34"
                                                                data-lineheight="49.9833px"
                                                              >
                                                                <b>
                                                                  L. Refund of
                                                                  Prepaid Money{" "}
                                                                </b>
                                                              </h3>
                                                              <p className="p1">
                                                                Refund of any
                                                                deposits and/or
                                                                advance payments
                                                                are subject to
                                                                Regenesys’
                                                                cancellation
                                                                terms as set out
                                                                above. Regenesys
                                                                will only refund
                                                                monies to the
                                                                original
                                                                source/issuer
                                                                and reserves the
                                                                right to refund
                                                                monies in the
                                                                same method in
                                                                which they were
                                                                received.
                                                              </p>
                                                              <p className="p1">
                                                                Regenesys
                                                                reserves the
                                                                right to
                                                                postpone or
                                                                cancel a
                                                                scheduled
                                                                course.
                                                                Registered
                                                                applicants will
                                                                be provided with
                                                                an alternative
                                                                course date or
                                                                offered a refund
                                                                of course fees.
                                                              </p>
                                                              <h3
                                                                className="p1 fusion-responsive-typography-calculated"
                                                                data-fontsize="34"
                                                                data-lineheight="49.9833px"
                                                              >
                                                                <b>
                                                                  M. Value
                                                                  Proposition*{" "}
                                                                </b>
                                                              </h3>
                                                              <p className="p1">
                                                                Student fees
                                                                include the
                                                                value of digital
                                                                or contact
                                                                facilitation,
                                                                assessments,
                                                                tablet with
                                                                access to
                                                                digitised study
                                                                guides and one
                                                                supplementary
                                                                examination per
                                                                module.
                                                                Additional
                                                                services over
                                                                and above the
                                                                course costs are
                                                                charged per
                                                                event, as per
                                                                the current
                                                                Academic
                                                                Regulations;
                                                              </p>
                                                              <h3
                                                                className="p1 fusion-responsive-typography-calculated"
                                                                data-fontsize="34"
                                                                data-lineheight="49.9833px"
                                                              >
                                                                <b>
                                                                  N. Fees and
                                                                  Increases{" "}
                                                                </b>
                                                              </h3>
                                                              <p className="p1">
                                                                <i>
                                                                  Annual
                                                                  Increases:{" "}
                                                                </i>
                                                              </p>
                                                              <p className="p1">
                                                                Regenesys
                                                                reserves the
                                                                right to
                                                                increase
                                                                contracted fees
                                                                on an annual
                                                                basis, as well
                                                                as to change
                                                                scheduled
                                                                className and
                                                                exam dates.
                                                              </p>
                                                              <p className="p1">
                                                                <i>
                                                                  Extended
                                                                  Tuition Fees:{" "}
                                                                </i>
                                                              </p>
                                                              <p className="p1">
                                                                Should a student
                                                                not complete the
                                                                course within
                                                                the timeframe
                                                                stipulated as
                                                                per the
                                                                programme
                                                                schedule,
                                                                Regenesys
                                                                reserves the
                                                                right to adjust
                                                                the outstanding
                                                                module fees to
                                                                those of the
                                                                current retail
                                                                price and to
                                                                levy an
                                                                extension fee,
                                                                which shall be
                                                                reviewed from
                                                                time-to-time.
                                                              </p>
                                                              <p className="p1">
                                                                <i>
                                                                  Discounts:{" "}
                                                                </i>
                                                              </p>
                                                              <p className="p1">
                                                                Early Bird
                                                                Discount: save
                                                                by being
                                                                exempted from
                                                                the annual fee
                                                                increase.
                                                                Upfront
                                                                Discount: save
                                                                up to 10% by
                                                                paying the
                                                                annual up front
                                                                fee.
                                                              </p>
                                                              <p className="p1">
                                                                Alumni Discount:
                                                                students who
                                                                complete a full
                                                                qualification
                                                                get 10% off the
                                                                cost of their
                                                                next
                                                              </p>
                                                              <p className="p1">
                                                                <i>
                                                                  Early Bird
                                                                  Fees:{" "}
                                                                </i>
                                                              </p>
                                                              <p className="p1">
                                                                • Early Bird
                                                                fees are to
                                                                secure the
                                                                current year’s
                                                                fees for the
                                                                following year’s
                                                                study. • They
                                                                are not an
                                                                additional fee
                                                                but form part of
                                                                the following
                                                                year’s course
                                                                fees.
                                                                <br />• They
                                                                only apply to
                                                                students
                                                                starting thier
                                                                course during
                                                                the first
                                                                semester.
                                                                <br />• The
                                                                Early Bird fee
                                                                is refundable.
                                                              </p>
                                                              <h3
                                                                className="p1 fusion-responsive-typography-calculated"
                                                                data-fontsize="34"
                                                                data-lineheight="49.9833px"
                                                              >
                                                                <b>
                                                                  O. PoPI Act
                                                                  No. 4{" "}
                                                                </b>
                                                              </h3>
                                                              <p className="p1">
                                                                Regenesys
                                                                complies with
                                                                the South
                                                                African
                                                                Protection of
                                                                Personal
                                                                Information
                                                                (PoPI) Act No. 4
                                                                of 2013 and will
                                                                therefore not
                                                                forward any
                                                                client
                                                                information to a
                                                                third party
                                                                without the
                                                                client’s
                                                                consent. I
                                                                however
                                                                authorise and
                                                                consent that
                                                                Regenesys may
                                                                share my details
                                                                with its
                                                                subsidiary
                                                                companies.
                                                              </p>
                                                              <p className="p1">
                                                                Regenesys
                                                                reserves the
                                                                right to share
                                                                all student
                                                                related
                                                                information with
                                                                sponsor/employer
                                                                paying for the
                                                                tuition. This
                                                                includes but is
                                                                not limited to
                                                                marks,
                                                                attendance and
                                                                assignment
                                                                submission.
                                                              </p>
                                                              <h3
                                                                className="p1 fusion-responsive-typography-calculated"
                                                                data-fontsize="34"
                                                                data-lineheight="49.9833px"
                                                              >
                                                                <b>
                                                                  P. Warranty{" "}
                                                                </b>
                                                              </h3>
                                                              <p className="p1">
                                                                Every applicant
                                                                or student
                                                                warrants that
                                                                information
                                                                supplied by
                                                                themselves or on
                                                                their
                                                                <span className="Apple-converted-space">
                                                                  behalf
                                                                  regarding
                                                                  prior
                                                                  qualification
                                                                  for entry
                                                                  requirements
                                                                  is
                                                                  true,accurate
                                                                  and legally
                                                                  valid.
                                                                </span>
                                                              </p>
                                                              <p className="p1">
                                                                Should this be
                                                                found not to be
                                                                the case, the
                                                                student or
                                                                applicant will
                                                                be legally bound
                                                                to pay as per
                                                                normal
                                                                cancellation
                                                                clauses, and any
                                                                studies will be
                                                                for non-degree
                                                                purposes.
                                                              </p>
                                                              <h3
                                                                className="p1 fusion-responsive-typography-calculated"
                                                                data-fontsize="34"
                                                                data-lineheight="49.9833px"
                                                              >
                                                                <b>
                                                                  Q. Consent
                                                                  Clauses{" "}
                                                                </b>
                                                              </h3>
                                                              <p className="p1">
                                                                Regenesys
                                                                Management
                                                                reserves the
                                                                right to appoint
                                                                an agent to
                                                                collect
                                                                outstanding
                                                                monies on their
                                                                behalf and to
                                                                institute legal
                                                                proceedings
                                                                against the
                                                                applicant for
                                                                the recovery of
                                                                any monies
                                                                outstanding as a
                                                                result of
                                                                default in
                                                                payment, and in
                                                                such event
                                                                <br />
                                                                the applicant
                                                                acknowledges
                                                                that the
                                                                applicant shall
                                                                be liable for
                                                                all legal costs
                                                                incurred
                                                                <br />
                                                                by Regenesys
                                                                Management in
                                                                the collection
                                                                of the
                                                                outstanding
                                                                balance on the
                                                                scale as between
                                                                attorney or debt
                                                                collectors and
                                                                client,
                                                                including
                                                                collection of
                                                                commission on
                                                                capital,
                                                                interest and
                                                                costs, as well
                                                                as the tracing
                                                                and
                                                                administrative
                                                                costs incurred
                                                                by the appointed
                                                                agent for the
                                                                recovery of any
                                                                amounts owing.
                                                              </p>
                                                              <p className="p1">
                                                                The
                                                                applicant/undersigned
                                                                hereby chooses
                                                                e-mail, sms or
                                                                regular post as
                                                                the
                                                                communication
                                                                method for all
                                                                accounts and
                                                                notices for
                                                                services
                                                                supplied.
                                                              </p>
                                                              <p className="p1">
                                                                The
                                                                applicant/undersigned
                                                                consents to
                                                                Regenesys
                                                                Management using
                                                                a national
                                                                credit database
                                                                for tracing
                                                                purposes should
                                                                the
                                                                applicant/undersigned
                                                                abscond, or
                                                                become otherwise
                                                                untraceable.
                                                              </p>
                                                              <div
                                                                className="page"
                                                                title="Page 4"
                                                              >
                                                                <div className="layoutArea">
                                                                  <div className="column">
                                                                    <p>
                                                                      The
                                                                      applicant/undersigned
                                                                      consents
                                                                      to
                                                                      Regenesys
                                                                      Management
                                                                      being
                                                                      entitled
                                                                      to obtain
                                                                      credit and
                                                                      related
                                                                      information
                                                                      concerning
                                                                      the
                                                                      applicant/undersigned
                                                                      at any
                                                                      time, and
                                                                      to
                                                                      exchange
                                                                      or lodge
                                                                      and/or
                                                                      disclose
                                                                      such
                                                                      information
                                                                      with any
                                                                      credit
                                                                      bureau
                                                                      without
                                                                      any
                                                                      further
                                                                      notice to
                                                                      the
                                                                      applicant/undersigned.
                                                                    </p>
                                                                    <h3
                                                                      className="fusion-responsive-typography-calculated"
                                                                      data-fontsize="34"
                                                                      data-lineheight="49.9833px"
                                                                    >
                                                                      <strong>
                                                                        R.
                                                                        Liability
                                                                        Disclaimer
                                                                      </strong>
                                                                    </h3>
                                                                    <p>
                                                                      Neither
                                                                      Regenesys
                                                                      Management
                                                                      (Pty) Ltd
                                                                      nor any of
                                                                      its
                                                                      directors,
                                                                      subsidiaries,
                                                                      suppliers,
                                                                      employees
                                                                      or agents
                                                                      will be
                                                                      held
                                                                      liable for
                                                                      accidents,
                                                                      illness,
                                                                      losses or
                                                                      damage to
                                                                      private
                                                                      property
                                                                      of
                                                                      whatever
                                                                      nature
                                                                      either in
                                                                      South
                                                                      Africa or
                                                                      abroad, of
                                                                      registered
                                                                      Regenesys
                                                                      students.
                                                                      Students
                                                                      are
                                                                      strongly
                                                                      recommended
                                                                      to seek
                                                                      insurance
                                                                      cover for
                                                                      health and
                                                                      accident,
                                                                      lost
                                                                      luggage
                                                                      and/or
                                                                      personal
                                                                      belongings
                                                                      and trip
                                                                      cancellation.
                                                                    </p>
                                                                    <h3
                                                                      className="fusion-responsive-typography-calculated"
                                                                      data-fontsize="34"
                                                                      data-lineheight="49.9833px"
                                                                    >
                                                                      <strong>
                                                                        S.
                                                                        Firearms
                                                                        and
                                                                        Weapons
                                                                      </strong>
                                                                    </h3>
                                                                    <p>
                                                                      Firearms
                                                                      and
                                                                      anything
                                                                      that can
                                                                      be
                                                                      considered
                                                                      as a
                                                                      weapon
                                                                      (that can
                                                                      injure
                                                                      another
                                                                      person)
                                                                      are
                                                                      prohibited
                                                                      on the
                                                                      Regenesys
                                                                      campus.
                                                                    </p>
                                                                    <h3
                                                                      className="fusion-responsive-typography-calculated"
                                                                      data-fontsize="34"
                                                                      data-lineheight="49.9833px"
                                                                    >
                                                                      <strong>
                                                                        T.
                                                                        Consent
                                                                        to
                                                                        Information
                                                                      </strong>
                                                                    </h3>
                                                                    <p>
                                                                      Regenesys
                                                                      periodically
                                                                      sends out
                                                                      information
                                                                      to advise
                                                                      all
                                                                      registered
                                                                      students
                                                                      and/or
                                                                      signed-up
                                                                      participants
                                                                      of new
                                                                      developments,
                                                                      programmes
                                                                      and events
                                                                      that might
                                                                      be of
                                                                      interest
                                                                      or
                                                                      relevance
                                                                      to their
                                                                      personal
                                                                      development
                                                                      and career
                                                                      advancement.
                                                                      Any
                                                                      student or
                                                                      participant
                                                                      who wishes
                                                                      to stop
                                                                      receiving
                                                                      any such
                                                                      communication
                                                                      from
                                                                      Regenesys
                                                                      is
                                                                      requested
                                                                      to
                                                                      indicate
                                                                      this by
                                                                      opting
                                                                      out, or by
                                                                      sending an
                                                                      e-mail to
                                                                      this
                                                                      effect, to
                                                                      info@regenesys.co.za.
                                                                    </p>
                                                                    <h3
                                                                      className="fusion-responsive-typography-calculated"
                                                                      data-fontsize="34"
                                                                      data-lineheight="49.9833px"
                                                                    >
                                                                      <strong>
                                                                        U.
                                                                        Regenesys
                                                                        Modes of
                                                                        Learning
                                                                      </strong>
                                                                    </h3>
                                                                    <p>
                                                                      In order
                                                                      to make
                                                                      learning
                                                                      accessible
                                                                      to all
                                                                      registered
                                                                      Regenesys
                                                                      students
                                                                      irrespective
                                                                      of their
                                                                      location,
                                                                      Regenesys
                                                                      is
                                                                      investing
                                                                      in
                                                                      e-learning
                                                                      resources.
                                                                      This
                                                                      involves
                                                                      the
                                                                      recording
                                                                      of live
                                                                      classNamees
                                                                      and events
                                                                      for
                                                                      livestreaming
                                                                      and
                                                                      distribution
                                                                      through
                                                                      downloadable
                                                                      video
                                                                      files on
                                                                      Regenesys
                                                                      websites.ln
                                                                      this way
                                                                      Regenesys
                                                                      students
                                                                      have
                                                                      different
                                                                      options to
                                                                      benefit
                                                                      from
                                                                      lectures
                                                                      whether
                                                                      they are
                                                                      able to
                                                                      attend
                                                                      className
                                                                      or not.
                                                                      Regenesys
                                                                      may also
                                                                      use
                                                                      recorded
                                                                      material
                                                                      for
                                                                      demonstration
                                                                      or
                                                                      promotion
                                                                      of its
                                                                      activities
                                                                      or
                                                                      depicted
                                                                      events to
                                                                      future
                                                                      audiences,
                                                                      students
                                                                      give
                                                                      consent to
                                                                      being
                                                                      filmed for
                                                                      live
                                                                      streaming
                                                                      or
                                                                      recording.
                                                                    </p>
                                                                    <h3
                                                                      className="fusion-responsive-typography-calculated"
                                                                      data-fontsize="34"
                                                                      data-lineheight="49.9833px"
                                                                    >
                                                                      <strong>
                                                                        V.
                                                                        Updates
                                                                        to Terms
                                                                        and
                                                                        Conditions
                                                                      </strong>
                                                                    </h3>
                                                                    <p>
                                                                      Regenesys
                                                                      reserves
                                                                      the right
                                                                      to update
                                                                      these
                                                                      terms and
                                                                      conditions
                                                                      from
                                                                      time-to-time.
                                                                      Current
                                                                      terms and
                                                                      conditions
                                                                      are
                                                                      published
                                                                      on
                                                                      Regenesys’
                                                                      website
                                                                      and may be
                                                                      viewed at
                                                                      www.regenesys.net/terms-and-conditions.
                                                                    </p>
                                                                    <h3
                                                                      className="fusion-responsive-typography-calculated"
                                                                      data-fontsize="34"
                                                                      data-lineheight="49.9833px"
                                                                    >
                                                                      <strong>
                                                                        W.
                                                                        Copyright
                                                                        Reserved
                                                                      </strong>
                                                                    </h3>
                                                                    <p>
                                                                      Copyright
                                                                      persists
                                                                      in all
                                                                      materials
                                                                      published
                                                                      on any
                                                                      Regenesys
                                                                      media or
                                                                      website.
                                                                      No part of
                                                                      the
                                                                      material
                                                                      on this
                                                                      website
                                                                      may be
                                                                      produced,
                                                                      stored in
                                                                      or
                                                                      introduced
                                                                      into a
                                                                      retrieval
                                                                      system, or
                                                                      transmitted
                                                                      in any
                                                                      form or by
                                                                      any means,
                                                                      whether
                                                                      electronic,
                                                                      mechanical,
                                                                      photocopying,
                                                                      recording,
                                                                      broadcast,
                                                                      or
                                                                      otherwise,
                                                                      without
                                                                      the
                                                                      written
                                                                      permission
                                                                      of the
                                                                      publisher
                                                                      and/or
                                                                      Regenesys
                                                                      Management.
                                                                    </p>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Grid>

        <DialogActions sx={{ pb: { xs: 2, sm: 2 }, justifyContent: "center" }}>
          <StyledButton
            type="button"
            isGreenWhiteCombination={true}
            onClick={() => {
              onClickShowTerms();
              updateTermsConditions(false);
            }}
            title={"Decline"}
          />
          <StyledButton
            title={"Accept"}
            onClick={() => {
              updateTermsConditions(true);
            }}
          />
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EditGroup;
