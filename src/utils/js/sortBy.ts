import { Pokemon } from "src/app/model/pokemon/pokemon.model";

const sortBy = (key: string, list: any[] | Pokemon[]) => {
    return list.sort(compareValues(key));
}



function compareValues(key: string) {
    return function innerSort(a: any, b: any) {
        const varA = a[key];
        const varB = b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return comparison
            ;
    };
}

export default sortBy;