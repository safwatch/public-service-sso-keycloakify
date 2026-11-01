import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import Logo from "../../assets/images/app-logo.png";
import { Alert, Button, Checkbox, Form, Input, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;
    const title = msgStr("loginTotpTitle");

    const [activeTab, setActiveTab] = useState("1");
    function onChangeTab(value: string) {
        setActiveTab(value);
    }

    const error = messagesPerField.existsError("totp") || messagesPerField.existsError("userLabel");

    useEffect(() => {
        if (error) {
            onChangeTab("2");
        }
    }, [error]);

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "",
            children: (
                <ol id="kc-totp-settings">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>

                        <ul id="kc-totp-supported-apps">
                            {totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p>
                                    <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                </p>
                                <p>
                                    <a href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul>
                                    <li id="kc-totp-type">
                                        {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                    </li>
                                    <li id="kc-totp-algorithm">
                                        {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                    </li>
                                    <li id="kc-totp-digits">
                                        {msg("loginTotpDigits")}: {totp.policy.digits}
                                    </li>
                                    {totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period">
                                            {msg("loginTotpInterval")}: {totp.policy.period}
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter">
                                            {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img id="kc-totp-secret-qr-code" src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" />
                            <br />
                            <p>
                                <a href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol>
            )
        },
        {
            key: "2",
            label: "",
            children: (
                <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-totp-settings-form" method="post">
                    <div className={kcClsx("kcFormGroupClass")}>
                        <Form.Item label={msg("authenticatorCode")} labelCol={{ span: 24 }} required>
                            <Input required id="totp" name="totp" autoComplete="off" aria-invalid={messagesPerField.existsError("totp")} />
                        </Form.Item>
                        {messagesPerField.existsError("totp") && (
                            <Alert id="input-error-otp-code" message={kcSanitize(messagesPerField.get("totp"))} type="error" showIcon />
                        )}

                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <Form.Item label={msg("loginTotpDeviceName")} labelCol={{ span: 24 }} required>
                            <Input
                                required
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                aria-invalid={messagesPerField.existsError("userLabel")}
                            />
                        </Form.Item>
                        {messagesPerField.existsError("userLabel") && (
                            <Alert id="input-error-otp-label" message={kcSanitize(messagesPerField.get("userLabel"))} />
                        )}
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <Checkbox type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true}>
                            {msg("logoutOtherSessions")}
                        </Checkbox>
                    </div>

                    <div className="button-action">
                        {isAppInitiatedAction ? (
                            <>
                                <Button htmlType="submit" id="saveTOTPBtn" type="primary">
                                    {msgStr("doSubmit")}
                                </Button>
                                <Button htmlType="submit" id="cancelTOTPBtn" name="cancel-aia" value="true" danger>
                                    {msg("doCancel")}
                                </Button>
                            </>
                        ) : (
                            <Button type="primary" htmlType="submit" id="saveTOTPBtn">
                                {msgStr("doSubmit")}
                            </Button>
                        )}
                    </div>
                </form>
            )
        }
    ];

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <Layout>
                <div className="totp-wrapper">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <h1>{title}</h1>
                    <Tabs activeKey={activeTab} items={items} onChange={onChangeTab} />
                    <Button
                        style={{ marginTop: "12px" }}
                        icon={activeTab === "1" ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
                        onClick={() => onChangeTab(activeTab === "1" ? "2" : "1")}
                    >
                        {activeTab === "1" ? "Selanjutnya" : "Sebelumnya"}
                    </Button>
                </div>
            </Layout>
        </Template>
    );
}

// function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
//     const { kcClsx, i18n } = props;

//     const { msg } = i18n;

//     return (
//         <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
//             <div className={kcClsx("kcFormOptionsWrapperClass")}>
//                 <div className="checkbox">
//                     <label>
//                         <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
//                         {msg("logoutOtherSessions")}
//                     </label>
//                 </div>
//             </div>
//         </div>
//     );
// }
