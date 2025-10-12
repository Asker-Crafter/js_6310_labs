'use strict'

function Arlecchino_Mode() {
    const STYLE_ENABLED_KEY = 'ArlecchinoModeEnabled';
    const themePalette = {
        dark_grey: '#1e1f22',
        grey: '#2a2b2e',
        black: '#111111',
        white: '#e5e5e5',
        red: '#c7343c',
        light_red: '#e04a53',
        light_grey: '#3d3e42',
        piglet: '#e4bcb3',
    };
    let toggleButton; // кнопочка для стиля
    let tabsInterval = null; // для наблюдения за состояниями кнопочек
    const icon_on = chrome.runtime.getURL('images/icon_on.png');
    const icon_off = chrome.runtime.getURL('images/icon_off.png');

    // функции при наведении/отведении курсора на кнопку
    function handleMenuLinkEnter(event) {
        const link = event.currentTarget;
        link.style.setProperty('background-color', themePalette.red, 'important');
        link.style.setProperty('color', themePalette.white, 'important');
    }
    function handleMenuLinkLeave(event) {
        const link = event.currentTarget;
        link.style.setProperty('background-color', themePalette.light_red, 'important');
        link.style.setProperty('color', themePalette.white, 'important');
    }

    function applyCustomStyle() {
        if (tabsInterval) clearInterval(tabsInterval); // останавливаем таймер (в случае перезагрузки страницы или применения кастомной темы)

        // меняем цвет основного фона
        document.body.style.setProperty('background-color', themePalette.dark_grey, 'important');

        // меняем фон и цвет каёвского хэдера
        const pageWrapper = document.getElementById('page_wrapper');
        if (pageWrapper) {
            pageWrapper.style.setProperty('background-color', themePalette.dark_grey, 'important');
            pageWrapper.style.setProperty('color', themePalette.red, 'important');
            pageWrapper.style.fontFamily = 'cursive';
        }

        // цвет менюшки
        const menu = document.getElementById('menu');
        if (menu) {
            menu.style.backgroundColor = themePalette.light_red;
        };

        // цвет при наведении
        const menuLinks = document.querySelectorAll('.lfr-nav-item > a'); 
        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', handleMenuLinkEnter); 
            link.addEventListener('mouseleave', handleMenuLinkLeave); 
        });

        // цвет футера
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.backgroundColor = themePalette.black;
            footer.style.borderTop = `10px solid ${themePalette.light_red}`;
        }
        
        // чтобы полосочек не было на страничке между разными объектами
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.setProperty('background-color', themePalette.piglet, 'important');
            mainContent.style.setProperty('color', themePalette.red, 'important');
        }

        // первый раздел
        const main_slider = document.querySelector('.main_slider_holder');
        if (main_slider) {
            main_slider.style.setProperty('background-color', themePalette.piglet, 'important');
        }
        const portlet_borderless = document.getElementById('portlet_56_INSTANCE_aIDmaOM35pgL');
        if (portlet_borderless) {
            portlet_borderless.style.setProperty('background-color', themePalette.piglet, 'important');
        }

        // второй раздел
        const news_box = document.querySelector('.news_box');
        if (news_box) {
            news_box.style.setProperty('background-color', themePalette.piglet, 'important');
        }
        const slider_holder_students = document.querySelector('.main_slider_holder.students');
        if (slider_holder_students) {
            slider_holder_students.style.setProperty('background-color', themePalette.light_grey, 'important');
            slider_holder_students.style.borderTop = `10px solid ${themePalette.grey}`
            slider_holder_students.style.borderBottom = `10px solid ${themePalette.grey}`
        }

        // третий раздел 
        const institutesSlider = document.querySelector('.institutes_slider_box');
        if (institutesSlider) {
            const institutesParent = institutesSlider.parentElement;
            if (institutesParent) {
                institutesParent.style.borderTop = `10px solid ${themePalette.light_grey}`;
            }
            institutesSlider.style.backgroundColor = themePalette.piglet;
            const sliderContent = institutesSlider.querySelector('.slick-track');
            if (sliderContent) {
                for (const child of sliderContent.children) {
                    child.style.border = `8px double ${themePalette.red}`;
                    child.style.borderRadius = '50px';
                    child.style.padding = '10px';
                    child.style.margin = '0 10px';
                }
            }
        }

        const inst_slides = document.querySelectorAll('.inst-slide');
        inst_slides.forEach(slide => {
            slide.style.backgroundColor = 'transparent';
            slide.style.width = '0px';
        });

        // четвертый раздел 
        const events_box = document.querySelector('.events_box');
        if (events_box) {
            events_box.style.setProperty('background-color', themePalette.piglet, 'important');
        }

        // пятый раздел 
        const research_box = document.querySelector('.research_box');
        if (research_box) {
            research_box.style.borderTop = `2px solid ${themePalette.light_grey}`
            research_box.style.setProperty('background-color', themePalette.piglet, 'important');
        }
        const tab_items = document.querySelector('.tab_items');
        if (tab_items) {
            tab_items.style.setProperty('background-color', 'transparent', 'important');
        }

        // функция для перекраски кнопок, ведь они обновляются каждый раз
        function restyleTabs() {
            const allTabs = document.querySelectorAll('.research_box .tab_items .nav a');
            allTabs.forEach(tab => {
                let styleString = ''; 
                if (tab.classList.contains('active')) {
                    styleString = `
                        background: ${themePalette.red} !important;
                        color: ${themePalette.white} !important;
                        border: 2px solid ${themePalette.red} !important;
                    `;
                } else {
                    styleString = `
                        background: ${themePalette.white} !important;
                        color: ${themePalette.light_red} !important;
                        border: 2px solid ${themePalette.light_red} !important;
                    `;
                }
                if (tab.getAttribute('style') !== styleString.trim()) {
                    tab.setAttribute('style', styleString);
                }
            });
        }
        tabsInterval = setInterval(restyleTabs, 100);
        
        // открой книту-каи! (радостный визг)
        const welcome_box = document.getElementById('portlet_56_INSTANCE_tL4f1SVgmJ6R');
        if (welcome_box ) {
            welcome_box.style.backgroundColor = 'transparent';
        }

        // RSS
        document.querySelectorAll('.bar_btns a.kai-btn-block').forEach(btn => {
            btn.style.backgroundColor = themePalette.red;
            btn.style.color = themePalette.white;
            btn.style.borderColor = themePalette.red;
            btn.style.height ='25px';
            btn.style.lineHeight ='20px';
            btn.style.minWidth = '50px';
            btn.style.fontSize = '14px';
        });

        const slick_prev = document.querySelector('span.slick-prev');
        if (slick_prev) {
            slick_prev.style.setProperty('background-color', themePalette.red, 'important');
        }
        const slick_next = document.querySelector('span.slick-next');
        if (slick_next) {
            slick_next.style.setProperty('background-color', themePalette.red, 'important');
        }

        // кнопка "все события"/"все новости"
        document.querySelectorAll('.text-center a.kai-btn-block').forEach(btn => {
            btn.style.backgroundColor = themePalette.red;
            btn.style.color = themePalette.white;
            btn.style.borderColor = themePalette.red;
        });
        
        // стрелки вокруг "все события"/"все новости"
        document.querySelectorAll('button.kai-btn-block').forEach(btn => {
            btn.style.backgroundColor = themePalette.red;
            btn.style.color = themePalette.white;
            btn.style.borderColor = themePalette.red;
        });
    }

    function removeCustomStyle() {
        if (tabsInterval) {
            clearInterval(tabsInterval); // остановка таймера
            tabsInterval = null;
        }

        document.querySelectorAll('.lfr-nav-item > a').forEach(link => {
            link.removeEventListener('mouseenter', handleMenuLinkEnter);
            link.removeEventListener('mouseleave', handleMenuLinkLeave);
        });

        const institutesSlider = document.querySelector('.institutes_slider_box');
        if (institutesSlider) {
            if (institutesSlider.parentElement) {
                institutesSlider.parentElement.setAttribute('style', '');
            }
        
        const sliderContent = institutesSlider.querySelector('.slick-track');
        if (sliderContent) {
            for (const child of sliderContent.children) {
                child.setAttribute('style', '');
            }
        }
        }
        const elementsToReset = [
            document.body,
            document.getElementById('header'),
            document.getElementById('page_wrapper'),
            document.getElementById('main-content'),
            document.getElementById('portlet_56_INSTANCE_tL4f1SVgmJ6R'),
            document.getElementById('menu'),
            document.querySelector('footer'),
            document.querySelector('.main_slider_holder'),
            document.querySelector('.news_box'),
            document.querySelector('.events_box'),
            document.querySelector('.research_box'),
            document.querySelector('.tab_items'),
            document.querySelector('span.slick-prev'),
            document.querySelector('span.slick-next'),
            document.querySelector('.institutes_slider_box'),
            document.querySelector('.research_box .tab_items .nav'),
            document.querySelector('.main_slider_holder.students'),
            document.getElementById('portlet_56_INSTANCE_aIDmaOM35pgL'),
            ...document.querySelectorAll('.lfr-nav-item > a'),
            ...document.querySelectorAll('.inst-slide'),
            ...document.querySelectorAll('.bar_btns a.kai-btn-block, .text-center a.kai-btn-block, button.kai-btn-block'),
            ...document.querySelectorAll('.research_box .tab_items .nav a')
        ];

        elementsToReset.forEach(element => {
            if (element) {
                element.setAttribute('style', '');
            }
        });
    }


    // стиль кнопки для темы вкл/выкл
    function updateToggleButton(isEnabled) {
        if (!toggleButton) return;
        toggleButton.innerHTML = `<img 
        src="${isEnabled ? icon_on : icon_off}
        "style="width:100%; 
        height:100%; 
        border-radius:50%; 
        "alt="Переключатель стиля">`;
        toggleButton.style.backgroundColor = isEnabled ? '#ed5353ff' : '#786262ff';
    }

    // сама функция вкл/выкл стиля
    function setStyleState(isEnabled) {
        if (isEnabled) {
            applyCustomStyle();
        } else {
            removeCustomStyle();
        }
        updateToggleButton(isEnabled);
    }

    function setupStyler() {
        if (document.getElementById('kai-styler-toggle-btn')) return;
        toggleButton = document.createElement('button');
        toggleButton.id = 'kai-styler-toggle-btn';
        Object.assign(toggleButton.style, {
            position:'absolute', top: '20px', right: '20px', zIndex: '9999',
            width: '50px', height: '50px', padding: '0', backgroundColor: 'transparent',
            borderRadius: '50%', cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.5)', transition: 'border-color 0.2s'
        });
        toggleButton.addEventListener('click', () => {
            const currentState = (localStorage.getItem(STYLE_ENABLED_KEY) === 'true');
            const newState = !currentState;
            localStorage.setItem(STYLE_ENABLED_KEY, newState);
            setStyleState(newState);
        });
        document.body.appendChild(toggleButton);
        const savedState = localStorage.getItem(STYLE_ENABLED_KEY) === 'true';
        setStyleState(savedState);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupStyler);
    } else {
        setupStyler();
    }
}

Arlecchino_Mode();