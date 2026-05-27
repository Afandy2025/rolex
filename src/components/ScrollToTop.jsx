import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // When the route changes, instantly scroll to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Must be instant to avoid jarring animations between route changes
    });
  }, [pathname]);

  return null;
}
