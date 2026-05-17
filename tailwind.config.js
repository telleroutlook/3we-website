/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        "surface": "#f9f9f9",
        "surface-studio": "#f5f5f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f3",
        "text-primary": "#0d0d0b",
        "text-secondary": "#52524e",
        "text-tertiary": "#a0a098",
        "primary": "#815500",
        "primary-container": "#e8a020",
        "on-primary-container": "#5b3b00",
        "secondary-container": "#ffce52",
        "on-secondary-container": "#735700",
        "secondary-fixed-dim": "#f0c046",
        "primary-fixed": "#ffddb2",
        "primary-fixed-dim": "#ffb94c",
        "tertiary": "#006d36",
        "tertiary-container": "#2bc76c",
        "tertiary-fixed-dim": "#4de082",
        "code-base": "#1a1a18",
        "border-subtle": "#e5e5e0",
        "outline": "#847562",
        "outline-variant": "#d6c4ae",
        "background": "#f9f9f9",
        "on-surface": "#1a1c1c",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f0f1f1",
        "error": "#ba1a1a"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "container-max": "1280px",
        "section-gap": "120px",
        "gutter": "24px",
        "margin-mobile": "16px",
        "margin-desktop": "48px"
      },
      fontFamily: {
        "display": ["Outfit"],
        "body": ["DM Sans"],
        "mono": ["JetBrains Mono"]
      },
      fontSize: {
        "headline-xl": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-lg": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-md": ["32px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "headline-sm": ["24px", { "lineHeight": "1.4", "fontWeight": "500" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600" }],
        "label-code": ["14px", { "lineHeight": "1.5", "fontWeight": "450" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
}
