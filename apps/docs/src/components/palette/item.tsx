import React from 'react';
import cn from 'classnames';
import {
  Grid,
  Text,
  Tooltip,
  GridProps,
  useClipboard
} from '@nextui-org/react';

interface Props {
  color: string;
  title: string;
  hexColor: string;
  inverted?: boolean;
  textColor?: string;
}

export type ItemProps = Props & GridProps;

const Item: React.FC<ItemProps> = ({
  color,
  title,
  inverted,
  textColor,
  hexColor,
  ...props
}) => {
  const isGradient = color.includes('gradient');

  const { copy } = useClipboard();

  const renderItem = () => {
    return (
      <Grid
        className={cn('color', {
          'is-gradient': isGradient
        })}
        css={{
          size: '100px',
          display: 'flex',
          marginBottom: '20px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: '$default',
          cursor: 'pointer',
          background: color,
          marginRight: '10px',
          br: '$lg',
          '&:hover': {
            transform: 'translateY(5px)'
          },
          '@smMax': {
            size: '80px'
          }
        }}
        {...props}
      >
        {isGradient ? (
          <Text
            className="text"
            css={{
              m: 0,
              fontWeight: '$semibold',
              tt: 'capitalize',
              color: textColor,
              '@smMax': {
                fontSize: '$xs'
              }
            }}
          >
            {title}
          </Text>
        ) : (
          <>
            <Text
              className="text"
              css={{
                m: 0,
                tt: 'capitalize',
                fontWeight: '$semibold',
                color: textColor,
                '@smMax': {
                  fontSize: '$xs'
                }
              }}
            >
              {title}
            </Text>
            <Text
              className="hex-text"
              css={{
                m: 0,
                fontSize: '$tiny',
                color: textColor,
                opacity: 0.8,
                tt: 'uppercase',
                fontWeight: '$bold'
              }}
            >
              {hexColor}
            </Text>
          </>
        )}
      </Grid>
    );
  };

  return (
    <>
      {isGradient ? (
        <Tooltip trigger="click" title="Gradient" content={hexColor}>
          <>{renderItem()}</>
        </Tooltip>
      ) : (
        <Tooltip
          trigger="click"
          content="Copied!"
          onClick={() => copy(hexColor)}
        >
          <>{renderItem()}</>
        </Tooltip>
      )}
    </>
  );
};

const MemoItem = React.memo(Item);

export default MemoItem;
