import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UsersService {

    private users = [
        {
            id: 'u1',
            name: 'Manfredi',
            image: 'Ekko.webp'
        },
        {
            id: 'u2',
            name: 'Monica',
            image: 'Vi.jpg'
        },
        {
            id: 'u3',
            name: 'Emilio',
            image: 'Heimer.webp'
        },
        {
            id: 'u4',
            name: 'Ciccio',
            image: 'Isha.webp'
        },
        {
            id: 'u5',
            name: 'Virginia',
            image: 'Mel.jpg'
        },
        {
            id: 'u6',
            name: 'Anita',
            image: 'Cait.jpg'
        }
    ];

    getAllUsers() {
        return this.users;
    }

    userImagePath(userId: string) {
        const user = this.users.find(u => u.id === userId);
        return 'assets/' + user?.image;
    }
}