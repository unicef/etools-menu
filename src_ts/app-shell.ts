import {css, customElement, html, LitElement, property} from 'lit-element';
import { getUserProfile } from './api-requests.js';
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
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          padding: 8px 16px 0px;
          padding-bottom: 4px;
          width: 100%;
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
          
        }
        .justify-center {
          justify-content: center;
        }
        .app-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 6px;
          height: 100px;
        }
        .app-wrapper:hover {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .larger-font {
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
        }
        fieldset {
          margin-bottom: 20px;
          border-width: 1px;
          border-style: solid;
          border-radius: 8px;
        }
        img#profile {
          background-color: rgba(0, 0, 0, 0.04);
          border-radius: 50%;
          padding: 6px;
          width: 20px;
          height: 20px;
          margin-left: 15px;
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
        mwc-select {
          --mdc-select-fill-color: white;
          --mdc-menu-item-height: 30px;
        }
        .unicefLogo {
          padding-left: 16px;
          display: flex;
          align-items: center;
          padding-top:6px;
        }
      `
    ];
  }

  public render() {
    // main template
    // language=HTML
    return html`
      ${appTheme}
      <div class="layout-h">
        <div class="unicefLogo"><img id="unicefLogo" src="./images/UNICEF_logo.png" alt="UNICEF Logo" /></div>
        <div class="header-container">       
          <label style="padding-right: 15px;" class="larger-font">${this.userProfile?.country.name}</label>
          <img id="profile" src="./images/perm_identity-24px.svg" alt="User Profile" />
        </div>
      </div>
      <div class="logo">
        <img id="app-logo" src="./images/eTools-logo-black.png" alt="eTools Logo" />
      </div>
      <div class="layout-h justify-center">
        <div class="content-container">
          <fieldset>
            <legend class="larger-font">Programme Management</legend>
            <div class="apps-container">
              <a href="https://www.unpartnerportal.org/login">
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
            <legend class="larger-font">Monitoring & Assurance</legend>
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
            <legend class="larger-font">Dashboards & Analytics</legend>
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
              <a href="https://app.powerbi.com/groups/me/apps/2c83563f-d6fc-4ade-9c10-bbca57ed1ece/reports/5e60ab16-cce5-4c21-8620-de0c4c6415de/ReportSectionfe8562e6ef8c4eddcb52">
                <div class="app-wrapper"><div>${powerBiIcon}</div> <div class="app-name">Implementation Intelligence (I<sup>2</sup>)</div></div>
              </a>
              <a href="https://datamart.unicef.io/">
                <div class="app-wrapper"><div>${externalIcon}</div> <div class="app-name">Datamart</div></div>
              </a>
            </div>
          </fieldset>       
        </div>
      </div>
      <div class="footer">        
      </div>
    `;
  }

  @property({type: Object})
  userProfile?: any;

  async connectedCallback() {
    super.connectedCallback();
    try {
      this.userProfile = await getUserProfile();
    } catch (error) {
      if (error.status == 403) {
        window.location.href = window.location.origin + '/login'
      }
    }
    
  }
}
