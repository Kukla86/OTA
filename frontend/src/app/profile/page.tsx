export default async function ProfilePage() {
  // Временно серверный компонент с заглушкой данных профиля
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL ? 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL : ''}/api/user`, { cache: 'no-store' }).catch(() => null)
  const user = res && res.ok ? await res.json() : { id: 'demo-user', email: 'demo@otabusiness.class', name: 'Business Traveler' }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="mb-6">
        <div>ID: {user.id}</div>
        <div>Email: {user.email}</div>
        <div>Name: {user.name}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Orders</h2>
          <div className="text-sm text-gray-600">No orders yet.</div>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Favorites</h2>
          <div className="text-sm text-gray-600">No favorites yet.</div>
        </div>
      </div>
    </div>
  )
}


