import { createGlobalStyle, css } from 'antd-style';
import { readableColor } from 'polished';

const GlobalStyle = createGlobalStyle`
	${({ theme }) => {
    const checkBoxIcon = `data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='${encodeURIComponent(
      theme.colorBgLayout,
    )}' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e`;
    const radioIcon = `data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='${encodeURIComponent(
      theme.colorBgLayout,
    )}' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e`;
    return css`
    :root,
    .dark {
      --primary-50: ${theme.geekblue1};
      --primary-100: ${theme.geekblue2};
      --primary-200: ${theme.geekblue3};
      --primary-300: ${theme.geekblue4};
      --primary-400: ${theme.geekblue5};
      --primary-500: ${theme.geekblue6};
      --primary-600: ${theme.geekblue7};
      --primary-700: ${theme.geekblue8};
      --primary-800: ${theme.geekblue9};
      --primary-900: ${theme.geekblue10};
      --primary-950: ${theme.geekblue11};
      --secondary-50: ${theme.geekblue1};
      --secondary-100: ${theme.geekblue2};
      --secondary-200: ${theme.geekblue3};
      --secondary-300: ${theme.geekblue4};
      --secondary-400: ${theme.geekblue5};
      --secondary-500: ${theme.geekblue6};
      --secondary-600: ${theme.geekblue7};
      --secondary-700: ${theme.geekblue8};
      --secondary-800: ${theme.geekblue9};
      --secondary-900: ${theme.geekblue10};
      --secondary-950: ${theme.geekblue11};
      --neutral-50: ${theme.colorText};
      --neutral-100: ${theme.colorText};
      --neutral-200: ${theme.colorTextSecondary};
      --neutral-300: ${theme.colorTextTertiary};
      --neutral-400: ${theme.colorTextQuaternary};
      --neutral-500: ${theme.colorFill};
      --neutral-600: ${theme.colorFillSecondary};
      --neutral-700: ${theme.colorFillTertiary};
      --neutral-800: ${theme.colorFillQuaternary};
      --neutral-900: ${theme.colorBgElevated};
      --neutral-950: ${theme.colorBgContainer};
      --spacing-xxs: ${theme.paddingXXS / 4}px;
      --spacing-xs: ${theme.paddingXS / 4}px;
      --spacing-sm: ${theme.paddingSM / 4}px;
      --spacing-md: ${theme.paddingMD / 4}px;
      --spacing-lg: ${theme.paddingLG / 4}px;
      --spacing-xl: ${theme.paddingXL / 4}px;
      --spacing-xxl: ${theme.paddingXL / 4}px;
      --radius-xxs: ${theme.borderRadiusXS}px;
      --radius-xs: ${theme.borderRadiusXS}px;
      --radius-sm: ${theme.borderRadiusSM}px;
      --radius-md: ${theme.borderRadius}px;
      --radius-lg: ${theme.borderRadius}px;
      --radius-xl: ${theme.borderRadiusLG}px;
      --radius-xxl: ${theme.borderRadiusLG}px;
      --text-xxs: ${theme.fontSizeSM}px;
      --text-xs: ${theme.fontSizeSM}px;
      --text-sm: ${theme.fontSize}px;
      --text-md: ${theme.fontSize}px;
      --text-lg: ${theme.fontSizeLG}px;
      --text-xl: ${theme.fontSizeXL}px;
      --text-xxl: ${theme.fontSizeXL}px;
      --font: ${theme.fontFamily};
      --font-mono: ${theme.fontFamilyCode};
      --body-background-fill: ${theme.colorBgLayout};
      --body-text-color: ${theme.colorText};
      --body-text-size: ${theme.fontSize}px;
      --body-text-weight: 400;
      --embed-radius: var(--radius-lg);
      --color-accent: ${theme.colorPrimary};
      --color-accent-soft: ${theme.colorPrimaryHover};
      --background-fill-primary: ${theme.colorBgLayout};
      --background-fill-secondary: var(--neutral-50);
      --border-color-accent: ${theme.colorBorder};
      --border-color-primary: ${theme.colorBorderSecondary};
      --link-text-color: ${theme.colorInfoText};
      --link-text-color-active: ${theme.colorInfoTextActive};
      --link-text-color-hover: ${theme.colorInfoTextHover};
      --link-text-color-visited: ${theme.colorInfoText};
      --body-text-color-subdued: ${theme.colorTextDescription};
      --shadow-drop: ${theme.boxShadowSecondary};
      --shadow-drop-lg: ${theme.boxShadow};
      --shadow-inset: ${theme.boxShadowSecondary} inset;
      --shadow-spread: 3px;
      --block-background-fill: ${theme.colorBgContainer};
      --block-border-color: ${theme.colorBorderSecondary};
      --block-border-width: 1px;
      --block-info-text-color: ${theme.colorTextSecondary};
      --block-info-text-size: var(--text-sm);
      --block-info-text-weight: 400;
      --block-label-background-fill: ${theme.colorFillSecondary};
      --block-label-border-color: ${theme.colorBorderSecondary};
      --block-label-border-width: 1px;
      --block-label-shadow: ${theme.boxShadowTertiary};
      --block-label-text-color: ${theme.colorText}
      --block-label-margin: 0;
      --block-label-padding: var(--spacing-sm) var(--spacing-lg);
      --block-label-radius: ${theme.borderRadius}px;
      --block-label-right-radius: ${theme.borderRadius}px;
      --block-label-text-size: var(--text-sm);
      --block-label-text-weight: 400;
      --block-padding: var(--spacing-xl) calc(var(--spacing-xl) + 2px);
      --block-radius: var(--radius-lg);
      --block-shadow: ${theme.boxShadowSecondary};
      --block-title-background-fill: none;
      --block-title-border-color: none;
      --block-title-border-width: 0;
      --block-title-text-color: ${theme.colorTextDescription};
      --block-title-padding: 0;
      --block-title-radius: none;
      --block-title-text-size: var(--text-md);
      --block-title-text-weight: 400;
      --container-radius: var(--radius-lg);
      --form-gap-width: 1px;
      --layout-gap: var(--spacing-xxl);
      --panel-background-fill: ${theme.colorBgContainer};
      --panel-border-color: ${theme.colorBorderSecondary};
      --panel-border-width: 0;
      --section-header-text-size: var(--text-md);
      --section-header-text-weight: 400;
      --chatbot-code-background-color: ${theme.colorBgContainer};
      --checkbox-background-color: ${theme.colorFillTertiary};
      --checkbox-background-color-focus: ${theme.colorFillSecondary};
      --checkbox-background-color-hover: ${theme.colorFillSecondary};
      --checkbox-background-color-selected: ${theme.colorText};
      --checkbox-border-color: ${theme.colorBorderSecondary};
      --checkbox-border-color-focus: ${theme.colorBorder};
      --checkbox-border-color-hover: ${theme.colorBorder};
      --checkbox-border-color-selected: ${theme.colorText};
      --checkbox-border-radius: ${theme.borderRadiusXS}px;
      --checkbox-border-width: 1px;
      --checkbox-label-background-fill: linear-gradient(
        to top,
        ${theme.colorFillTertiary},
        ${theme.colorBgLayout}
      );
      --checkbox-label-background-fill-hover: linear-gradient(
        to top,
        ${theme.colorFillSecondary},
        ${theme.colorBgLayout}
      );
      --checkbox-label-background-fill-selected: ${theme.colorFillSecondary};
      --checkbox-label-border-color: ${theme.colorBorderSecondary};
      --checkbox-label-border-color-hover: ${theme.colorBorder};
      --checkbox-label-border-width: 1px;
      --checkbox-label-gap: var(--spacing-lg);
      --checkbox-label-padding: var(--spacing-md) calc(2 * var(--spacing-md));
      --checkbox-label-shadow: none;
      --checkbox-label-text-size: var(--text-md);
      --checkbox-label-text-weight: 400;
      --checkbox-check: url(${checkBoxIcon});
      --radio-circle: url(${radioIcon});
      --checkbox-shadow: none;
      --checkbox-label-text-color: ${theme.colorTextDescription};
      --checkbox-label-text-color-selected: ${theme.colorText};
      --error-background-fill: linear-gradient(
        to right,
        ${theme.colorErrorBg},
        ${theme.colorFillSecondary}
      );
      --error-border-color: ${theme.colorErrorBorder};
      --error-border-width: 1px;
      --error-text-color: ${theme.colorErrorText};
      --input-background-fill: ${theme.colorFillTertiary};
      --input-background-fill-focus: ${theme.colorFillSecondary};
      --input-background-fill-hover: ${theme.colorFillSecondary};
      --input-border-color: ${theme.colorBorderSecondary};
      --input-border-color-focus: ${theme.colorBorder};
      --input-border-color-hover: ${theme.colorBorder};
      --input-border-width: 1px;
      --input-padding: var(--spacing-xl);
      --input-placeholder-color: ${theme.colorTextQuaternary};
      --input-radius: var(--radius-lg);
      --input-shadow: none;
      --input-shadow-focus: none;
      --input-text-size: var(--text-md);
      --input-text-weight: 400;
      --loader-color: ${theme.colorFillSecondary};
      --prose-text-size: var(--text-md);
      --prose-text-weight: 400;
      --prose-header-text-weight: 600;
      --slider-color: ${theme.colorPrimary};
      --stat-background-fill: linear-gradient(to right, 
      ${theme.colorInfo}, 
      ${theme.colorInfoHover});
      --table-border-color: ${theme.colorBorderSecondary};
      --table-even-background-fill: transparent;
      --table-odd-background-fill: ${theme.colorFillTertiary};
      --table-radius: var(--radius-lg);
      --table-row-focus: ${theme.colorFillSecondary};
      --button-border-width: 1px;
      --button-cancel-background-fill: ${theme.colorError};
      --button-cancel-background-fill-hover: ${theme.colorErrorHover};
      --button-cancel-border-color: ${theme.colorErrorBorder};
      --button-cancel-border-color-hover: ${theme.colorErrorBorderHover};
      --button-cancel-text-color: ${readableColor(theme.colorError)};
      --button-cancel-text-color-hover: ${readableColor(theme.colorError)};
      --button-large-padding: var(--spacing-lg) calc(2 * var(--spacing-lg));
      --button-large-radius: var(--radius-lg);
      --button-large-text-size: var(--text-lg);
      --button-large-text-weight: 600;
      --button-primary-background-fill: ${theme.colorPrimary};
      --button-primary-background-fill-hover: ${theme.colorPrimaryHover};
      --button-primary-border-color: ${theme.colorPrimaryBorder};
      --button-primary-border-color-hover: ${theme.colorPrimaryBorderHover};
      --button-primary-text-color: ${readableColor(theme.colorPrimary)};
      --button-primary-text-color-hover: ${readableColor(theme.colorPrimary)};
      --button-secondary-background-fill: ${theme.colorFillSecondary};
      --button-secondary-background-fill-hover:  ${theme.colorFill};;
      --button-secondary-border-color: ${theme.colorBorderSecondary};
      --button-secondary-border-color-hover: ${theme.colorBorder};
      --button-secondary-text-color: ${theme.colorTextSecondary};
      --button-secondary-text-color-hover: ${theme.colorText};
      --button-shadow: none;
      --button-shadow-active: none;
      --button-shadow-hover: none;
      --button-small-padding: var(--spacing-sm) calc(2 * var(--spacing-sm));
      --button-small-radius: var(--radius-lg);
      --button-small-text-size: var(--text-md);
      --button-small-text-weight: 400;
      --button-transition: none;
    }

    .ant-tooltip-inner {
      display: flex;
      align-items: center;
      justify-content: center;

      min-height: unset;
      padding: 4px 8px;

      color: ${theme.colorBgLayout};

      background-color: ${theme.colorText} !important;
      border-radius: ${theme.borderRadiusSM}px;
    }

    .ant-tooltip-arrow {
      &::before,
      &::after {
        background: ${theme.colorText} !important;
      }
    }

		button {
			cursor: pointer;
			background: ${theme.colorFillSecondary};

			&:hover {
				background: ${theme.colorFill};
			}
		}
		
		input[type="range"]{
			cursor: pointer;

			height: 3px;
			margin-top: 8px;

			appearance: none;
			background: ${theme.colorBorder};
			border-radius: ${theme.borderRadiusXS}px;
			outline: none;

			&::-webkit-slider-thumb {
				width: 12px;
				height:16px;

				appearance: none;
				background: ${theme.colorBgElevated}; 
				border: 1px solid ${theme.colorBorder};
				border-radius: ${theme.borderRadiusSM}px;

				&:hover,&:active {
					background: ${theme.colorText};
					border-color: ${theme.colorText};
				}
			}

			&:hover {
				background: ${theme.colorTextDescription};
			}

			&:active {
				background: ${theme.colorPrimary};
			}
		}
  `;
  }}
`;

export default GlobalStyle;
