// اطلاعات تماس مالک - درخواست رزرو به این شماره‌ها فرستاده می‌شود
// شماره را با فرمت بین‌المللی و بدون + و صفر اول بنویسید: 989121234567
const OWNER = { phone: "989033462221", telegram: "farahabadir" };
// اطلاعات ویلاها - برای افزودن ویلای جدید، یک بلوک مشابه کپی کنید.
// عکس‌ها فعلا نمونه‌اند؛ بعدا آدرس عکس واقعی را در "images" می‌گذاریم.
const VILLAS = [
  {
    id: 6, title: "ویلای ساحلی استخردار در فرح آباد", city: "فرح‌آباد", type: "ویلا",
    price: 5000000, rooms: 2, capacity: 10, rating: 5, reviews: 0,
    amenities: ["استخر", "پارکینگ", "فوتبال دستی", "بیلیارد"],
    img: "villa1.webp", gallery: ["villa1.webp","gal-IMG_20260908_WA0017.webp","gal-IMG_20260908_WA0019.webp","gal-IMG_20260908_WA0021.webp","gal-IMG_20260908_WA0023.webp","gal-IMG_20260909_185859.webp"], emoji: "🏊", color: "#2c4a5a",
    desc: "یک باب ویلا استخردار دربست واقع در فرح آباد\nاستخر دارای تصفیه آب آنی\n۱۸۰ متر بنا ، حیاط دار ، درب ریموت\nفوتبال دستی، بیلیارد ، نزدیک دریا با کلیه امکانات رفاهی"
  },
  {
    id: 7, title: "سوئیت ساحلی در فرح آباد", city: "فرح‌آباد", type: "ویلا",
    price: 1200000, rooms: 1, capacity: 6, rating: 5, reviews: 0,
    amenities: [],
    img: "suite-6.webp", gallery: ["suite-6.webp", "suite1.webp", "suite-1.webp", "suite-2.webp", "suite-3.webp", "suite-4.webp", "suite-5.webp"], emoji: "🏖️", color: "#4a6fa5",
    desc: "یک باب سوئیت ساحلی واقع در فرح آباد\n۷۰ متر بنا ، کوچه اختصاصی\nفاصله تا دریا : ۸۰۰ متر\nدارای کلیه امکانات رفاهی"
  },
  {
    id: 8, title: "ویلای ساحلی استخر جکوزی در فرح آباد", city: "فرح‌آباد", type: "ویلا",
    price: 5000000, rooms: 2, capacity: 10, rating: 5, reviews: 0,
    amenities: ["استخر", "جکوزی", "پارکینگ", "اسپیکر", "فوتبال دستی", "باربیکیو", "توالت فرنگی"],
    img: "jacuzzi1.webp", gallery: ["jacuzzi1.webp","jac-IMG_20260908_153659_071.webp","jac-IMG_20260908_153652_166.webp","jac-IMG_20260908_153701_780.webp","jac-IMG_20260908_153705_614.webp","jac-IMG_20260908_153708_239.webp","jac-IMG_20260908_153646_323.webp"], emoji: "🛁", color: "#2a6f7f",
    desc: "یک باب ویلا استخردار دربست واقع در فرح آباد\nاستخر و جکوزی دارای تصفیه آب آنی\n۱۸۰ متر بنا ، نیم پیلوت ، پارکینگ ، درب ریموت\nفوتبال دستی، جکوزی، اسپیکر و کلیه امکانات رفاهی"
  },
  {
    id: 9, title: "سوئیت ساحلی در فرح آباد", city: "فرح‌آباد", type: "ویلا",
    price: 2000000, rooms: 1, capacity: 4, rating: 5, reviews: 0,
    amenities: ["پارکینگ", "آلاچیق"],
    img: "sn-WA0003.webp", gallery: ["sn-WA0003.webp", "sn-WA0001.webp", "sn-WA0002.webp", "sn-WA0004.webp", "sn-WA0005.webp", "sn-WA0006.webp", "sn-WA0007.webp", "sn-WA0008.webp", "sn-WA0010.webp", "sn-WA0011.webp"], emoji: "🏖️", color: "#4a6fa5",
    desc: "یک باب سوئیت نزدیک دریا واقع در فرح آباد\n۸۰ متر بنا، با کلیه امکانات رفاهی\nفقط مناسب خانواده"
  }
];
