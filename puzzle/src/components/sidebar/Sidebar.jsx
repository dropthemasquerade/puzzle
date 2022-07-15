import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const sidebarNavItems = [
    {
        display: '渠道配置',
        icon: <i className='bx bx-home'></i>,
        to: '/config',
        section: 'config'
    },
    {
        display: '支付功能',
        icon: <i className='bx bx-star'></i>,
        to: '/pay',
        section: 'pay'
    },
    {
        display: '支付确认',
        icon: <i className='bx bx-calendar'></i>,
        to: '/confirm',
        section: 'confirm'
    },
    {
        display: '批量通知',
        icon: <i className='bx bx-user'></i>,
        to: '/batch_notify',
        section: 'batch_notify'
    },
    {
        display: '查单',
        icon: <i className='bx bx-receipt'></i>,
        to: '/query',
        section: 'query'
    },
    {
        display: '退款',
        icon: <i className='bx bx-receipt'></i>,
        to: '/refund',
        section: 'refund'
    },
    {
        display: '退款通知',
        icon: <i className='bx bx-receipt'></i>,
        to: '/refund_notify',
        section: 'refund_notify'
    },
    {
        display: '账单',
        icon: <i className='bx bx-receipt'></i>,
        to: '/bill',
        section: 'bill'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            海外渠道zero代码上线
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
