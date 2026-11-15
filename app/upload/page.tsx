'use client'

import { useRef, useState, type DragEvent } from 'react'
import { Bricolage_Grotesque } from 'next/font/google'
import { Show, SignInButton } from '@clerk/nextjs'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
})

const MAX_MB = 25
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

export default function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | uploading | done

  function handleFile(f: File | null | undefined) {
    setError('')
    if (!f) return
    if (!ACCEPTED.includes(f.type)) {
      setError('Only PNG, JPG, WEBP, or GIF files can be uploaded.')
      return
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`File size cannot exceed ${MAX_MB} MB.`)
      return
    }
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  async function onSubmit(e: {
    preventDefault: () => void
    currentTarget: HTMLFormElement | undefined
  }) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form) return
    if (!file) {
      setError('Please select an image first.')
      return
    }
    setError('')
    setStatus('uploading')

    const data = new FormData(form)
    data.set('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data })
      if (!res.ok) throw new Error((await res.json()).error || 'Upload failed.')
      setStatus('done')
      form.reset()
      setFile(null)
      setPreview(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed.'
      setError(message)
      setStatus('idle')
    }
  }

  return (
    <main className="min-h-screen bg-[#eef0f7] px-4 py-12 text-[#14142b]">
      <div className="mx-auto max-w-3xl">
        <h1
          className={`${display.className} text-4xl font-extrabold tracking-tight md:text-5xl`}
        >
          Upload Your Artwork
        </h1>
        <p className="mt-3 text-[#14142b]/70">
          Select an image, provide details and price. It will be visible in the
          gallery after publication.
        </p>

        <Show when="signed-out">
          <div className="mt-10 rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="mb-4">Sign in to upload your artwork.</p>
            <SignInButton mode="modal">
              <button className="rounded-full bg-[#3b2bff] px-6 py-3 font-medium text-white hover:bg-[#2a1de0]">
                Sign In
              </button>
            </SignInButton>
          </div>
        </Show>

        <Show when="signed-in">
          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            {/* Drop zone */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') &&
                inputRef.current?.click()
              }
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white p-6 text-center transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#3b2bff] ${
                dragging
                  ? 'border-[#3b2bff] bg-[#3b2bff]/5'
                  : 'border-[#14142b]/20'
              }`}
            >
              {preview ? (
                <div className="w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview of the selected artwork"
                    className="mx-auto max-h-80 rounded-xl object-contain"
                  />
                  <p className="mt-3 text-sm text-[#14142b]/70">
                    {file?.name} ({((file?.size ?? 0) / 1024 / 1024).toFixed(1)}{' '}
                    MB). To change it, click again.
                  </p>
                </div>
              ) : (
                <>
                  <p className={`${display.className} text-xl font-semibold`}>
                    Drop your artwork here, or click to select a file
                  </p>
                  <p className="mt-1 text-sm text-[#14142b]/60">
                    Or click to select a file. PNG, JPG, WEBP, GIF, maximum{' '}
                    {MAX_MB} MB.
                  </p>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED.join(',')}
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>

            {/* Details */}
            <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1 block text-sm font-medium">Title</span>
                <input
                  name="title"
                  required
                  maxLength={80}
                  className="w-full rounded-lg border border-[#14142b]/20 px-3 py-2 focus:border-[#3b2bff] focus:outline-none"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-1 block text-sm font-medium">
                  Description
                </span>
                <textarea
                  name="description"
                  rows={4}
                  maxLength={500}
                  className="w-full rounded-lg border border-[#14142b]/20 px-3 py-2 focus:border-[#3b2bff] focus:outline-none"
                />
              </label>

              <label>
                <span className="mb-1 block text-sm font-medium">
                  Price 12 (USD)
                </span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  required
                  className="w-full rounded-lg border border-[#14142b]/20 px-3 py-2 focus:border-[#3b2bff] focus:outline-none"
                />
              </label>

              <label>
                <span className="mb-1 block text-sm font-medium">Category</span>
                <select
                  name="category"
                  className="w-full rounded-lg border border-[#14142b]/20 bg-white px-3 py-2 focus:border-[#3b2bff] focus:outline-none"
                >
                  <option>Illustration</option>
                  <option>Water color Art</option>
                  <option>Pixel Art</option>
                  <option>Abstract</option>
                  <option>Photo Manipulation</option>
                </select>
              </label>

              <label className="md:col-span-2">
                <span className="mb-1 block text-sm font-medium">
                  Tags (comma-separated)
                </span>
                <input
                  name="tags"
                  placeholder="neon, portrait, night"
                  className="w-full rounded-lg border border-[#14142b]/20 px-3 py-2 focus:border-[#3b2bff] focus:outline-none"
                />
              </label>

              <label className="flex items-start gap-2 md:col-span-2">
                <input
                  name="original"
                  type="checkbox"
                  required
                  className="mt-1"
                />
                <span className="text-sm">
                  I confirm that this artwork is my own creation.
                </span>
              </label>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            {status === 'done' && (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                Artwork uploaded successfully.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'uploading'}
              className="rounded-full bg-[#3b2bff] px-8 py-3 font-medium text-white transition hover:bg-[#2a1de0] disabled:opacity-50"
            >
              {status === 'uploading' ? 'Uploading...' : 'Publish Artwork'}
            </button>
          </form>
        </Show>
      </div>
    </main>
  )
}
