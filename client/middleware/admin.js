export default function ({ store, redirect }) {
  // Si l'utilisateur n'est pas authentifi√©
  if (!store.state.auth.user.admin) {
    return redirect('/')
  }
}
