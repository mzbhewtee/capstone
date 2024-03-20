import React from 'react';
import Logo from '../assets/images/logo.png';
import ListItem from './FooterComponent';


function Footer() {
    return (
        <div id='contact-section'>
            <div className='border-t border-primary pl-6 pr-6 pb-6 md:flex md:flex-row md:p-6'>
                <div className='md:w-1/3 md:ml-10'>
                <div className='flex items-center space-x-2 mt-3 md:mt-0'>
                    <img src={Logo} alt='Quantum Renew' className='w-4 lg:w-6 md:w-5 cursor-pointer' />
                    <p className='text-primary font-thin text-sm lg:text-md font-link cursor-pointer'>QuantumRenew</p>
                </div>
                    <p className='text-pText text-justify mt-3 text-xs md:text-sm'>Empower researchers, engineers, and stakeholders in the renewable energy sector with advanced simulation tools to accelerate innovation and drive sustainability.</p>
                </div>
                <div className='flex justify-center mt-5 md:w-2/3 md:justify-end'>
                    <div className='flex justify-around'>
                        <ListItem title='Product' paragraphs={[
                            { text: 'Overview', link: '/product/overview' },
                            { text: 'Features', link: '/product/features' },
                            { text: 'Solutions', link: '/product/solutions' },
                            { text: 'Tutorials', link: '/product/tutorials' },
                        ]} />
                        <ListItem title='Company' paragraphs={[
                            { text: 'About Us', link: '/company/about' },
                            { text: 'Careers', link: '/company/careers' },
                            { text: 'Press', link: '/company/press' },
                            { text: 'News', link: '/company/news' },
                        ]} />
                        <ListItem title='Resources' paragraphs={[
                            { text: 'Blog', link: '/resources/blog' },
                            { text: 'Newsletter', link: '/resources/newsletter' },
                            { text: 'Events', link: '/resources/events' },
                            { text: 'Help Center', link: '/resources/help-center' },
                        ]} />
                    </div>
                </div>
            </div>
            <div className='bg-primary text-white p-6 flex justify-between'>
                <p className='text-xs md:text-sm'>©️ 2024 Beauty Ikudehinbu. All rights Reserved</p>
                <div className='flex space-x-2'>
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-linkedin"></ion-icon>

                </div>
            </div>
        </div>
    );
}

export default Footer;
