# std::experimental::search

Definido no header `[<experimental/algorithm>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/algorithm&action=edit&redlink=1> "cpp/header/experimental/algorithm \(page does not exist\)")`

```cpp
template< class ForwardIterator, class Searcher >
ForwardIterator search( ForwardIterator first, ForwardIterator last,
const Searcher& searcher );
```

Procura na sequência `[`first`, `last`)` pelo padrão especificado no construtor de searcher.

Executa efetivamente searcher(first, last). | (até C++17)
---|---
Executa efetivamente searcher(first, last).first. | (desde C++17)

`Searcher` não precisa ser [CopyConstructible](<#/doc/named_req/CopyConstructible>).

A standard library fornece os seguintes searchers:

[ default_searcher](<#/doc/experimental/default_searcher>) | implementação do algoritmo de busca da standard C++ library
(class template)
[ boyer_moore_searcher](<#/doc/experimental/boyer_moore_searcher>) | implementação do algoritmo de busca Boyer-Moore
(class template)
[ boyer_moore_horspool_searcher](<#/doc/experimental/boyer_moore_horspool_searcher>) | implementação do algoritmo de busca Boyer-Moore-Horspool
(class template)

### Parâmetros

| | Esta seção está incompleta

### Valor de retorno

Retorna o resultado de searcher.operator(), ou seja, um iterator para a localização onde a substring é encontrada ou uma cópia de last se não for encontrada.

### Complexidade

Depende do searcher.

### Exemplo

Execute este código
```cpp
    #include <experimental/algorithm>
    #include <experimental/functional>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string in = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed "
                         "do eiusmod tempor incididunt ut labore et dolore magna aliqua";
        std::string needle = "pisci";
        auto it = std::experimental::search(in.begin(), in.end(),
                      std::experimental::make_boyer_moore_searcher(
                          needle.begin(), needle.end()));
        if (it != in.end())
            std::cout << "The string " << needle << " found at offset "
                      << it - in.begin() << '\n';
        else
            std::cout << "The string " << needle << " not found\n";
    }
```

Saída:
```
    The string pisci found at offset 43
```

### Veja também

[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(function template)