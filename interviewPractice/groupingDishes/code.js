/*

You are given a list dishes, where each element consists of a list of strings beginning with the name of the dish, followed by all the ingredients used in preparing it. You want to group the dishes by ingredients, so that for each ingredient you'll be able to find all the dishes that contain it (if there are at least 2 such dishes).

Return an array where each element is a list beginning with the ingredient name, followed by the names of all the dishes that contain this ingredient. The dishes inside each list should be sorted lexicographically, and the result array should be sorted lexicographically by the names of the ingredients.

For:
dishes = [["Salad", "Tomato", "Cucumber", "Salad", "Sauce"],
            ["Pizza", "Tomato", "Sausage", "Sauce", "Dough"],
            ["Quesadilla", "Chicken", "Cheese", "Sauce"],
            ["Sandwich", "Salad", "Bread", "Tomato", "Cheese"]]

the output should be:
groupingDishes(dishes) = [["Cheese", "Quesadilla", "Sandwich"],
                            ["Salad", "Salad", "Sandwich"],
                            ["Sauce", "Pizza", "Quesadilla", "Salad"],
                            ["Tomato", "Pizza", "Salad", "Sandwich"]]


For
dishes = [["Pasta", "Tomato Sauce", "Onions", "Garlic"],
          ["Chicken Curry", "Chicken", "Curry Sauce"],
          ["Fried Rice", "Rice", "Onions", "Nuts"],
          ["Salad", "Spinach", "Nuts"],
          ["Sandwich", "Cheese", "Bread"],
          ["Quesadilla", "Chicken", "Cheese"]]
the output should be
groupingDishes(dishes) = [["Cheese", "Quesadilla", "Sandwich"],
                          ["Chicken", "Chicken Curry", "Quesadilla"],
                          ["Nuts", "Fried Rice", "Salad"],
                          ["Onions", "Fried Rice", "Pasta"]]

*/


function groupingDishes(dishes) {
    let hashTable = new Map();

    let dishesLength = dishes.length;
    for(let i=0; i<dishesLength; i++) {
        let dish = dishes[i][0];
        let ingredientCount = dishes[i].length - 1;
        for(let j=1; j<=ingredientCount; j++) {
            let dishArray = [];
            if(hashTable.has(dishes[i][j])) {
                dishArray = hashTable.get(dishes[i][j]);
            }
            dishArray.push(dish);
            hashTable.set(dishes[i][j],dishArray);
        }
    }

    // console.log(hashTable);

    let outputArray = [];
    hashTable.forEach((value,key)=>{
        if(value.length>1) {
            let arrayElement = [key];
            value.sort();
            arrayElement = arrayElement.concat(value);
            outputArray.push(arrayElement);
        }
    })

    // console.log('outputArray uns:',outputArray);

    outputArray.sort((a,b)=>a[0]<b[0]?-1:1);

    // console.log('outputArray s:',outputArray);

    return outputArray;
}
