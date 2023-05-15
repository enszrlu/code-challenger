import React from 'react';
import Logo from './Footer/Logo';
import { SocialIcon } from 'react-social-icons';

function Footer() {
    return (
        <div className="p-10 flex flex-col gap-5 dark:bg-slate-900 bg-white dark:text-white select-none border-t-2 dark:border-slate-950">
            <div className="flex justify-between items-center">
                <Logo></Logo>
                {/* Socials */}
                {/* TOBE REPLACED WITH REAL LINKS */}
                <div className="flex gap-5">
                    <SocialIcon
                        url="https://twitter.com/codechallenger"
                        style={{ height: 30, width: 30 }}
                    />
                    <SocialIcon
                        url="https://facebook.com/codechallenger"
                        style={{ height: 30, width: 30 }}
                    />
                    <SocialIcon
                        url="https://instagram.com/codechallenger"
                        style={{ height: 30, width: 30 }}
                    />
                    <SocialIcon
                        url="https://linkedin.com/codechallenger"
                        style={{ height: 30, width: 30 }}
                    />
                </div>
            </div>
            <div className="flex justify-between flex-col gap-5 sm:flex-row items-center">
                {/* Copyright */}
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    <span className="text-lg">&copy;</span>2023 Code Challenger. All rights
                    reserved.
                </p>
                {/* Terms and Privacy Policy */}
                <div className="flex gap-5 text-gray-500 dark:text-gray-400 text-sm">
                    {/* TOBE DEVELOPED */}
                    <p className="cursor-pointer">Terms</p>
                    <p className="cursor-pointer">Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
