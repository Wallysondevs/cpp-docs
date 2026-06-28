# std::slice

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
class slice;
```

`std::slice` é a classe seletora que identifica um subconjunto de [std::valarray](<#/doc/numeric/valarray>) similar a um slice [BLAS](<https://en.wikipedia.org/wiki/BLAS> "enwiki:BLAS"). Um objeto do tipo `std::slice` armazena três valores: o índice inicial, o passo (stride), e o número total de valores no subconjunto. Objetos do tipo `std::slice` podem ser usados como índices com o operator[] de valarray.

### Funções membro

**(construtor)** | constrói um slice
(função membro pública)
** startsizestride** | retorna os parâmetros do slice
(função membro pública)

## std::slice::slice

```cpp
slice()  // (1)
slice( std::size_t start, std::size_t size, std::size_t stride );  // (2)
slice( const slice& other );  // (3)
```

Constrói um novo slice.

1) Construtor padrão. Equivalente a slice(0, 0, 0). Este construtor existe apenas para permitir a construção de arrays de slices.

2) Constrói um novo slice com os parâmetros start, size, stride. Este slice fará referência a `size` número de elementos, cada um com a posição:

start + 0 * stride

start + 1 * stride

...

start + (size - 1) * stride

3) Constrói uma cópia de other.

### Parâmetros

- **start** — a posição do primeiro elemento
- **size** — o número de elementos no slice
- **stride** — o número de posições entre elementos sucessivos no slice
- **other** — outro slice para copiar

## std::slice::start, size, stride

[std::size_t](<#/doc/types/size_t>) start() const; | (1) |
---|---|---
[std::size_t](<#/doc/types/size_t>) size() const; | (2) |
[std::size_t](<#/doc/types/size_t>) stride() const; | (3) |

Retorna os parâmetros passados para o slice na construção - start, size e stride, respectivamente.

### Parâmetros

(nenhum)

### Valor de retorno

Os parâmetros do slice -- start, size e stride, respectivamente.

### Complexidade

Constante.

### Funções não-membro

** operator==(std::slice)**(C++20) | verifica se dois slices são iguais
(função)

## operator==(std::slice)

```cpp
friend bool operator==( const slice& lhs, const slice& rhs );  // (desde C++20)
```

Verifica se os parâmetros de lhs e rhs - start, size e stride - são iguais, respectivamente.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::slice` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

- **lhs, rhs** — slices para comparar

### Valor de retorno

lhs.start() == rhs.start() && lhs.size() == rhs.size() && lhs.stride() == rhs.stride()

### Exemplo

Classe `Matrix` mínima baseada em valarray com uma função de cálculo de [traço](<https://en.wikipedia.org/wiki/Trace_\(linear_algebra\)> "enwiki:Trace \(linear algebra\)") (trace).

Execute este código
```
    #include <iostream>
    #include <valarray>
     
    class Matrix
    {
        std::valarray<int> data;
        int dim;
    public:
        Matrix(int r, int c) : data(r*c), dim(c) {}
        int& operator()(int r, int c) { return data[r * dim + c]; }
        int trace() const { return data[std::slice(0, dim, dim + 1)].sum(); }
    };
     
    int main()
    {
        Matrix m(3, 3);
        int n = 0;
        for (int r = 0; r < 3; ++r)
           for (int c = 0; c < 3; ++c)
               m(r, c) = ++n;
        std::cout << "Trace of the matrix (1,2,3) (4,5,6) (7,8,9) is " << m.trace() << '\n';
    }
```

Saída:
```
    Trace of the matrix (1,2,3) (4,5,6) (7,8,9) is 15
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 543](<https://cplusplus.github.io/LWG/issue543>) | C++98 | não estava claro se um slice construído por padrão é utilizável | é utilizável (como um subconjunto vazio)

### Veja também

[ operator[]](<#/doc/numeric/valarray/operator_at>) | obtém/define elemento de valarray, slice ou máscara
(função membro pública)
[ gslice](<#/doc/numeric/valarray/gslice>) | slice generalizado de um valarray: índice inicial, conjunto de comprimentos, conjunto de passos (strides)
(class)
[ slice_array](<#/doc/numeric/valarray/slice_array>) | proxy para um subconjunto de um valarray após aplicar um slice
(class template)
[ mdspan](<#/doc/container/mdspan>)(C++23) | uma view de array multidimensional sem posse
(class template)