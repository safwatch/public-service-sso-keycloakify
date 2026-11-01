// import type { JSX } from "keycloakify/tools/JSX";
// import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import Logo from "../../assets/images/app-logo.png";
import { Alert, Button, Checkbox, Form, Input } from "antd";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <Layout>
                <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <h1>{msgStr("updatePasswordTitle")}</h1>
                    <div className={kcClsx("kcFormGroupClass")}>
                        <Form.Item label={msg("passwordNew")} required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Input.Password
                                id="password-new"
                                name="password-new"
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </Form.Item>
                        {messagesPerField.existsError("password") && (
                            <Alert id="input-error-password" message={kcSanitize(messagesPerField.get("password"))} type="error" showIcon />
                        )}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <Form.Item label={msg("passwordConfirm")} required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                            <Input.Password
                                id="password-confirm"
                                name="password-confirm"
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </Form.Item>
                        {messagesPerField.existsError("password-confirm") && (
                            <Alert
                                id="input-error-password-confirm"
                                type="error"
                                message={kcSanitize(messagesPerField.get("password-confirm"))}
                                showIcon
                            />
                        )}
                    </div>
                    <div className={kcClsx("kcFormGroupClass")}>
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")} style={{ marginTop: "12px" }}>
                            <Button type="primary" htmlType="submit">
                                {msgStr("doSubmit")}
                            </Button>
                            {isAppInitiatedAction && (
                                <Button htmlType="submit" name="cancel-aia" value="true" style={{ marginLeft: "12px" }}>
                                    {msg("doCancel")}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </Layout>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    const { kcClsx, i18n } = props;

    const { msg } = i18n;

    return (
        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <Checkbox type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true}>
                        {msg("logoutOtherSessions")}
                    </Checkbox>
                </div>
            </div>
        </div>
    );
}

// function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
//     const { kcClsx, i18n, passwordInputId, children } = props;

//     const { msgStr } = i18n;

//     const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

//     return (
//         <div className={kcClsx("kcInputGroup")}>
//             {children}
//             <button
//                 type="button"
//                 className={kcClsx("kcFormPasswordVisibilityButtonClass")}
//                 aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
//                 aria-controls={passwordInputId}
//                 onClick={toggleIsPasswordRevealed}
//             >
//                 <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
//             </button>
//         </div>
//     );
// }
