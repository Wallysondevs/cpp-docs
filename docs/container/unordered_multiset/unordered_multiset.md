# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::unordered_multiset

```cpp
  // (1)
unordered_multiset()
: unordered_multiset(size_type(/* unspecified */)) {}  // (desde C++11)
(até C++20)
unordered_multiset();  // (desde C++20)
explicit unordered_multiset( size_type bucket_count,
const Hash& hash = Hash(),
const key_equal& equal = key_equal(),
const Allocator& alloc = Allocator() );  // (2) (desde C++11)
unordered_multiset( size_type bucket_count,
const Allocator& alloc )
: unordered_multiset(bucket_count, Hash(), key_equal(), alloc) {}  // (3) (desde C++14)
unordered_multiset( size_type bucket_count,
const Hash& hash,
const Allocator& alloc )
: unordered_multiset(bucket_count, hash, key_equal(), alloc) {}  // (4) (desde C++14)
explicit unordered_multiset( const Allocator& alloc );  // (5) (desde C++11)
template< class InputIt >
unordered_multiset( InputIt first, InputIt last,
size_type bucket_count = /* unspecified */,
const Hash& hash = Hash(),
const key_equal& equal = key_equal(),
const Allocator& alloc = Allocator() );  // (6) (desde C++11)
template< class InputIt >
unordered_multiset( InputIt first, InputIt last,
size_type bucket_count,
const Allocator& alloc )
: unordered_multiset(first, last,
bucket_count, Hash(), key_equal(), alloc) {}  // (7) (desde C++14)
template< class InputIt >
unordered_multiset( InputIt first, InputIt last,
size_type bucket_count,
const Hash& hash,
const Allocator& alloc )
: unordered_multiset(first, last,
bucket_count, hash, key_equal(), alloc) {}  // (8) (desde C++14)
unordered_multiset( const unordered_multiset& other );  // (9) (desde C++11)
unordered_multiset( const unordered_multiset& other, const Allocator& alloc );  // (10) (desde C++11)
unordered_multiset( unordered_multiset&& other );  // (11) (desde C++11)
unordered_multiset( unordered_multiset&& other, const Allocator& alloc );  // (12) (desde C++11)
unordered_multiset( std::initializer_list<value_type> init,
size_type bucket_count = /* unspecified */,
const Hash& hash = Hash(),
const key_equal& equal = key_equal(),
const Allocator& alloc = Allocator() );  // (13) (desde C++11)
unordered_multiset( std::initializer_list<value_type> init,
size_type bucket_count,
const Allocator& alloc )
: unordered_multiset(init, bucket_count,
Hash(), key_equal(), alloc) {}  // (14) (desde C++14)
unordered_multiset( std::initializer_list<value_type> init,
size_type bucket_count,
const Hash& hash,
const Allocator& alloc )
: unordered_multiset(init, bucket_count,
hash, key_equal(), alloc) {}  // (15) (desde C++14)
template< container-compatible-range<value_type> R >
unordered_multiset( std::from_range_t, R&& rg,
size_type bucket_count = /* see description */,
const Hash& hash = Hash(),
const key_equal& equal = key_equal(),
const Allocator& alloc = Allocator() );  // (16) (desde C++23)
template< container-compatible-range<value_type> R >
unordered_multiset( std::from_range_t, R&& rg,
size_type bucket_count,
const Allocator& alloc )
: unordered_multiset(std::from_range, std::forward<R>(rg),
bucket_count, Hash(), key_equal(), alloc) {}  // (17) (desde C++23)
template< container-compatible-range<value_type> R >
unordered_multiset( std::from_range_t, R&& rg,
size_type bucket_count,
const Hash& hash,
const Alloc& alloc )
: unordered_multiset(std::from_range, std::forward<R>(rg),
bucket_count, hash, key_equal(), alloc) {}  // (18) (desde C++23)
```

  
Constrói um novo container a partir de uma variedade de fontes de dados. Opcionalmente, usa `bucket_count` fornecido pelo usuário como um número mínimo de buckets a serem criados, `hash` como a função hash, `equal` como a função para comparar chaves e `alloc` como o alocador.

1-5) Constrói um container vazio. Define [max_load_factor()](<#/doc/container/unordered_multiset/max_load_factor>) para 1.0. Para o construtor padrão, o número de buckets é não especificado.

6-8) Constrói o container com o conteúdo do range `[`first`, `last`)`. Define [max_load_factor()](<#/doc/container/unordered_multiset/max_load_factor>) para 1.0. 

9,10) Construtor de cópia. Constrói o container com a cópia do conteúdo de `other`, copia o fator de carga, o predicado e a função hash também. Se `alloc` não for fornecido, o alocador é obtido chamando [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::select_on_container_copy_construction(other.get_allocator()). O parâmetro de template `Allocator` é deduzido apenas do primeiro argumento quando usado na [dedução de argumentos de template de classe](<#/doc/language/ctad>). | (desde C++23)  
  
11,12) [Construtor de movimento](<#/doc/language/move_constructor>). Constrói o container com o conteúdo de `other` usando move semantics. Se `alloc` não for fornecido, o alocador é obtido por construção de movimento a partir do alocador pertencente a `other`. O parâmetro de template `Allocator` é deduzido apenas do primeiro argumento quando usado na [dedução de argumentos de template de classe](<#/doc/language/ctad>). | (desde C++23)  
  
13-15) [Construtor de lista de inicializadores](<#/doc/language/list_initialization>). Constrói o container com o conteúdo da lista de inicializadores `init`, o mesmo que unordered_multiset(init.begin(), init.end()).

16-18) Constrói o container com o conteúdo de `rg`. 

### Parâmetros

alloc  |  \-  |  alocador a ser usado para todas as alocações de memória deste container   
---|---|---
bucket_count  |  \-  |  número mínimo de buckets a serem usados na inicialização. Se não for especificado, um valor padrão não especificado é usado   
hash  |  \-  |  função hash a ser usada   
equal  |  \-  |  função de comparação a ser usada para todas as comparações de chaves deste container   
first, last  |  \-  |  o range `[`first`, `last`)` de onde copiar os elementos   
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para [`value_type`](<#/doc/container/unordered_multiset>)  
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  lista de inicializadores para inicializar os elementos do container   
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Complexidade

1-5) Constante.

6-8) Caso médio linear (ou seja, O(N), onde N é [std::distance](<#/doc/iterator/distance>)(first, last)), caso pior quadrático, ou seja, O(N2).

9,10) Linear no tamanho de `other`.

11,12) Constante. Se `alloc` for fornecido e `alloc != other.get_allocator()`, então linear.

13-15) Caso médio O(N) (N é [std::size](<#/doc/iterator/size>)(init)), caso pior O(N2).

16-18) Caso médio O(N) (N é [ranges::distance](<#/doc/iterator/ranges/distance>)(rg)), caso pior O(N2).

### Exceções

Chamadas para `Allocator::allocate` podem lançar exceções. 

### Notas

Após a construção de movimento do container (sobrecarga (4)), referências, ponteiros e iteradores (exceto o iterador `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>). 

Embora não formalmente exigido até C++23, algumas implementações já colocaram o parâmetro de template `Allocator` em [contextos não deduzidos](<#/doc/language/template_argument_deduction>) em modos anteriores. 

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de Ranges; sobrecargas ([16-18](<#/doc/container/unordered_multiset/unordered_multiset>))  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2193](<https://cplusplus.github.io/LWG/issue2193>) | C++11  | o construtor padrão (1) era explícito  | tornado não explícito   
[LWG 2230](<https://cplusplus.github.io/LWG/issue2230>) | C++11  | a semântica da sobrecarga ([13](<#/doc/container/unordered_multiset/unordered_multiset>)) não era especificada  | especificada   
  
### Veja também

[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)  