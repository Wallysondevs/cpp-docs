# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::flat_map

```cpp
flat_map()
: flat_map(key_compare()) { }  // (1) (desde C++23)
template< class Allocator >
flat_map( const flat_map&, const Allocator& alloc );  // (2) (desde C++23)
template< class Allocator >
flat_map( flat_map&&, const Allocator& alloc );  // (3) (desde C++23)
flat_map( key_container_type key_cont, mapped_container_type mapped_cont,
const key_compare& comp = key_compare() );  // (4) (desde C++23)
template< class Allocator >
flat_map( const key_container_type& key_cont,
const mapped_container_type& mapped_cont,
const Allocator& alloc );  // (5) (desde C++23)
template< class Allocator >
flat_map( const key_container_type& key_cont,
const mapped_container_type& mapped_cont,
const key_compare& comp, const Allocator& alloc );  // (6) (desde C++23)
flat_map( std::sorted_unique_t, key_container_type key_cont,
mapped_container_type mapped_cont,
const key_compare& comp = key_compare() );  // (7) (desde C++23)
template< class Allocator >
flat_map( std::sorted_unique_t, const key_container_type& key_cont,
const mapped_container_type& mapped_cont, const Allocator& alloc );  // (8) (desde C++23)
template< class Allocator >
flat_map( std::sorted_unique_t, const key_container_type& key_cont,
const mapped_container_type& mapped_cont,
const key_compare& comp, const Allocator& alloc );  // (9) (desde C++23)
explicit flat_map( const key_compare& comp )
: c(), compare(comp) { }  // (10) (desde C++23)
template< class Allocator >
flat_map( const key_compare& comp, const Allocator& alloc );  // (11) (desde C++23)
template< class Allocator >
explicit flat_map( const Allocator& alloc );  // (12) (desde C++23)
template< class InputIter >
flat_map( InputIter first, InputIter last,
const key_compare& comp = key_compare() )
: c(), compare(comp);  // (13) (desde C++23)
template< class InputIter, class Allocator >
flat_map( InputIter first, InputIter last,
const key_compare& comp, const Allocator& alloc );  // (14) (desde C++23)
template< class InputIter, class Allocator >
flat_map( InputIter first, InputIter last, const Allocator& alloc );  // (15) (desde C++23)
template< container-compatible-range<value_type> R >
flat_map( std::from_range_t, R&& rg, const key_compare& comp )
: flat_map(comp);  // (16) (desde C++23)
template< container-compatible-range<value_type> R >
flat_map( std::from_range_t fr, R&& rg )
: flat_map(fr, std::forward<R>(rg), key_compare()) { }  // (17) (desde C++23)
template< container-compatible-range<value_type> R, class Allocator >
flat_map( std::from_range_t, R&& rg, const Allocator& alloc );  // (18) (desde C++23)
template< container-compatible-range<value_type> R, class Allocator >
flat_map( std::from_range_t, R&& rg, const key_compare& comp,
const Allocator& alloc );  // (19) (desde C++23)
template< class InputIter >
flat_map( std::sorted_unique_t s, InputIter first, InputIter last,
const key_compare& comp = key_compare() )
: c(), compare(comp);  // (20) (desde C++23)
template< class InputIter, class Allocator >
flat_map( std::sorted_unique_t s, InputIter first, InputIter last,
const key_compare& comp, const Allocator& alloc );  // (21) (desde C++23)
template< class InputIter, class Allocator >
flat_map( std::sorted_unique_t s, InputIter first, InputIter last,
const Allocator& alloc );  // (22) (desde C++23)
flat_map( std::initializer_list<value_type> init,
const key_compare& comp = key_compare() )
: flat_map(init.begin(), init.end(), comp) { }  // (23) (desde C++23)
template< class Allocator >
flat_map( std::initializer_list<value_type> init, const key_compare& comp,
const Allocator& alloc );  // (24) (desde C++23)
template< class Allocator >
flat_map( std::initializer_list<value_type> init, const Allocator& alloc );  // (25) (desde C++23)
flat_map( std::sorted_unique_t s, std::initializer_list<value_type> init,
const key_compare& comp = key_compare() )
: flat_map(s, init.begin(), init.end(), comp) { }  // (26) (desde C++23)
template< class Allocator >
flat_map( std::sorted_unique_t s, std::initializer_list<value_type> init,
const key_compare& comp, const Allocator& alloc );  // (27) (desde C++23)
template< class Allocator >
flat_map( std::sorted_unique_t s, std::initializer_list<value_type> init,
const Allocator& alloc );  // (28) (desde C++23)
```

  
Constrói um novo adaptador de container a partir de uma variedade de fontes de dados e opcionalmente usando um objeto de função de comparação fornecido pelo usuário comp e/ou um alocador alloc. 

1) Um construtor padrão. Constrói um adaptador de container vazio.

2) Um [construtor de cópia](<#/doc/language/copy_constructor>). Constrói [`_c_`](<#/doc/container/flat_map>) com a cópia do conteúdo de other.c e [`_compare_`](<#/doc/container/flat_map>) com other.compare. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

3) Um [construtor de movimento](<#/doc/language/move_constructor>). Constrói o adaptador de container com o conteúdo de other usando move semantics. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

4) Primeiro, inicializa [`_c.keys_`](<#/doc/container/flat_map>) com std::move(key_cont), [`_c.values_`](<#/doc/container/flat_map>) com std::move(mapped_cont), e [`_compare_`](<#/doc/container/flat_map>) com comp. Em seguida, ordena o range subjacente `[`begin()`, `end()`)` em relação a value_comp(). Finalmente, apaga os elementos duplicados como se por:  
auto zv = [views::zip](<#/doc/ranges/zip_view>)(c.keys, c.values);  
auto it = [ranges::unique](<#/doc/algorithm/ranges/unique>)(zv, key_equiv(compare)).begin();  
auto dist = distance(zv.begin(), it);  
c.keys.erase(c.keys.begin() + dist, c.keys.end());  
c.values.erase(c.values.begin() + dist, c.values.end());.

5) O mesmo que (4), equivalente a flat_map(key_cont, mapped_cont);. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

6) O mesmo que (4), equivalente a flat_map(key_cont, mapped_cont, comp);. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

7) Inicializa [`_c.keys_`](<#/doc/container/flat_map>) com std::move(key_cont), [`_c.values_`](<#/doc/container/flat_map>) com std::move(mapped_cont), e [`_compare_`](<#/doc/container/flat_map>) com comp.

8) O mesmo que (7), equivalente a flat_map(s, key_cont, mapped_cont);. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

9) O mesmo que (7), equivalente a flat_map(s, key_cont, mapped_cont, comp);. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

10) Constrói um adaptador de container vazio.

11,12) Constrói um adaptador de container vazio. Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

13) Constrói o adaptador de container com o conteúdo do range `[`first`, `last`)`, equivalente a insert(first, last);.

14,15) O mesmo que (13). Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

16) Constrói o adaptador de container com o conteúdo do range rg. Primeiro, usa (10) como [construtor delegante](<#/doc/language/initializer_list>). Em seguida, inicializa [`_c_`](<#/doc/container/flat_map>) com o conteúdo de rg como se por insert_range([std::forward](<#/doc/utility/forward>)&lt;R&gt;(rg));.

17) O mesmo que (16) usando-o como [construtor delegante](<#/doc/language/initializer_list>).

18,19) O mesmo que (16). Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

20) Constrói os containers subjacentes com o conteúdo do range `[`first`, `last`)` como se por insert(first, last).

21,22) O mesmo que (20). Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

23) Um [construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container subjacente com o conteúdo da initializer list init, usando (13) como [construtor delegante](<#/doc/language/initializer_list>).

24,25) O mesmo que (23). Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

26) Um [construtor de lista de inicialização](<#/doc/language/list_initialization>). Constrói o container subjacente com o conteúdo da initializer list init, usando (20) como [construtor delegante](<#/doc/language/initializer_list>).

27,28) O mesmo que (26). Veja a [nota de uso do alocador](<#/doc/container/flat_map/flat_map>) abaixo.

Nota para as sobrecargas (13-15,20-22): Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido. 

Nota para as sobrecargas (4-6,13-19,23-25): Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, não é especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)). 

##### Nota de uso do alocador

Os construtores (2,3,5,6,8,9,11,12,14,15,17,19,21,22,24,25,27,28) são equivalentes aos construtores não-alocadores correspondentes, exceto que os containers subjacentes [`_c.keys_`](<#/doc/container/flat_map>) e [`_c.values_`](<#/doc/container/flat_map>) são construídos com [construção uses-allocator](<#/doc/memory/uses_allocator>). Essas sobrecargas participam da resolução de sobrecarga apenas se [std::uses_allocator_v](<#/doc/memory/uses_allocator>)<container_type, Allocator> for true. 

### Parâmetros

key_cont  |  \-  |  um container a ser usado como fonte para inicializar o container de chaves subjacente   
---|---|---
mapped_cont  |  \-  |  um container a ser usado como fonte para inicializar o container de valores subjacente   
other  |  \-  |  outro `flat_map` a ser usado como fonte para inicializar os elementos dos containers subjacentes   
alloc  |  \-  |  um alocador para usar em todas as alocações de memória dos containers subjacentes   
comp  |  \-  |  um objeto de função a ser usado para todas as comparações de chaves   
first, last  |  \-  |  um range para copiar os elementos   
init  |  \-  |  uma initializer list para inicializar os elementos dos containers subjacentes   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>) (isto é, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/flat_map>)) a ser usado como fonte para inicializar os containers subjacentes   
fr  |  \-  |  uma [tag de desambiguação](<#/doc/ranges/from_range>) que indica que o membro contido deve ser construído por range   
s  |  \-  |  uma [tag de desambiguação](<#/doc/container/sorted_unique>) que indica que a sequência de entrada está ordenada em relação a value_comp() e todos os seus elementos são únicos   
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).   
-`Allocator` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).   
  
### Complexidade

1) Constante.

2) Linear no tamanho de other.

3) O mesmo que o move-constructor correspondente do container encapsulado, ou seja, constante ou linear no tamanho de cont.

4-6) Linear em \\(\scriptsize N\\)N se cont estiver ordenado em relação a value_comp(), caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de key_cont.size() antes desta chamada.

7-9) O mesmo que o move-constructor correspondente do container encapsulado, ou seja, constante ou linear no tamanho de cont.

10-12) Constante.

13-15) Linear em \\(\scriptsize N\\)N se o range de entrada `[`first`, `last`)` estiver ordenado em relação a value_comp(), caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de key_cont.size() antes desta chamada.

16-19) Linear em \\(\scriptsize N\\)N se o range de entrada rg estiver ordenado em relação a value_comp(), caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de key_cont.size() antes desta chamada.

20-22) Linear no tamanho de `[`first`, `last`)`.

23-25) Linear em \\(\scriptsize N\\)N se os elementos de init estiverem ordenados em relação a value_comp(), caso contrário \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N·log(N)), onde \\(\scriptsize N\\)N é o valor de key_cont.size() antes desta chamada.

26-28) Linear no tamanho de init.

### Exceções

Chamadas para `Allocator::allocate` podem lançar exceções. 

### Notas

Após a construção por movimento do container (sobrecarga (3)), referências, ponteiros e iteradores (exceto o iterador final) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>). 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao adaptador de container   
(função membro pública)  