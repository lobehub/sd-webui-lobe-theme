import { ActionIcon, CopyButton } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import SyntaxHighlighter from '@/modules/PromptHighlight/features/SyntaxHighlighter';
import { DivProps } from '@/types';

const useStyles = createStyles(
  ({ token, css, cx, prefixCls }, type: 'ghost' | 'block' | 'pure') => {
    const prefix = `${prefixCls}-highlighter`;
    const buttonHoverCls = `${prefix}-hover-btn`;
    const langHoverCls = `${prefix}-hover-lang`;

    const typeStylish = css`
      background-color: ${type === 'block' ? token.colorFillTertiary : 'transparent'};
      border: 1px solid ${type === 'block' ? 'transparent' : token.colorBorder};

      &:hover {
        background-color: ${type === 'block' ? token.colorFillTertiary : token.colorFillQuaternary};
      }
    `;

    return {
      container: cx(
        prefix,
        type !== 'pure' && typeStylish,
        css`
          position: relative;
          overflow: auto;
          border-radius: ${token.borderRadius}px;
          transition: background-color 100ms ${token.motionEaseOut};

          &:hover {
            .${buttonHoverCls} {
              opacity: 1;
            }

            .${langHoverCls} {
              opacity: 1;
            }
          }

          .prism-code {
            background: none !important;
          }

          pre {
            margin: 0 !important;
            padding: ${type === 'pure' ? 0 : `16px 24px`} !important;
            background: none !important;
          }

          code {
            background: transparent !important;
          }
        `,
      ),
      header: css`
        padding: 4px 8px;
        background: ${token.colorFillQuaternary};
      `,
      select: css`
        .${prefixCls}-select-selection-item {
          min-width: 100px;
          padding-inline-end: 0 !important;
          color: ${token.colorTextDescription};
          text-align: center;
        }
      `,
    };
  },
);

export interface HighlighterProps extends DivProps {
  /**
   * @description The code content to be highlighted
   */
  children: string;
  showCopy?: boolean;
  /**
   * @description The language of the code content
   */
  title?: string;
}

export const Highlighter = memo<HighlighterProps>(
  ({ children, title = 'Prompt', className, style, showCopy = true, ...rest }) => {
    const [expand, setExpand] = useState(true);
    const { styles, cx } = useStyles('block');
    const container = cx(styles.container, className);

    return (
      <div className={container} data-code-type="highlighter" style={style} {...rest}>
        <Flexbox align={'center'} className={styles.header} horizontal justify={'space-between'}>
          <ActionIcon
            icon={expand ? ChevronDown : ChevronRight}
            onClick={() => setExpand(!expand)}
            size={{ blockSize: 24, fontSize: 14, strokeWidth: 3 }}
          />

          <ActionIcon size={{ blockSize: 24 }} style={{ width: 'unset' }}>
            {title}
          </ActionIcon>
          {showCopy ? (
            <CopyButton
              content={children}
              placement="left"
              size={{ blockSize: 24, fontSize: 14, strokeWidth: 2 }}
            />
          ) : (
            <div />
          )}
        </Flexbox>
        <div style={expand ? {} : { height: 0, overflow: 'hidden' }}>
          <SyntaxHighlighter>{children}</SyntaxHighlighter>
        </div>
      </div>
    );
  },
);

export default Highlighter;
