import React, { useState } from 'react';
import { Check, Trash2, Star, Plus, X, EyeOff, AlertCircle } from 'lucide-react';
import { BlogPost } from '../../types/meal';
import { TestimonialItem, AdminRole } from '../../types/admin';
import {
  CHEF_KITCHEN_IMAGE,
  SALMON_BOWL_IMAGE,
  BREAKFAST_AVOCADO_TOAST,
  DINNER_SHORT_RIB,
  STEAK_MEAL_IMAGE
} from '../../data/mockMeals';

interface AdminVoicesSectionProps {
  testimonials: TestimonialItem[];
  userRole: AdminRole;
  onUpdateStatus: (id: string, status: TestimonialItem['status']) => void;
  onDeleteTestimonial: (id: string) => void;
  onAddTestimonial: (item: TestimonialItem) => void;
}

export const AdminVoicesSection: React.FC<AdminVoicesSectionProps> = ({
  testimonials,
  userRole,
  onUpdateStatus,
  onDeleteTestimonial,
  onAddTestimonial
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [tag, setTag] = useState('Verified Subscriber');
  const [quote, setQuote] = useState('');

  const canModerate = userRole === 'owner' || userRole === 'manager';
  const filtered = testimonials.filter((t) => (filter === 'all' ? true : t.status === filter));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;
    onAddTestimonial({
      id: `voice-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Verified Customer',
      quote: quote.trim(),
      rating: 5,
      tag: tag.trim() || 'Verified Subscriber',
      status: 'pending',
      submittedAt: 'Today'
    });
    setName('');
    setRole('');
    setQuote('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Subscriber Voices Moderation
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Approve customer reviews to publish them live in the “Subscriber Voices” section on the main page.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subscriber Comment</span>
        </button>
      </div>

      {!canModerate && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Switch to Owner or Manager role to approve or remove comments on the main page.</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl w-fit">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
              filter === tab
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {tab} ({tab === 'all' ? testimonials.length : testimonials.filter((t) => t.status === tab).length})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold capitalize ${
                    item.status === 'approved'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                      : item.status === 'pending'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  {item.status === 'approved' ? 'Live on Main Page' : item.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic leading-relaxed">
                "{item.quote}"
              </p>

              <div className="mt-3 text-xs">
                <p className="font-serif font-bold text-stone-900 dark:text-stone-100">{item.name}</p>
                <p className="text-stone-500 dark:text-stone-400">
                  {item.role} · {item.tag} · Submitted {item.submittedAt}
                </p>
              </div>
            </div>

            {canModerate && (
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end gap-2">
                {item.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(item.id, 'approved')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve &amp; Display</span>
                  </button>
                )}
                {item.status === 'approved' && (
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(item.id, 'rejected')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-lg hover:bg-stone-200 cursor-pointer"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hide</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDeleteTestimonial(item.id)}
                  className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Comment Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                Submit Subscriber Voice
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Customer Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Role / City</label>
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Founder, Austin TX" className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Plan Tag</label>
                  <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Testimonial Quote</label>
                <textarea required rows={3} value={quote} onChange={(e) => setQuote(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 resize-none" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-xs font-semibold text-stone-600 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer">Add to Pending Queue</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface AdminBlogsSectionProps {
  blogs: BlogPost[];
  userRole: AdminRole;
  onApproveBlog: (blogId: string) => void;
  onUnpublishBlog: (blogId: string) => void;
  onDeleteBlog: (blogId: string) => void;
  onAddBlog: (blog: BlogPost) => void;
}

const IMAGE_CHOICES = [
  { label: 'Chef Kitchen', url: CHEF_KITCHEN_IMAGE },
  { label: 'Wild Salmon Bowl', url: SALMON_BOWL_IMAGE },
  { label: 'Morning Avocado Tartine', url: BREAKFAST_AVOCADO_TOAST },
  { label: '12-Hour Short Rib', url: DINNER_SHORT_RIB },
  { label: 'Grass-Fed Filet', url: STEAK_MEAL_IMAGE }
];

export const AdminBlogsSection: React.FC<AdminBlogsSectionProps> = ({
  blogs,
  userRole,
  onApproveBlog,
  onUnpublishBlog,
  onDeleteBlog,
  onAddBlog
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Culinary Craft');
  const [author, setAuthor] = useState('Chef Marcus Laurent');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState(CHEF_KITCHEN_IMAGE);

  const canModerate = userRole === 'owner' || userRole === 'manager';
  const filtered = blogs.filter((b) => {
    const status = b.status || 'approved';
    return filter === 'all' ? true : status === filter;
  });

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;
    onAddBlog({
      id: `blog-${Date.now()}`,
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: [excerpt.trim()],
      category,
      author: author.trim() || 'The Flavor House Editorial',
      authorRole: 'Culinary Team',
      publishedAt: 'Today',
      readTime: '3 min read',
      image,
      status: 'pending'
    });
    setTitle('');
    setExcerpt('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Blog Approval &amp; Publishing
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Approve or delete blog articles displayed in the “Healthy Recipes &amp; Food Inspiration” section on the main page.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl cursor-pointer whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Blog Draft</span>
        </button>
      </div>

      {!canModerate && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Switch to Owner or Manager role to approve or delete blogs on the main page.</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800/80 rounded-xl w-fit">
        {(['all', 'pending', 'approved'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
              filter === tab
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            {tab} ({tab === 'all' ? blogs.length : blogs.filter((b) => (b.status || 'approved') === tab).length})
          </button>
        ))}
      </div>

      {/* Blogs Moderation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((blog) => {
          const isApproved = (blog.status || 'approved') === 'approved';
          return (
            <div
              key={blog.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 bg-stone-100 dark:bg-stone-800">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold shadow-xs ${
                        isApproved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {isApproved ? 'Published on Main Page' : 'Pending Approval'}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase">
                    {blog.category} · {blog.publishedAt}
                  </p>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {canModerate && (
                <div className="px-4 py-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                  {isApproved ? (
                    <button
                      type="button"
                      onClick={() => onUnpublishBlog(blog.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-lg hover:bg-stone-200 cursor-pointer"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onApproveBlog(blog.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDeleteBlog(blog.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Blog Draft Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-50">
                Create Blog Draft
              </h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Article Title</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100">
                    <option value="Culinary Craft">Culinary Craft</option>
                    <option value="Nutrition Science">Nutrition Science</option>
                    <option value="Morning Rituals">Morning Rituals</option>
                    <option value="Performance Fuel">Performance Fuel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Cover Photo</label>
                  <select value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100">
                    {IMAGE_CHOICES.map((c) => (
                      <option key={c.label} value={c.url}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Excerpt</label>
                <textarea required rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 resize-none" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-xs font-semibold text-stone-600 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl cursor-pointer">Save Draft for Approval</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
