# std::indirect_array

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T > class indirect_array;
```

`std::indirect_array` é um template auxiliar usado pelo [operador de subscrito de valarray](<#/doc/numeric/valarray/operator_at>) com um argumento [std::valarray](<#/doc/numeric/valarray>)<[std::size_t](<#/doc/types/size_t>)>. Ele possui semântica de referência para um subconjunto do array cujos índices são especificados pelo objeto [std::valarray](<#/doc/numeric/valarray>)<[std::size_t](<#/doc/types/size_t>)>.

### Tipos Membro

Tipo | Definição
---|---
`value_type` | `T`

### Funções Membro

[ (construtor)](<#/doc/numeric/valarray/indirect_array/indirect_array>) | constrói um `indirect_array`
(função membro pública)
[ (destrutor)](<#/doc/numeric/valarray/indirect_array/~indirect_array>) | destrói um `indirect_array`
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<#/doc/numeric/valarray/indirect_array/operator_arith>) | realiza operação aritmética no array referenciado por indirect array.
(função membro pública)

### Exemplo

Execute este código
```
    #include <iostream>
    #include <valarray>
    
    int main()
    {
        std::valarray<int> data{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    
        std::valarray<std::size_t> idx{0, 2, 4, 6, 8};
    
        std::cout << "Original valarray: ";
        for (int n : data)
            std::cout << n << ' ';
        std::cout << '\n';
    
        data[idx] += data[idx]; // double the values at indices 'idx'
    
        // the type of data[idx] is std::indirect_array<int>
    
        std::cout << "After indirect modification: ";
        for (int n : data)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    Original valarray: 0 1 2 3 4 5 6 7 8 9
    After indirect modification: 0 1 4 3 8 5 12 7 16 9
```