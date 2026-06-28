# std::default_searcher

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class ForwardIt, class BinaryPredicate = std::equal_to<> >
class default_searcher;
```

  
Uma classe adequada para uso com a sobrecarga [Searcher](<https://en.cppreference.com/mwiki/index.php?title=cpp/named_req/Searcher&action=edit&redlink=1> "cpp/named req/Searcher \(page does not exist\)") de [std::search](<#/doc/algorithm/search>) que delega a operação de busca para [std::search](<#/doc/algorithm/search>) da biblioteca padrão pré-C++17.

`std::default_searcher` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Funções membro

##  std::default_searcher::default_searcher

```cpp
default_searcher( ForwardIt pat_first,
ForwardIt pat_last,
BinaryPredicate pred = BinaryPredicate() );  // (desde C++17)
(constexpr desde C++20)
```

  
Constrói um `std::default_searcher` armazenando cópias de pat_first, pat_last e pred.

###  Parâmetros

pat_first, pat_last  |  \-  |  um par de iteradores que designam a string a ser buscada   
---|---|---
pred  |  \-  |  um objeto chamável usado para determinar igualdade   
  
###  Exceções

Quaisquer exceções lançadas pelos construtores de cópia de `BinaryPredicate` ou `ForwardIt`.

##  std::default_searcher::operator()

```cpp
template< class ForwardIt2 >
std::pair<Forwardit2, ForwardIt2>
operator()( ForwardIt2 first, ForwardIt2 last ) const;  // (desde C++17)
(constexpr desde C++20)
```

  
A função membro chamada pela sobrecarga Searcher de [std::search](<#/doc/algorithm/search>) para realizar uma busca com este searcher.

Retorna um par de iteradores `i, j`, onde `i` é [std::search](<#/doc/algorithm/search>)(first, last, pat_first, pat_last, pred) e `j` é [std::next](<#/doc/iterator/next>)(i, [std::distance](<#/doc/iterator/distance>)(pat_first, pat_last)) a menos que `std::search` tenha retornado last (nenhuma correspondência), caso em que `j` também é igual a last.

###  Parâmetros

first, last  |  \-  |  um par de iteradores que designam a string a ser examinada   
  
###  Valor de retorno

Um par de iteradores para as posições inicial e uma após a final em `[`first`, `last`)` onde uma subsequência que se compara como igual a `[`pat_first`, `pat_last`)` conforme definido por pred está localizada, ou um par de cópias de last caso contrário.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view in =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed "
            "do eiusmod tempor incididunt ut labore et dolore magna aliqua";
    
        const std::string_view needle{"pisci"};
    
        auto it = std::search(in.begin(), in.end(),
                      std::default_searcher(
                          needle.begin(), needle.end()));
        if (it != in.end())
            std::cout << "The string " << std::quoted(needle) << " found at offset "
                      << it - in.begin() << '\n';
        else
            std::cout << "The string " << std::quoted(needle) << " not found\n";
    }
```

Saída:
```
    The string "pisci" found at offset 43
```

### Veja também

[ search](<#/doc/algorithm/search>) |  busca pela primeira ocorrência de um range de elementos   
(modelo de função)  
[ boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)(C++17) |  implementação do algoritmo de busca Boyer-Moore   
(modelo de classe)  
[ boyer_moore_horspool_searcher](<#/doc/utility/functional/boyer_moore_horspool_searcher>)(C++17) |  implementação do algoritmo de busca Boyer-Moore-Horspool   
(modelo de classe)