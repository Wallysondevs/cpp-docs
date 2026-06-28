# std::gslice

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
class gslice;
```

`std::gslice` é a classe seletora que identifica um subconjunto de índices de [std::valarray](<#/doc/numeric/valarray>) definidos por um conjunto multinível de strides e sizes. Objetos do tipo `std::gslice` podem ser usados como índices com o operator[] de valarray para selecionar, por exemplo, colunas de um array multidimensional representado como um `valarray`.

Dado o valor inicial s, uma lista de strides ij e uma lista de sizes dj, um `std::gslice` construído a partir desses valores seleciona o conjunto de índices kj=s+Σj(ijdj).

Por exemplo, um gslice com índice inicial `3`, strides `{19,4,1}` e lengths `{2,4,3}` gera o seguinte conjunto de `24=2*4*3` índices:

3 + 0*19 + 0*4 + 0*1 = 3,
3 + 0*19 + 0*4 + 1*1 = 4,
3 + 0*19 + 0*4 + 2*1 = 5,
3 + 0*19 + 1*4 + 0*1 = 7,
3 + 0*19 + 1*4 + 1*1 = 8,
3 + 0*19 + 1*4 + 2*1 = 9,
3 + 0*19 + 2*4 + 0*1 = 11,
...
3 + 1*19 + 3*4 + 1*1 = 35,
3 + 1*19 + 3*4 + 2*1 = 36

É possível construir objetos `std::gslice` que selecionam alguns índices mais de uma vez: se o exemplo acima usasse os strides `{1,1,1}`, os índices teriam sido `{3, 4, 5, 4, 5, 6, ...}`. Tais gslices só podem ser usados como argumentos para a versão const de [`std::valarray::operator[]`](<#/doc/numeric/valarray/operator_at>), caso contrário, o comportamento é indefinido.

### Funções membro

**(construtor)** | constrói um slice genérico
(função membro pública)
** startsizestride** | retorna os parâmetros do slice
(função membro pública)

## std::gslice::gslice

```cpp
gslice()  // (1)
gslice( std::size_t start, const std::valarray<std::size_t>& sizes,
const std::valarray<std::size_t>& strides );  // (2)
gslice( const gslice& other );  // (3)
```

Constrói um novo slice genérico.

1) Construtor padrão. Equivalente a gslice(0, [std::valarray](<#/doc/numeric/valarray>)<[std::size_t](<#/doc/types/size_t>)>(), [std::valarray](<#/doc/numeric/valarray>)<[std::size_t](<#/doc/types/size_t>)>()). Este construtor existe apenas para permitir a construção de arrays de slices.

2) Constrói um novo slice com os parâmetros start, sizes, strides.

3) Constrói uma cópia de other.

### Parâmetros

- **start** — a posição do primeiro elemento
- **sizes** — um array que define o número de elementos em cada dimensão
- **strides** — um array que define o número de posições entre elementos sucessivos em cada dimensão
- **other** — outro slice para copiar

## std::slice::start, size, stride

[std::size_t](<#/doc/types/size_t>) start() const; | (1) |
---|---|---
[std::valarray](<#/doc/numeric/valarray>)<[std::size_t](<#/doc/types/size_t>)> size() const; | (2) |
[std::valarray](<#/doc/numeric/valarray>)<[std::size_t](<#/doc/types/size_t>)> stride() const; | (3) |

Retorna os parâmetros passados para o slice na construção - start, sizes e strides, respectivamente.

### Parâmetros

(nenhum)

### Valor de retorno

Os parâmetros do slice -- start, sizes e strides, respectivamente.

### Complexidade

Constante.

### Exemplo

Demonstra o uso de gslices para endereçar colunas de um array 3D:

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
    
    void test_print(std::valarray<int>& v, int planes, int rows, int cols)
    {
        for (int r = 0; r < rows; ++r)
        {
            for (int z = 0; z < planes; ++z)
            {
                for (int c = 0; c < cols; ++c)
                    std::cout << v[z * rows * cols + r * cols + c] << ' ';
                std::cout << "  ";
            }
            std::cout << '\n';
        }
    }
    
    int main()
    {
        std::valarray<int> v = // 3d array: 2 x 4 x 3 elements
            {111,112,113 , 121,122,123 , 131,132,133 , 141,142,143,
             211,212,213 , 221,222,223 , 231,232,233 , 241,242,243};
        // int ar3d[2][4][3]
        std::cout << "Initial 2x4x3 array:\n";
        test_print(v, 2, 4, 3);
    
        // update every value in the first columns of both planes
        v[std::gslice(0, {2, 4}, {4 * 3, 3})] = 1; // two level one strides of 12 elements
                                                   // then four level two strides of 3 elements
    
        // subtract the third column from the second column in the 1st plane
        v[std::gslice(1, {1, 4}, {4 * 3, 3})] -= v[std::gslice(2, {1, 4}, {4 * 3, 3})];
    
        std::cout << "\n" "After column operations:\n";
        test_print(v, 2, 4, 3);
    }
```

Saída:
```
    Initial 2x4x3 array:
    111 112 113   211 212 213
    121 122 123   221 222 223
    131 132 133   231 232 233
    141 142 143   241 242 243
    
    After column operations:
    1 -1 113   1 212 213
    1 -1 123   1 222 223
    1 -1 133   1 232 233
    1 -1 143   1 242 243
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 543](<https://cplusplus.github.io/LWG/issue543>) | C++98 | não estava claro se um slice genérico construído por padrão é utilizável | é utilizável (como um subconjunto vazio)

### Veja também

[ operator[]](<#/doc/numeric/valarray/operator_at>) | obtém/define elemento de valarray, slice ou máscara
(função membro pública)
[ slice](<#/doc/numeric/valarray/slice>) | slice tipo BLAS de um valarray: índice inicial, comprimento, stride
(classe)
[ gslice_array](<#/doc/numeric/valarray/gslice_array>) | proxy para um subconjunto de um valarray após aplicar um gslice
(modelo de classe)