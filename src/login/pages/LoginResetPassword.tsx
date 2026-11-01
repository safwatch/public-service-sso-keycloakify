import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import { Alert, Button, Flex, Form, Input } from "antd";
import Logo from "../../assets/images/app-logo.png";
import { LeftCircleOutlined } from "@ant-design/icons";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const info = realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction");

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <Layout>
                <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <h1>{msgStr("emailForgotTitle")}</h1>
                    <div className={kcClsx("kcFormGroupClass")}>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            required
                            label={
                                !realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                      ? msg("usernameOrEmail")
                                      : msg("email")
                            }
                        >
                            <Input
                                id="username"
                                name="username"
                                autoFocus
                                defaultValue={auth.attemptedUsername ?? ""}
                                aria-invalid={messagesPerField.existsError("username")}
                            />
                        </Form.Item>
                        {messagesPerField.existsError("username") && (
                            <Alert id="input-error-username" type="error" message={kcSanitize(messagesPerField.get("username"))} showIcon />
                        )}
                    </div>
                    <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <Button type="primary" htmlType="submit" style={{ marginTop: "0px" }}>
                                {msgStr("doSubmit")}
                            </Button>
                        </div>
                        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                <span>
                                    <a href={url.loginUrl}>
                                        <Flex style={{ marginTop: "24px" }} gap={4} align="center">
                                            <LeftCircleOutlined />
                                            {msg("backToLogin")}
                                        </Flex>
                                    </a>
                                </span>
                            </div>
                        </div>
                        {info && <Alert style={{ marginTop: "24px" }} message={info} type="info" showIcon />}
                    </div>
                </form>
            </Layout>
        </Template>
    );
}
