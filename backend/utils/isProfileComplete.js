export function isProfileComplete(user){
 return Boolean(
    user.phone &&
    user.avatarUrl &&
    user.location &&
    user.district &&
    user.specificLocation &&
    user.type
  );
}