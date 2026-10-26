import { forwardRef } from 'react';

// Splits text into animatable spans.
// mode="chars": each character wrapped (words kept together so lines break naturally)
// mode="words": each word wrapped
// mode="lines": pass an array to `text`; each line is wrapped in an overflow mask
const SplitText = forwardRef(function SplitText({ text, mode = 'chars', as: Tag = 'span', className = '', ...rest }, ref) {
  if (mode === 'lines') {
    const lines = Array.isArray(text) ? text : [text];
    return (
      <Tag ref={ref} className={className} {...rest}>
        {lines.map((line, i) => (
          <span className="split-line-mask" key={i}>
            <span className="split-line">{line}</span>
          </span>
        ))}
      </Tag>
    );
  }

  const words = String(text).split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true">
          {mode === 'words' ? (
            <span className="split-word">{word}</span>
          ) : (
            <span className="split-word">
              {[...word].map((char, ci) => (
                <span className="split-char" key={ci}>
                  {char}
                </span>
              ))}
            </span>
          )}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
});

export default SplitText;
