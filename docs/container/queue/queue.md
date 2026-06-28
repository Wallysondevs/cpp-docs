# std::queue&lt;T,Container&gt;::queue

```cpp
queue() : queue(Container()) {}  // (1) (desde C++11)
  // (2)
explicit queue( const Container& cont = Container() );  // (até C++11)
explicit queue( const Container& cont );  // (desde C++11)
explicit queue( Container&& cont );  // (3) (desde C++11)
queue( const queue& other ); |  (4)  |  (implicitamente declarado)
queue( queue&& other );  // (5) (desde C++11)
(implicitamente declarado)
template< class InputIt >
queue( InputIt first, InputIt last );  // (6) (desde C++23)
template< class Alloc >
explicit queue( const Alloc& alloc );  // (7) (desde C++11)
template< class Alloc >
queue( const Container& cont, const Alloc& alloc );  // (8) (desde C++11)
template< class Alloc >
queue( Container&& cont, const Alloc& alloc );  // (9) (desde C++11)
template< class Alloc >
queue( const queue& other, const Alloc& alloc );  // (10) (desde C++11)
template< class Alloc >
queue( queue&& other, const Alloc& alloc );  // (11) (desde C++11)
template< class InputIt, class Alloc >
queue( InputIt first, InputIt last, const Alloc& alloc );  // (12) (desde C++23)
template< container-compatible-range<T> R>
queue( std::from_range_t, R&& rg );  // (13) (desde C++23)
template< container-compatible-range<T> R, class Alloc >
queue( std::from_range_t, R&& rg, const Alloc& alloc );  // (14) (desde C++23)
```

  
Constrói um novo container subjacente do adaptador de container a partir de uma variedade de fontes de dados.

1) Construtor padrão. Inicializa o container com valor.

2) Constrói por cópia o container subjacente c com o conteúdo de cont. Este também é o construtor padrão. (até C++11)

3) Constrói por movimento o container subjacente c com std::move(cont).

4) [Construtor de cópia](<#/doc/language/copy_constructor>). O adaptador é construído por cópia com o conteúdo de other.c.

5) [Construtor de movimento](<#/doc/language/move_constructor>). O adaptador é construído com std::move(other.c).

6) Constrói o container subjacente c com o conteúdo do range `[`first`, `last`)`. Esta sobrecarga participa da resolução de sobrecarga somente se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>).

7-12) Estes construtores participam da resolução de sobrecarga somente se [std::uses_allocator](<#/doc/memory/uses_allocator>)<Container, Alloc>::value for verdadeiro, ou seja, se o container subjacente for um container ciente de alocador (verdadeiro para todos os containers da standard library que podem ser usados com `queue`).

7) Constrói o container subjacente usando alloc como alocador, como se por c(alloc).

8) Constrói o container subjacente com o conteúdo de cont e usando alloc como alocador, como se por c(cont, alloc).

9) Constrói o container subjacente com o conteúdo de cont usando move semantics enquanto utiliza alloc como alocador, como se por c(std::move(cont), alloc).

10) Constrói o adaptador com o conteúdo de other.c e usando alloc como alocador, como se por c(other.c, alloc).

11) Constrói o adaptador com o conteúdo de other usando move semantics enquanto utiliza alloc como alocador, como se por c(std::move(other.c), alloc).

12) Constrói o container subjacente com o conteúdo do range `[`first`, `last`)` usando alloc como alocador, como se por c(first, last, alloc). Esta sobrecarga participa da resolução de sobrecarga somente se `InputIt` satisfaz [LegacyInputIterator](<#/doc/named_req/InputIterator>).

13) Constrói o container subjacente com [ranges::to](<#/doc/ranges/to>)&lt;Container&gt;([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg)).

14) Constrói o container subjacente com [ranges::to](<#/doc/ranges/to>)&lt;Container&gt;([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg), alloc).

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória do container subjacente   
---|---|---
other  |  \-  |  outro adaptador de container a ser usado como fonte para inicializar o container subjacente   
cont  |  \-  |  container a ser usado como fonte para inicializar o container subjacente   
first, last  |  \-  |  range de elementos `[`first`, `last`)` para inicializar   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`Alloc` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
-`Container` deve satisfazer os requisitos de [Container](<#/doc/named_req/Container>). Os construtores que recebem um parâmetro alocador participam da resolução de sobrecarga somente se `Container` satisfaz os requisitos de [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>).   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Complexidade

Mesma que a operação correspondente no container encapsulado.

### Notas

Macro de teste de recurso  | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_adaptor_iterator_pair_constructor`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | Construtores de par de iteradores para [std::queue](<#/doc/container/queue>) e [std::stack](<#/doc/container/stack>); sobrecargas ([6](<#/doc/container/queue/queue>)) e ([12](<#/doc/container/queue/queue>))  
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de ranges; sobrecargas ([13](<#/doc/container/queue/queue>)) e ([14](<#/doc/container/queue/queue>))  
  
### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <deque>
    #include <iostream>
    #include <memory>
    #include <ranges>
    #include <queue>
     
    int main()
    {
        std::queue<int> c1;
        c1.push(5);
        assert(c1.size() == 1);
     
        std::queue<int> c2(c1);
        assert(c2.size() == 1);
     
        std::deque<int> deq{3, 1, 4, 1, 5};
        std::queue<int> c3(deq); // overload (2)
        assert(c3.size() == 5);
     
    # ifdef __cpp_lib_adaptor_iterator_pair_constructor
        const auto il = {2, 7, 1, 8, 2};
        std::queue<int> c4{il.begin(), il.end()}; // C++23, (6)
        assert(c4.size() == 5);
    # endif
     
    # if __cpp_lib_containers_ranges >= 202202L
        // C++23, overload (13)
        auto c5 = std::queue(std::from_range_t, std::ranges::iota(0, 42));
        assert(c5.size() == 42);
     
        // o mesmo efeito com sintaxe pipe, usa internamente a sobrecarga (13)
        auto c6 = std::ranges::iota(0, 42) | std::ranges::to<std::queue>();
        assert(c6.size() == 42);
     
        std::allocator<int> alloc;
     
        // C++23, overload (14)
        auto c7 = std::queue(std::from_range_t, std::ranges::iota(0, 42), alloc);
        assert(c7.size() == 42);
     
        // o mesmo efeito com sintaxe pipe, usa internamente a sobrecarga (14)
        auto c8 = std::ranges::iota(0, 42) | std::ranges::to<std::queue>(alloc);
        assert(c8.size() == 42);
    # endif
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornou-se implícito   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao adaptador de container   
(função membro pública)  