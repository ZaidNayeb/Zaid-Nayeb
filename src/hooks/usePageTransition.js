import { useContext } from 'react';
import { TransitionContext } from '../context/TransitionContext';

export default function usePageTransition() {
  return useContext(TransitionContext);
}
