export  const generateVerificationToken = () => {
  return Math.floor(Math.random() * 900000 + 100000).toString();
};

export const calculateExpirationAt = (minutes: number) => {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60000);
}