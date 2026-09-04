import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section
      id="reviews-section"
      className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-stone-200/80"
    >
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
          Loved by slow fashion collectors
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Every piece is hooked one loop at a time. Here is what our community shares.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900">{review.author}</span>
              <div className="flex items-center gap-1 text-emerald-700 text-[11px]">
                <CheckCircle className="w-3 h-3" />
                <span>Verified Collector</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
