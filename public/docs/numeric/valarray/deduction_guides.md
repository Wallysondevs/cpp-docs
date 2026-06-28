# guias de dedução para std::valarray

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< typename T, std::size_t cnt >
valarray( const T(&)[cnt], std::size_t ) -> valarray<T>;
```

Este [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::valarray](<#/doc/numeric/valarray>) para permitir a dedução a partir de um array e um tamanho (note que a dedução a partir de um ponteiro e um tamanho é coberta pelos guias implícitos).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        int a[] = {1, 2, 3, 4};
        std::valarray va(a, 3); // uses explicit deduction guide
        for (int x : va)
            std::cout << x << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1 2 3
```