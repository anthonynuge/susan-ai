import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import IconBtn from './IconBtn';
import { IoIosSend } from 'react-icons/io';
import { useNavigation, useParams, useSubmit } from 'react-router-dom';

const ChatInput = () => {
  const chatField = useRef<HTMLDivElement | null>(null);
  const chatFieldContainer = useRef<HTMLDivElement | null>(null);

  const [visiblePlaceHolder, setVisiblePlaceHolder] = useState(true);
  const [isMultiLine, setMultiLine] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const submit = useSubmit();
  const navigation = useNavigation();
  const { chatId } = useParams();
  // console.log("from param: ", chatId)

  const handleChatInputUpdate = useCallback(() => {
    if (!chatField.current) return;
    if (!chatFieldContainer.current) return;
    const text = chatField.current.innerText.trim();
    setVisiblePlaceHolder(text === '' || text === '\n');
    setMultiLine(chatFieldContainer.current.clientHeight > 65);
    setInputValue(chatField.current.innerText.trim());
  }, []);

  const moveCursor = useCallback(() => {
    if (!chatField.current) return;
    const editable = chatField.current;
    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) return;
    range.selectNodeContents(editable);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!chatField.current) return;
      chatField.current.innerText += e.clipboardData.getData('text');
      handleChatInputUpdate();
      moveCursor();
    },
    [handleChatInputUpdate, moveCursor],
  );

  const handleSubmit = useCallback(() => {
    if (!chatField.current) return;

    // prevent submitting if it is empty or currently submitting
    if (!inputValue || navigation.state === 'submitting') return;

    submit({
      user_prompt: inputValue,
      request_type: 'user_prompt'
    }, {
      method: 'POST',
      encType: 'application/x-www-form-urlencoded',
      action: `/${chatId || ''}`
    });
    chatField.current.innerHTML = '';
    handleChatInputUpdate();
  }, [handleChatInputUpdate, inputValue, navigation.state, chatId]);

  // framer variant that controlles animation based on visibilitiy state
  const chatInputVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.19,
        duration: 0.39,
        ease: 'easeInOut',
      },
    },
  };

  const chatInputChildrenVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className={`chatInputContainer ${isMultiLine ? 'rounded' : ''}`}
      variants={chatInputVariant}
      initial="hidden"
      animate="visible"
      ref={chatFieldContainer}
    >
      <motion.div
        ref={chatField}
        className={`chatInput ${visiblePlaceHolder ? '' : 'after:hidden'}`}
        contentEditable={true}
        role="textbox"
        aria-multiline={true}
        aria-label="Type to chat"
        data-placeholder="Enter prompt here."
        variants={chatInputChildrenVariant}
        onInput={handleChatInputUpdate}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <IconBtn
        icon={<IoIosSend size={25} />}
        className="ms-auto p-2 "
        onClick={handleSubmit}
      />
      <div className={`chatLayer ${isMultiLine ? 'rounded-md' : ''}`}></div>
    </motion.div>
  );
};

export default ChatInput;
