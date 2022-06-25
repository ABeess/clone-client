import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFromLocation, reAuthenticate, refreshToken } from 'src/fetching/auth.api';
import decode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'src/recoils/authAtom';
// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  const setAuthState = useSetRecoilState(authAtom);
  useEffect(() => {
    (async () => {
      if (typeof window !== undefined && window.location.hash.includes('access_token')) {
        const token = await getFromLocation(window.location);
        if (token) {
          console.log(token);
          localStorage.setItem('recoil-persist', JSON.stringify({ authentication: { accessToken: token } }));
          const { isAdmin, sub } = decode(token);
          const [userData] = await Promise.all([reAuthenticate(), refreshToken({ data: { isAdmin, _id: sub } })]);
          setAuthState((prev) => ({ ...prev, user: userData?.user }));
        }
      }
      if (router.pathname == '/') {
        router.push('/dashboard/courses/list');
      }
    })();
  });

  return null;
}
