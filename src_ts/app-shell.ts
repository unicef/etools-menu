import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
} from 'lit-element';
import { changeCountry, getUserProfile } from './api-requests.js';
import {
  adminIcon,
  apdIcon,
  dashIcon,
  datamartIcon,
  famIcon,
  fmIcon,
  pmpIcon,
  powerBiIcon,
  pseaIcon,
  tpmIcon,
  tripsIcon,
  unppIcon,
} from './app-selector-icons.js';
import appTheme from './app-theme.js';
import './user-profile-view.js';
import Dexie from 'dexie';

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
          font-weight: bold;
        }
        .footer {
          padding: 30px 20px 0 20px;
        }
        fieldset {
          margin-bottom: 20px;
          border-width: 1px;
          border-style: solid;
          border-radius: 8px;
        }
        img#profile {
          border-radius: 50%;
          padding: 6px;
          width: 20px;
          height: 20px;
          margin-left: 25px;
          position: relative;
          cursor: pointer;
        }
        img#profile:hover {
          box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
        }
        #app-logo {
          height: 65px;
        }

        svg {
          border-radius: 50%;
        }

        svg#powerBiIcon {
          border-radius: initial;
        }

        #unicefLogo {
          height: 20px;
        }

        a {
          text-decoration: none;
          color: var(--primary-text-color);
        }

        .unicefLogo {
          padding-left: 16px;
          display: flex;
          align-items: center;
          padding-top: 6px;
        }
        *[hidden] {
          display: none;
        }
        img#profile:focus {
          outline: none;
          box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
        }

        select {
          padding-right: 16px;
          border: none;
          text-align-last: right;
          color: var(--secondary-text-color);
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }

        select:focus-visible {
          outline: none;
          border-bottom: 1px solid var(--secondary-text-color);
        }

        .admin {
          margin: 0 15px 0 25px;
        }

        .admin-label {
          padding-left: 4px;
          padding-top: 3px;
        }
      `,
    ];
  }

  public render() {
    // main template
    // language=HTML
    return html`
      ${appTheme}
      <div class="layout-h">
        <div class="unicefLogo">
          <img
            id="unicefLogo"
            src="./images/UNICEF_logo.png"
            alt="UNICEF Logo"
          />
        </div>
        <div class="header-container">
          <select
            name="countries"
            id="countries"
            @change="${this.countryChanged}"
          >
            ${this.userProfile?.countries_available.map(
              (c: any) =>
                html`<option
                  ?selected="${this.userProfile.country?.id == c.id}"
                  value="${c.id}"
                >
                  ${c.name}
                </option>`
            )}
          </select>

          <img
            tabindex="0"
            id="profile"
            src="./images/perm_identity-24px.svg"
            @keydown="${this.callClickOnEnterAndSpace}"
            @click="${this.toggleUserProfileView}"
            alt="User Profile"
          />
          <user-profile-view
            id="user-dropdown"
            ?hidden="${!this.showUserProfileView}"
            .userProfile="${this.userProfile}"
            @keydown="${this.closeOnEsc}"
            @close="${() => (this.showUserProfileView = false)}"
          >
          </user-profile-view>

          <a
            href="/admin/"
            class="admin"
            ?hidden="${!Boolean(this.userProfile.is_superuser)}"
          >
            <div class="layout-h">
              <div style="padding-top:4px;">${adminIcon}</div>
              <div class="admin-label larger-font">Admin</div>
            </div>
          </a>
        </div>
      </div>
      <div class="logo">
        <img
          id="app-logo"
          src="./images/eTools-logo-black.png"
          alt="eTools Logo"
        />
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
              <a href="/pmp/" ?hidden="${!this.userProfile?.is_unicef_user}">
                <div class="app-wrapper">
                  <div>${pmpIcon}</div>
                  <div class="app-name">Partnership Management</div>
                </div>
              </a>
              <a href="/epd/" ?hidden="${!this.userProfile?._partner_staff_member}">
              <div class="app-wrapper">
                <div>${pmpIcon}</div>
                <div class="app-name">ePD</div>
              </div>
            </a>
            </div>
          </fieldset>

          <fieldset ?hidden="${!this.showMonitoringOrAssuranceApps}">
            <legend class="larger-font">Monitoring & Assurance</legend>
            <div class="apps-container">
              <a href="/t2f/" ?hidden="${!this.userProfile?.is_unicef_user}">
                <div class="app-wrapper">
                  <div>${tripsIcon}</div>
                  <div class="app-name">Trip Management</div>
                </div>
              </a>
              <a href="/tpm/" ?hidden="${!this.showMonitoringApps}">
                <div class="app-wrapper">
                  <div>${tpmIcon}</div>
                  <div class="app-name">Third Party Monitoring</div>
                </div>
              </a>
              <a href="/ap/" ?hidden="${!this.showAssuranceApps}">
                <div class="app-wrapper">
                  <div>${famIcon}</div>
                  <div class="app-name">Financial Assurance</div>
                </div>
              </a>
              <a href="/psea/" ?hidden="${!this.showAssuranceApps}">
                <div class="app-wrapper">
                  <div>${pseaIcon}</div>
                  <div class="app-name">PSEA Assurance</div>
                </div>
              </a>
              <a href="/fm/" ?hidden="${!this.showMonitoringApps}">
                <div class="app-wrapper">
                  <div>${fmIcon}</div>
                  <div class="app-name">Field Monitoring</div>
                </div>
              </a>
            </div>
          </fieldset>

          <fieldset ?hidden="${!this.userProfile?.is_unicef_user}">
            <legend class="larger-font">Dashboards & Analytics</legend>
            <div class="apps-container">
              <a href="/apd/">
                <div class="app-wrapper">
                  <div>${apdIcon}</div>
                  <div class="app-name">Action Points</div>
                </div>
              </a>
              <a href="/dash/">
                <div class="app-wrapper">
                  <div>${dashIcon}</div>
                  <div class="app-name">Dashboards</div>
                </div>
              </a>
              <a
                href="https://app.powerbi.com/groups/me/apps/2c83563f-d6fc-4ade-9c10-bbca57ed1ece/reports/5e60ab16-cce5-4c21-8620-de0c4c6415de/ReportSectionfe8562e6ef8c4eddcb52"
              >
                <div class="app-wrapper">
                  <div>${powerBiIcon}</div>
                  <div class="app-name">
                    Implementation Intelligence (I<sup>2</sup>)
                  </div>
                </div>
              </a>
              <a href="https://datamart.unicef.io/">
                <div class="app-wrapper">
                  <div>${datamartIcon}</div>
                  <div class="app-name">Datamart</div>
                </div>
              </a>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="footer"></div>
    `;
  }

  @property({ type: Object })
  userProfile?: any;

  @property({ type: Boolean })
  showAssuranceApps = true;

  @property({ type: Boolean })
  showMonitoringApps = true;

  @property({ type: Boolean })
  showMonitoringOrAssuranceApps = true;

  @property({ type: Boolean })
  showUserProfileView = false;

  @query('select')
  countriesDropdown!: HTMLSelectElement;

  async connectedCallback() {
    super.connectedCallback();

    document.addEventListener(
      'click',
      this.closeDropdownOnClickOutside.bind(this) as any,
      true
    );
    this.addEventListener('keydown', this.closeOnEsc.bind(this) as any, true);

    try {
      this.userProfile = await getUserProfile();
      this.setAppsVisibility();
    } catch (error) {
      if ([403, 401].includes(error.status)) {
        window.location.href = window.location.origin + '/login';
      }
    }
  }

  setAppsVisibility() {
    this.showAssuranceApps = this.getVisibilityByGroup('Auditor');
    this.showMonitoringApps = this.getVisibilityByGroup('Third Party Monitor');
    this.showMonitoringOrAssuranceApps = this.showAssuranceApps || this.showMonitoringApps || this.userProfile?.is_unicef_user;
  }

  getVisibilityByGroup(givenGroup: string) {
    if (!this.userProfile.is_unicef_user) {
      return this.userProfile.groups.some(
        (g: { id: number; name: string }) => g.name === givenGroup
      );
    }
    return true;
  }

  toggleUserProfileView() {
    this.showUserProfileView = !this.showUserProfileView;
  }

  closeDropdownOnClickOutside(e: any) {
    if (!this.showUserProfileView) {
      return;
    }
    if (this._isInPath(e.path, 'id', 'profile')) {
      return;
    }
    if (!this._isInPath(e.path, 'id', 'user-dropdown')) {
      this.showUserProfileView = false;
    }
  }

  _isInPath(path: [], prop: string, value: string) {
    path = path || [];
    for (let i = 0; i < path.length; i++) {
      if (path[i][prop] === value) {
        return true;
      }
    }
    return false;
  }

  callClickOnEnterAndSpace(event: any) {
    if ((event.key === ' ' || event.key === 'Enter') && !event.ctrlKey) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      event.target.click();
      // cancel scroll down on Space click
      return false;
    }
    return;
  }

  closeOnEsc(event: any) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.showUserProfileView = false;
    }
  }

  countryChanged(_ev: any) {
    const selVal = this._getSelectedCountryId();
    if (selVal == this.userProfile.country.id || !selVal) {
      return;
    }

    changeCountry(selVal!)
      .then(() => {
        window.location.reload();
      })
      .catch((_error: any) => {
        // TODO
      });
  }

  _getSelectedCountryId() {
    return this.countriesDropdown.selectedOptions
      ? this.countriesDropdown.selectedOptions[0]?.value
      : null;
  }

  clearDexieDbs() {
    // except Chrome and Opera this method will delete only the dbs created with Dexie
    Dexie.getDatabaseNames((dbsNames: string[]) => {
      let dexieDbsNumber = dbsNames.length;
      if (dexieDbsNumber > 0) {
        dbsNames.forEach((dbName) => {
          this.deleteDexieDb(dbName);
        });
      }
    });
  }

  deleteDexieDb(dbName: string) {
    let db = new Dexie(dbName);
    let finished = false;
    db.delete()
      .catch(
        function (err: any) {
          console.log(
            'Could not delete indexedDB: ' + dbName,
            'etools-page-refresh-mixin',
            err,
            true
          );
        }.bind(this)
      )
      .finally(
        function () {
          finished = true;
        }.bind(this)
      );
    // *In Edge - catch and finally of db.delete() are not executed,
    //            when the site is opened in more than one tab
    setTimeout(() => {
      if (!finished) {
        alert(
          'Please close any other tabs, that have this page open, for the Refresh to work properly.'
        );
      }
    }, 9000);
  }
}
