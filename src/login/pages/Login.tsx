import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Logo from "../../assets/images/app-logo.png";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import { Layout } from "../../base/components";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const labelUsername = !realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email");
    const placeholderUsername = labelUsername?.props?.dangerouslySetInnerHTML?.__html;

    const labelPassword = msg("password");
    const placeholderPassword = labelPassword?.props?.dangerouslySetInnerHTML?.__html;

    const showInfo = realm.password && realm.registrationAllowed && !registrationDisabled;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("loginAccountTitle")}
            displayInfo={false}
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <Layout>
                <div id="kc-form">
                    <div id="kc-form-wrapper">
                        {kcContext.message && (
                            <Alert
                                message={kcSanitize(kcContext.message.summary)}
                                type={kcContext.message.type === "error" ? "error" : kcContext.message.type === "warning" ? "warning" : "info"}
                                showIcon
                                style={{ marginBottom: 24 }}
                            />
                        )}

                        <div className="logo-wrapper">
                            <img src={Logo} alt="Public Service Portal" className="logo" />
                        </div>
                        <h1>Masuk Portal</h1>
                        <p>Selamat datang! Silahkan masuk untuk melanjutkan.</p>
                        {realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                            >
                                {/* {messagesPerField.existsError("username", "password") && (
                                    <Alert message={kcSanitize(messagesPerField.getFirstError("username", "password"))} type="error" />
                                )}

                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <Alert type="error" message={kcSanitize(messagesPerField.getFirstError("username", "password"))} />
                                )} */}

                                {!usernameHidden && (
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <Form.Item label={labelUsername} labelCol={{ span: 24 }} required>
                                            <Input
                                                tabIndex={2}
                                                id="username"
                                                name="username"
                                                required={true}
                                                autoFocus={true}
                                                autoComplete="username"
                                                defaultValue={login.username ?? ""}
                                                placeholder={`Masukkan ${placeholderUsername}`}
                                                aria-invalid={messagesPerField.existsError("username", "password")}
                                            />
                                        </Form.Item>
                                    </div>
                                )}

                                <div className={kcClsx("kcFormGroupClass")}>
                                    <Form.Item
                                        label={
                                            <div className="label-password">
                                                {labelPassword}
                                                {realm.resetPasswordAllowed && (
                                                    <div>
                                                        <a tabIndex={6} href={url.loginResetCredentialsUrl} className="forgotPassword">
                                                            {msg("doForgotPassword")}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        required
                                        labelCol={{ span: 24 }}
                                    >
                                        <Input.Password
                                            type="password"
                                            required={true}
                                            placeholder={`Masukkan ${placeholderPassword}`}
                                            tabIndex={3}
                                            id="password"
                                            name="password"
                                            autoComplete="current-password"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                    </Form.Item>
                                </div>

                                {realm.rememberMe && (
                                    <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                        <Checkbox defaultChecked={!!login.rememberMe} tabIndex={5} id="rememberMe" name="rememberMe">
                                            {msg("rememberMe")}
                                        </Checkbox>
                                    </div>
                                )}

                                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                    <Button
                                        type="primary"
                                        disabled={isLoginButtonDisabled}
                                        tabIndex={7}
                                        name="login"
                                        id="kc-login"
                                        htmlType="submit"
                                        className="button-submit"
                                    >
                                        {msgStr("doLogIn")}
                                    </Button>
                                </div>

                                {showInfo && (
                                    <div id="kc-registration-container">
                                        <div id="kc-registration">
                                            <span className="register">
                                                {msg("noAccount")}{" "}
                                                <a tabIndex={8} href={url.registrationUrl}>
                                                    {msg("doRegister")}
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </Layout>
        </Template>
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
