# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::insert

Definido no cabeçalho `[<unordered_map>](<#/doc/header/unordered_map>)`

```c
iterator insert( const value_type& value );
iterator insert( value_type&& value );
template< class P >
iterator insert( P&& value );
iterator insert( const_iterator hint, const value_type& value );
iterator insert( const_iterator hint, value_type&& value );
template< class P >
iterator insert( const_iterator hint, P&& value );
template< class InputIt >
void insert( InputIt first, InputIt last );
void insert( std::initializer_list<value_type> ilist );
iterator insert( node_type&& nh );
iterator insert( const_iterator hint, node_type&& nh );
```

Insere elemento(s) no container.

1-3) Insere value.

A sobrecarga (3) é equivalente a emplace([std::forward](<#/doc/utility/forward>)&lt;P&gt;(value)) e só participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true.

4-6) Insere value, usando hint como uma sugestão não vinculativa de onde a busca deve começar.

A sobrecarga (6) é equivalente a emplace_hint(hint, [std::forward](<#/doc/utility/forward>)&lt;P&gt;(value)) e só participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true.

7) Insere elementos do range `[`first`, `last`)`.

Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), ou first e/ou last forem iterators para *this, o comportamento é indefinido.

8) Insere elementos da initializer list ilist.

9) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por nh no container e retorna um iterator apontando para o elemento inserido. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

10) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o iterator end. Caso contrário, insere o elemento possuído por nh no container e retorna o iterator apontando para o elemento com chave equivalente a nh.key(). hint é usado como uma sugestão não vinculativa de onde a busca deve começar. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_multimap/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_multimap/bucket_count>) ocorre um rehashing.
Se ocorrer rehashing (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtidos enquanto ele é mantido no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos.(desde C++17)

### Parâmetros

- **hint** — iterator, usado como uma sugestão de onde inserir o conteúdo
- **value** — valor do elemento a ser inserido
- **first, last** — range de elementos a serem inseridos
- **ilist** — initializer list de onde inserir os valores
- **nh** — um [node handle](<#/doc/container/node_handle>) compatível
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1-6) Um iterator para o elemento inserido.

7,8) (nenhum)

9,10) Iterator end se nh estava vazio, iterator apontando para o elemento inserido caso contrário.

### Exceções

1-6) Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

7,8) Nenhuma garantia de segurança de exceção.

9,10) Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

1-6) Caso médio: `O(1)`, pior caso `O(size())`.

7,8) Caso médio: `O(N)`, onde N é o número de elementos a serem inseridos. Pior caso: `O(N * size() + N)`.

9,10) Caso médio: `O(1)`, pior caso `O(size())`.

### Exemplo

| Esta seção está incompleta
Motivo: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2005](<https://cplusplus.github.io/LWG/issue2005>) | C++11 | as sobrecargas (3,6) só participariam da resolução de sobrecarga se `P` fosse implicitamente conversível para `value_type` | só participa se `value_type` for construtível a partir de `P&&`

### Ver também

[ emplace](<#/doc/container/unordered_multimap/emplace>) | constrói elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_multimap/emplace_hint>) | constrói elementos no local usando uma sugestão
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(modelo de função)