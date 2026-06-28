# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::insert

```cpp
iterator insert( const value_type& value );  // (1) (desde C++23)
iterator insert( value_type&& value );  // (2) (desde C++23)
iterator insert( const_iterator pos, const value_type& value );  // (3) (desde C++23)
iterator insert( const_iterator pos, value_type&& value );  // (4) (desde C++23)
template< class P >
iterator insert( P&& x );  // (5) (desde C++23)
template< class P >
iterator insert( const_iterator pos, P&& x );  // (6) (desde C++23)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (7) (desde C++23)
template< class InputIt >
void insert( std::sorted_equivalent_t, InputIt first, InputIt last );  // (8) (desde C++23)
void insert( std::initializer_list<key_type> ilist );  // (9) (desde C++23)
void insert( std::sorted_equivalent_t s, std::initializer_list<key_type> ilist );  // (10) (desde C++23)
```

Insere elemento(s) no container.

1) Insere value. Equivalente a return emplace(value);.

2) Insere value. Equivalente a return emplace(std::move(value));.

3) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(pos, value);.

4) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(pos, std::move(value));.

5) Insere `x` em *this como se por emplace([std::forward](<#/doc/utility/forward>)&lt;P&gt;(x));. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<pair<key_type, mapped_type>, P> for true.

6) Insere `x` em *this na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(position, [std::forward](<#/doc/utility/forward>)&lt;P&gt;(x));. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<pair<key_type, mapped_type>, P> for true.

7) Insere elementos do range `[`first`, `last`)` como se executasse as seguintes operações sequencialmente:

  1. Adiciona elementos a [`c`](<#/doc/container/flat_multimap>) como se por
for (; first != last; ++first)
{
value_type value = *first;
c.keys.insert(c.keys.end(), std::move(value.first));
c.values.insert(c.values.end(), std::move(value.second));
}
  2. Ordena o range de elementos recém-inseridos em relação a [`value_comp`](<#/doc/container/flat_multimap/value_comp>).
  3. Mescla o range ordenado resultante e o range ordenado de elementos pré-existentes em um único range ordenado.

Pode alocar memória durante a operação de mesclagem in-place.

8) Insere elementos do range `[`first`, `last`)` como se executasse as seguintes operações sequencialmente:

  1. Adiciona elementos a [`c`](<#/doc/container/flat_multimap>) como se por
for (; first != last; ++first)
{
value_type value = *first;
c.keys.insert(c.keys.end(), std::move(value.first));
c.values.insert(c.values.end(), std::move(value.second));
}
  2. Mescla o range ordenado de elementos recém-adicionados e o range ordenado de elementos pré-existentes em um único range ordenado.

Pode alocar memória durante a operação de mesclagem in-place.

9) Insere elementos da initializer list ilist. Equivalente a insert(ilist.begin(), ilist.end());.

10) Insere elementos da initializer list ilist. Equivalente a insert(s, ilist.begin(), ilist.end());.

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")

### Parâmetros

- **pos** — um iterator para a posição antes da qual o novo elemento será inserido
- **value** — um valor de elemento a ser inserido
- **first, last** — um range de elementos a ser inserido
- **ilist** — uma initializer list da qual inserir os valores
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave
- **s** — uma tag de desambiguação indicando que a sequência de entrada está ordenada (em relação a [`value_comp()`](<#/doc/container/flat_multimap/value_comp>))
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1-6) Um iterator para o elemento inserido.

7-10) (nenhum)

### Exceções

1-6) Se uma exceção for lançada por qualquer operação, a inserção não terá efeito.

7-10) Nenhuma garantia de segurança de exceção. (?)

| Esta seção está incompleta
Razão: verificar novamente os casos 7-10

### Complexidade

1-6) Linear em [`size()`](<#/doc/container/flat_multimap/size>).

7) N + M·log(M), onde `N` é o [`size()`](<#/doc/container/flat_multimap/size>) antes da operação e `M` é [std::distance](<#/doc/iterator/distance>)(first, last).

8) Linear em [`size()`](<#/doc/container/flat_multimap/size>).

9) N + M·log(M), onde `N` é o [`size()`](<#/doc/container/flat_multimap/size>) antes da operação e `M` é ilist.size().

10) Linear em `N`, onde `N` é [`size()`](<#/doc/container/flat_multimap/size>) após a operação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ emplace](<#/doc/container/flat_multimap/emplace>) | constrói elemento in-place
(função membro pública)
[ emplace_hint](<#/doc/container/flat_multimap/emplace_hint>) | constrói elementos in-place usando uma dica
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)