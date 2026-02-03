// class Catagory { esto es solo un ejemplo de como se haria con una clase
//     constructor(
//         id:number,
//         name:string,
//         description:string,
//         image:string,

//         public id: string,
//         public name: string,
//         public description: string,
//         public image: string,
//     ) { }

//     get full_name(): string {
//         return `${this.id} - ${this.name}`;
//     }
// }

// Interface es un contrato que define la estructura de un objeto
export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}