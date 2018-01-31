<!-- src/components/404.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__content">
            <div class="page-not-found">
              <h1 class="page-not-found__title">404: Page Not Found</h1>
              <p class="page-not-found__body">Oops! The page you requested does not exist.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-not-found {
    padding: rem-calc(50 0 0);
    text-align: center;
  }

  .page-not-found__title {
    margin: 0 0 rem-calc(15);
  }
</style>
