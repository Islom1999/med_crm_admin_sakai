import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: "Asosiy",
                items: [
                    { 
                        label: "Boshqaruv paneli", 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/'],
                    },
                    { 
                        label: "Statistika", 
                        icon: 'pi pi-fw pi-chart-pie', 
                        // routerLink: ['/'],
                    },
                    { 
                        label: "To'lovlar", 
                        icon: 'pi pi-fw pi-wallet', 
                        // routerLink: ['/'],
                    },
                    { 
                        label: "Yangiliklar", 
                        icon: 'pi pi-fw pi-images', 
                        routerLink: ['/news'],
                    },
                ],
            },
            {
                label: 'Boshqaruv',
                items: [
                    { 
                        label: "Bo'limlar", 
                        icon: 'pi pi-fw pi-sitemap', 
                        items: [
                            {
                                label: "Bo'limlar ro'yhati", 
                                icon: 'pi pi-fw pi-table', 
                                routerLink: ['/departament'],
                            },
                        ]

                    },
                    { 
                        label: "Vrachlar", 
                        icon: 'pi pi-fw pi-users', 
                        items: [
                            {
                                label: "Vrachlar ro'yhati", 
                                icon: 'pi pi-fw pi-table', 
                                routerLink: ['/staff'],
                            },
                            {
                                label: "Davolash tarixi", 
                                icon: 'pi pi-fw pi-history', 
                                // routerLink: ['/appointment'],
                            },
                            {
                                label: "Xizmatlar", 
                                icon: 'pi pi-fw pi-calendar-plus', 
                                routerLink: ['/services'],
                            }
                        ] 
                    },
                    { 
                        label: "Ish vaqtlari", 
                        icon: 'pi pi-fw pi-calendar', 
                        items: [
                            {
                                label: "Ish vaqtlari", 
                                icon: 'pi pi-fw pi-calendar-plus', 
                                routerLink: ['/schemodule/weeks'],
                            },
                            {
                                label: "Bayramlar", 
                                icon: 'pi pi-fw pi-calendar-minus', 
                                routerLink: ['/schemodule/holiday'],
                            }
                        ] 
                    },
                    { 
                        label: "Bemorlar", 
                        icon: 'pi pi-fw pi-user-plus', 
                        items: [
                            {
                                label: "Bemorlar ro'yhati", 
                                icon: 'pi pi-fw pi-table', 
                                routerLink: ['/patient'],
                            },
                            {
                                label: "To'lovlar", 
                                icon: 'pi pi-fw pi-credit-card', 
                                // routerLink: ['/'],
                            },
                            {
                                label: "Tashxislar", 
                                icon: 'pi pi-fw pi-file-edit', 
                                // routerLink: ['/'],
                            },
                            {
                                label: "Hujjatlar", 
                                icon: 'pi pi-fw pi-file', 
                                // routerLink: ['/'],
                            }
                        ] 
                    },
                    { 
                        label: "Qabulxona", 
                        icon: 'pi pi-fw pi-check-square', 
                        // routerLink: ['/'],
                        items: [
                            {
                                label: "Qabullar bazasi", 
                                icon: 'pi pi-fw pi-table', 
                                routerLink: ['/appointment'],
                            },
                            // {
                            //     label: "Qabul qo'shish", 
                            //     icon: 'pi pi-fw pi-plus-circle', 
                            //     routerLink: ['/appointment/transactions'],
                            // },
                            {
                                label: "Kassa", 
                                icon: 'pi pi-fw pi-chart-line', 
                                routerLink: ['/appointment/transactions'], 
                            }
                        ] 
                    },
                    { 
                        label: "Xonalar", 
                        icon: 'pi pi-fw pi-th-large', 
                        items: [
                            {
                                label: "Xonalar ro'yhati", 
                                icon: 'pi pi-fw pi-table', 
                                routerLink: ['/rooms'],
                            },
                            {
                                label: "Bo'sh xonalar", 
                                icon: 'pi pi-fw pi-lock-open', 
                                routerLink: ['/rooms/empty'],
                            },
                            {
                                label: "Band xonalar", 
                                icon: 'pi pi-fw pi-unlock', 
                                routerLink: ['/rooms/occupied'],
                            }
                        ] 
                    }
                ],
            },
            {
                label: "Bugalteriya",
                items: [
                    { 
                        label: "Ish haqi", 
                        icon: 'pi pi-fw pi-table', 
                        routerLink: ['/sallary'],
                    },
                    { 
                        label: "Hisobot ish haqi", 
                        icon: 'pi pi-fw pi-chart-bar', 
                        // routerLink: ['/'],
                    },
                    { 
                        label: "Xarajatlar", 
                        icon: 'pi pi-fw pi-wallet', 
                        // routerLink: ['/'],
                    }
                ],
            },
            {
                label: "Core",
                items: [
                    { 
                        label: "Lavozimlar", 
                        icon: 'pi pi-fw pi-briefcase', 
                        routerLink: ['/role'],
                    },
                    { 
                        label: "Sozlamalar", 
                        icon: 'pi pi-fw pi-cog', 
                        routerLink: ['/files'],
                    },
                    { 
                        label: "Tashqi xizmatlar", 
                        icon: 'pi pi-fw pi-key', 
                        // routerLink: ['/'],
                    },
                ],
            },
        ];
    }
}
