# std::multiset&lt;Key,Compare,Allocator&gt;::insert

```cpp
iterator insert( const value_type& value );  // (1)
iterator insert( value_type&& value );  // (2) (desde C++11)
  // (3)
iterator insert( iterator pos, const value_type& value );  // (até C++11)
iterator insert( const_iterator pos, const value_type& value );  // (desde C++11)
iterator insert( const_iterator pos, value_type&& value );  // (4) (desde C++11)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (5)
void insert( std::initializer_list<value_type> ilist );  // (6) (desde C++11)
iterator insert( node_type&& nh );  // (7) (desde C++17)
iterator insert( const_iterator pos, node_type&& nh );  // (8) (desde C++17)
```

Insere elemento(s) no container. A ordem dos elementos equivalentes restantes é preservada.

1,2) Insere value. Se o container tiver elementos com chave equivalente, insere no limite superior desse range.

3,4) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos.

5) Insere elementos do range `[`first`, `last`)`.

6) Insere elementos da initializer list ilist.

7) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por nh no container e retorna um iterator apontando para o elemento inserido. Se um range contendo elementos com chaves equivalentes a nh.key() existir no container, o elemento é inserido no final desse range. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

8) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o iterator de fim. Caso contrário, insere o elemento possuído por nh no container e retorna o iterator apontando para o elemento com chave equivalente a nh.key(). O elemento é inserido o mais próximo possível da posição imediatamente anterior a pos. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

Nenhum iterator ou referência é invalidado. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtidos enquanto ele estava contido no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos. (desde C++17)

### Parameters

- **pos** — iterator para a posição antes da qual o novo elemento será inserido
- **value** — valor do elemento a ser inserido
- **first, last** — range de elementos a serem inseridos
- **ilist** — initializer list da qual inserir os valores
- **nh** — um [node handle](<#/doc/container/node_handle>) compatível
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Return value

1-4) Um iterator para o elemento inserido.

5,6) (nenhum)

7,8) Iterator de fim se nh estava vazio, iterator apontando para o elemento inserido caso contrário.

### Exceptions

1-4,7,8) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

5,6) Nenhuma garantia de segurança contra exceções.

### Complexity

1,2,7) `O(log(size()))`

3,4,8) Constante amortizada se a inserção ocorrer na posição imediatamente anterior a pos, `O(log(size()))` caso contrário.

5,6) `O(N·log(size() + N))`, onde `N` é o número de elementos a serem inseridos.

### Example

| Esta seção está incompleta
Reason: nenhum exemplo

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 233](<https://cplusplus.github.io/LWG/issue233>) | C++98 | pos era apenas uma dica, podia ser totalmente ignorado | a inserção é exigida para ser o mais próximo possível da posição imediatamente anterior a pos
[LWG 264](<https://cplusplus.github.io/LWG/issue264>) | C++98 | a complexidade da sobrecarga (5) era exigida como linear se o range `[first, last)` fosse ordenado de acordo com `Compare` | removeu o requisito linear neste caso especial
[LWG 371](<https://cplusplus.github.io/LWG/issue371>) | C++98 | a ordem dos elementos equivalentes não era garantida como preservada | exigida como preservada

### See also

[ emplace](<#/doc/container/multiset/emplace>)(C++11) | constrói elemento in-place
(função membro pública)
[ emplace_hint](<#/doc/container/multiset/emplace_hint>)(C++11) | constrói elementos in-place usando uma dica
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)