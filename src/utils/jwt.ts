export function getRolesFromToken(token: string): string[] {
  try {
    const user = sessionStorage.getItem("user");
    if (!user) return [];

    const parsedUser = JSON.parse(user);
    return parsedUser.roles;
  } catch {
    return [];
  }
}
