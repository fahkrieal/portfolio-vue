import { describe, it, expect } from 'vitest'
import { projectsData } from '@/data/projects'

describe('Portfolio Projects Data Integrity', () => {
  it('contains all 3 authentic projects', () => {
    expect(projectsData).toHaveLength(3)
  })

  it('each project has valid slug, title, image, and tech array', () => {
    projectsData.forEach((project) => {
      expect(project.slug).toBeDefined()
      expect(project.slug.length).toBeGreaterThan(0)
      expect(project.title).toBeDefined()
      expect(project.image).toBeDefined()
      expect(Array.isArray(project.tech)).toBe(true)
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.overview).toBeDefined()
      expect(project.problem).toBeDefined()
      expect(Array.isArray(project.architecture)).toBe(true)
      expect(Array.isArray(project.features)).toBe(true)
    })
  })

  it('has valid slugs for routing', () => {
    const slugs = projectsData.map((p) => p.slug)
    expect(slugs).toContain('sistem-prediksi-servis-motor')
    expect(slugs).toContain('profilex')
    expect(slugs).toContain('coffeefinder')
  })
})
