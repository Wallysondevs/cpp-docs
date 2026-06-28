# std::end(std::initializer_list)

Definido no cabeçalho `[<initializer_list>](<#/doc/header/initializer_list>)`

```c
template< class E >
const E* end( std::initializer_list<E> il ) noexcept;
(constexpr desde C++14)
```

A sobrecarga de [std::end](<#/doc/iterator/end>) para `initializer_list` retorna um ponteiro para um elemento após o último elemento de il.

### Parâmetros

- **il** — um `initializer_list`

### Valor de retorno

il.end()

### Exemplo

Execute este código
```
    #include <cassert>
    #include <initializer_list>
    #include <iterator>
    #include <numeric>
    
    int main()
    {
        std::initializer_list e = {2, 7, 1, 8, 2, 8, 1};
        assert(std::accumulate(std::begin(e), std::end(e), 13) == 42);
    }
```

### Veja também

[ end](<#/doc/utility/initializer_list/end>) | retorna um ponteiro para um elemento após o último elemento
(função membro pública)