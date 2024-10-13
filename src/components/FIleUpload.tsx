'use client';

import { useState } from 'react';

import classNames from 'classnames';
import axios from 'axios';

import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const FIleUpload = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [shouldHighlight, setShouldHighlight] = useState<boolean>(false);

  const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async () => {
    if (files?.length) {
      const data = new FormData();

      for (const file of files) {
        data.append(file.name, file);
      }

      await axios.post('/api/upload', data);
    }
  };

  return (
    <div
      className={classNames({
        'w-full h-full': true,
        'p-4 grid place-content-center cursor-pointer': true,
        'text-violet-500 rounded-lg': true,
        'border-4 border-dashed ': true,
        'transition-colors': true,
        'border-violet-800 bg-violet-500': shouldHighlight,
        'border-violet-500 bg-violet-200': !shouldHighlight,
      })}
      onDragOver={e => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragEnter={e => {
        preventDefaultHandler(e);
        setShouldHighlight(true);
      }}
      onDragLeave={e => {
        preventDefaultHandler(e);
        setShouldHighlight(false);
      }}
      onDrop={e => {
        preventDefaultHandler(e);
        const files = Array.from(e.dataTransfer.files);
        setFiles(files);
        setShouldHighlight(false);
      }}
    >
      <div className='flex flex-col items-center'>
        {!files ? (
          <>
            <CloudArrowUpIcon className='w-10 h-10' />
            <span>
              <span>Choose a File</span> or drag it here
            </span>
          </>
        ) : (
          <>
            <p>Files to Upload</p>
            {files.map((file, i) => {
              return <span key={i}>{file.name}</span>;
            })}
            <div className='flex gap-2 mt-2'>
              <button
                className='bg-violet-500 text-violet-50 px-2 py-1 rounded-md'
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                className='border border-violet-500 px-2 py-1 rounded-md'
                onClick={() => {
                  setFiles(null);
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FIleUpload;
