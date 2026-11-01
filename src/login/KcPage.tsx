import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { ConfigProvider } from "antd";
import "../assets/styles/index.less";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
const Login = lazy(() => import("./pages/Login"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const LoginOauthGrant = lazy(() => import("./pages/LoginOauthGrant"));
const Error = lazy(() => import("./pages/Error"));
const Info = lazy(() => import("./pages/Info"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const LoginActionsRequired = lazy(() => import("./pages/LoginActionsRequired"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#307bc4"
                }
            }}
        >
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-config-totp.ftl":
                            return (
                                <LoginConfigTotp
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-otp.ftl":
                            return (
                                <LoginOtp
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-oauth-grant.ftl":
                            return (
                                <LoginOauthGrant
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "error.ftl":
                            return (
                                <Error
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "info.ftl":
                            return (
                                <Info
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-verify-email.ftl":
                            return (
                                <LoginVerifyEmail
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-reset-password.ftl":
                            return (
                                <LoginResetPassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-update-password.ftl":
                            return (
                                <LoginUpdatePassword
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        case "login-actions-required.ftl":
                            return (
                                <LoginActionsRequired
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={false}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </Suspense>
        </ConfigProvider>
    );
}

const classes = {
    kcHtmlClass: "",
    kcBodyClass: ""
} satisfies { [key in ClassKey]?: string };
