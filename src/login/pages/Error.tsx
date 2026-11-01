import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Layout } from "../../base/components";
import Logo from "../../assets/images/app-logo.png";
import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    const portalUrl = kcContext.properties.PORTAL_URL;
    const portalLabel = kcContext.properties.PORTAL_LABEL;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <Layout>
                <div id="kc-error-message">
                    <div className="logo-wrapper">
                        <img src={Logo} alt="Public Service Portal" className="logo" />
                    </div>
                    <p className="instruction" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                    {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                        <Button type="primary" href={portalUrl} id="kc-login-action" className="button-submit" block style={{ marginTop: 20 }}>
                            {portalLabel} <DoubleRightOutlined />
                        </Button>
                    )}
                </div>
            </Layout>
        </Template>
    );
}
