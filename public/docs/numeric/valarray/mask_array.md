# std::mask_array

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T > class mask_array;
```

`std::mask_array` é um template auxiliar usado pelo [operador de subscrito de valarray](<#/doc/numeric/valarray/operator_at>) com um argumento [std::valarray](<#/doc/numeric/valarray>)&lt;bool&gt;. Ele possui semântica de referência e fornece acesso ao subconjunto do valarray consistindo dos elementos cujos índices correspondem a valores verdadeiros na máscara [std::valarray](<#/doc/numeric/valarray>)&lt;bool&gt;.

### Tipos de membros

Tipo | Definição
---|---
`value_type` | `T`

### Funções de membros

[ (construtor)](<#/doc/numeric/valarray/mask_array/mask_array>) | constrói um `mask_array`
(função de membro pública)
[ (destrutor)](<#/doc/numeric/valarray/mask_array/~mask_array>) | destrói um `mask_array`
(função de membro pública)
[ operator=](<#/>) | atribui conteúdo
(função de membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/mask_array/operator_arith>) | realiza operação aritmética no array referenciado pela máscara.
(função de membro pública)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
     
    void println(auto rem, const auto& data)
    {
        for (std::cout << rem; int n : data)
            std::cout << n << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::valarray<int> data{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
     
        println("Initial valarray: ", data);
     
        data[data > 5] = -1;
        // the type of data>5 is std::valarray<bool>
        // the type of data[data>5] is std::mask_array<int>
     
        println("After v[v>5]=-1:  ", data);
    }
```

Saída:
```
    Initial valarray: 0 1 2 3 4 5 6 7 8 9
    After v[v>5]=-1:  0 1 2 3 4 5 -1 -1 -1 -1
```

### Veja também

[ simd_mask](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd_mask&action=edit&redlink=1> "cpp/numeric/simd/basic simd mask \(page does not exist\)") (C++26) | template de alias de conveniência para `basic_simd_mask` que pode especificar sua largura
(template de alias)
[ simd_mask](<#/doc/experimental/simd/simd_mask>) (parallelism TS v2) | tipo paralelo a dados com o tipo de elemento bool
(template de classe)