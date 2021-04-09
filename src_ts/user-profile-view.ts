import { css, customElement, html, LitElement, property } from "lit-element";

@customElement('user-profile-view')
export class UserProfileView extends LitElement {
    static get styles() {
        return [css`
            :host {
                margin-left: 8px;
                background-color: white;
                max-width: 600px;
                max-height: 600px;
                overflow-y: auto;
                box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
                border-radius: 8px;
                position: absolute;
                z-index: 100;
                top: 45px;                
            }
            .container {   
                padding: 16px;    
                padding-bottom: 26px;         
            }
            
            .paper-label {
                font-size: 12px;
                color: var(--secondary-text-color);
                padding-top: 6px;
            }

            .input-label {
                min-height: 24px;
                padding-top: 4px;
                padding-bottom: 6px;
                min-width: 0;
                font-size: 16px;
            }

            .input-label[empty]::after {
                content: '—';
                color: var(--secondary-text-color);
            }
            .padd-v {
                padding: 12px 0;
            }

            button#x {
                position: absolute;
                right: 6px;
                top: 6px;
                font-weight: bold;
                font-size: 18px;
                border: none;
                background-color: white;
                color: var(--secondary-text-color);
                cursor: pointer;
            }
        `];
    }

    @property({type: Object})
    userProfile: any = {};

    public render() {
      return html`
        <button id="x" type="button" @click="${this.close}">x</button>
        <div class="container">
            <div>
                <div class="paper-label">Name</div>
                <div class="input-label">${this.userProfile.name}</div>
            </div>
            <div>
                <div class="paper-label">Available Countries</div>
                <div class="input-label">
                  ${this.userProfile.countries_available.map((c:any, index: number) => c.name + (index == this.userProfile.countries_available.length - 1 ? '' : ' | '))}
                </div>
            </div>
            <div>
                <div class="paper-label">My Groups</div>
                <div class="input-label">
                  ${this.userProfile.groups.map((g:any, index: number) => g.name + (index == this.userProfile.groups.length - 1 ? '' : ' | '))}
                </div>
            </div>
        </div>
      `;     
    }

    connectedCallback() {
      super.connectedCallback();       
    }  
    
    close() {
        this.dispatchEvent(
            new CustomEvent('close', {
              detail: '',
              bubbles: true,
              composed: true
            })
          );
    }
}