import type { AstroIntegration } from "astro";

export default function stellarKitCore(): AstroIntegration {
  return {
    name: "@stellar-kit/core",
    hooks: {
      "astro:config:setup": ({ injectScript, logger }) => {
        const gtmId = process.env.PUBLIC_GTM_ID;

        if (!gtmId) {
          logger.warn(
            "@stellar-kit/core: PUBLIC_GTM_ID environment variable is not set. " +
              "Google Tag Manager script will not be injected. " +
              "Set PUBLIC_GTM_ID in your environment to enable GTM tracking."
          );
        } else {
          // Inject GTM script into page head
          injectScript(
            "head-inline",
            `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `
          );
        }
      },
    },
  };
}
