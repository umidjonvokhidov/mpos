const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <main><h1 className="text-5xl text-purple-900">Root Layout</h1>{children}</main>
  )
}

export default RootLayout