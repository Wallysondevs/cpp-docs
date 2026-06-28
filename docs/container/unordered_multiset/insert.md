# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::insert

```cpp
iterator insert( const value_type& value );  // (1) (desde C++11)
iterator insert( value_type&& value );  // (2) (desde C++11)
iterator insert( const_iterator hint, const value_type& value );  // (3) (desde C++11)
iterator insert( const_iterator hint, value_type&& value );  // (4) (desde C++11)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (5) (desde C++11)
void insert( std::initializer_list<value_type> ilist );  // (6) (desde C++11)
iterator insert( node_type&& nh );  // (7) (desde C++17)
iterator insert( const_iterator hint, node_type&& nh );  // (8) (desde C++17)
```

Insere elemento(s) no container.

1,2) Insere value.

3,4) Insere value, usando hint como uma sugestão não vinculativa de onde a busca deve começar.

5) Insere elementos do range `[`first`, `last`)`.

6) Insere elementos da initializer list ilist.

7) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por nh no container e retorna um iterator apontando para o elemento inserido. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

8) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o end iterator. Caso contrário, insere o elemento possuído por nh no container, e retorna o iterator apontando para o elemento com chave equivalente a nh.key(). hint é usado como uma sugestão não vinculativa de onde a busca deve começar. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_multiset/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_multiset/bucket_count>) um rehashing ocorre.
Se um rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtido enquanto ele é mantido no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos.(desde C++17)

### Parâmetros

- **hint** — iterator, usado como uma sugestão de onde inserir o conteúdo
- **value** — valor do elemento a ser inserido
- **first, last** — range de elementos a serem inseridos
- **ilist** — initializer list para inserir os valores
- **nh** — um [node handle](<#/doc/container/node_handle>) compatível
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1-4) Um iterator para o elemento inserido.

5,6) (nenhum)

7,8) End iterator se nh estava vazio, iterator apontando para o elemento inserido caso contrário.

### Exceções

1-4) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

| Esta seção está incompleta
Razão: casos 5,6

### Complexidade

1-4) Caso médio: `O(1)`, pior caso `O(size())`.

5,6) Caso médio: `O(N)`, onde N é o número de elementos a serem inseridos. Pior caso: `O(N * size() + N)`.

7,8) Caso médio: `O(1)`, pior caso `O(size())`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ emplace](<#/doc/container/unordered_multiset/emplace>) | constrói elemento in-place
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_multiset/emplace_hint>) | constrói elementos in-place usando um hint
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido do argumento
(template de função)