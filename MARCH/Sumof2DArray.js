let arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

function sumOf2DArray(N, M, arr){
    let sumMatrix = [];

    for(let i = 0; i<N; i++){
      let row = [];
      for(let j =0; j<M; j++){
        row.push(i+j);
      }
      sumMatrix.push(row);
    }

    console.log(sumMatrix)
}

sumOf2DArray(3, 3, arr)