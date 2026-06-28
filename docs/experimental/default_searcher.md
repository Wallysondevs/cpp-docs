# std::experimental::default_searcher, std::experimental::make_default_searcher

Defined in header `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```c
template< class ForwardIterator1, class BinaryPredicate = std::equal_to<> >
class default_searcher;
```

  
Uma classe adequada para uso com [`std::experimental::search`](<#/doc/experimental/search>) que delega a operação de busca para `std::search` da biblioteca padrão.

`default_searcher` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Funções membro

##  std::experimental::default_searcher::default_searcher

default_searcher( ForwardIterator pat_first,  
ForwardIterator pat_last,  
BinaryPredicate pred = BinaryPredicate() );

  
Constrói um `default_searcher` armazenando cópias de pat_first, pat_last e pred.

### Parâmetros

pat_first, pat_last  |  \-  |  um par de iterators que designam a string a ser buscada   
---|---|---
pred  |  \-  |  um objeto chamável usado para determinar igualdade   
  
### Exceções

Quaisquer exceções lançadas pelos construtores de cópia de `BinaryPredicate` ou `ForwardIterator`.

##  std::experimental::default_searcher::operator()

```cpp
template< class ForwardIterator2 >
ForwardIterator2 operator()( ForwardIterator2 first, ForwardIterator2 last ) const;  // (até C++17)
template< class ForwardIterator2 >
std::pair<ForwardIterator2, ForwardIterator2>
operator()( ForwardIterator2 first, ForwardIterator2 last ) const;  // (desde C++17)
```

  
A função membro chamada por [`std::experimental::search`](<#/doc/experimental/search>) para realizar uma busca com este searcher.

Equivalente a [std::search](<#/doc/algorithm/search>)(first, last, pat_first, pat_last, pred);.  | (até C++17)  
---|---
Retorna um par de iterators `i, j`, onde `i` é [std::search](<#/doc/algorithm/search>)(first, last, pat_first, pat_last, pred) e `j` é [std::next](<#/doc/iterator/next>)(i, [std::distance](<#/doc/iterator/distance>)(pat_first, pat_last)) a menos que `std::search` tenha retornado last (nenhuma correspondência), caso em que `j` também é igual a last.  | (até C++17)  
  
### Parâmetros

first, last  |  \-  |  um par de iterators que designam a string a ser examinada   
  
### Valor de retorno

Iterator para a primeira posição em `[`first`, `last`)` onde uma subsequência que se compara igual a `[`pat_first`, `pat_last`)` conforme definido por pred está localizada, ou uma cópia de last caso contrário.  | (até C++17)  
---|---
Um par de iterators para a primeira e uma posição após a última em `[`first`, `last`)` onde uma subsequência que se compara igual a `[`pat_first`, `pat_last`)` conforme definido por pred está localizada, ou um par de cópias de last caso contrário.  | (desde C++17)  
  
### Funções Auxiliares

template< class ForwardIterator, class BinaryPredicate = [std::equal_to](<#/doc/utility/functional/equal_to>)<> >  
default_searcher<ForwardIterator, BinaryPredicate> make_default_searcher(  
ForwardIterator pat_first,  
ForwardIterator pat_last,  
BinaryPredicate pred = BinaryPredicate()); |  |  (library fundamentals TS)  

  
Função auxiliar que constrói um `std::experimental::default_searcher` usando dedução de argumento de template. Equivalente a return default_searcher<ForwardIterator, BinaryPredicate>(pat_first, pat_last, pred);

### Parâmetros

pat_first, pat_last  |  \-  |  um par de iterators que designam a string a ser buscada   
---|---|---
pred  |  \-  |  um objeto chamável usado para determinar igualdade   
  
### Valor de retorno

Um `default_searcher` construído com os argumentos pat_first, pat_last, pred.

### Exemplo

Execute este código
```cpp
    #include <experimental/algorithm>
    #include <experimental/functional>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string in = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                         " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
        std::string needle = "pisci";
        auto it = std::experimental::search(in.begin(), in.end(),
                      std::experimental::make_default_searcher(
                          needle.begin(), needle.end()));
        if (it != in.end())
            std::cout << "The string " << needle << " found at offset "
                      << it - in.begin() << '\n';
        else
            std::cout << "The string " << needle << " not found\n";
    }
```

Output: 
```
    The string pisci found at offset 43
```

### Veja também

[ search](<#/doc/algorithm/search>) |  busca a primeira ocorrência de um range de elementos   
(modelo de função)  