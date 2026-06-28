# std::experimental::boyer_moore_searcher, std::experimental::make_boyer_moore_searcher

Definido no cabeçalho `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```c
template< class RandomIt1,
class Hash = std::hash<typename std::iterator_traits<RandomIt1>::value_type>,
class BinaryPredicate = std::equal_to<> >
class boyer_moore_searcher;
```

Um searcher adequado para uso com [`std::experimental::search`](<#/doc/experimental/search>) que implementa o [algoritmo de busca de strings Boyer-Moore](<https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm>).

`boyer_moore_searcher` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

`RandomIt1` deve atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).

### Funções membro

## std::experimental::boyer_moore_searcher::boyer_moore_searcher

boyer_moore_searcher( RandomIt1 pat_first,
RandomIt1 pat_last,
Hash hf = Hash(),
BinaryPredicate pred = BinaryPredicate() );

Constrói um `boyer_moore_searcher` armazenando cópias de pat_first, pat_last, hf e pred, configurando quaisquer estruturas de dados internas necessárias.

O tipo de valor de `RandomIt1` deve ser [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

Para quaisquer dois valores `A` e `B` do tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt1&gt;::value_type, se pred(A, B) == true, então hf(A) == hf(B) deve ser true.

### Parâmetros

- **pat_first, pat_last** — um par de iteradores que designam a string a ser buscada
- **hf** — um objeto chamável usado para fazer hash dos elementos da string
- **pred** — um objeto chamável usado para determinar a igualdade

### Exceções

Quaisquer exceções lançadas por

*   o construtor de cópia de `RandomIt1`;
*   o construtor padrão, construtor de cópia e operador de atribuição de cópia do tipo de valor de `RandomIt1`; ou
*   o construtor de cópia e o operador de chamada de função de `BinaryPredicate` ou `Hash`.

Também pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária para as estruturas de dados internas não puder ser alocada.

## std::experimental::boyer_moore_searcher::operator()

```cpp
template< class RandomIt2 >
RandomIt2 operator()( RandomIt2 first, RandomIt2 last ) const;  // (até C++17)
template< class RandomIt2 >
std::pair<RandomIt2,RandomIt2> operator()( RandomIt2 first, RandomIt2 last ) const;  // (desde C++17)
```

A função membro chamada por [`std::experimental::search`](<#/doc/experimental/search>) para realizar uma busca com este searcher. `RandomIt2` deve atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).

`RandomIt1` e `RandomIt2` devem ter o mesmo tipo de valor.

### Parâmetros

- **first, last** — um par de iteradores que designam a string a ser examinada

### Valor de retorno

Se o padrão `[`pat_first`, `pat_last`)` estiver vazio, retorna first. Caso contrário, um iterador para a primeira posição em `[`first`, `last`)` onde uma subsequência que se compara igual a `[`pat_first`, `pat_last`)` conforme definido por pred está localizada, ou uma cópia de last caso contrário. | (até C++17)
---|---
Se o padrão `[`pat_first`, `pat_last`)` estiver vazio, retorna `make_pair(first, first)`. Caso contrário, retorna um par de iteradores para a primeira e uma posição após a última em `[`first`, `last`)` onde uma subsequência que se compara igual a `[`pat_first`, `pat_last`)` conforme definido por pred está localizada, ou `make_pair(last, last)` caso contrário. | (desde C++17)

### Funções Auxiliares

template< class RandomIt,
class Hash = [std::hash](<#/doc/utility/hash>)<typename [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;RandomIt&gt;::value_type>,
class BinaryPredicate = [std::equal_to](<#/doc/utility/functional/equal_to>)<> >
boyer_moore_searcher<RandomIt, Hash, BinaryPredicate> make_boyer_moore_searcher(
RandomIt pat_first,
RandomIt pat_last,
Hash hf = Hash(),
BinaryPredicate pred = BinaryPredicate()); | | (TS de fundamentos da biblioteca)

Função auxiliar que constrói um `std::experimental::boyer_moore_searcher` usando dedução de argumento de template. Equivalente a return boyer_moore_searcher<RandomIt, Hash, BinaryPredicate>(pat_first, pat_last, hf, pred);

### Parâmetros

- **pat_first, pat_last** — um par de iteradores que designam a string a ser buscada
- **hf** — um objeto chamável usado para fazer hash dos elementos da string
- **pred** — um objeto chamável usado para determinar a igualdade

### Valor de retorno

Um `boyer_moore_searcher` construído com os argumentos pat_first, pat_last, hf e pred.

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

[ search](<#/doc/algorithm/search>) | busca pela primeira ocorrência de um range de elementos
(template de função)