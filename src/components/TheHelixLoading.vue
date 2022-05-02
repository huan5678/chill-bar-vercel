<template>
<div class="loader">
  <div class="dot" v-for="item in 25" :key="item"></div>
</div>
</template>

<style lang="scss" scoped>
$dot-count: 26;
$dot-size: 10px;
$dot-space: 15px;
$dot-start: (($dot-count / 2 + 1) * ($dot-size + $dot-space)) / 2;
$dot-color: #f59f13;
$dot-secColor: #2a2c4b;

$animation-time: 2s;
$animation-distance: 25px;

.loader {
  position: relative;

  .dot {
    animation-name: movement;
    animation-duration: $animation-time;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    height: $dot-size;
    position: absolute;
    top: -#{$dot-size};
    transform: translate3d(0, -#{$animation-distance}, 0) scale(1);
    width: $dot-size;

    @for $i from 1 through $dot-count {
      $dot-move: ceil($i / 2);
      $dot-pos: $dot-start - (($dot-size + $dot-space) * $dot-move);
      $animation-delay: -#{$i * 0.1}s;

      @if $i % 2 == 0 {
        $animation-delay: -#{($i * 0.1) + ($animation-time / 2)};
      }

      &:nth-of-type(#{$i}) {
        animation-delay: $animation-delay;
        left: $dot-pos;

        &::before {
          animation-delay: $animation-delay;
        }
      }
    }

    &::before {
      animation-name: size-opacity;
      animation-duration: $animation-time;
      animation-iteration-count: infinite;
      animation-timing-function: ease;
      background: $dot-secColor;
      border-radius: 50%;
      content: "";
      display: block;
      height: 100%;
      width: 100%;
    }

    &:nth-of-type(even)::before {
      background-color: $dot-color;
      box-shadow: inset 0 0 4px darken($dot-color, 10%);
    }
  }
}

@keyframes movement {
  0% {
    transform: translate3d(0, -#{$animation-distance}, 0);
    z-index: 0;
  }

  50% {
    transform: translate3d(0, #{$animation-distance}, 0);
    z-index: 10;
  }

  100% {
    transform: translate3d(0, -#{$animation-distance}, 0);
    z-index: -5;
  }
}

@keyframes size-opacity {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  25% {
    transform: scale(1.5);
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 0.35;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

</style>
