import { Fragment, useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Logo from "../../assets/images/app-logo.png";
import { Layout } from "../../base/components";
import { Alert, Button, Form, Input, Radio } from "antd";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;
    const title = msgStr("doLogIn");

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <Layout>
                <form
                    id="kc-otp-login-form"
                    className={kcClsx("kcFormClass")}
                    action={url.loginAction}
                    onSubmit={() => {
                        setIsSubmitting(true);
                        return true;
                    }}
                    method="post"
                >
                    <div className="logo-wrapper" style={{ marginBottom: "16px" }}>
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <h1>{title}</h1>
                    <div className="otp-credential">
                        {otpLogin.userOtpCredentials.length > 1 && (
                            <div className={kcClsx("kcFormGroupClass")}>
                                <div className={kcClsx("kcInputWrapperClass")}>
                                    <Radio.Group block optionType="button" buttonStyle="solid">
                                        {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                            <Fragment key={index}>
                                                <Radio
                                                    id={`kc-otp-credential-${index}`}
                                                    type="radio"
                                                    name="selectedCredentialId"
                                                    value={otpCredential.id}
                                                    defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                                >
                                                    {otpCredential.userLabel}
                                                </Radio>
                                                {/* <input
                                                    id={`kc-otp-credential-${index}`}
                                                    className={kcClsx("kcLoginOTPListInputClass")}
                                                    type="radio"
                                                    name="selectedCredentialId"
                                                    value={otpCredential.id}
                                                    defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                                />
                                                <label htmlFor={`kc-otp-credential-${index}`} className={kcClsx("kcLoginOTPListClass")} tabIndex={index}>
                                                    <span className={kcClsx("kcLoginOTPListItemHeaderClass")}>
                                                        <span className={kcClsx("kcLoginOTPListItemIconBodyClass")}>
                                                            <i className={kcClsx("kcLoginOTPListItemIconClass")} aria-hidden="true"></i>
                                                        </span>
                                                        <span className={kcClsx("kcLoginOTPListItemTitleClass")}>{otpCredential.userLabel}</span>
                                                    </span>
                                                </label> */}
                                            </Fragment>
                                        ))}
                                    </Radio.Group>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <Form.Item label={msg("loginOtpOneTime")} required>
                            <Input
                                id="otp"
                                name="otp"
                                autoComplete="off"
                                type="text"
                                required
                                autoFocus
                                aria-invalid={messagesPerField.existsError("totp")}
                            />
                        </Form.Item>
                        {messagesPerField.existsError("totp") && <Alert message={kcSanitize(messagesPerField.get("totp"))} type="error" showIcon />}
                    </div>

                    <div className="button-action">
                        <Button type="primary" name="login" id="kc-login" htmlType="submit" disabled={isSubmitting}>
                            {msgStr("doLogIn")}
                        </Button>
                    </div>
                </form>
            </Layout>
        </Template>
    );
}
