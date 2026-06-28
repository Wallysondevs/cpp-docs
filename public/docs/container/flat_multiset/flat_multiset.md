# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::flat_multiset

```cpp
flat_multiset()
: flat_multiset(key_compare()) { }  // (1) (desde C++23)
template< class Allocator >
flat_multiset( const flat_multiset& other, const Allocator& alloc );  // (2) (desde C++23)
template< class Allocator >
flat_multiset( flat_multiset&& other, const Allocator& alloc );  // (3) (desde C++23)
explicit flat_multiset( container_type cont,
const key_compare& comp = key_compare() );  // (4) (desde C++23)
template< class Allocator >
flat_multiset( const container_type& cont, const Allocator& alloc );  // (5) (desde C++23)
template< class Allocator >
flat_multiset( const container_type& cont, const key_compare& comp,
const Allocator& alloc );  // (6) (desde C++23)
flat_multiset( std::sorted_equivalent_t s, container_type cont,
const key_compare& comp = key_compare() )
: c(std::move(cont)), compare(comp) { }  // (7) (desde C++23)
template< class Allocator >
flat_multiset( std::sorted_equivalent_t s, const container_type& cont,
const Allocator& alloc );  // (8) (desde C++23)
template< class Allocator >
flat_multiset( std::sorted_equivalent_t s, const container_type& cont,
const key_compare& comp, const Allocator& alloc );  // (9) (desde C++23)
explicit flat_multiset( const key_compare& comp )
: c(), compare(comp) { }  // (10) (desde C++23)
template< class Allocator >
flat_multiset( const key_compare& comp, const Allocator& alloc );  // (11) (desde C++23)
template< class Allocator >
explicit flat_multiset( const Allocator& alloc );  // (12) (desde C++23)
template< class InputIter >
flat_multiset( InputIter first, InputIter last,
const key_compare& comp = key_compare() )
: c(), compare(comp);  // (13) (desde C++23)
template< class InputIter, class Allocator >
flat_multiset( InputIter first, InputIter last,
const key_compare& comp, const Allocator& alloc );  // (14) (desde C++23)
template< class InputIter, class Allocator >
flat_multiset( InputIter first, InputIter last, const Allocator& alloc );  // (15) (desde C++23)
template< container-compatible-range<value_type> R >
flat_multiset( std::from_range_t, R&& rg, const key_compare& comp )
: flat_multiset(comp);  // (16) (desde C++23)
template< container-compatible-range<value_type> R >
flat_multiset( std::from_range_t fr, R&& rg )
: flat_multiset( fr, std::forward<R>(rg), key_compare() ) { }  // (17) (desde C++23)
template< container-compatible-range<value_type> R, class Allocator >
flat_multiset( std::from_range_t, R&& rg, const Allocator& alloc );  // (18) (desde C++23)
template< container-compatible-range<value_type> R, class Allocator >
flat_multiset( std::from_range_t, R&& rg, const key_compare& comp,
const Allocator& alloc );  // (19) (desde C++23)
template< class InputIter >
flat_multiset( std::sorted_equivalent_t s, InputIter first, InputIter last,
const key_compare& comp = key_compare() )
: c(first, last), compare(comp) { }  // (20) (desde C++23)
template< class InputIter, class Allocator >
flat_multiset( std::sorted_equivalent_t s, InputIter first, InputIter last,
const key_compare& comp, const Allocator& alloc );  // (21) (desde C++23)
template< class InputIter, class Allocator >
flat_multiset( std::sorted_equivalent_t s, InputIter first, InputIter last,
const Allocator& alloc );  // (22) (desde C++23)
flat_multiset( std::initializer_list<value_type> init,
const key_compare& comp = key_compare() )
: flat_multiset(init.begin(), init.end(), comp) { }  // (23) (desde C++23)
template< class Allocator >
flat_multiset( std::initializer_list<value_type> init, const key_compare& comp,
const Allocator& alloc );  // (24) (desde C++23)
template< class Allocator >
flat_multiset( std::initializer_list<value_type> init, const Allocator& alloc );  // (25) (desde C++23)
flat_multiset( std::sorted_equivalent_t s, std::initializer_list<value_type> init,
const key_compare& comp = key_compare() )
: flat_multiset(s, init.begin(), init.end(), comp) { }  // (26) (desde C++23)
template< class Allocator >
flat_multiset( std::sorted_equivalent_t s, std::initializer_list<value_type> init,
const key_compare& comp, const Allocator& alloc );  // (27) (desde C++23)
template< class Allocator >
flat_multiset( std::sorted_equivalent_t s, std::initializer_list<value_type> init,
const Allocator& alloc );  // (28) (desde C++23)
```

  
Constrói um novo adaptador de container a partir de uma variedade de fontes de dados e, opcionalmente, um objeto de função de comparação `comp` e/ou um alocador `alloc`.

1) Um construtor padrão. Constrói um adaptador de container vazio.

2) Um [construtor de cópia](<#/doc/language/copy_constructor>). Constrói [`_c_`](<#/doc/container/flat_multiset>) com a cópia do conteúdo de other.c e [`_compare_`](<#/doc/container/flat_multiset>) com other.compare. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

3) Um [construtor de movimento](<#/doc/language/move_constructor>). Constrói o adaptador de container com o conteúdo de other usando semântica de movimento. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

4) Constrói o container subjacente com o conteúdo do container `cont`. Primeiro, inicializa [`_c_`](<#/doc/container/flat_multiset>) com std::move(cont) e [`_compare_`](<#/doc/container/flat_multiset>) com `comp`. Em seguida, ordena [`_c_`](<#/doc/container/flat_multiset>) em relação a `comp`.

5) O mesmo que (4), equivalente a flat_multiset(cont);. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

6) O mesmo que (4), equivalente a flat_multiset(cont, comp);. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

7) Constrói o container subjacente com o conteúdo do outro container `cont`. Inicializa [`_c_`](<#/doc/container/flat_multiset>) com std::move(cont) e [`_compare_`](<#/doc/container/flat_multiset>) com `comp`.

8) O mesmo que (7), equivalente a flat_multiset(s, cont);. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

9) O mesmo que (7), equivalente a flat_multiset(s, cont, comp);. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

10) Constrói um adaptador de container vazio.

11,12) Constrói um adaptador de container vazio. Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

13) Constrói o adaptador de container com o conteúdo do range `[`first`, `last`)`, equivalente a insert(first, last);.

14,15) O mesmo que (13). Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

16) Constrói o adaptador de container com o conteúdo do range `rg`. Primeiro, usa (10) como [construtor delegante](<#/doc/language/initializer_list>). Em seguida, inicializa [`_c_`](<#/doc/container/flat_multiset>) com o conteúdo de `rg` como se fosse por insert_range([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg));.

17) O mesmo que (16) usando-o como [construtor delegante](<#/doc/language/initializer_list>).

18,19) O mesmo que (16). Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

20) Constrói o container subjacente com o conteúdo do range `[`first`, `last`)`. Inicializa [`_c_`](<#/doc/container/flat_multiset>) com c(first, last) e [`_compare_`](<#/doc/container/flat_multiset>) com compare(comp).

21,22) O mesmo que (20). Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

23) Um [construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container subjacente com o conteúdo da lista de inicialização `init`, usando (13) como [construtor delegante](<#/doc/language/initializer_list>).

24,25) O mesmo que (23). Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

26) Um [construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container subjacente com o conteúdo da lista de inicialização `init`, usando (20) como [construtor delegante](<#/doc/language/initializer_list>).

27,28) O mesmo que (26). Veja a [nota de uso do alocador](<#/doc/container/flat_multiset/flat_multiset>) abaixo.

Nota para as sobrecargas (13-15,20-22): Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

##### Nota de uso do alocador

Os construtores (2,3,5,6,8,9,11,12,14,15,17,19,21,22,24,25,27,28) são equivalentes aos construtores não-alocadores correspondentes, exceto que [`_c_`](<#/doc/container/flat_multiset>) é construído com [construção com uso de alocador](<#/doc/memory/uses_allocator>). Essas sobrecargas participam da resolução de sobrecarga somente se [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<container_type, Allocator> for verdadeiro.

### Parâmetros

cont  |  \-  |  um container a ser usado como fonte para inicializar o container subjacente   
---|---|---
other  |  \-  |  outro `flat_multiset` a ser usado como fonte para inicializar os elementos do container subjacente   
alloc  |  \-  |  um alocador a ser usado para todas as alocações de memória do container subjacente   
comp  |  \-  |  um objeto de função a ser usado para todas as comparações de chaves   
first, last  |  \-  |  um range para copiar os elementos   
init  |  \-  |  uma lista de inicialização para inicializar os elementos do container subjacente   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>) (isto é, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/flat_multiset>)) a ser usado como fonte para inicializar o container subjacente   
fr  |  \-  |  uma [tag de desambiguação](<#/doc/ranges/from_range>) que indica que o membro contido deve ser construído a partir de um range   
s  |  \-  |  uma [tag de desambiguação](<#/doc/container/sorted_equivalent>) que indica que a sequência de entrada está ordenada em relação a [`_compare_`](<#/doc/container/flat_multiset>)  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).   
-`Allocator` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
  
### Complexidade

1) Constante.

2) Linear no tamanho de other.

3) O mesmo que o construtor de movimento correspondente do container encapsulado, ou seja, constante ou linear no tamanho de cont.

4-6) Linear em \\(\scriptsize N\\)N se cont estiver ordenado em relação a compare, caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de cont.size() antes desta chamada.

7-9) O mesmo que o construtor de movimento correspondente do container encapsulado, ou seja, constante ou linear no tamanho de cont.

10-12) Constante.

13-15) Linear em \\(\scriptsize N\\)N se o range de entrada `[`first`, `last`)` estiver ordenado em relação a compare, caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de cont.size() antes desta chamada.

16-19) Linear em \\(\scriptsize N\\)N se o range de entrada rg estiver ordenado em relação a compare, caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de cont.size() antes desta chamada.

20-22) Linear no tamanho de `[`first`, `last`)`.

23-25) Linear em \\(\scriptsize N\\)N se os elementos de init estiverem ordenados em relação a compare, caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de cont.size() antes desta chamada.

26-28) Linear no tamanho de init.

### Exceções

Chamadas para `Allocator::allocate` podem lançar exceções.

### Observações

Após a construção por movimento do container (sobrecarga (3,16-19)), referências, ponteiros e iteradores (exceto o iterador de fim) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao adaptador de container   
(função membro pública)  