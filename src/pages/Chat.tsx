import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Mic, MicOff, Volume2, Bot, User, Globe, MessageCircle, Languages } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! Welcome to Jharkhand Tourism AI Assistant. I can help you in multiple languages including Hindi, Bengali, Santali, and English. How can I assist you today?",
      language: "en",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [detectedLanguage, setDetectedLanguage] = useState("en");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
    { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱞᱤ" },
    { code: "ur", name: "Urdu", native: "اردو" },
    { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" }
  ];

  // Language detection patterns
  const languagePatterns = {
    hi: /[\u0900-\u097F]/,
    bn: /[\u0980-\u09FF]/,
    sat: /[\u1C50-\u1C7F]/,
    ur: /[\u0600-\u06FF]/,
    or: /[\u0B00-\u0B7F]/,
    en: /^[a-zA-Z\s.,!?]+$/
  };

  // Multilingual quick questions
  const quickQuestions = {
    en: [
    "What are the best places to visit in Jharkhand?",
    "How do I reach Netarhat from Ranchi?",
    "Tell me about tribal culture in Jharkhand",
    "What are the popular festivals here?",
    "Suggest a 3-day itinerary",
    "Where can I buy authentic handicrafts?"
    ],
    hi: [
      "झारखंड में घूमने की सबसे अच्छी जगहें कौन सी हैं?",
      "रांची से नेतरहाट कैसे पहुंचें?",
      "झारखंड की आदिवासी संस्कृति के बारे में बताएं",
      "यहां के लोकप्रिय त्योहार कौन से हैं?",
      "3 दिन का कार्यक्रम सुझाएं",
      "प्रामाणिक हस्तशिल्प कहां से खरीदें?"
    ],
    bn: [
      "ঝাড়খণ্ডে দেখার সেরা জায়গাগুলি কী?",
      "রাঁচি থেকে নেতারহাট কীভাবে যাবেন?",
      "ঝাড়খণ্ডের উপজাতি সংস্কৃতি সম্পর্কে বলুন",
      "এখানকার জনপ্রিয় উৎসবগুলি কী?",
      "৩ দিনের পরিকল্পনা দিন",
      "খাঁটি হস্তশিল্প কোথায় কিনবেন?"
    ],
    sat: [
      "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮ ᱧᱮᱞᱜᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱱᱟᱯᱟᱭ ᱡᱟᱭᱜᱟ ᱠᱚ ᱪᱮᱫ?",
      "ᱨᱟᱸᱪᱤ ᱠᱷᱚᱱ ᱱᱮᱛᱟᱨᱦᱟᱴ ᱪᱮᱫ ᱞᱮᱠᱟ ᱥᱮᱱᱚᱜ ᱠᱟᱱᱟ?",
      "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱟᱫᱤᱵᱟᱥᱤ ᱞᱟᱠᱪᱟᱨ ᱵᱟᱵᱚᱛ ᱛᱮ ᱞᱟᱹᱭ ᱢᱮ",
      "ᱱᱚᱸᱰᱮᱱᱟᱜ ᱢᱟᱱᱟᱢ ᱯᱟᱨᱟᱵᱽ ᱠᱚ ᱪᱮᱫ?",
      "ᱯᱮ ᱢᱟᱦᱟᱸ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱮᱢ ᱢᱮ",
      "ᱥᱟᱹᱨᱤ ᱦᱟᱛᱠᱟᱨᱤ ᱪᱮᱫ ᱡᱟᱭᱜᱟ ᱠᱷᱚᱱ ᱠᱤᱱᱟᱹᱣ ᱢᱮ?"
    ]
  };

  // Multilingual responses
  const multilingualResponses = {
    places: {
      en: "Jharkhand offers incredible destinations like Netarhat (Queen of Chotanagpur), Betla National Park for wildlife, Hundru Falls, Jonha Falls, and the beautiful tribal villages around Khunti. Each place has its unique charm and cultural significance.",
      hi: "झारखंड में नेतरहाट (छोटानागपुर की रानी), वन्यजीव के लिए बेतला राष्ट्रीय उद्यान, हुंडरू जलप्रपात, जोन्हा जलप्रपात, और खूंटी के आसपास के खूबसूरत आदिवासी गांव जैसे अद्भुत स्थान हैं। हर जगह का अपना अनूठा आकर्षण और सांस्कृतिक महत्व है।",
      bn: "ঝাড়খণ্ডে নেতারহাট (ছোটনাগপুরের রানী), বন্যপ্রাণীর জন্য বেতলা জাতীয় উদ্যান, হুন্ড্রু জলপ্রপাত, জনহা জলপ্রপাত এবং খুঁটি চারপাশের সুন্দর উপজাতি গ্রামের মতো অবিশ্বাস্য গন্তব্য রয়েছে। প্রতিটি জায়গার নিজস্ব অনন্য আকর্ষণ এবং সাংস্কৃতিক তাৎপর্য রয়েছে।",
      sat: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮ ᱱᱮᱛᱟᱨᱦᱟᱴ (ᱪᱷᱚᱴᱟᱱᱟᱜᱯᱩᱨ ᱨᱮᱱᱟᱜ ᱨᱟᱹᱱᱤ), ᱵᱟᱹᱨᱡᱟᱹᱞᱤ ᱞᱟᱹᱜᱤᱫ ᱵᱮᱛᱞᱟ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱟᱜᱟᱱ, ᱦᱩᱱᱰᱨᱩ ᱫᱟᱜ ᱡᱟᱹᱯᱩᱫ, ᱡᱚᱱᱦᱟ ᱫᱟᱜ ᱡᱟᱹᱯᱩᱫ, ᱟᱨ ᱠᱷᱩᱱᱴᱤ ᱥᱟᱸᱜᱮ ᱨᱮᱱᱟᱜ ᱥᱩᱱᱫᱨ ᱟᱫᱤᱵᱟᱥᱤ ᱟᱹᱛᱩ ᱞᱮᱠᱟᱱ ᱚᱵᱷᱤᱥᱣᱟᱥᱱᱤᱭ ᱜᱚᱱᱛᱷᱵᱭᱚ ᱮᱢᱟᱫᱟᱭ। ᱡᱚᱛᱚ ᱡᱟᱭᱜᱟ ᱨᱮᱱᱟᱜ ᱟᱡᱟᱜ ᱵᱮᱜᱟᱨ ᱟᱠᱨᱥᱚᱱ ᱟᱨ ᱞᱟᱠᱪᱟᱨ ᱢᱩᱞᱭ ᱢᱮᱱᱟᱜᱼᱟ।"
    },
    reach: {
      en: "From Ranchi to Netarhat, you can take a bus (4-5 hours) or hire a taxi (3 hours). The route goes through Kanke-Khiju-Daltonganj road. I recommend starting early morning to catch the famous Netarhat sunrise!",
      hi: "रांची से नेतरहाट के लिए आप बस (4-5 घंटे) या टैक्सी (3 घंटे) ले सकते हैं। रास्ता कांके-खिजू-दालतोंगंज सड़क से होकर जाता है। मैं प्रसिद्ध नेतरहाट सूर्योदय को देखने के लिए सुबह जल्दी शुरू करने की सलाह देता हूं!",
      bn: "রাঁচি থেকে নেতারহাটে যাওয়ার জন্য আপনি বাস (৪-৫ ঘন্টা) বা ট্যাক্সি (৩ ঘন্টা) নিতে পারেন। রাস্তাটি কানকে-খিজু-দালতোনগঞ্জ সড়ক দিয়ে যায়। বিখ্যাত নেতারহাট সূর্যোদয় দেখার জন্য আমি সকালে তাড়াতাড়ি শুরু করার পরামর্শ দিই!",
      sat: "ᱨᱟᱸᱪᱤ ᱠᱷᱚᱱ ᱱᱮᱛᱟᱨᱦᱟᱴ ᱞᱟᱹᱜᱤᱫ ᱟᱢ ᱵᱟᱥ (᱔-᱕ ᱴᱟᱲᱟᱝ) ᱟᱨᱵᱟᱝ ᱴᱮᱠᱥᱤ (᱓ ᱴᱟᱲᱟᱝ) ᱦᱟᱛᱟᱣ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ। ᱥᱟᱲᱟᱝ ᱠᱟᱱᱠᱮ-ᱠᱷᱤᱡᱩ-ᱫᱟᱞᱛᱚᱱᱜᱚᱸᱡᱽ ᱥᱚᱲᱚᱠ ᱛᱮ ᱥᱮᱱᱚᱜᱼᱟ। ᱢᱟᱱᱟᱢ ᱱᱮᱛᱟᱨᱦᱟᱴ ᱥᱩᱨᱡᱳᱫᱚᱭ ᱧᱮᱞ ᱞᱟᱹᱜᱤᱫ ᱤᱧ ᱥᱮᱨᱢᱟ ᱛᱟᱞᱟᱛᱮ ᱮᱦᱚᱵ ᱞᱟᱹᱜᱤᱫ ᱮᱢᱟᱫᱟᱭ!"
    },
    culture: {
      en: "Jharkhand's tribal culture is incredibly rich! The major tribes include Santhal, Munda, Ho, and Oraon. They have unique traditions, folk dances like Jhumar and Domkach, beautiful handicrafts, and festivals like Sarhul and Karma. You can visit tribal museums in Ranchi to learn more.",
      hi: "झारखंड की आदिवासी संस्कृति अविश्वसनीय रूप से समृद्ध है! प्रमुख जनजातियों में संथाल, मुंडा, हो और ओरांव शामिल हैं। उनकी अनूठी परंपराएं, झूमर और डोमकच जैसे लोक नृत्य, खूबसूरत हस्तशिल्प, और सरहुल और कर्म जैसे त्योहार हैं। अधिक जानने के लिए आप रांची में आदिवासी संग्रहालय जा सकते हैं।",
      bn: "ঝাড়খণ্ডের উপজাতি সংস্কৃতি অবিশ্বাস্যভাবে সমৃদ্ধ! প্রধান উপজাতিগুলির মধ্যে রয়েছে সাঁওতাল, মুন্ডা, হো এবং ওরাওন। তাদের অনন্য ঐতিহ্য, ঝুমার এবং ডোমকচের মতো লোকনৃত্য, সুন্দর হস্তশিল্প এবং সরহুল এবং কর্মের মতো উৎসব রয়েছে। আরও জানতে আপনি রাঁচিতে উপজাতি জাদুঘর দেখতে পারেন।",
      sat: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱟᱫᱤᱵᱟᱥᱤ ᱞᱟᱠᱪᱟᱨ ᱚᱵᱷᱤᱥᱣᱟᱥᱱᱤᱭ ᱞᱮᱠᱟᱛᱮ ᱫᱟᱨᱮᱭᱟᱜᱼᱟ! ᱢᱩᱬᱩᱫ ᱟᱫᱤᱵᱟᱥᱤ ᱠᱚ ᱨᱮ ᱥᱟᱱᱛᱟᱞ, ᱢᱩᱱᱰᱟ, ᱦᱳ, ᱟᱨ ᱳᱨᱟᱣᱱ ᱥᱮᱞᱮᱫ ᱢᱮᱱᱟᱜᱼᱟ। ᱩᱱᱠᱩᱣᱟᱜ ᱵᱮᱜᱟᱨ ᱫᱷᱚᱨᱚᱢ, ᱡᱷᱩᱢᱟᱨ ᱟᱨ ᱰᱚᱢᱠᱟᱪ ᱞᱮᱠᱟᱱ ᱞᱚᱠ ᱱᱟᱪ, ᱥᱩᱱᱫᱨ ᱦᱟᱛᱠᱟᱨᱤ, ᱟᱨ ᱥᱟᱨᱦᱩᱞ ᱟᱨ ᱠᱟᱨᱢᱟ ᱞᱮᱠᱟᱱ ᱯᱟᱨᱟᱵᱽ ᱢᱮᱱᱟᱜᱼᱟ। ᱰᱷᱮᱨ ᱥᱮᱬᱟᱭ ᱞᱟᱹᱜᱤᱫ ᱟᱢ ᱨᱟᱸᱪᱤ ᱨᱮ ᱟᱫᱤᱵᱟᱥᱤ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱟᱜᱟᱱ ᱧᱮᱞ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ।"
    },
    festivals: {
      en: "Major festivals include Sarhul (spring festival), Karma (harvest festival), Sohrai (harvest festival), and Tusu (winter festival). These celebrations feature traditional music, dance, and community gatherings that showcase the vibrant tribal culture.",
      hi: "प्रमुख त्योहारों में सरहुल (वसंत त्योहार), कर्म (फसल त्योहार), सोहराई (फसल त्योहार), और तुसू (सर्दी त्योहार) शामिल हैं। इन उत्सवों में पारंपरिक संगीत, नृत्य और सामुदायिक सभाएं होती हैं जो जीवंत आदिवासी संस्कृति को प्रदर्शित करती हैं।",
      bn: "প্রধান উৎসবগুলির মধ্যে রয়েছে সরহুল (বসন্ত উৎসব), কর্ম (ফসল উৎসব), সোহরাই (ফসল উৎসব) এবং তুসু (শীত উৎসব)। এই উদযাপনগুলিতে ঐতিহ্যবাহী সংগীত, নৃত্য এবং সম্প্রদায়ের সমাবেশ রয়েছে যা প্রাণবন্ত উপজাতি সংস্কৃতিকে প্রদর্শন করে।",
      sat: "ᱢᱩᱬᱩᱫ ᱯᱟᱨᱟᱵᱽ ᱠᱚ ᱨᱮ ᱥᱟᱨᱦᱩᱞ (ᱥᱮᱨᱢᱟ ᱯᱟᱨᱟᱵᱽ), ᱠᱟᱨᱢᱟ (ᱯᱷᱟᱥᱚᱞ ᱯᱟᱨᱟᱵᱽ), ᱥᱚᱦᱨᱟᱭ (ᱯᱷᱟᱥᱚᱞ ᱯᱟᱨᱟᱵᱽ), ᱟᱨ ᱛᱩᱥᱩ (ᱨᱤᱛᱩ ᱯᱟᱨᱟᱵᱽ) ᱥᱮᱞᱮᱫ ᱢᱮᱱᱟᱜᱼᱟ। ᱱᱚᱣᱟ ᱢᱟᱱᱟᱢ ᱠᱚ ᱨᱮ ᱫᱷᱚᱨᱚᱢ ᱥᱮᱨᱮᱧ, ᱱᱟᱪ, ᱟᱨ ᱥᱟᱶᱛᱟ ᱜᱟᱶᱛᱟ ᱢᱮᱱᱟᱜᱼᱟ ᱡᱟᱦᱟᱸ ᱡᱤᱣᱚᱱᱛ ᱟᱫᱤᱵᱟᱥᱤ ᱞᱟᱠᱪᱟᱨ ᱫᱮᱠᱷᱟᱣ ᱢᱮᱱᱟᱜᱼᱟ।"
    },
    itinerary: {
      en: "Here's a perfect 3-day plan:\nDay 1: Ranchi city tour - Tribal Museum, Tagore Hill, local markets\nDay 2: Netarhat - sunrise point, tribal village visit\nDay 3: Betla National Park - wildlife safari, Palamau Fort\nWould you like detailed timings and activities?",
      hi: "यहाँ एक आदर्श 3-दिन का कार्यक्रम है:\nदिन 1: रांची शहर भ्रमण - आदिवासी संग्रहालय, टैगोर हिल, स्थानीय बाजार\nदिन 2: नेतरहाट - सूर्योदय बिंदु, आदिवासी गांव भ्रमण\nदिन 3: बेतला राष्ट्रीय उद्यान - वन्यजीव सफारी, पलामू किला\nक्या आप विस्तृत समय और गतिविधियां चाहते हैं?",
      bn: "এখানে একটি নিখুঁত ৩ দিনের পরিকল্পনা:\nদিন ১: রাঁচি শহর ভ্রমণ - উপজাতি জাদুঘর, ঠাকুর পাহাড়, স্থানীয় বাজার\nদিন ২: নেতারহাট - সূর্যোদয় বিন্দু, উপজাতি গ্রাম ভ্রমণ\nদিন ৩: বেতলা জাতীয় উদ্যান - বন্যপ্রাণী সাফারি, পালামৌ দুর্গ\nআপনি কি বিস্তারিত সময় এবং কার্যক্রম চান?",
      sat: "ᱱᱚᱸᱰᱮ ᱢᱤᱫᱴᱮᱱ ᱯᱩᱨᱟᱹᱣ ᱓ ᱢᱟᱦᱟᱸ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱢᱮᱱᱟᱜᱼᱟ:\nᱢᱟᱦᱟᱸ ᱑: ᱨᱟᱸᱪᱤ ᱥᱚᱦᱚᱨ ᱥᱮᱨᱢᱟ - ᱟᱫᱤᱵᱟᱥᱤ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱟᱜᱟᱱ, ᱴᱟᱜᱚᱨ ᱦᱤᱞ, ᱡᱟᱭᱜᱟ ᱵᱟᱡᱟᱨ\nᱢᱟᱦᱟᱸ ᱒: ᱱᱮᱛᱟᱨᱦᱟᱴ - ᱥᱩᱨᱡᱳᱫᱚᱭ ᱵᱤᱱᱫᱩ, ᱟᱫᱤᱵᱟᱥᱤ ᱟᱹᱛᱩ ᱥᱮᱨᱢᱟ\nᱢᱟᱦᱟᱸ ᱓: ᱵᱮᱛᱞᱟ ᱡᱟᱹᱛᱤᱭᱟᱹᱨᱤ ᱵᱟᱜᱟᱱ - ᱵᱟᱹᱨᱡᱟᱹᱞᱤ ᱥᱟᱯᱷᱟᱨᱤ, ᱯᱟᱞᱟᱢᱟᱣ ᱠᱤᱞᱟ\nᱟᱢ ᱫᱚ ᱵᱤᱥᱛᱟᱨ ᱚᱠᱛᱚ ᱟᱨ ᱠᱟᱹᱢᱤ ᱠᱚ ᱠᱩᱥᱤᱭᱟᱜᱼᱟ ᱥᱮ?"
    },
    handicrafts: {
      en: "For authentic tribal handicrafts, visit:\n• Main Road Market in Ranchi\n• Tribal Research Institute showroom\n• Khadi Gramodyog Bhavan\n• Local tribal villages near Khunti\nLook for bamboo crafts, dokra art, handwoven textiles, and traditional jewelry.",
      hi: "प्रामाणिक आदिवासी हस्तशिल्प के लिए यहाँ जाएं:\n• रांची में मेन रोड मार्केट\n• आदिवासी अनुसंधान संस्थान शोरूम\n• खादी ग्रामोद्योग भवन\n• खूंटी के पास स्थानीय आदिवासी गांव\nबांस की कलाकृतियां, धोकरा कला, हाथ से बुने कपड़े और पारंपरिक गहने देखें।",
      bn: "খাঁটি উপজাতি হস্তশিল্পের জন্য দেখুন:\n• রাঁচিতে মেইন রোড মার্কেট\n• উপজাতি গবেষণা ইনস্টিটিউট শোরুম\n• খাদি গ্রামোদ্যোগ ভবন\n• খুঁটির কাছে স্থানীয় উপজাতি গ্রাম\nবাঁশের কারুশিল্প, ঢোকরা শিল্প, হাতে বোনা বস্ত্র এবং ঐতিহ্যবাহী গহনা দেখুন।",
      sat: "ᱥᱟᱹᱨᱤ ᱟᱫᱤᱵᱟᱥᱤ ᱦᱟᱛᱠᱟᱨᱤ ᱞᱟᱹᱜᱤᱫ ᱧᱮᱞ ᱢᱮ:\n• ᱨᱟᱸᱪᱤ ᱨᱮ ᱢᱩᱬ ᱥᱚᱲᱚᱠ ᱵᱟᱡᱟᱨ\n• ᱟᱫᱤᱵᱟᱥᱤ ᱞᱮᱠᱷᱟᱥᱟᱨ ᱤᱱᱥᱴᱤᱴᱤᱭᱩᱴ ᱥᱚᱨᱩᱢ\n• ᱠᱷᱟᱫᱤ ᱜᱨᱟᱢᱚᱫᱭᱚᱜ ᱵᱷᱚᱵᱚᱱ\n• ᱠᱷᱩᱱᱴᱤ ᱥᱟᱸᱜᱮ ᱡᱟᱭᱜᱟ ᱟᱫᱤᱵᱟᱥᱤ ᱟᱹᱛᱩ\nᱵᱟᱢᱵᱩ ᱠᱟᱹᱢᱤ, ᱰᱳᱠᱨᱟ ᱠᱟᱹᱢᱤ, ᱦᱟᱹᱴᱤᱧ ᱵᱩᱱᱟᱹᱜ ᱠᱟᱯᱲᱟ, ᱟᱨ ᱫᱷᱚᱨᱚᱢ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱧᱮᱞ ᱢᱮ।"
    }
  };

  // Language detection function
  const detectLanguage = (text: string): string => {
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(text)) {
        return lang;
      }
    }
    return 'en'; // Default to English
  };

  // Get response in appropriate language
  const getResponseInLanguage = (responseKey: string, language: string): string => {
    const response = multilingualResponses[responseKey];
    if (response && response[language]) {
      return response[language];
    }
    return response?.en || "I'm sorry, I couldn't understand your question. Please try asking in a different way.";
  };

  // Get default response in appropriate language
  const getDefaultResponse = (language: string): string => {
    const defaultResponses = {
      en: "Thank you for your question! I'd be happy to help you explore Jharkhand. Could you please be more specific about what you'd like to know? I can help with destinations, cultural experiences, transport, accommodation, or any other travel-related queries.",
      hi: "आपके प्रश्न के लिए धन्यवाद! मैं आपकी झारखंड की यात्रा में मदद करने में खुशी होगी। क्या आप कृपया बता सकते हैं कि आप क्या जानना चाहते हैं? मैं गंतव्य, सांस्कृतिक अनुभव, परिवहन, आवास या अन्य यात्रा संबंधी प्रश्नों में मदद कर सकता हूं।",
      bn: "আপনার প্রশ্নের জন্য ধন্যবাদ! আমি আপনাকে ঝাড়খণ্ড অন্বেষণে সাহায্য করতে খুশি হব। আপনি কি দয়া করে আরও নির্দিষ্ট করতে পারেন যে আপনি কী জানতে চান? আমি গন্তব্য, সাংস্কৃতিক অভিজ্ঞতা, পরিবহন, থাকার ব্যবস্থা বা অন্যান্য ভ্রমণ-সম্পর্কিত প্রশ্নে সাহায্য করতে পারি।",
      sat: "ᱟᱢᱟᱜ ᱥᱚᱱᱮᱨ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱨᱦᱟᱣ! ᱤᱧ ᱟᱢ ᱫᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱮᱨᱢᱟ ᱨᱮ ᱜᱚᱲᱚ ᱮᱢ ᱞᱟᱹᱜᱤᱫ ᱠᱩᱥᱤᱭᱟᱜᱼᱟ। ᱟᱢ ᱫᱚ ᱪᱮᱫ ᱥᱮᱬᱟᱭ ᱠᱩᱥᱤᱭᱟᱜᱼᱟ ᱚᱱᱟ ᱵᱟᱵᱚᱛ ᱛᱮ ᱫᱚ ᱟᱢ ᱫᱚ ᱰᱷᱮᱨ ᱵᱩᱡᱷᱟᱹᱣ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ ᱥᱮ? ᱤᱧ ᱜᱚᱱᱛᱷᱵᱭᱚ, ᱞᱟᱠᱪᱟᱨ ᱟᱱᱩᱵᱷᱚᱵ, ᱥᱚᱲᱚᱠ, ᱛᱟᱦᱮᱱ ᱡᱟᱭᱜᱟ, ᱟᱨᱵᱟᱝ ᱮᱴᱟᱜ ᱥᱮᱨᱢᱟ ᱥᱟᱶᱛᱮ ᱡᱚᱲᱟᱣ ᱥᱚᱱᱮᱨ ᱠᱚ ᱨᱮ ᱜᱚᱲᱚ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ।"
    };
    return defaultResponses[language] || defaultResponses.en;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Detect the language of the input message
    const detectedLanguage = detectLanguage(inputMessage);

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      language: detectedLanguage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      // Enhanced keyword detection for multilingual support
      const keywords = {
        places: ['places', 'visit', 'destination', 'tourist', 'जगह', 'घूमने', 'দেখার', 'জায়গা', 'ᱡᱟᱭᱜᱟ', 'ᱧᱮᱞᱜᱮᱞ'],
        reach: ['reach', 'how to go', 'transport', 'bus', 'train', 'पहुंचें', 'कैसे', 'যাবেন', 'কীভাবে', 'ᱥᱮᱱᱚᱜ', 'ᱪᱮᱫ'],
        culture: ['culture', 'tribal', 'tradition', 'संस्कृति', 'आदिवासी', 'সংস্কৃতি', 'উপজাতি', 'ᱞᱟᱠᱪᱟᱨ', 'ᱟᱫᱤᱵᱟᱥᱤ'],
        festivals: ['festival', 'celebration', 'त्योहार', 'पर्व', 'উৎসব', 'পার্বণ', 'ᱯᱟᱨᱟᱵᱽ', 'ᱢᱟᱱᱟᱢ'],
        itinerary: ['itinerary', 'plan', 'schedule', 'कार्यक्रम', 'योजना', 'পরিকল্পনা', 'ᱠᱟᱹᱢᱤᱦᱚᱨᱟ', 'ᱯᱩᱨᱟᱹᱣ'],
        handicrafts: ['handicraft', 'craft', 'art', 'हस्तशिल्प', 'कला', 'হস্তশিল্প', 'শিল্প', 'ᱦᱟᱛᱠᱟᱨᱤ', 'ᱠᱟᱹᱢᱤ']
      };

      // Find matching response key based on keywords
      let responseKey = null;
      const lowerInput = inputMessage.toLowerCase();
      
      for (const [key, words] of Object.entries(keywords)) {
        if (words.some(word => lowerInput.includes(word))) {
          responseKey = key;
          break;
        }
      }

      // Get response in the detected language
      const responseText = responseKey 
        ? getResponseInLanguage(responseKey, detectedLanguage)
        : getDefaultResponse(detectedLanguage);

      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        text: responseText,
        language: detectedLanguage,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    // Don't call handleSendMessage here as it will be called when the input changes
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const speakMessage = (text: string) => {
    // Text-to-speech would be implemented here
    console.log("Speaking:", text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 font-heading">Multilingual AI Tourism Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
            Get instant, personalized assistance in your preferred language
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Language & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Globe className="h-5 w-5" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-2">
                          <span>{lang.native}</span>
                          <span className="text-muted-foreground">({lang.name})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <MessageCircle className="h-5 w-5" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions[selectedLanguage]?.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-3 justify-start"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                )) || quickQuestions.en.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-3 justify-start"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="font-heading">Tourism AI Assistant</CardTitle>
                      <p className="text-sm text-muted-foreground font-body">
                        {isTyping ? "Typing..." : "Online • Multilingual Support"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {languages.find(l => l.code === selectedLanguage)?.native}
                  </Badge>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                        {message.sender === "bot" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                            onClick={() => speakMessage(message.text)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="mt-1">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t flex-shrink-0">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputMessage}
                      onChange={(e) => {
                        setInputMessage(e.target.value);
                        if (e.target.value.trim()) {
                          const detected = detectLanguage(e.target.value);
                          setDetectedLanguage(detected);
                          // Auto-switch language selector if a different language is detected
                          if (detected !== selectedLanguage) {
                            setSelectedLanguage(detected);
                          }
                        }
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder={`Type your message in any language...`}
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-1 top-1 h-8 w-8 p-0 ${
                        isListening ? "text-red-500" : "text-muted-foreground"
                      }`}
                      onClick={toggleListening}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-hero hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                  {isListening ? "🎤 Listening... Speak now" : "Press Enter to send • Click mic for voice input"}
                </p>
                  {inputMessage && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Languages className="h-3 w-3" />
                      <span>Detected: {languages.find(l => l.code === detectedLanguage)?.native || 'English'}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;