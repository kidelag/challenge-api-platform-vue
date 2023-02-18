<script setup>
</script>

<template>
    <footer class="footer footer-light">
    <div class="f-top-container">

      <div class="c-left">
        <div class="item-footer footer-left">
          <ul class="fl-ul">
            <li><a href="#" class="f-light">test A1</a></li>
            <li><a href="#" class="f-light">test A2</a></li>
            <li><a href="#" class="f-light">test A3</a></li>
            <li><a href="#" class="f-light">test A3</a></li>
          </ul>
        </div>

        <div class="item-footer footer-middle">
          <ul class="fl-ul">
            <li><a href="#" class="f-light">test B1</a></li>
            <li><a href="#" class="f-light">test B2</a></li>
            <li><a href="#" class="f-light">test B3</a></li>
          </ul>
        </div>

        <div class="item-footer footer-right">
          <ul class="fl-ul">
            <li><a href="#" class="f-light">test B1</a></li>
            <li><a href="#" class="f-light">test B2</a></li>
            <li><a href="#" class="f-light">test B3</a></li>
          </ul>
        </div>
      </div>

      <div class="c-right">
        <div class="item-container-right">Français</div>
      </div>

    </div>

    <div class="f-bottom-container">

      <div class="fb-left">eLearning</div>
      <div class="fb-right">© 2023 eLearning, Inc.</div>

    </div>

  </footer>
</template>

<style scoped>

footer.footer {
  border-top: 1px solid #dad9dc;
  width: 100vw;
  padding: 2rem 4rem;
}

footer.footer-light{
background-color: var(--background-color-light);
color: var(--color-text-light);
}

footer.footer-dark{
background-color: var(--background-color-dark);
color: var(--color-text-dark);
}

footer.footer a.f-light {
  color: var(--color-text-light);
}

footer.footer a.f-dark {
  color: var(--color-text-dark);
}


footer.footer > div.f-top-container {
  width: 100%;
  display: flex;
}

footer.footer > div.f-top-container > div.c-left {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

footer.footer > div.f-top-container > div.c-left div.item-footer {
  flex: 1;
  height: auto;
}

footer.footer > div.f-top-container > div.c-left ul.fl-ul {
  list-style: none;
  padding-left: 0;
}

footer.footer > div.f-top-container > div.c-left ul.fl-ul li > a {
  text-decoration: none;
}

footer.footer > div.f-top-container > div.c-right {
  flex: 1;
  justify-content: end;
  display: inherit;

}

footer.footer > div.f-top-container > div.c-right > div.item-container-right {
  margin: 0 2rem 0 auto;
}

footer.footer > div.f-bottom-container {
  width: 100%;
  margin: 2rem 0 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
}

footer.footer > div.f-bottom-container > div.fb-left{
  flex: 1;
  height: 100%;
  font-size: 2rem;

}

footer.footer > div.f-bottom-container > div.fb-right{
  flex: 1;
  height: auto;
  justify-content: end;
  margin-top: auto;
  display: inherit;

}

</style>