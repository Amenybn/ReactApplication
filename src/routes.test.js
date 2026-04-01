import routes from './routes'

describe('routes', () => {
  it('includes a dashboard route', () => {
    expect(routes.some((r) => r.path === '/dashboard')).toBe(true)
  })

  it('root route is marked exact', () => {
    const root = routes.find((r) => r.path === '/')
    expect(root).toBeTruthy()
    expect(root.exact).toBe(true)
  })
})

