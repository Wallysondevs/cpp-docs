# std::gslice_array

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
class gslice_array;
```

`std::gslice_array` é um template auxiliar usado pelo [operador de subscrito de valarray](<#/doc/numeric/valarray/operator_at>) com um argumento [std::gslice](<#/doc/numeric/valarray/gslice>). Ele possui semântica de referência para um subconjunto do array especificado pelo objeto [std::gslice](<#/doc/numeric/valarray/gslice>).

### Tipos Membro

Tipo | Definição
---|---
`value_type` | `T`

### Funções Membro

[ (construtor)](<#/doc/numeric/valarray/gslice_array/gslice_array>) | constrói um `gslice_array`
(função membro pública)
[ (destrutor)](<#/doc/numeric/valarray/gslice_array/~gslice_array>) | destrói um `gslice_array`
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/gslice_array/operator_arith>) | realiza operação aritmética no array referenciado pelo slice genérico.
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <numeric>
    #include <valarray>
    
    int main()
    {
        std::valarray<int> data(32);
        std::iota(std::begin(data), std::end(data), 0);
    
        const std::size_t offset = 1, z = 2, y = 3, x = 4;
        const std::valarray<std::size_t> sizes{z, y, x};
        const std::valarray<std::size_t> strides{15, 5, 1};
        const std::gslice gslice = std::gslice(offset, sizes, strides);
        // Os índices são gerados de acordo com a fórmula:
        // index[k] = offset + [0,1,2)*15 + [0,1,2,3)*5 + [0,1,2,3,4)*1
        //          = offset + inner_product(sizes[k], strides);
        // onde sizes[k] = {[0,z), [0,y), [0,x)}, enquanto o índice mais à direita (x)
        // executa mais rápido. Como resultado, temos o seguinte conjunto de índices:
        //  index[0]  = 1 + 0*15 + 0*5 + 0*1 = 1
        //  index[1]  = 1 + 0*15 + 0*5 + 1*1 = 2
        //  index[2]  = 1 + 0*15 + 0*5 + 2*1 = 3
        //  index[3]  = 1 + 0*15 + 0*5 + 3*1 = 4
        //  index[4]  = 1 + 0*15 + 1*5 + 0*1 = 6
        //  index[5]  = 1 + 0*15 + 1*5 + 1*1 = 7
        //  index[6]  = 1 + 0*15 + 1*5 + 2*1 = 8
        //  index[7]  = 1 + 0*15 + 1*5 + 3*1 = 9
        //  ...
        //  index[22] = 1 + 1*15 + 2*5 + 2*1 = 28
        //  index[23] = 1 + 1*15 + 2*5 + 3*1 = 29
    
        const std::valarray<int> indices = data[gslice];
        for (unsigned i = 0; i != indices.size(); ++i)
            std::cout << std::setfill('0') << std::setw(2) << indices[i] << ' ';
        std::cout << "\nTotal indices: " << indices.size() << '\n';
        assert(indices.size() == x * y * z);
    
        data = 0;
        std::gslice_array<int> gslice_array = data[gslice];
        gslice_array = 1;
        // Células que correspondem aos índices gerados = '1', células ignoradas = '0'.
        for (auto i : data)
            std::cout << i << ' ';
        std::cout << "\nSum of ones = " << data.sum() << '\n';
    }
```

Saída:
```
    01 02 03 04 06 07 08 09 11 12 13 14 16 17 18 19 21 22 23 24 26 27 28 29 
    Total indices: 24
    0 1 1 1 1 0 1 1 1 1 0 1 1 1 1 0 1 1 1 1 0 1 1 1 1 0 1 1 1 1 0 0 
    Sum of ones = 24
```

### Veja também

[ slice_array](<#/doc/numeric/valarray/slice_array>) | proxy para um subconjunto de um valarray após aplicar um slice
(modelo de classe)
[ mdspan](<#/doc/container/mdspan>)(C++23) | uma view de array multidimensional não proprietária
(modelo de classe)