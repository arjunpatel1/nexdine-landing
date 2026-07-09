'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Utensils, Coffee, Zap, Laptop, Leaf, Award } from 'lucide-react'
import Link from 'next/link'
import { fetchCategories } from '@/lib/award-api'
import { AwardCategory } from '@/lib/award-admin'

const HARDCODED_META: Record<string, { description: string; icon: any; color: string }> = {
  'Best Fine Dining': {
    description: 'Recognizing restaurants with elegant menus, exceptional service, and world-class experiences.',
    icon: Award,
    color: 'from-orange-500 to-amber-500'
  },
  'Best Casual Dining': {
    description: 'Rewarding approachable dining destinations with great atmosphere and consistent quality.',
    icon: Utensils,
    color: 'from-blue-500 to-cyan-500'
  },
  'Best Cafe & Desserts': {
    description: 'Celebrating cafes and dessert spots that delight guests with memorable treats.',
    icon: Coffee,
    color: 'from-pink-500 to-rose-500'
  },
  'Best Quick Service Restaurant': {
    description: 'Honoring high-speed restaurants that deliver tasty food without compromising quality.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500'
  },
  'Best Restaurant Technology': {
    description: 'Recognizing restaurants using technology to elevate dining, ordering, and guest service.',
    icon: Laptop,
    color: 'from-purple-500 to-indigo-500'
  },
  'Best Sustainable Restaurant': {
    description: 'Celebrating restaurants that put sustainability, local sourcing, and waste reduction first.',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500'
  },
}

const DEFAULT_META = {
  description: 'Recognizing excellence and outstanding service in this category.',
  icon: Award,
  color: 'from-orange-500 to-amber-500'
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function CategoriesClient() {
  const [categories, setCategories] = useState<AwardCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let canceled = false
    fetchCategories()
      .then((data) => {
        if (canceled) return
        // Only show active categories to users
        setCategories(data.filter(c => c.status === 'active'))
      })
      .catch(console.error)
      .finally(() => {
        if (!canceled) setLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [])

  return (
    <>
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-[0_0_15px_rgba(245,124,0,0.2)]">
              ✨ The NexDine Awards
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Award <span className="gradient-text">Categories</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance"
          >
            Discover the prestigious categories where culinary excellence, innovation, and outstanding service are celebrated.
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex justify-center py-20 text-muted-foreground">
            Loading categories...
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((category) => {
              const meta = HARDCODED_META[category.name] || DEFAULT_META;
              const Icon = meta.icon;
              return (
                <motion.div 
                  key={category.id} 
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${meta.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.color} shadow-lg text-white transform group-hover:rotate-12 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{category.name}</h2>
                    <p className="text-base text-muted-foreground leading-relaxed">{meta.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-orange-600 opacity-70 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
            <Link href="/about" className="relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-transform hover:scale-105 duration-300">
              Learn how to nominate
              <Award className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
