export default function About() {
  return (
    <div style={{ marginTop: "5em" }}>
      <section class="page-section" id="lockers-map">
        <img
          id="map-loader"
          src="https://sameday.ro/app/themes/samedaytwo/public/images/icons/loader.gif"
          alt="loader"
          data-lazy-src="https://sameday.ro/app/themes/samedaytwo/public/images/icons/loader.gif"
          data-ll-status="loaded"
          class="entered lazyloaded"
          width="64"
          height="64"
        />
        <noscript>
          <img
            width="64"
            height="64"
            id="map-loader"
            src="https://sameday.ro/app/themes/samedaytwo/public/images/icons/loader.gif"
            alt="loader"
          />
        </noscript>
        <div id="search-locker">
          <div class="card">
            <div class="card-content">
              <div class="search-locker-wrapper">
                <form id="get_lockers_on_search" data-gtm-form-interact-id="0">
                  <label for="search-easybox" style={{ display: "none" }}>
                    search for easybox
                  </label>
                  <input
                    id="search-easybox"
                    type="search"
                    placeholder="search for easybox"
                    data-gtm-form-interact-field-id="0"
                  />
                  <button type="submit">
                    <svg
                      class="svg-inline--fa fa-magnifying-glass"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="magnifying-glass"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      ></path>
                    </svg>
                  </button>
                  <div class="clearfix">
                    <input
                      type="checkbox"
                      id="supportPayment"
                      name="supportPayment"
                      value="payment"
                    />
                    <label for="supportPayment">
                      {" "}
                      Afișează doar lockere care acceptă plata cu cardul
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
