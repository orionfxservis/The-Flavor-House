import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Pause,
  Play,
  Plus,
  X,
  User
} from 'lucide-react';
import { BlogPost } from '../types/meal';
import {
  BLOG_POSTS,
  CHEF_KITCHEN_IMAGE,
  SALMON_BOWL_IMAGE,
  BREAKFAST_AVOCADO_TOAST,
  DINNER_SHORT_RIB,
  STEAK_MEAL_IMAGE
} from '../data/mockMeals';

const BLOG_IMAGE_PRESETS = [
  { label: 'Chef Prep Kitchen', src: CHEF_KITCHEN_IMAGE },
  { label: 'Wild Salmon Bowl', src: SALMON_BOWL_IMAGE },
  { label: 'Morning Avocado Tartine', src: BREAKFAST_AVOCADO_TOAST },
  { label: '12-Hour Short Rib', src: DINNER_SHORT_RIB },
  { label: 'Grass-Fed Filet', src: STEAK_MEAL_IMAGE }
];

interface BlogsSectionProps {
  blogs?: BlogPost[];
  onAddBlog?: (blog: BlogPost) => void;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({
  blogs: propBlogs,
  onAddBlog
}) => {
  const [localBlogs, setLocalBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const allBlogs = propBlogs || localBlogs;
  const blogs = allBlogs.filter((b) => (b.status || 'approved') === 'approved');

  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Blog Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Culinary Craft');
  const [newAuthor, setNewAuthor] = useState('Chef Marcus Laurent');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newImage, setNewImage] = useState(CHEF_KITCHEN_IMAGE);

  const shouldScrollRtl = blogs.length > 3;
  const durationSeconds = Math.max(28, blogs.length * 8);

  const handlePublishBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) return;

    const created: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newTitle.trim(),
      excerpt: newExcerpt.trim(),
      content: [
        newExcerpt.trim(),
        'Prepared fresh in small culinary batches using 100% organic produce, pasture-raised proteins, and zero preservatives—delivered under strict 35°F–38°F cold-chain monitoring nationwide.'
      ],
      category: newCategory,
      author: newAuthor.trim() || 'The Flavor House Editorial',
      authorRole: 'Culinary & Nutrition Team',
      publishedAt: 'Just Now',
      readTime: '3 min read',
      image: newImage,
      status: 'approved'
    };

    if (onAddBlog) {
      onAddBlog(created);
    } else {
      setLocalBlogs((prev) => [...prev, created]);
    }
    setNewTitle('');
    setNewExcerpt('');
    setIsAddModalOpen(false);
  };

  const renderBlogCard = (blog: BlogPost, keySuffix: string, isScrollingTrack: boolean) => (
    <article
      key={`${blog.id}-${keySuffix}`}
      onClick={() => setSelectedBlog(blog)}
      className={`group glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-stone-200/60 dark:border-stone-800/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] cursor-pointer ${
        isScrollingTrack
          ? 'w-[88cqw] sm:w-[calc((100cqw-24px)/2)] lg:w-[calc((100cqw-48px)/3)] shrink-0'
          : 'w-full'
      }`}
    >
      <div>
        {/* Card Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-stone-950/75 backdrop-blur-md rounded-md text-[10px] font-semibold text-stone-100 uppercase tracking-wider">
            {blog.category}
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] font-medium text-stone-200">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {blog.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{blog.publishedAt}</span>
          </div>
        </div>

        {/* Card Copy */}
        <div className="p-5 sm:p-6">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-50 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed line-clamp-2">
            {blog.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-200/60 dark:border-stone-800/70 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
            {blog.author}
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
            {blog.authorRole}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400 whitespace-nowrap shrink-0 group-hover:translate-x-0.5 transition-transform">
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );

  return (
    <section id="blogs-section" className="py-10 sm:py-12 border-t border-stone-200/60 dark:border-stone-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Culinary Journal & Nutrition Notes</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
              Healthy Recipes &amp; Food Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Explore nutritious recipes, cooking tips and healthy dining ideas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {shouldScrollRtl && (
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 glass-panel rounded-xl hover:bg-white dark:hover:bg-stone-800 transition-colors cursor-pointer"
                title={isPaused ? 'Resume Right-to-Left Blog Scroll' : 'Pause Right-to-Left Blog Scroll'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-600" />
                    <span>Resume Scroll</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pause Scroll</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-xl hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Blog ({blogs.length})</span>
            </button>
          </div>
        </div>

        {/* 3 Cards Per Row — Static when <= 3 blogs, Smooth Right-to-Left Scroll when > 3 blogs */}
        {!shouldScrollRtl ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => renderBlogCard(blog, 'static', false))}
          </div>
        ) : (
          <div
            className="relative overflow-hidden py-2"
            style={{ containerType: 'inline-size' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex w-max gap-6 animate-scroll-blogs-rtl"
              style={{
                animationDuration: `${durationSeconds}s`,
                animationPlayState: isPaused || isHovered ? 'paused' : 'running'
              }}
            >
              {blogs.map((blog) => renderBlogCard(blog, 'primary', true))}
              {blogs.map((blog) => renderBlogCard(blog, 'loop', true))}
            </div>
          </div>
        )}
      </div>

      {/* Blog Article Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel bg-white/95 dark:bg-stone-900/95 rounded-3xl shadow-2xl border border-stone-200/70 dark:border-stone-800">
            <button
              type="button"
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/70 text-white hover:bg-stone-950 transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-16/9 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                <span>{selectedBlog.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 dark:text-stone-400">{selectedBlog.readTime}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-500 dark:text-stone-400">{selectedBlog.publishedAt}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight">
                {selectedBlog.title}
              </h3>

              <div className="flex items-center gap-2.5 pb-4 border-b border-stone-200/70 dark:border-stone-800 text-xs">
                <div className="w-8 h-8 rounded-full bg-amber-600/15 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{selectedBlog.author}</p>
                  <p className="text-stone-500 dark:text-stone-400">{selectedBlog.authorRole}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {selectedBlog.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Blog Post Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel bg-white/95 dark:bg-stone-900/95 rounded-3xl shadow-2xl border border-stone-200/70 dark:border-stone-800 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-50">
                Publish New Blog Card
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Organic Autumn Harvest Tasting Menu"
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  >
                    <option value="Culinary Craft">Culinary Craft</option>
                    <option value="Nutrition Science">Nutrition Science</option>
                    <option value="Morning Rituals">Morning Rituals</option>
                    <option value="Performance Fuel">Performance Fuel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Chef Marcus Laurent"
                    className="w-full px-3.5 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Cover Photo
                </label>
                <select
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  {BLOG_IMAGE_PRESETS.map((preset) => (
                    <option key={preset.label} value={preset.src}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Summary Excerpt
                </label>
                <textarea
                  required
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Write a brief overview of this culinary or nutrition story..."
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm cursor-pointer"
                >
                  Publish to Blog Row
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
