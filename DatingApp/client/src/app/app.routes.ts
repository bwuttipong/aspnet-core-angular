import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authenGuard } from '../core/guards/authen-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';

export const routes: Routes = [
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authenGuard],
        children: [
            {path: 'members', component: MemberList},
            {path: 'members/:id', component: MemberDetailed},
            {path: 'lists', component: Lists},
            {path: 'messages', component: Messages},
        ]
    },
    { path: "errors", component: TestErrors},
    { path: "server-error", component: ServerError},
    {path: '**', component: NotFound} // If they go to a root that doesn't exist inside our root's array
];
