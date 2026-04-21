'use client';

import { useState } from 'react';
import TextArea from './textArea';
import Button from './button';

interface CommentProps {
  profileName?: string;
  disabled?: boolean;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
}

const wrapperStyle = 'flex items-start gap-3';

const profileStyle =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-[10px] font-medium text-white';

const collapsedInputStyle =
  'w-full h-[40px] rounded-full border border-gray-700 bg-black-400 px-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-200 disabled:bg-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed';

const expandedWrapperStyle =
  'w-full rounded-[14px] border border-blue-200 bg-black-400 px-4 pt-4 pb-3';

export default function Comment({
  profileName = 'name',
  disabled = false,
  defaultValue = '',
  onSubmit,
  onCancel,
}: CommentProps) {
  const [value, setValue] = useState(defaultValue);
  const [isExpanded, setIsExpanded] = useState(false);

  const isEmpty = value.trim() === '';

  const handleExpand = () => {
    if (disabled) return;
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setValue('');
    setIsExpanded(false);
    onCancel?.();
  };

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    onSubmit?.(trimmedValue);
    setValue('');
    setIsExpanded(false);
  };

  return (
    <div className={wrapperStyle}>
      <div className={profileStyle}>{profileName}</div>

      <div className="w-full">
        {!isExpanded ? (
          <input
            type="text"
            value={value}
            placeholder="댓글을 남겨보세요"
            disabled={disabled}
            readOnly
            onFocus={handleExpand}
            onClick={handleExpand}
            className={collapsedInputStyle}
          />
        ) : (
          <div className={expandedWrapperStyle}>
            <TextArea
              value={value}
              placeholder="댓글을 남겨보세요"
              disabled={disabled}
              onChange={(e) => setValue(e.target.value)}
              className="h-[72px] md:h-[96px] border-0 bg-transparent px-0 py-0 focus:border-0"
            />

            {!disabled && (
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="cancel"
                  size="sm"
                  disabled={false}
                  onClick={handleCancel}
                >
                  취소
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={isEmpty}
                  onClick={handleSubmit}
                >
                  등록
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}