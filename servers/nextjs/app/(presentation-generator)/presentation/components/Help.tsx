import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, X, Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const helpQuestions = [
 {
   id: 1,
   category: "Изображения",
   question: "Как изменить изображение?",
   answer:
     "Нажмите на любое изображение, чтобы открыть панель инструментов. Вы увидите опции для редактирования, настройки позиции и изменения способа размещения изображения в контейнере. Опция 'Редактировать' позволяет заменить или изменить текущее изображение.",
 },
 {
   id: 2,
   category: "Изображения",
   question: "Могу ли я генерировать новые изображения с помощью ИИ?",
   answer:
     "Да! Нажмите на любое изображение и выберите опцию 'Редактировать' в панели инструментов. В появившейся боковой панели найдите вкладку 'ИИ Генерация'. Введите описание желаемого изображения, и наш ИИ создаст изображение на основе вашего описания.",
 },
 {
   id: 3,
   category: "Изображения",
   question: "Как загрузить собственные изображения?",
   answer:
     "Нажмите на любое изображение, затем выберите 'Редактировать' в панели инструментов. В боковой панели нажмите на вкладку 'Загрузить' вверху. Вы можете выбрать файл из своих документов. После загрузки вы сможете применить его к вашему дизайну.",
 },
 {
   id: 11,
   category: "ИИ Промпты",
   question: "Могу ли я изменить макет слайда через промпт?",
   answer:
     "Да, можете! Нажмите на иконку волшебной палочки в левом верхнем углу каждого слайда, и появится поле для ввода промпта. Опишите требования к макету, и ИИ изменит макет слайда соответственно.",
 },
 {
   id: 12,
   category: "ИИ Промпты",
   question: "Могу ли я изменить изображение слайда через промпт?",
   answer:
     "Да, можете! Нажмите на иконку волшебной палочки в левом верхнем углу каждого слайда, и появится поле для ввода промпта. Опишите желаемое изображение, и ИИ обновит изображение слайда согласно вашим требованиям.",
 },
 {
   id: 14,
   category: "ИИ Промпты",
   question: "Могу ли я изменить контент через промпт?",
   answer:
     "Да, можете! Нажмите на иконку волшебной палочки в левом верхнем углу каждого слайда, и появится поле для ввода промпта. Опишите желаемый контент, и ИИ обновит текст и содержимое слайда на основе вашего описания.",
 },
 {
   id: 4,
   category: "Текст",
   question: "Как форматировать и выделять текст?",
   answer:
     "Выделите любой текст, чтобы появилась панель форматирования. У вас будут опции для жирного текста, курсива, подчеркивания, зачеркивания и многое другое.",
 },
 {
   id: 5,
   category: "Иконки",
   question: "Как изменить иконки?",
   answer:
     "Нажмите на любую существующую иконку, чтобы изменить её. В панели выбора иконок вы можете просматривать иконки или использовать поиск для нахождения конкретных иконок. Мы предлагаем тысячи иконок в различных стилях.",
 },
 {
   id: 16,
   category: "Макет",
   question: "Могу ли я изменить позицию слайда?",
   answer:
     "Конечно, в боковой панели вы можете перетащить слайд и разместить его где угодно.",
 },
 {
   id: 15,
   category: "Макет",
   question: "Могу ли я добавить новый слайд между существующими слайдами?",
   answer:
     "Да, просто нажмите на иконку плюса под каждым слайдом. Отобразятся все макеты, и вы сможете выбрать нужный.",
 },
 {
   id: 6,
   category: "Макет",
   question: "Могу ли я добавить больше секций к моим слайдам?",
   answer:
     "Конечно! Наведите курсор на нижнюю часть любого текстового блока или блока контента, и появится иконка +. Нажмите эту кнопку, чтобы добавить новую секцию ниже текущей. Вы также можете использовать меню 'Вставить' для добавления определенных типов секций.",
 },
 {
   id: 8,
   category: "Экспорт",
   question: "Как скачать или экспортировать мою презентацию?",
   answer:
     "Нажмите кнопку 'Экспорт' в верхнем правом меню. Вы можете выбрать скачивание в формате PDF или PowerPoint.",
 },
];

const Help = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(helpQuestions);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const modalRef = useRef<HTMLDivElement>(null);

  // Extract unique categories and create "All" category list
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(helpQuestions.map((q) => q.category))
    );
    setCategories(["Все", ...uniqueCategories]);
  }, []);

  // Filter questions based on search query and selected category
  useEffect(() => {
    let results = helpQuestions;

    // Filter by category if not "All"
    if (selectedCategory !== "Все") {
      results = results.filter((q) => q.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (q) =>
          q.question.toLowerCase().includes(query) ||
          q.answer.toLowerCase().includes(query)
      );
    }

    setFilteredQuestions(results);
  }, [searchQuery, selectedCategory]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(".help-button")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  // Animation helpers
  const modalClass = isOpen
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";

  return (
    <>
      {/* Help Button */}
      <button
        onClick={handleOpenClose}
        className="help-button hidden fixed bottom-6 right-6 h-12 w-12 z-50 bg-emerald-600 hover:bg-emerald-700 rounded-full md:flex justify-center items-center cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
        aria-label="Help Center"
      >
        {isOpen ? (
          <X className="text-white h-5 w-5" />
        ) : (
          <HelpCircle className="text-white h-5 w-5" />
        )}
      </button>

      {/* Help Modal */}
      <div
        className={`fixed bottom-20 right-6 z-50 max-w-md w-full transition-all duration-300 transform ${modalClass}`}
        ref={modalRef}
      >
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium">Помощь</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-emerald-700 p-1 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 pt-4 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Искать..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Category Pills */}
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-h-96 overflow-y-auto px-6 pb-6">
            {filteredQuestions.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredQuestions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <AccordionTrigger className="hover:no-underline py-3 px-1 text-left flex">
                      <div className="flex-1 pr-2">
                        <span className="text-gray-900 font-medium text-sm md:text-base">
                          {faq.question}
                        </span>
                        <span className="block text-xs text-emerald-600 mt-0.5">
                          {faq.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-1 pb-3">
                      <div className="text-sm text-gray-600 leading-relaxed rounded bg-gray-50 p-3">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>No results found for "{searchQuery}"</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Все");
                  }}
                  className="mt-2 text-emerald-600 hover:underline text-sm"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 text-center">
            Все еще нужна помощь?{" "}
            <a href="/contact" className="text-emerald-600 hover:underline">
              Обратиться в поддержку
            </a>
          </div>
        </div>
      </div>

      {/* Custom AccordionTrigger implementation (since shadcn's might not be available) */}
      {!AccordionTrigger && (
        <style jsx>{`
          .accordion-trigger {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            text-align: left;
            transition: all 0.2s;
          }
          .accordion-trigger:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
          .accordion-content {
            overflow: hidden;
            height: 0;
            transition: height 0.2s ease;
          }
          .accordion-content[data-state="open"] {
            height: auto;
          }
        `}</style>
      )}
    </>
  );
};

export default Help;
