import { catchError } from 'rxjs/operators';
import { User } from './../_models/user';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private Alertify: AlertifyService) {}
    resolve(router: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(router.params['id']).pipe(
            catchError(error => {
                this.Alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
