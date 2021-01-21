import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations'

export const fadeOutAnimation = trigger('routeAnimations', [
  transition('* => *', [
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [style({ opacity: '1' }), animate('300ms ease-out', style({ opacity: '0' }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: '0' }), animate('300ms ease-in', style({ opacity: '1' }))],
        { optional: true }
      ),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
])
