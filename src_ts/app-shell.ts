import {css, customElement, html, LitElement} from 'lit-element';
import {
  apdIcon,
  dashIcon,
  externalIcon,
  famIcon,
  fmIcon,
  pmpIcon,
  powerBiIcon,
  pseaIcon,
  tpmIcon,
  tripsIcon,
  unppIcon
} from './app-selector-icons.js';
import appTheme from './app-theme.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  static get styles() {
    return [
      css`
        .header-container {
          padding: 16px 16px 0px;
          padding-bottom: 4px;
          text-align: right;
        }
        .logo {
          text-align: center;
          padding-top: 8px;
          padding-bottom: 16px;
        }

        .content-container {
          width: 100%;
          max-width: 600px;
          padding: 0 8px;
        }
        .apps-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          font-size: 12px;
        }

        .layout-h {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .app-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 6px;
          height: 110px;
        }
        .app-wrapper:hover {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .category {
          color: var(--secondary-text-color);
          font-weight: bold;
          font-size: 16px;
        }
        .app-name {
          margin-top: 12px;
          width: 95px;
          text-align: center;
        }
        .footer {
          padding: 50px 20px 0 20px;
          text-align: right;
        }
        fieldset {
          margin-bottom: 20px;
          border-width: 1px;
          border-style: solid;
          border-radius: 8px;
        }
        img#profile {
          background-color: rgba(211, 211, 211, 0.4);
          border-radius: 50%;
          padding: 6px;
          width: 20px;
          height: 20px;
        }
        #app-logo {
          height: 65px;
        }

        svg {
          border-radius: 50%;
        }

        #unicefLogo {
          height: 20px;
        }

        a {
          text-decoration: none;
          color: var(--primary-text-color);
        }
      `
    ];
  }

  public render() {
    // main template
    // language=HTML
    return html`
      ${appTheme}
      <div class="header-container">
        <img id="profile" src="./images/perm_identity-24px.svg" alt="User Profile" />
      </div>
      <div class="logo">
        <img id="app-logo" src="./images/eTools-logo-black.png" alt="eTools Logo" />
      </div>
      <div class="layout-h">
        <div class="content-container">
          <fieldset>
            <legend class="category">Programme Management</legend>
            <div class="apps-container">
              <a href="">
                <div class="app-wrapper">
                  <div>${unppIcon}</div>
                  <div class="app-name">UN Partner Portal</div>
                </div>
              </a>
              <a href="/pmp/">
                <div class="app-wrapper">
                  <div>${pmpIcon}</div>
                  <div class="app-name">Partnership Management</div>
                </div>
              </a>
            </div>
          </fieldset>

          <fieldset>
            <legend class="category">Monitoring & Assurance</legend>
            <div class="apps-container">
              <a href="/t2f/">
                <div class="app-wrapper">
                  <div>${tripsIcon}</div>
                  <div class="app-name">Trip Management</div>
                </div>
              </a>
              <a href="/tpm/">
                <div class="app-wrapper">
                  <div>${tpmIcon}</div>
                  <div class="app-name">Third Party Monitoring</div>
                </div>
              </a>
              <a href="/ap/">
                <div class="app-wrapper">
                  <div>${famIcon}</div>
                  <div class="app-name">Financial Assurance</div>
                </div>
              </a>
              <a href="/psea/">
                <div class="app-wrapper">
                  <div>${pseaIcon}</div>
                  <div class="app-name">PSEA Assurance</div>
                </div>
              </a>
              <a href="/fm/">
                <div class="app-wrapper">
                  <div>${fmIcon}</div>
                  <div class="app-name">Field Monitoring</div>
                </div>
              </a>
            </div>
          </fieldset>

            
          <fieldset>
            <legend class="category">Dashborads & Analytics</legend>
            <div class="apps-container">
              <a href="/ap/">
                <div class="app-wrapper">
                  <div>${apdIcon}</div>
                  <div class="app-name">Action Points</div>
                </div>
              </a>
              <a href="/dash/">
                <div class="app-wrapper"><div>${dashIcon}</div> <div class="app-name">Dashboards</div></div>
              </a>
              <a href="">
                <div class="app-wrapper"><div>${powerBiIcon}</div> <div class="app-name">Implementation Intelligence (I<sup>2</sup>)</div></div>
              </a>
              <a href="">
                <div class="app-wrapper"><div>${externalIcon}</div> <div class="app-name">Datamart</div></div>
              </a>
            </div>
          </fieldset>       
        </div>
      </div>
      <div class="footer">
        <img id="unicefLogo" src="./images/UNICEF_logo.png" alt="UNICEF Logo" />
      </div>
    `;
  }
}
