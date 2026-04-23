"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

interface TweetPreviewProps {
  content: string | null;
  isLoading: boolean;
}

const VerifiedBadge = () => (
  <svg
    className="w-4 h-4 text-blue-400 inline ml-1"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.5 12.5c0-1.58-.875-2.954-2.604-3.765-.643-.92-1.2-1.957-1.2-3.235 0-1.58-.875-2.954-2.604-3.765.15-.915.712-1.735 1.404-2.27.574-.47.766-1.27.312-1.878-.454-.608-1.254-.766-1.878-.312-.662.54-1.227 1.226-1.62 2.04-1.312-1.148-3.152-1.865-5.208-1.865-2.056 0-3.896.717-5.208 1.865-.393-.814-.958-1.5-1.62-2.04-.624-.454-1.424-.296-1.878.312-.454.608-.262 1.408.312 1.878.692.535 1.254 1.355 1.404 2.27-1.729.811-2.604 2.185-2.604 3.765 0 1.278-.557 2.315-1.2 3.235C1.375 9.546.5 10.921.5 12.5c0 1.58.875 2.954 2.604 3.765.643.92 1.2 1.955 1.2 3.235 0 1.58.875 2.954 2.604 3.765-.15.915-.712 1.735-1.404 2.27-.574.47-.766 1.27-.312 1.878.454.608 1.254.766 1.878.312.662-.54 1.227-1.226 1.62-2.04 1.312 1.148 3.152 1.865 5.208 1.865 2.056 0 3.896-.717 5.208-1.865.393.814.958 1.5 1.62 2.04.624.454 1.424.296 1.878-.312.454-.608.262-1.408-.312-1.878-.692-.535-1.254-1.355-1.404-2.27 1.729-.811 2.604-2.185 2.604-3.765 0-1.28.557-2.315 1.2-3.235 1.729-.811 2.604-2.185 2.604-3.765zm-15.898 7.686c-1.25 0-2.383-.896-2.383-2.011 0-1.114 1.133-2.011 2.383-2.011 1.25 0 2.383.896 2.383 2.011 0 1.115-1.133 2.011-2.383 2.011zm7.449 0c-1.25 0-2.383-.896-2.383-2.011 0-1.114 1.133-2.011 2.383-2.011 1.25 0 2.383.896 2.383 2.011 0 1.115-1.133 2.011-2.383 2.011zm7.449-8.697c1.25 0 2.383.896 2.383 2.011 0 1.114-1.133 2.011-2.383 2.011-1.25 0-2.383-.896-2.383-2.011 0-1.115 1.133-2.011 2.383-2.011zm-7.449 0c1.25 0 2.383.896 2.383 2.011 0 1.114-1.133 2.011-2.383 2.011-1.25 0-2.383-.896-2.383-2.011 0-1.115 1.133-2.011 2.383-2.011zm-7.449 0c1.25 0 2.383.896 2.383 2.011 0 1.114-1.133 2.011-2.383 2.011-1.25 0-2.383-.896-2.383-2.011 0-1.115 1.133-2.011 2.383-2.011z" />
  </svg>
);

const SkeletonBar = ({ width }: { width: string }) => (
  <div className={`h-4 bg-gray-200 rounded animate-pulse ${width}`} />
);

export default function TweetPreview({
  content,
  isLoading,
}: TweetPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const charCount = content?.length ?? 0;

  return (
    <div className="w-full max-w-md border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://pbs.twimg.com/profile_images/1445764532/prisma_normal.png"
            alt="Prisma"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-bold text-gray-900">Prisma</span>
              <VerifiedBadge />
            </div>
            <span className="text-sm text-gray-500">@prisma</span>
          </div>
        </div>
        {content && (
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-blue-50 rounded-full transition-colors"
            title={copied ? "Copied!" : "Copy"}
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-gray-500 hover:text-blue-500" />
            )}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="mb-4">
        {isLoading ? (
          <div className="space-y-2">
            <SkeletonBar width="w-full" />
            <SkeletonBar width="w-3/4" />
            <SkeletonBar width="w-3/5" />
          </div>
        ) : content ? (
          <p className="text-gray-900 text-base leading-normal whitespace-pre-wrap break-words">
            {content}
          </p>
        ) : (
          <p className="text-gray-400 text-base leading-normal whitespace-pre-wrap break-words">
            Follow us on X to stay updated on all the latest features and
            releases from Prisma! 🚀
            {"\n\n"}
            Your polished tweet will appear here ✨
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 border-t border-gray-100 pt-3">
        {isLoading ? (
          <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
        ) : content ? (
          <span>{charCount} / 280 characters</span>
        ) : (
          <span>prisma.io</span>
        )}
      </div>
    </div>
  );
}
