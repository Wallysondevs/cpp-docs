# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::insert

```cpp
iterator insert( const value_type& value )  // (1) (desde C++23)
iterator insert( value_type&& value );  // (2) (desde C++23)
iterator insert( const_iterator pos, const value_type& value );  // (3) (desde C++23)
iterator insert( const_iterator pos, value_type&& value );  // (4) (desde C++23)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (5) (desde C++23)
template< class InputIt >
void insert( std::sorted_equivalent_t, InputIt first, InputIt last );  // (6) (desde C++23)
void insert( std::initializer_list<key_type> ilist );  // (7) (desde C++23)
void insert( std::sorted_equivalent_t s, std::initializer_list<key_type> ilist );  // (8) (desde C++23)
```

Insere elemento(s) no container. A ordem dos elementos equivalentes restantes é preservada.

1) Insere value. Se o container tiver elementos com chave equivalente, insere no limite superior desse range. Equivalente a return emplace(value);.

2) Insere value. Se o container tiver elementos com chave equivalente, insere no limite superior desse range. Equivalente a return emplace(std::move(value));.

3) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(pos, value);.

4) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(pos, std::move(value));.

5) Insere elementos do range `[`first`, `last`)` como se estivesse realizando as seguintes operações sequencialmente:

  1. Adiciona elementos a [`c`](<#/doc/container/flat_multiset>) como se por c.insert(c.end(), first, last);.
  2. Ordena o range de elementos recém-inseridos em relação a [`compare`](<#/doc/container/flat_multiset>).
  3. Mescla o range ordenado resultante e o range ordenado de elementos pré-existentes em um único range ordenado.

Pode alocar memória durante a etapa de mesclagem in-place.

6) Insere elementos do range `[`first`, `last`)`. Equivalente a insert(first, last);.

7) Insere elementos da initializer list ilist. Equivalente a insert(ilist.begin(), ilist.end());.

8) Insere elementos da initializer list ilist. Equivalente a insert(s, ilist.begin(), ilist.end());.

| As informações sobre invalidação de iterator são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")

### Parameters

- **pos** — iterator para a posição antes da qual o novo elemento será inserido
- **value** — valor do elemento a ser inserido
- **first, last** — range de elementos a serem inseridos
- **ilist** — initializer list da qual os valores serão inseridos
- **s** — uma tag de desambiguação indicando que a sequência de entrada está ordenada (em relação a [`key_compare`](<#/doc/container/flat_multiset>))
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Return value

1-4) Um iterator para o elemento inserido.

5-8) (nenhum)

### Exceptions

1-4) Depende do container subjacente.

5-8) Nenhuma garantia de segurança de exceção.

| Esta seção está incompleta
Razão: garantias de exceção 1..8

### Complexity

1-4) Linear.

5) N + M·log(M), onde NN é o [`size()`](<#/doc/container/flat_multiset/size>) antes da operação e `M` é [std::distance](<#/doc/iterator/distance>)(first, last).

6) Linear.

7) N + M·log(M), onde NN é o [`size()`](<#/doc/container/flat_multiset/size>) antes da operação e `M` é ilist.size().

8) Linear.

| Esta seção está incompleta
Razão: verificar novamente a complexidade: 1-4, 8

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### See also

[ emplace](<#/doc/container/flat_multiset/emplace>) | constrói elemento in-place
(função membro pública)
[ emplace_hint](<#/doc/container/flat_multiset/emplace_hint>) | constrói elementos in-place usando uma dica
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(modelo de função)