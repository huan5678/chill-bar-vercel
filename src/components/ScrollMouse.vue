<template>
  <div class="scrollAnimate">
    <div class="scrollLine">
    </div>
    <span class="
    absolute top-0 left-0
    font-thin text-center text-primary-500
    animate-pulse -translate-x-1/2
    -translate-y-[150%]
    "><i class="text-2xl bi bi-arrow-down-short" /></span>
  </div>
</template>
<style lang="scss" scoped>
$colorPrimary: #f59f13;
$colorSecondary: rgba(42,44,75,0);

$line-height: 60px;
$line-height-abs: -60px;

$animDuration: 6s;

.scrollAnimate {
  width: 1px;
  height: $line-height;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(-150%);
  .scrollLine {
    width: 100%;
    height: 100%;
    display: block;
    background: linear-gradient(to bottom, $colorPrimary 50%, $colorSecondary 50%);
    background-position: 0 $line-height-abs;
    background-size: 100% 200%;
    animation: scrollDown $animDuration cubic-bezier(0.43, 0.04, 0.59, 0.93) forwards infinite;
  }
}

@keyframes scrollDown {
  0%{
    background-position: 0 $line-height-abs;
  }
  75% {
    background-position: 0 0;
  }
  100%{
    background-position: 0 $line-height;
  }
}

</style>
