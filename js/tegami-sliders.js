
document.addEventListener('DOMContentLoaded', () => {
    var takeMain = new Swiper(".takeMainImg", {
        loop: true,
        spaceBetween: 10,
        effect: "fade",
        navigation: {
            prevEl: ".take-arrow-left",
            nextEl: ".take-arrow-right",
        },
        // thumbs: {
        //     swiper: takeThumb,
        // },
        on: {
            slideChange: function () {
                var activeIndex = this.realIndex;
                updateActiveContent(activeIndex);
    
    
            }
        }
    });
    
    var thumbSlides = document.querySelectorAll('.take-thumb-slide');
    thumbSlides.forEach(function(thumbSlide, index) {
        thumbSlide.addEventListener('click', function() {
            takeMain.slideTo(index); // Переключаем основной слайдер на соответствующий слайд
            updateActiveContent(index); // Обновляем текст
        });
    });
    
    // Функция для обновления активного текста и миниатюр
    function updateActiveContent(activeIndex) {
        var textItems = document.querySelectorAll('.take-text-item');
        var thumbSlides = document.querySelectorAll('.take-thumb-slide');
        
        // Скрываем все текстовые блоки и убираем активный класс с миниатюр
        textItems.forEach(function(item) {
            item.classList.remove('active');
        });
        thumbSlides.forEach(function(slide) {
            slide.classList.remove('active');
        });

        // Показываем текстовый блок и добавляем активный класс к миниатюре, соответствующие активному слайду
        var activeTextItem = document.querySelector('.take-text-item[data-slide-index="' + activeIndex + '"]');
        var activeThumbItem = document.querySelector('.take-thumb-slide[data-slide-index="' + activeIndex + '"]');
        
        if (activeTextItem) {
            activeTextItem.classList.add('active');
        }
        if (activeThumbItem) {
            activeThumbItem.classList.add('active');
        }
    }
    var forging = new Swiper(".forging-slider", {
        loop: true,
        spaceBetween: 10,
        effect: "fade",
        // slidesPevView:1,
        navigation: {
            prevEl: ".forging-arrow-left",
            nextEl: ".forging-arrow-right",
        },
        pagination: {
            el: '.forging-pagination',
            },
        
    });
    var reviewsSwiper = new Swiper(".reviewsSwiper", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 6.45,
        navigation: {
            prevEl: ".reviews-btn-prev",
            nextEl: ".reviews-btn-next",
        },
        // pagination: {
        //     el: '.forging-pagination',
        //     },
        breakpoints:{
            320:{
                slidesPerView: 2.85,
            },
            650:{
                slidesPerView: 6.45,
            },
            1024:{
                slidesPerView: 6.45,
            }
        }
    });

    var deserveMain = new Swiper(".deserve-main-img", {
        loop: true,
        spaceBetween: 10,
        effect: "fade",
        navigation: {
            prevEl: ".take-arrow-left",
            nextEl: ".take-arrow-right",
        },
        // thumbs: {
        //     swiper: takeThumb,
        // },
        on: {
            slideChange: function () {
                var activeIndex = this.realIndex;
                deserveUpdateActiveContent(activeIndex);
    
    
            }
        }
    });
    var deserveThumbSlides = document.querySelectorAll('.deserve-thumb-slide');
    deserveThumbSlides.forEach(function(thumbSlide, index) {
        thumbSlide.addEventListener('click', function() {
            deserveMain.slideTo(index); // Переключаем основной слайдер на соответствующий слайд
            deserveUpdateActiveContent(index); // Обновляем текст
        });
    });
    function deserveUpdateActiveContent(activeIndex) {
        var textItems = document.querySelectorAll('.deserve-text__item');
        var thumbSlides = document.querySelectorAll('.deserve-thumb-slide');
        
        // Скрываем все текстовые блоки и убираем активный класс с миниатюр
        textItems.forEach(function(item) {
            item.classList.remove('active');
        });
        thumbSlides.forEach(function(slide) {
            slide.classList.remove('active');
        });

        // Показываем текстовый блок и добавляем активный класс к миниатюре, соответствующие активному слайду
        var activeTextItem = document.querySelector('.deserve-text__item[data-slide-index="' + activeIndex + '"]');
        var activeThumbItem = document.querySelector('.deserve-thumb-slide[data-slide-index="' + activeIndex + '"]');
        
        if (activeTextItem) {
            activeTextItem.classList.add('active');
        }
        if (activeThumbItem) {
            activeThumbItem.classList.add('active');
        }
    }
    const daysElem = document.querySelector('.timer-box__title.days');
    const hoursElem = document.querySelector('.timer-box__title.hours');
    const minutesElem = document.querySelector('.timer-box__title.minutes');
    const secondsElem = document.querySelector('.timer-box__title.seconds');

    // Задаем исходные значения отсчёта
const initialDays = 1;
const initialHours = 9;
const initialMinutes = 12;
const initialSeconds = 48;
// Вычисляем длительность цикла в миллисекундах
const cycleDuration = ((initialDays * 24 * 60 * 60) +
                        (initialHours * 3600) +
                        (initialMinutes * 60) +
                        initialSeconds) * 1000;

// Получаем из localStorage время окончания отсчёта, если оно уже сохранено
let targetTime = localStorage.getItem('targetTime');
const now = Date.now();

if (targetTime) {
    targetTime = parseInt(targetTime, 10);
    // Если сохранённое время уже прошло, пересчитываем для текущего цикла
    while (targetTime <= now) {
        targetTime += cycleDuration;
    }
} else {
    // Если таймера ещё нет, устанавливаем его как текущий момент + длительность цикла
    targetTime = now + cycleDuration;
}
localStorage.setItem('targetTime', targetTime);

// Получаем все элементы для дней, часов, минут и секунд
const daysElems = document.querySelectorAll('.timer-box__title.days');
const hoursElems = document.querySelectorAll('.timer-box__title.hours');
const minutesElems = document.querySelectorAll('.timer-box__title.minutes');
const secondsElems = document.querySelectorAll('.timer-box__title.seconds');

function updateTimer() {
    const now = Date.now();
    let timeLeft = targetTime - now;

    // Если отсчёт завершён, запускаем новый цикл
    if (timeLeft <= 0) {
        targetTime += cycleDuration;
        localStorage.setItem('targetTime', targetTime);
        timeLeft = targetTime - now;
    }

    let totalSeconds = Math.floor(timeLeft / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    totalSeconds %= 24 * 3600;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Обновляем все элементы с соответствующими классами
    daysElems.forEach(elem => elem.textContent = String(days).padStart(2, '0'));
    hoursElems.forEach(elem => elem.textContent = String(hours).padStart(2, '0'));
    minutesElems.forEach(elem => elem.textContent = String(minutes).padStart(2, '0'));
    secondsElems.forEach(elem => elem.textContent = String(seconds).padStart(2, '0'));
}

    // Обновляем таймер каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);


    // Modal

    let modalContent = {
        1: "Guys, this is just something else! I totally fell for the tricks they show in the ads with these knives. You know, like slicing an apple in mid-air, or cutting lettuce leaves, or a grapefruit. And even a dish sponge. Deep down, I knew it was all just marketing and hype. But since I absolutely love this kind of stuff, I decided to try it out myself. And guess what? It actually works! Everything they show in the ads—it’s all true! I’m just blown away! Now, I even bring my knife to parties, show off the tricks, and become the life of the party. Though at one party, someone swiped my first knife, so I had to order a new one. The same one — a santoku.",
        2: "After buying the Tegami set (3 knives), I threw away all my old knives because I just can't use them anymore! Tegami knives are as sharp as blades, as beautiful as a mature man from Spanish films, and as reliable as Swiss watches. I even feel like I'm cooking better with them ))). But the most important thing is that now I get real enjoyment from cooking, and that's something money can't buy!",
        3: `I've been a chef for 6 years, and during that time, I've seen countless knives. When I was asked to write an honest and unbiased review of the Tegami chef's knife, I was skeptical: "Guys, you do realize that I'll be comparing your knife to my limited-edition Bob Kramer worth $2,000, right? Not worried?" I said. But they told me that's exactly what they wanted. So, I took it for a test. And here's what I can say.<br><br>First, it's truly a solid knife that, in terms of quality, comes very close to my professional one and passed all the culinary tests, even the toughest ones: the multilayer cutting test, cutting herbs in water, a single sponge cut, and many others. It outperforms 9 out of 10 knives I've come across.<br><br>Second, the handle's ergonomics are like that of a professional knife.<br><br>And third, it looks beautiful. That's undeniable. So yes, I can recommend it to both amateurs and professionals alike.`,
        4: `As a beginner chef, I was looking for the best option in terms of price and quality because I didn’t have the extra money to spend on an expensive knife. I’m so glad I came across the presentation of the Japanese brand Tegami. I’ve always loved Japan and Japanese brands, but with this one... When you hold the knife, it feels like it’s alive. I can’t quite put it into words. And it’s incredibly sharp. Like a razor. This isn’t just a marketing slogan; it’s a real feature. So you have to be very careful.<br><br>P.S. I’ve been using this knife for over three years now and have only sharpened it three times on a whetstone. Regular sharpening stones aren’t suitable for it, just like for any other premium knives.`,
        5: `Now I understand what real kitchen knives are! The ones sold in stores don’t even come close to Tegami. I ordered a set of 5 knives and… just wow! I’m speechless, I don’t even know what to say. Everything is exactly like in the ads. Actually, they look even better in person than in the pictures.`,
        6: `Hello everyone, here’s my review of the Tegami knife. I ordered it in February 2024, and I chose the universal model so I could clean chicken, prep fish, and cut fruits/vegetables with it.<br><br>First impressions — it’s incredibly sharp. Much sharper than regular knives, so you need to be very careful with it.<br><br>It’s held its sharpness for almost a year now, and I have no complaints. They say you can hone it with a honing steel, but I haven’t needed to yet since it easily handles everything from tendons and fish bones to hard fruits like pomelo. I’m completely satisfied with it.`,
    }
    let reviewModal = document.querySelector('.review-modal')
    let reviewModalContent = document.querySelector('.review-modal__descr')
    let reviewModalName = document.querySelector('.review-modal__name')
    let reviewsItems = document.querySelectorAll('.reviews-item')
    let modalClose = document.querySelector('.modal-close')
    let bodyTag = document.querySelector('body')
    reviewsItems.forEach(item =>{
        item.addEventListener('click', ()=>{
            let itemId = item.getAttribute('data-review')
            reviewModalContent.innerHTML = modalContent[itemId]
            reviewModalName.innerHTML = item.querySelector('.reviews-item__name').innerText
            reviewModal.classList.add('show')
            bodyTag.classList.add('hidden')
        })
    })
    modalClose.addEventListener('click', ()=>{
        reviewModal.classList.remove('show')
        bodyTag.classList.remove('hidden')
    })
    reviewModal.addEventListener('click', (event)=>{
        console.log(event.target);
        
        if(!event.target.closest('.modal-content')){
            reviewModal.classList.remove('show')
            bodyTag.classList.remove('hidden')
        }
    })


    // let productBtn = document.querySelectorAll('.product-item__btn')
    // productBtn.forEach(btn => {
    //     btn.addEventListener('click', ()=>{
    //         let product = btn.closest('.product-item')
    //         product.classList.toggle('active')
    //         btn.classList.toggle('active')
    //     })
    // })


    // Faq

    let faqTrigger = document.querySelectorAll('.faq-item__head')
    faqTrigger.forEach((trigger) =>{
        trigger.addEventListener('click', ()=>{
            let faqItem = trigger.closest('.faq-item')
            let faqDescr = faqItem.querySelector('.faq-item__descr')
            faqItem.classList.toggle('active')
            faqDescr.classList.toggle('active')
        })
        
    })
    // Modal
    let modalPrivacy = {
        1: `<p><span>At TEGAMI CORP, we strive to ensure your complete satisfaction with our products. If you are not entirely satisfied with your purchase, we're here to help.</span></p><p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.<br><br>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase. <br><br>To start a return, you can contact us at <strong>info@tegamicorp.com.</strong> Please note that returns will need to be sent to the following address:<strong> 1429 Holmes Rd, Elgin, Illinois 60123</strong><br><br>If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted. <br><br>You can always contact us for any return question at <strong>info@tegamicorp.com.</strong><br></p><p><span><br></span></p><p><strong>Damages and issues</strong> <br>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p><p><span><br></span></p><p><strong>Exceptions / non-returnable items</strong> <br>Please get in touch if you have questions or concerns about your specific item.<br><br>Unfortunately, we cannot accept returns on sale items.</p><p><span><br></span></p><p><strong>Exchanges</strong> <br>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p><p><span><br></span></p><p><strong>European Union 14 day cooling off period</strong> <br>Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.<br>To start a return, you can contact us at <strong>info@tegamicorp.com.</strong> Please note that returns will need to be sent to the following address:<strong> 1429 Holmes Rd, Elgin, Illinois 60123</strong><br></p><p><span><br></span></p><p><strong>Refunds</strong> <br>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too. <br>If more than 15 business days have passed since we’ve approved your return, please contact us at <strong>info@tegamicorp.com.</strong></p>`,
        2: `<p>Last updated: October 28, 2024</p><p>This Privacy Policy describes how TEGAMI CORP (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from tegamicorp.com (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.</p><p>Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.</p><h2>Changes to This Privacy Policy</h2><p>We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.</p><h2>How We Collect and Use Your Personal Information</h2><p>To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.</p><p>In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.</p><h3>What Personal Information We Collect</h3><p>The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.</p><h3>Information We Collect Directly from You</h3><p>Information that you directly submit to us through our Services may include:</p><ul><li><strong>Contact details</strong> including your name, address, phone number, and email.</li><li><strong>Order information</strong> including your name, billing address, shipping address, payment confirmation, email address, and phone number.</li><li><strong>Account information</strong> including your username, password, security questions and other information used for account security purposes.</li><li><strong>Customer support information</strong> including the information you choose to include in communications with us, for example, when sending a message through the Services.</li></ul><p>Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.</p><h3>Information We Collect about Your Usage</h3><p>We may also automatically collect certain information about your interaction with the Services ("<strong>Usage Data</strong>"). To do this, we may use cookies, pixels and similar technologies ("<strong>Cookies</strong>"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.</p><h3>Information We Obtain from Third Parties</h3><p>Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:</p><ul><li>Companies who support our Site and Services, such as Shopify.</li><li>Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.</li><li>When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.</li></ul><p>Any information we obtain from third parties will be treated in accordance with this Privacy Policy. Also see the section below, <i>Third Party Websites and Links.</i></p><h3>How We Use Your Personal Information</h3><ul><li><strong>Providing Products and Services.</strong> We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to your account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and other features and functionalities related to your account. We may also enhance your shopping experience by enabling Shopify to match your account with other Shopify services that you may choose to use. In this case, Shopify will process your information as set forth in its Privacy Policy and Consumer Privacy Policy.</li><li><strong>Marketing and Advertising.</strong> We may use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.</li><li><strong>Security and Fraud Prevention.</strong> We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately..</li><li><strong>Communicating with You and Service Improvement.</strong> We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you</li></ul><h2>Cookies</h2><p>Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Shopify, see <a data-sanitized-target="_blank" href="https://www.shopify.com/legal/cookies">https://www.shopify.com/legal/cookies</a>. We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.</p><p>Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.</p><p>Please note that while your browser may allow you to transmit a “do not track” signal, like many websites, our Site is not designed to respond to such signals.</p><h2>How We Disclose Personal Information</h2><p>In certain circumstances, we may disclose your personal information to third parties for contract fulfillment purposes, legitimate purposes and other reasons subject to this Privacy Policy. Such circumstances may include:</p><ul><li>With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li><li>With business and marketing partners to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices.</li><li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.</li><li>With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.</li><li>In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.</li></ul><p>We have in the past 12 months disclosed the following categories of personal information and sensitive personal information about users for the purposes set out above in <i>"How we Collect and Use your Personal Information"</i> and <i>"How we Disclose Personal Information"</i>:</p><table><tbody><tr><th>Category</th><th>Categories of Recipients</th></tr><tr><td><ul><li>Identifiers such as basic contact details and certain order and account information</li><li>Personal information categories listed in the California Customer Records statute such as basic contact details and certain order and account information</li><li>Commercial information such as order information, shopping information and customer support information</li><li>Internet or other similar network activity, such as Usage Data</li><li>Geolocation data such as locations determined by an IP address or other technical measures</li></ul></td><td><ul><li>Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers)</li><li>Business and marketing partners</li><li>Affiliates</li></ul></td></tr></tbody></table><p>We do not use or disclose sensitive personal information without your consent or for the purposes of inferring characteristics about you.</p><h2>Third Party Websites and Links</h2><p>Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.</p><h2>Children's Data</h2><p>The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.</p><p>As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.</p><h2>Security and Retention of Your Information</h2><p>Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us.</p><p>How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.</p><h2>Your Rights</h2><p>Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.</p><ul><li><strong>Right to Access / Know</strong>: You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.</li><li><strong>Right to Delete</strong>: You may have a right to request that we delete personal information we maintain about you.</li><li><strong>Right to Correct</strong>: You may have a right to request that we correct inaccurate personal information we maintain about you.</li><li><strong>Right of Portability</strong>: You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.</li><li><strong>Restriction of Processing</strong>: You may have the right to ask us to stop or restrict our processing of personal information.</li><li><strong>Withdrawal of Consent</strong>: Where we rely on consent to process your personal information, you may have the right to withdraw this consent.</li><li><strong>Appeal</strong>: You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.</li><li><strong>Managing Communication Preferences</strong>: We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.</li></ul><p>You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below.</p><p>We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity, such as your email address or account information, before providing a substantive response to the request. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.</p><h2>Complaints</h2><p>If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.</p><h2>International Users</h2><p>Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third party service providers and partners in these countries.</p><p>If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.</p><h2>Contact</h2><p>Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at<span><strong> </strong><a data-sanitized-target="_blank" href="mailto:info@tegamiknife.com" rel="noopener noreferrer" class="text-entity-link" dir="auto" data-entity-type="MessageEntityEmail">info@tegamicorp.com</a></span>or contact us at 1800 South Ocean Drive, Hallandale Beach, FL, 33009, US.</p>`,
        3: `<p><strong>OVERVIEW</strong> <br>This website is operated by TEGAMI CORP. Throughout the site, the terms “we”, “us” and “our” refer to TEGAMI CORP. TEGAMI CORP offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.;<br><br>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content. <br><br>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service. <br><br>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes. <br><br>Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and Services to you. <br><br><strong>SECTION 1 - ONLINE STORE TERMS</strong> <br>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. <br>You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). <br>You must not transmit any worms or viruses or any code of a destructive nature. <br>A breach or violation of any of the Terms will result in an immediate termination of your Services. <br><br><strong>SECTION 2 - GENERAL CONDITIONS</strong> <br>We reserve the right to refuse Service to anyone for any reason at any time. <br>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. <br>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us. <br>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms. <br><br><strong>SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</strong> <br>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk. <br>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site. <br><br><strong>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</strong> <br>Prices for our products are subject to change without notice. <br>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. <br>We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service. <br><br><strong>SECTION 5 - PRODUCTS OR SERVICES (if applicable)</strong> <br>Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our Refund Policy.<br>We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate. <br>We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or Services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or Service made on this site is void where prohibited. <br>We do not warrant that the quality of any products, Services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected. <br><br><strong>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</strong> <br>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors. <br><br>You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed. <br><br>For more details, please review our Refund Policy.<br><strong>SECTION 7 - OPTIONAL TOOLS</strong> <br>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. <br>You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. <br>Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). <br>We may also, in the future, offer new Services and/or features through the website (including the release of new tools and resources). Such new features and/or Services shall also be subject to these Terms of Service. <br><br><strong>SECTION 8 - THIRD-PARTY LINKS</strong> <br>Certain content, products and Services available via our Service may include materials from third-parties. <br>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or Services of third-parties. <br>We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party. <br><br><strong>SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</strong> <br>If, at our request, you send certain specific submissions (for example contest entries) or without a request from us, you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments. <br>We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service. <br>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party. <br><br><strong>SECTION 10 - PERSONAL INFORMATION</strong> <br>Your submission of personal information through the store is governed by our Privacy Policy.</p><p><br><strong>SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</strong> <br>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order). <br>We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated. <br><br><strong>SECTION 12 - PROHIBITED USES</strong> <br>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses. <br><br><strong>SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</strong> <br>We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or error-free. <br>We do not warrant that the results that may be obtained from the use of the Service will be accurate or reliable. <br>You agree that from time to time we may remove the Service for indefinite periods of time or cancel the Service at any time, without notice to you. <br>You expressly agree that your use of, or inability to use, the Service is at your sole risk. The Service and all products and Services delivered to you through the Service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement. <br>In no case shall TEGAMI CORP, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, Service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the Service or any products procured using the Service, or for any other claim related in any way to your use of the Service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the Service or any content (or product) posted, transmitted, or otherwise made available via the Service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.;<br><br><strong>SECTION 14 - INDEMNIFICATION</strong> <br>You agree to indemnify, defend and hold harmless TEGAMI CORP and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, Service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.;<br><br><strong>SECTION 15 - SEVERABILITY</strong> <br>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions. <br><br><strong>SECTION 16 - TERMINATION</strong> <br>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. <br>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site. <br>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof). <br><br><strong>SECTION 17 - ENTIRE AGREEMENT</strong> <br>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. <br>These Terms of Service and any policies or operating rules posted by us on this site or in respect to the Service constitutes the entire agreement and understanding between you and us and governs your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service). <br>Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party. <br><br><strong>SECTION 18 - GOVERNING LAW</strong> <br>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of United States. <br><br><strong>SECTION 19 - CHANGES TO TERMS OF SERVICE</strong> <br>You can review the most current version of the Terms of Service at any time at this page. <br>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes. <br><br><strong>SECTION 20 - CONTACT INFORMATION</strong> <br>Questions about the Terms of Service should be sent to us at info@tegamicorp.com.<br><br><span>Email:;</span><a data-sanitized-target="_blank" data-entity-type="MessageEntityEmail" dir="auto" class="text-entity-link" rel="noopener noreferrer" href="mailto:info@tegamicorp.com">info@tegamicorp.com</a><br><br><strong>Business Information:</strong><br><br><span>TEGAMI CORP</span><br><span>United States, 1800 S Ocean Dr, 1403, Hallandale Beach, Florida, 33009</span><br><span>Registration Number: P23000073938</span></p>`,
        4: `<p><span>At TEGAMI CORP, we are committed to delivering your order as quickly and efficiently as possible. Below is information regarding our shipping policies.</span><br><br><strong>Processing Time</strong><br><br><span>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</span><br><br><strong>Shipping Rates &amp; Delivery Estimates</strong><br><br><span>Shipping charges for your order will be calculated and displayed at checkout. We offer standard and expedited shipping options. Delivery estimates will vary based on the shipping option chosen and the destination of the order.</span><br><br><strong>Shipment Confirmation &amp; Order Tracking</strong><br><br><span>You will receive a shipment confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</span><br><br><strong>Customs, Duties, and Taxes</strong><br><br><span>TEGAMI CORP is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</span><br><br><strong>Damages</strong><br><br><span>TEGAMI CORP is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</span><br><br><strong>Contact Us</strong><br><br><span>If you have any questions about your order, please contact us at:&amp;nbsp;<strong> </strong><a data-sanitized-target="_blank" href="mailto:info@tegamiknife.com" rel="noopener noreferrer" class="text-entity-link" dir="auto" data-entity-type="MessageEntityEmail">info@tegamicorp.com.</a></span></p>`,
        5: `<p><span>If you have any questions please contact us:</span><br><br><br><br><strong>Email: </strong><a data-sanitized-target="_blank" href="mailto:info@dtegamiknife.com" rel="noopener noreferrer" class="text-entity-link" dir="auto" data-entity-type="MessageEntityEmail">info@tegamicorp.com</a><br><br><strong>Business Information:</strong><br><br><span>TEGAMI CORP</span><br><span>United States, 1800 S Ocean Dr, 1403, Hallandale Beach, Florida, 33009</span></p>    `
    }
    let modalPrivacyBtn = document.querySelectorAll('.footer-bottom__link')
    let modalPrivacyContent = document.querySelector('.policy-modal-content')
    let privacyModal = document.querySelector('.policy-modal')
    let modalPrivacyClose = document.querySelector('.policy-modal-close')
    modalPrivacyBtn.forEach(privacy =>{
        privacy.addEventListener('click', ()=>{
            let itemId = privacy.getAttribute('data-policy')
                modalPrivacyContent.innerHTML = modalPrivacy[itemId]
                privacyModal.classList.add('show')
                bodyTag.classList.add('hidden')
        })
        
    })

    modalPrivacyClose.addEventListener('click', ()=>{
        privacyModal.classList.remove('show')
        bodyTag.classList.remove('hidden')
    })
    privacyModal.addEventListener('click', (event)=>{
        console.log(event.target);
        
        if(!event.target.closest('.modal-content')){
            privacyModal.classList.remove('show')
            bodyTag.classList.remove('hidden')
        }
    })






    // if (window.innerWidth <= 650) {
    // const eachInner = document.querySelector('.each__inner');
    // const eachKnife = document.querySelector('.each-knife');

    // // Функция обновления позиции блока
    // function updateKnifePosition() {
    //     // Получаем координаты родительского элемента относительно окна
    //     const parentRect = eachInner.getBoundingClientRect();
    //     const windowHeight = window.innerHeight;

    //     // Вычисляем, насколько низ родителя поднялся относительно нижней границы окна
    //     // Если нижняя граница родителя выше нижней границы окна, то разница положительна
    //     let translateY = 0;
    //     if (parentRect.bottom < windowHeight) {
    //     translateY = windowHeight - parentRect.bottom;
    //     }

    //     // Опционально: ограничиваем перемещение, чтобы блок не выходил за пределы родителя
    //     const parentHeight = eachInner.offsetHeight;
    //     const knifeHeight = eachKnife.offsetHeight;
    //     const maxTranslate = parentHeight - knifeHeight;
    //     translateY = Math.min(translateY, maxTranslate);

    //     // Применяем смещение через transform
    //     eachKnife.style.transform = `translate(-50%, ${translateY}px)`;
    // }

    // // Обновляем позицию при прокрутке и изменении размеров окна
    // window.addEventListener('scroll', updateKnifePosition);
    // window.addEventListener('resize', updateKnifePosition);
    // updateKnifePosition();
    // }



    // Функция для обновления состояний промо-блоков (product-list) и общей суммы заказа
function updateUI() {
    const activeProducts = document.querySelectorAll('.product-item.active');
    const activeCount = activeProducts.length;
    const promoItems = document.querySelectorAll('.product-list-item');
    
    // Сброс активных состояний для промо-блоков
    promoItems.forEach(item => item.classList.remove('active'));
    
    // Условие: бесплатная доставка при 2+ продуктах
    if (activeCount >= 2) {
      promoItems[0].classList.add('active'); // Бесплатная доставка
      // Здесь можно сохранить или отправить данные для применения промокода 'FREESHIP'
    }
    
    // Условие: книга в подарок и скидка 19% при 3+ продуктах
    if (activeCount >= 3) {
      promoItems[1].classList.add('active'); // Книга в подарок
      promoItems[2].classList.add('active'); // Скидка 19%
      // Здесь можно добавить логику для применения промокода 'DISCOUNT19' и добавления книги
    }
    
    // Условие: если добавлены все 5 продуктов, изменяем скидку на 29%
    if (activeCount === 5) {
      // Можно обновить текст или класс для отображения промокода 29%
      // Например, переопределить скидку для promoItems[2]
      promoItems[2].classList.add('active');
      // Логика применения промокода 'DISCOUNT29'
    }
    
    updateTotalPrice();
  }
  
  // Функция для пересчёта общей суммы заказа
  function updateTotalPrice() {
    const activeProducts = document.querySelectorAll('.product-item.active');
    let total = 0;
    
    activeProducts.forEach(product => {
      // Предполагаем, что цена хранится в data-атрибуте, например: data-price="135"
      const price = parseFloat(product.getAttribute('data-price')) || 0;
      total += price;
    });
    
    const orderBtn = document.querySelector('.product-order-btn');
    // Обновляем отображаемую цену внутри кнопки
    orderBtn.querySelector('.total-price').textContent = `$${total}`;
    
    // Если нет активных продуктов – кнопка не активна, иначе активна
    if (total > 0) {
      orderBtn.classList.add('active');
      // Привязываем кнопку к checkout, можно задать href или обрабатывать переход
      orderBtn.setAttribute('onclick', "window.location.href='/checkout'");
    } else {
      orderBtn.classList.remove('active');
      orderBtn.removeAttribute('onclick');
    }
  }
  
  // Функция для добавления продукта в корзину через fetch
  function addProduct(productId, quantity = 1) {
    fetch('https://tegamicorp.com/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, quantity })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Добавлено в корзину:', data);
        // Дополнительная логика обновления корзины, если требуется
      })
      .catch(error => console.error('Ошибка при добавлении в корзину:', error));
  }
  
  // Функция для удаления продукта из корзины (или изменения количества)
  function removeProduct(lineId) {
    fetch('https://tegamicorp.com/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line: lineId, quantity: 0 })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Удалено из корзины:', data);
      })
      .catch(error => console.error('Ошибка при удалении из корзины:', error));
  }
  
  // Обработчик клика для каждой кнопки продукта
  const productBtns = document.querySelectorAll('.product-item__btn');
  productBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productItem = btn.closest('.product-item');
      // Предполагаем, что идентификатор продукта хранится в data-атрибуте
      const productId = productItem.getAttribute('data-product-id');
      
      if (productItem.classList.contains('active')) {
        // Если продукт уже добавлен, то удаляем его из корзины
        // Для удаления необходимо знать lineId, который можно сохранить при добавлении
        // removeProduct(lineId);
        productItem.classList.remove('active');
        btn.classList.remove('active');
      } else {
        // Добавляем продукт в корзину
        addProduct(productId);
        productItem.classList.add('active');
        btn.classList.add('active');
      }
      
      // После каждого изменения обновляем промо и общую сумму
      updateUI();
    });
  });
});