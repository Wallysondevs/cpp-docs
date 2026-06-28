# std::make_reverse_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
std::reverse_iterator<Iter> make_reverse_iterator( Iter i );
(constexpr desde C++17)
```

`make_reverse_iterator` é um template de função de conveniência que constrói um [std::reverse_iterator](<#/doc/iterator/reverse_iterator>) para o iterador `i` fornecido (que deve ser um [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>)) com o tipo deduzido a partir do tipo do argumento.

### Parâmetros

i | \- | iterador a ser convertido para reverse iterator

### Valor de retorno

[std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;Iter&gt;(i)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_make_reverse_iterator`](<#/doc/feature_test>) | [`201402L`](<#/>) | (C++14) | `std::make_reverse_iterator`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 3, 10, 8, 22};
    
        std::sort(v.begin(), v.end());
        std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, ", "));
        std::cout << '\n';
    
        std::copy(std::make_reverse_iterator(v.end()),
                  std::make_reverse_iterator(v.begin()),
                  std::ostream_iterator<int>(std::cout, ", "));
        std::cout << '\n';
    }
```

Saída:
```
    1, 3, 8, 10, 22,
    22, 10, 8, 3, 1,
```

### Veja também

[ reverse_iterator](<#/doc/iterator/reverse_iterator>) | adaptador de iterador para travessia em ordem inversa
(template de classe)
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) | retorna um reverse iterator para o início de um container ou array
(template de função)
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array
(template de função)