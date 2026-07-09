'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AwardCategory } from '@/lib/award-admin'
import { createCategory, deleteCategory, fetchCategories, updateCategory } from '@/lib/award-api'

const ORANGE = '#F58A27'
const CARD_BG = '#0F1A2C'
const BORDER = 'rgba(255,255,255,0.08)'

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<AwardCategory[]>([])
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'active' | 'inactive'>('active')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AwardCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let canceled = false
    fetchCategories()
      .then((items) => {
        if (!canceled) setCategories(items)
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [])

  const closeEditor = () => {
    setIsEditorOpen(false)
    setEditingId(null)
    setName('')
    setStatus('active')
  }

  const openEditor = (category?: AwardCategory) => {
    setEditingId(category?.id ?? null)
    setName(category?.name ?? '')
    setStatus(category?.status ?? 'active')
    setIsEditorOpen(true)
  }

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)

    try {
      if (editingId === null) {
        const category = await createCategory({ name: name.trim(), status })
        setCategories((current) => [...current, category])
      } else {
        const category = await updateCategory(editingId, { name: name.trim(), status })
        setCategories((current) => current.map((item) => (item.id === editingId ? category : item)))
      }
      closeEditor()
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (category: AwardCategory) => {
    openEditor(category)
  }

  const handleDelete = (id: number) => {
    const category = categories.find((item) => item.id === id)
    if (category) {
      setDeleteTarget(category)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)

    try {
      await deleteCategory(deleteTarget.id)
      setCategories((current) => current.filter((item) => item.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch (error) {
      console.error(error)
    } finally {
      setDeleting(false)
    }
  }

  const cancelDelete = () => {
    setDeleteTarget(null)
  }

  const activeCount = useMemo(() => categories.filter((item) => item.status === 'active').length, [categories])

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ── Top Navigation & Actions ── */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <button
            type="button"
            onClick={() => openEditor()}
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
          >
            + Create category
          </button>
        </div>

        {/* ── Title ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">Award admin</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Manage Categories</h1>
          <p className="mt-2 text-sm text-slate-400">
            Add, edit, or remove award categories for the NexDine Restaurant Excellence Awards.
          </p>
        </div>

        <div className="grid gap-6">
          <section className="rounded-[2rem] bg-slate-950/90 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.35)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">Categories</p>
                <p className="mt-1 text-sm text-slate-400">{categories.length} total · {activeCount} Active</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="group relative w-full overflow-hidden rounded-[1.75rem] border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-[0_8px_30px_rgb(245,138,39,0.15)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-bold text-white">{category.name}</p>
                    </div>
                    <div className={
                      category.status.toLowerCase() === 'active'
                        ? "rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400"
                        : "rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                    }>
                      {category.status}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="rounded-full border border-slate-700 bg-slate-800 p-2.5 text-orange-400 transition hover:border-orange-500 hover:text-orange-300 hover:bg-slate-700"
                      title="Edit Category"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      className="rounded-full border border-red-500/30 bg-red-500/10 p-2.5 text-red-400 transition hover:bg-red-500 hover:text-white"
                      title="Delete Category"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 sm:px-6">
          <div className="w-full max-w-xl rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Category editor</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{editingId === null ? 'Create category' : 'Edit category'}</h2>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-orange-500"
              >
                Close
              </button>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-semibold text-slate-200">
                Category name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Best Fine Dining"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-200">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as 'active' | 'inactive')}
                  className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 sm:w-auto"
                >
                  {editingId === null ? 'Add category' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 sm:px-6">
          <div className="w-full max-w-lg rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Confirm delete</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Delete category</h2>
              </div>
              <button
                type="button"
                onClick={cancelDelete}
                className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-orange-500"
              >
                Close
              </button>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Are you sure you want to delete <span className="font-semibold text-white">{deleteTarget.name}</span>? This action cannot be undone.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelDelete}
                className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 sm:w-auto"
              >
                Delete category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
