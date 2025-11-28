"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "@/services";
import { Review } from "@/types/review";

interface ProductReviewProps {
  productId: string;
  initialReviews: Review[];
}

export default function ProductReview({ productId, initialReviews }: ProductReviewProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purchaseLocation: "Đã mua tại WD",
    phone: "",
    rating: 0,
    review: "",
    videoLink: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleStarClick = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      setSubmitMessage({ type: 'error', text: 'Vui lòng chọn số sao đánh giá' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const reviewData = {
        productId,
        rating: formData.rating,
        comment: formData.review,
        images: selectedFiles.length > 0 ? selectedFiles : undefined,
        videoLink: formData.videoLink || undefined,
      };

      const result = await createReview(reviewData);
      
      if (result) {
        setSubmitMessage({ type: 'success', text: 'Đánh giá đã được gửi thành công!' });
        // Reset form
        setFormData({
          name: "",
          email: "",
          purchaseLocation: "Đã mua tại WD",
          phone: "",
          rating: 0,
          review: "",
          videoLink: "",
        });
        setSelectedFiles([]);
      } else {
        setSubmitMessage({ type: 'error', text: 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!' });
      }
    } catch (error) {
      console.error('Submit review error:', error);
      setSubmitMessage({ type: 'error', text: 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Existing Reviews */}
      {reviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ĐÁNH GIÁ SẢN PHẨM ({reviews.length})
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{review.name || "Khách hàng"}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.score ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <p className="text-gray-700">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-1/2">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          VIẾT ĐÁNH GIÁ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tên của bạn (>3 ký tự và < 20 ký tự)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                minLength={3}
                maxLength={20}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="xinchao@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Purchase Location and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="purchaseLocation"
                value={formData.purchaseLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="Đã mua tại WD">Đã mua tại WD</option>
                <option value="Đã mua tại cửa hàng khác">
                  Đã mua tại cửa hàng khác
                </option>
                <option value="Chưa mua">Chưa mua</option>
              </select>
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">
                Đánh giá
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`w-5 h-5 ${
                        star <= (hoveredRating || formData.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Viết nội dung đánh giá ở đây (>3 ký tự và < 1000 ký tự)"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
              required
              minLength={3}
              maxLength={1000}
            />
          </div>

          {/* File Upload and Video Link Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  <span className="text-gray-500 text-sm">
                    {selectedFiles.length > 0 
                      ? `${selectedFiles.length} file(s) selected`
                      : "No file chosen"
                    }
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded border border-gray-300 hover:bg-gray-300 transition-colors"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Choose File
                  </button>
                </div>
              </div>
            </div>
            <div>
              <input
                type="url"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                placeholder="Link video (Nếu có)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-3 rounded-md ${
              submitMessage.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitMessage.text}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
