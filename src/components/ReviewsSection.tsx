import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Plus, Send, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { useAuth } from '../context/AuthContext';
import {
  subscribeReviews,
  createReviewInFirestore,
  FirestoreReview,
} from '../firebase/services';

export const ReviewsSection: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const [firestoreReviews, setFirestoreReviews] = useState<FirestoreReview[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeReviews((reviews) => {
      setFirestoreReviews(reviews);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.displayName && !authorName) {
      setAuthorName(user.displayName);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!user) {
      await signInWithGoogle();
      return;
    }

    setIsSubmitting(true);
    const reviewPayload: FirestoreReview = {
      reviewId: `REV-${Math.floor(1000 + Math.random() * 9000)}`,
      authorId: user.uid,
      authorName: authorName.trim() || user.displayName || 'Artisan Collector',
      rating,
      comment: comment.trim(),
      verified: 'Verified Collector',
      createdAt: new Date().toISOString(),
    };

    try {
      await createReviewInFirestore(reviewPayload);
      setComment('');
      setIsFormOpen(false);
    } catch (err) {
      console.error('Failed to post review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Combine initial curated reviews and live Firestore community reviews
  const allReviews = [
    ...firestoreReviews.map((r) => ({
      id: r.reviewId,
      author: r.authorName,
      rating: r.rating,
      comment: r.comment,
      verified: true,
      isLive: true,
    })),
    ...REVIEWS.map((r) => ({ ...r, isLive: false })),
  ];

  return (
    <section
      id="reviews-section"
      className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto border-t border-stone-200/80"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-1 text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-semibold text-stone-600 ml-1">
              4.9/5 from 480+ collector reviews
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Loved by slow fashion collectors
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Every piece is hooked one loop at a time. Authenticated with Firebase Cloud Storage.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 hover:bg-[#CE4326] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Review Submission Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-5 rounded-2xl bg-[#FDFBF7] border border-stone-300/80 shadow-sm space-y-3 animate-in fade-in zoom-in-95 duration-200 max-w-xl"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-stone-900">Share Your Soft Hook Review</h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setRating(s)}
                  className="cursor-pointer p-0.5"
                >
                  <Star
                    className={`w-4 h-4 ${
                      s <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Your Name & Location
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Maya Lin, Seattle"
              required
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Your Craft Experience
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How does the yarn feel? How does it drape?"
              required
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-stone-800"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-[#CE4326] text-white text-xs font-semibold cursor-pointer transition-colors disabled:opacity-60"
            >
              <Send className="w-3 h-3" />
              <span>{isSubmitting ? 'Posting...' : 'Post to Community'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allReviews.slice(0, 6).map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {review.isLive && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live from Firebase
                  </span>
                )}
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
