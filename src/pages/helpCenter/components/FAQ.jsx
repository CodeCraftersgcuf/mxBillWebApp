import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFaqs } from '../../../util/queries/appQueries';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs,
    enabled: true,
  });

  console.log('The data:', data);

  const faqs = data?.data || []; // Handle the case when data is not available

  // Toggle expand/collapse for FAQ items
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      {isLoading && <p className="text-center text-gray-500">Loading FAQs...</p>}
      {isError && <p className="text-center text-red-500">Failed to load FAQs.</p>}

      <div className="space-y-2">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={faq.id} className="bg-gray-100 rounded-lg shadow-sm">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <span className="text-sm font-medium">{faq.question}</span>
                <span className="text-xl font-bold text-gray-500">
                  {expandedIndex === index ? '−' : '+'}
                </span>
              </div>
              {expandedIndex === index && (
                <div className="p-4 text-gray-700 border-t border-gray-300 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No matching FAQs found.</p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
