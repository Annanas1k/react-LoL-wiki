import { useMemo,  useCallback } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router'
import { useChampContext } from "../../hooks/useChampContext"
import { ItemSidebar } from "../../components/items/ItemSidebar"
import { ItemSectionAccordion } from "../../components/items/ItemSectionAccordion"

export const ItemsPage = () => {
  const { items, loading, version, itemTree } = useChampContext()
  const { section } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || 'gold'
  const selectedTags = useMemo(() => {
    const raw = searchParams.get('tags')
    return raw ? new Set(raw.split(',').filter(Boolean)) : new Set()
  }, [searchParams])

  const setSearch = useCallback((val) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (val) next.set('q', val)
      else next.delete('q')
      return next
    })
  }, [setSearchParams])

  const setSort = useCallback((val) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set('sort', val)
      return next
    })
  }, [setSearchParams])

  const onTagToggle = useCallback((tag) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      const current = new Set((prev.get('tags') || '').split(',').filter(Boolean))
      if (current.has(tag)) current.delete(tag)
      else current.add(tag)
      if (current.size > 0) next.set('tags', [...current].join(','))
      else next.delete('tags')
      return next
    })
  }, [setSearchParams])

  const onClear = useCallback(() => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.delete('tags')
      return next
    })
  }, [setSearchParams])

  const allItemsArray = useMemo(() => {
    if (!items || typeof items !== 'object') return []
    const all = Object.entries(items).map(([id, data]) => ({ id, ...data }))
    const byName = new Map()
    for (const item of all) {
      const existing = byName.get(item.name)
      if (!existing || (item.gold?.total ?? 0) > (existing.gold?.total ?? 0)) {
        byName.set(item.name, item)
      }
    }
    return [...byName.values()]
  }, [items])

  const filteredItems = useMemo(() => {
    let result = allItemsArray.filter(item => item.gold?.purchasable)

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(item =>
        item.name?.toLowerCase().includes(q) ||
        item.plaintext?.toLowerCase().includes(q)
      )
    }

    if (selectedTags.size > 0) {
      result = result.filter(item =>
        [...selectedTags].some(tag =>
          item.tags?.some(t => t.toUpperCase() === tag.toUpperCase())
        )
      )
    }

    if (sort === 'gold') {
      result = [...result].sort((a, b) => (a.gold?.total ?? 0) - (b.gold?.total ?? 0))
    } else if (sort === 'gold-desc') {
      result = [...result].sort((a, b) => (b.gold?.total ?? 0) - (a.gold?.total ?? 0))
    } else if (sort === 'name') {
      result = [...result].sort((a, b) => a.name?.localeCompare(b.name))
    }

    return result
  }, [allItemsArray, search, selectedTags, sort])

  const sectionsWithItems = useMemo(() => {
    if (!itemTree || itemTree.length === 0) return []
    const assignedIds = new Set()
    return itemTree.map(cat => {
      const sectionItems = filteredItems.filter(item => {
        if (assignedIds.has(item.id)) return false
        const matches = cat.tags.some(tag =>
          item.tags?.some(t => t.toUpperCase() === tag.toUpperCase())
        )
        if (matches) assignedIds.add(item.id)
        return matches
      })
      return { ...cat, items: sectionItems }
    })
  }, [itemTree, filteredItems])

  const activeSection = section?.toLowerCase() || null

  const handleSectionClick = (header) => {
    const slug = header.toLowerCase()
    if (activeSection === slug) {
      navigate('/items', { replace: true })
    } else {
      navigate(`/items/${slug}`)
    }
  }

  if (loading) return (
    <div className="items-loading">
      <div className="loading-bar" />
      <span>LOADING DATA...</span>
    </div>
  )

  return (
    <div className="items-page">
      <style>{`
        .items-page {
          display: flex;
          min-height: 100vh;
          background: #040404;
          font-family: 'Syne', 'Rajdhani', sans-serif;
        }

        .items-sidebar-col {
          width: 220px;
          flex-shrink: 0;
          border-right: 1px solid rgba(200,170,85,0.15);
          padding: 28px 0 28px 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .items-main {
          flex: 1;
          padding: 28px 32px;
          overflow: hidden;
        }

        .items-topbar {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
          align-items: center;
        }

        .items-search-wrap {
          flex: 1;
          position: relative;
        }

        .items-search-wrap svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.4;
        }

        .items-search {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,170,85,0.2);
          border-radius: 6px;
          color: #e8e0cc;
          padding: 9px 14px 9px 38px;
          font-size: 13px;
          font-family: inherit;
          letter-spacing: 0.03em;
          outline: none;
          transition: border-color 0.2s;
        }

        .items-search::placeholder { color: rgba(200,170,85,0.35); }
        .items-search:focus { border-color: rgba(200,170,85,0.5); }

        .sort-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,170,85,0.2);
          border-radius: 6px;
          color: #c8aa55;
          padding: 9px 32px 9px 12px;
          font-size: 12px;
          font-family: inherit;
          letter-spacing: 0.08em;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23c8aa55' opacity='.6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }

        .items-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #040404;
          color: rgba(200,170,85,0.6);
          font-size: 13px;
          letter-spacing: 0.15em;
          gap: 16px;
        }

        .loading-bar {
          width: 200px;
          height: 2px;
          background: rgba(200,170,85,0.1);
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .loading-bar::after {
          content: '';
          position: absolute;
          left: -60%;
          top: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #c8aa55, transparent);
          animation: slide 1.2s ease-in-out infinite;
        }

        @keyframes slide {
          to { left: 100%; }
        }
      `}</style>

      <div className="items-sidebar-col">
        <ItemSidebar
          selectedTags={selectedTags}
          onTagToggle={onTagToggle}
          onClear={onClear}
        />
      </div>

      <div className="items-main">
        <div className="items-topbar">
          <div className="items-search-wrap">
            <svg width="14" height="14" fill="none" stroke="#c8aa55" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="items-search"
              placeholder="Item Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="gold">Gold ▲</option>
            <option value="gold-desc">Gold ▼</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div>
          {sectionsWithItems.map(cat => (
            <ItemSectionAccordion
              key={cat.header}
              section={cat}
              version={version}
              isOpen={activeSection === cat.header.toLowerCase()}
              onToggle={() => handleSectionClick(cat.header)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}