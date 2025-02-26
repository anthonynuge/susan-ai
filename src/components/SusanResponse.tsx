import React, { FC, useEffect, useState } from 'react'
import susan from "../assets/susan.jpg"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaRegClipboard } from 'react-icons/fa';

interface SusanResponseProps {
  text: string;
  children?: React.ReactNode;
}

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: string | number | boolean | React.ReactNode | undefined;
}

const capCase = (text: string): string => {
  return text
    .split(' ')
    .map((w) => w.replace(w[0], w[0].toUpperCase()))
    .join();
}

const SusanResponse = ({ text, children }: SusanResponseProps): JSX.Element => {
  const [syntaxHighlightTheme, setSyntaxHighlightTheme] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSyntaxHighlightTheme(mediaQuery.matches ? oneDark : oneLight)
    const syntaxThemeListener = (event: MediaQueryListEvent) => {
      setSyntaxHighlightTheme((event.matches ? oneDark : oneLight));
    }
    mediaQuery.addEventListener("change", syntaxThemeListener);
    return () => {
      mediaQuery.removeEventListener("change", syntaxThemeListener);
    }
  }, [])

  const code: FC.ReactNode<CodeProps> = ({ children, className, ...rest }) => {
    const langMatch = className?.match(/language-(\w+)/)
    return langMatch ? (
      <>
        <div className='code-block relative'>
          <div className='code-header flex items-center justify-between pl-4 pt-2 border-b-1 dark:border-neutral-500/30'>
            <div className=''>{capCase(langMatch[1])}</div>
            <button className='group cursor-pointer p-2 rounded-full transition'>
              <FaRegClipboard className='text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-500 dark:group-hover:text-neutral-300 transition' />
            </button>
          </div>
          <SyntaxHighlighter
            {...rest}
            PreTag='div'
            language={langMatch[1]}
            style={syntaxHighlightTheme}
            customStyle={{
              marginBlock: '0',
              padding: '3px'
            }}
            codeTagProps={{
              style: {
                padding: '15px',
                fontWeight: '550'
              }
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
      </>
    ) : (
      <code className={className}>{children}</code>

    )
  }

  return (
    <div className='grid grid-cols-1 gap-2 py-3 md:grid-cols-[max-content_minmax(0,1fr)] md:gap-4'>

      {/* ai old lady avatar */}
      <figure className='grid place-items-center w-10 h-10'>
        <img
          src={susan}
          alt='Ai image'
          width={35}
          height={35}
          className='rounded-full'
        />
      </figure>

      {children}

      {/* ai response */}
      <div className='mkdn-response'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ code }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default SusanResponse
