import React from 'react';

export type IconName = 
  | 'play' | 'mic' | 'star' | 'star-filled' | 'book-open' | 'settings' 
  | 'eye' | 'eye-off' | 'check-circle' | 'x-circle' | 'alert-triangle'
  | 'arrow-right' | 'lightbulb' | 'sparkles' | 'trash' | 'loading';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

interface IconDefinition {
  viewBox: string;
  paths: Array<{
    d: string;
    fillRule?: 'evenodd' | 'nonzero';
    clipRule?: 'evenodd' | 'nonzero';
    strokeLinecap?: 'round' | 'butt' | 'square';
    strokeLinejoin?: 'round' | 'miter' | 'bevel';
    strokeWidth?: number;
    fill?: string;
    stroke?: string;
  }>;
}

const icons: Record<IconName, IconDefinition> = {
  'play': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'mic': {
    viewBox: '0 0 24 24',
    paths: [{
      d: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      fill: 'none',
      stroke: 'currentColor'
    }]
  },
  'star': {
    viewBox: '0 0 24 24',
    paths: [{
      d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2
    }]
  },
  'star-filled': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
      fill: 'currentColor'
    }]
  },
  'book-open': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'settings': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z',
      fill: 'currentColor'
    }]
  },
  'eye': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M10 12a2 2 0 100-4 2 2 0 000 4z',
      fill: 'currentColor'
    }, {
      d: 'M10 3C6 3 2.73 5.11 1.18 8.37a.9.9 0 000 .63c1.55 3.26 4.82 5.37 8.82 5.37s7.27-2.11 8.82-5.37a.9.9 0 000-.63C17.27 5.11 14 3 10 3zM10 13a3 3 0 110-6 3 3 0 010 6z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    paths: [{
      d: 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21M3 3l18 18',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      fill: 'none',
      stroke: 'currentColor'
    }]
  },
  'check-circle': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'x-circle': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'alert-triangle': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'arrow-right': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'lightbulb': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      fill: 'currentColor'
    }]
  },
  'sparkles': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M5 4a1 1 0 00-2 0v.1c0 .316-.28.592-.588.674A1 1 0 002 5.9v.2a1 1 0 00.412 1.126c.308.082.588.358.588.674V8a1 1 0 002 0v-.1c0-.316.28-.592.588-.674A1 1 0 006 6.1v-.2a1 1 0 00-.412-1.126A.676.676 0 005 4.9V4zM8 1a1 1 0 012 0v.5c0 .316.316.632.707.707L11 2.293a1 1 0 010 1.414l-.293.293c-.391.075-.707.391-.707.707V5a1 1 0 11-2 0v-.293c0-.316-.316-.632-.707-.707L7 3.707a1 1 0 010-1.414L7.293 2C7.684 1.925 8 1.609 8 1.293V1zM13 4a1 1 0 00-1 1v.1c0 .4-.4.8-.8.8H11a1 1 0 000 2h.2c.4 0 .8.4.8.8V9a1 1 0 002 0v-.3c0-.4.4-.8.8-.8H15a1 1 0 100-2h-.2c-.4 0-.8-.4-.8-.8V5a1 1 0 00-1-1z',
      fill: 'currentColor'
    }]
  },
  'trash': {
    viewBox: '0 0 20 20',
    paths: [{
      d: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z',
      fill: 'currentColor'
    }, {
      d: 'M3 5a2 2 0 012-2h1a1 1 0 000 2H5v9a2 2 0 002 2h6a2 2 0 002-2V5h-1a1 1 0 100-2h1a2 2 0 012 2v10a4 4 0 01-4 4H7a4 4 0 01-4-4V5z',
      fill: 'currentColor'
    }]
  },
  'loading': {
    viewBox: '0 0 24 24',
    paths: [{
      d: 'M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z',
      fill: 'currentColor'
    }]
  }
};

const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => {
  const iconDef = icons[name];
  
  if (!iconDef) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const { viewBox, paths } = iconDef;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill={path.fill}
          stroke={path.stroke}
          fillRule={path.fillRule}
          clipRule={path.clipRule}
          strokeLinecap={path.strokeLinecap}
          strokeLinejoin={path.strokeLinejoin}
          strokeWidth={path.strokeWidth}
        />
      ))}
    </svg>
  );
};

export default Icon;