// العناصر الرئيسية
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const adminScreen = document.getElementById('admin-screen');

const phoneBtn = document.getElementById('phone-btn');
const emailBtn = document.getElementById('email-btn');
const backToLoginBtn = document.getElementById('back-to-login');
const backToChatBtn = document.getElementById('back-to-chat');
const logoutBtn = document.getElementById('logout-btn');

const chatItems = document.querySelectorAll('.chat-item');
const sendBtn = document.querySelector('.send-btn');
const messageInput = document.querySelector('.message-input input');
const messagesContainer = document.querySelector('.messages-container');

const toast = document.getElementById('toast');

// دالة تبديل الشاشات
function showScreen(screen) {
    loginScreen.classList.remove('active');
    chatScreen.classList.remove('active');
    adminScreen.classList.remove('active');

    switch(screen) {
        case 'login':
            loginScreen.classList.add('active');
            break;
        case 'chat':
            chatScreen.classList.add('active');
            break;
        case 'admin':
            adminScreen.classList.add('active');
            startCountUp();
            break;
    }
}

// دالة عرض الإشعارات
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.style.background = type === 'success' 
        ? 'rgba(34, 197, 94, 0.2)' 
        : 'rgba(239, 68, 68, 0.2)';
    toast.style.borderColor = type === 'success' ? '#22C55E' : '#EF4444';
    toast.style.color = type === 'success' ? '#22C55E' : '#EF4444';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// معالجات الأزرار - تسجيل الدخول
phoneBtn.addEventListener('click', () => {
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput.value.trim()) {
        showToast('تم التحقق من رقم الهاتف بنجاح');
        setTimeout(() => showScreen('chat'), 500);
    } else {
        showToast('يرجى إدخال رقم الهاتف', 'error');
    }
});

emailBtn.addEventListener('click', () => {
    showToast('سيتم إرسال رابط التحقق إلى بريدك الإلكتروني');
    setTimeout(() => showScreen('chat'), 500);
});

// معالجات الأزرار - العودة
backToLoginBtn.addEventListener('click', () => {
    showScreen('login');
});

backToChatBtn.addEventListener('click', () => {
    showScreen('chat');
});

logoutBtn.addEventListener('click', () => {
    showToast('تم تسجيل الخروج بنجاح');
    setTimeout(() => showScreen('login'), 500);
});

// معالجات المحادثات
chatItems.forEach(item => {
    item.addEventListener('click', () => {
        chatItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const chatName = item.querySelector('.chat-info h3').textContent;
        showToast(`تم فتح محادثة مع ${chatName}`);
    });
});

// معالج إرسال الرسالة
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // إنشاء عنصر الرسالة
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message outgoing message-bubble';
    
    const p = document.createElement('p');
    p.textContent = text;
    
    const time = document.createElement('span');
    time.className = 'time';
    const now = new Date();
    time.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    messageDiv.appendChild(p);
    messageDiv.appendChild(time);
    
    messagesContainer.appendChild(messageDiv);
    messageInput.value = '';
    
    // التمرير للأسفل
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // محاكاة رسالة واردة
    setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'message incoming message-bubble';
        
        const replyP = document.createElement('p');
        replyP.textContent = 'شكراً على رسالتك! 😊';
        
        const replyTime = document.createElement('span');
        replyTime.className = 'time';
        const replyNow = new Date();
        replyTime.textContent = `${replyNow.getHours().toString().padStart(2, '0')}:${replyNow.getMinutes().toString().padStart(2, '0')}`;
        
        replyDiv.appendChild(replyP);
        replyDiv.appendChild(replyTime);
        
        messagesContainer.appendChild(replyDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// دالة Count Up للإحصائيات
function startCountUp() {
    const countElements = document.querySelectorAll('.count-up');
    
    countElements.forEach(element => {
        const target = parseInt(element.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 50);
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            element.textContent = current;
        }, 30);
    });
}

// معالج Admin Dashboard
const adminBtn = document.createElement('button');
adminBtn.className = 'btn btn-secondary';
adminBtn.textContent = 'لوحة التحكم';
adminBtn.style.position = 'fixed';
adminBtn.style.top = '20px';
adminBtn.style.right = '20px';
adminBtn.style.zIndex = '1000';
adminBtn.addEventListener('click', () => showScreen('admin'));

// إضافة زر الأدمن عند فتح شاشة المحادثات
chatScreen.addEventListener('click', () => {
    if (!document.body.contains(adminBtn)) {
        document.body.appendChild(adminBtn);
    }
}, { once: true });

// إزالة زر الأدمن عند العودة للتسجيل
backToLoginBtn.addEventListener('click', () => {
    if (document.body.contains(adminBtn)) {
        adminBtn.remove();
    }
});

// تأثيرات الرسوم المتحركة
window.addEventListener('load', () => {
    // تأخير متدرج للعناصر المتحركة
    const animateElements = document.querySelectorAll('.animate-in');
    animateElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// معالج الإدخال - البحث
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        chatItems.forEach(item => {
            const name = item.querySelector('.chat-info h3').textContent.toLowerCase();
            item.style.display = name.includes(query) ? 'flex' : 'none';
        });
    });
}

// دعم RTL
document.documentElement.dir = 'rtl';
document.documentElement.lang = 'ar';

// تسجيل مستخدم جديد (محاكاة)
function simulateNewUser() {
    const users = ['أحمد علي', 'فاطمة محمد', 'محمد سالم', 'سارة أحمد'];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    
    setTimeout(() => {
        showToast(`مستخدم جديد: ${randomUser} انضم للتطبيق`);
    }, 5000);
}

// بدء المحاكاة
simulateNewUser();

// اختبار الأداء
console.log('✅ تطبيق Mensaje Web جاهز');
console.log('🎨 نظام التصميم: Dark Luxury');
console.log('📱 الواجهات: تسجيل دخول، محادثات، لوحة تحكم');
