'use client';

import { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  sticky?: boolean;
}

export default function SocialShare({ url, title, description, sticky = false }: SocialShareProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  if (!currentUrl) return null;

  const shareButtons = (
    <>
      <TwitterShareButton url={currentUrl} title={title} className="hover:scale-110 transition-transform">
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <FacebookShareButton url={currentUrl} className="hover:scale-110 transition-transform">
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <LinkedinShareButton url={currentUrl} title={title} summary={description} className="hover:scale-110 transition-transform">
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      <WhatsappShareButton url={currentUrl} title={title} className="hover:scale-110 transition-transform">
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <EmailShareButton url={currentUrl} subject={title} body={description} className="hover:scale-110 transition-transform">
        <EmailIcon size={40} round />
      </EmailShareButton>
    </>
  );

  if (sticky) {
    return (
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3 bg-white rounded-full shadow-lg p-3">
          <p className="text-xs font-semibold text-gray-600 text-center mb-1">SHARE</p>
          {shareButtons}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {shareButtons}
    </div>
  );
}
