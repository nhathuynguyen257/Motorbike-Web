import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
selector: 'app-breadcrumb',
templateUrl: './breadcrumb.component.html',
styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
breadcrumbs: { label: string, url: string }[] = [];

constructor(private router: Router, private route: ActivatedRoute) {
this.router.events.pipe(
filter(event => event instanceof NavigationEnd),
map(() => this.createBreadcrumbs(this.route.root))
).subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
}

ngOnInit(): void {}

private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: { label: string, url: string }[] = []): { label: string, url: string }[] {
const routeURL = route.snapshot.url.map(segment => segment.path).join(' / ');
if (routeURL) {
url += `/${routeURL}`;
breadcrumbs.push({ label: routeURL, url });
}
route.children.forEach(child => this.createBreadcrumbs(child, url, breadcrumbs));
return breadcrumbs;
}
}