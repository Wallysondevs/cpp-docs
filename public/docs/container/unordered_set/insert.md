# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::insert

```cpp
std::pair<iterator,bool> insert( const value_type& value );  // (1) (desde C++11)
std::pair<iterator,bool> insert( value_type&& value );  // (2) (desde C++11)
iterator insert( const_iterator hint, const value_type& value );  // (3) (desde C++11)
iterator insert( const_iterator hint, value_type&& value );  // (4) (desde C++11)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (5) (desde C++11)
void insert( std::initializer_list<value_type> ilist );  // (6) (desde C++11)
insert_return_type insert( node_type&& nh );  // (7) (desde C++17)
iterator insert( const_iterator hint, node_type&& nh );  // (8) (desde C++17)
template< class K >
std::pair<iterator, bool> insert( K&& obj );  // (9) (desde C++23)
template< class K >
iterator insert( const_iterator hint, K&& obj );  // (10) (desde C++23)
```

Insere elemento(s) no container, se o container ainda não contiver um elemento com uma chave equivalente.

1,2) Insere `value`.

3,4) Insere `value`, usando `hint` como uma sugestão não vinculativa de onde a busca deve começar.

5) Insere elementos do `range` `[`first`, `last`)`. Se múltiplos elementos no `range` tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

6) Insere elementos da `initializer list` `ilist`. Se múltiplos elementos no `range` tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

7) Se `nh` for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por `nh` no container, se o container ainda não contiver um elemento com uma chave equivalente a `nh.key()`. O comportamento é indefinido se `nh` não estiver vazio e `get_allocator() != nh.get_allocator()`.

8) Se `nh` for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o `iterator` final. Caso contrário, insere o elemento possuído por `nh` no container, se o container ainda não contiver um elemento com uma chave equivalente a `nh.key()`, e retorna o `iterator` apontando para o elemento com chave equivalente a `nh.key()` (independentemente de a inserção ter sido bem-sucedida ou falha). Se a inserção for bem-sucedida, `nh` é movido, caso contrário, ele retém a propriedade do elemento. `hint` é usado como uma sugestão não vinculativa de onde a busca deve começar. O comportamento é indefinido se `nh` não estiver vazio e `get_allocator() != nh.get_allocator()`.

9) Se `*this` já contiver um elemento que se compara transparentemente _equivalente_ a `obj`, não faz nada. Caso contrário, constrói um objeto `u` de [`value_type`](<#/doc/container/unordered_set>) com [std::forward](<#/doc/utility/forward>)&lt;K&gt;(obj) e então insere `u` em `*this`. Se `equal_range(u) != hash_function()(obj) || contains(u)` for verdadeiro, o comportamento é indefinido. O `value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_set` a partir de [std::forward](<#/doc/utility/forward>)&lt;K&gt;(obj). Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

10) Se `*this` já contiver um elemento que se compara transparentemente _equivalente_ a `obj`, não faz nada.

Caso contrário, constrói um objeto `u` de [`value_type`](<#/doc/container/unordered_set>) com [std::forward](<#/doc/utility/forward>)&lt;K&gt;(obj) e então insere `u` em `*this`. [Template:hint](<https://en.cppreference.com/mwiki/index.php?title=Template:hint&action=edit&redlink=1> "Template:hint \(page does not exist\)") é usado como uma sugestão não vinculativa de onde a busca deve começar. Se `equal_range(u) != hash_function()(obj) || contains(u)` for verdadeiro, o comportamento é indefinido. O `value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_set` a partir de [std::forward](<#/doc/utility/forward>)&lt;K&gt;(obj). Esta sobrecarga participa da resolução de sobrecarga apenas se:

  * `[std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, const_iterator>` e `[std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, iterator>` forem ambos falsos, e
  * `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente,

o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_set/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_set/bucket_count>), um `rehashing` ocorre.
Se ocorrer `rehashing` (devido à inserção), todos os `iterators` são invalidados. Caso contrário (sem `rehashing`), os `iterators` não são invalidados. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtido enquanto ele está no `node handle` são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos. (desde C++17)

### Parâmetros

- **hint** — `iterator`, usado como uma sugestão de onde inserir o conteúdo
- **value** — valor do elemento a ser inserido
- **first, last** — `range` de elementos a serem inseridos
- **ilist** — `initializer list` de onde inserir os valores
- **nh** — um [node handle](<#/doc/container/node_handle>) compatível
- **obj** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1,2) Um `pair` consistindo de um `iterator` para o elemento inserido (ou para o elemento que impediu a inserção) e um valor `bool` definido como `true` se e somente se a inserção ocorreu.

3,4) Um `iterator` para o elemento inserido, ou para o elemento que impediu a inserção.

5,6) (nenhum)

7) Um objeto de [`insert_return_type`](<#/doc/container/unordered_set>) com os membros inicializados da seguinte forma:

  * Se `nh` estiver vazio, `inserted` é `false`, `position` é `end()`, e `node` está vazio.
  * Caso contrário, se a inserção ocorreu, `inserted` é `true`, `position` aponta para o elemento inserido, e `node` está vazio.
  * Se a inserção falhou, `inserted` é `false`, `node` tem o valor anterior de `nh`, e `position` aponta para um elemento com uma chave equivalente a `nh.key()`.

8) `Iterator` final se `nh` estava vazio, `iterator` apontando para o elemento inserido se a inserção ocorreu, e `iterator` apontando para um elemento com uma chave equivalente a `nh.key()` se falhou.

9) Um `pair` consistindo de um `iterator` para o elemento inserido (ou para o elemento que impediu a inserção) e um valor `bool` definido como `true` se e somente se a inserção ocorreu.

10) Um `iterator` para o elemento inserido, ou para o elemento que impediu a inserção.

### Exceções

1-4) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

| Esta seção está incompleta
Razão: casos 5-10

### Complexidade

1-4) Caso médio: `O(1)`, pior caso `O(size())`.

5,6) Caso médio: `O(N)`, onde N é o número de elementos a serem inseridos. Pior caso: `O(N * size() + N)`.

7-10) Caso médio: `O(1)`, pior caso `O(size())`.

### Observações

A inserção com `hint` (3,4) não retorna um `boolean` para ser compatível em assinatura com a inserção posicional em `containers` sequenciais, como [std::vector::insert](<#/doc/container/vector/insert>). Isso torna possível criar `inserters` genéricos como [std::inserter](<#/doc/iterator/inserter>). Uma maneira de verificar o sucesso de uma inserção com `hint` é comparar [`size()`](<#/doc/container/unordered_set/size>) antes e depois.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers](<#/doc/container>) associativos [ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). ([9,10](<#/doc/container/unordered_set/insert>))

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <unordered_set>
    
    std::ostream& operator<<(std::ostream& os, std::unordered_set<int> const& s)
    {
        for (os << '[' << s.size() << "] { "; int i : s)
            os << i << ' ';
        return os << "}\n";
    }
    
    int main ()
    {
        std::unordered_set<int> nums{2, 3, 4};
    
        std::cout << "1) Initially: " << nums << std::boolalpha;
        auto p = nums.insert(1); // insert element, overload (1)
        std::cout << "2) '1' was inserted: " << p.second << '\n';
        std::cout << "3) After insertion: " << nums;
    
        nums.insert(p.first, 0); // insert with hint, overload (3)
        std::cout << "4) After insertion: " << nums;
    
        std::array<int, 4> a = {10, 11, 12, 13};
        nums.insert(a.begin(), a.end()); // insert range, overload (5)
        std::cout << "5) After insertion: " << nums;
    
        nums.insert({20, 21, 22, 23}); // insert initializer_list, (6)
        std::cout << "6) After insertion: " << nums;
    
        std::unordered_set<int> other_nums = {42, 43};
        auto node = other_nums.extract(other_nums.find(42));
        nums.insert(std::move(node)); // insert node, overload (7)
        std::cout << "7) After insertion: " << nums;
    
        node = other_nums.extract(other_nums.find(43));
        nums.insert(nums.begin(), std::move(node)); // insert node with hint, (8)
        std::cout << "8) After insertion: " << nums;
    }
```

Saída possível:
```
    1) Initially: [3] { 4 3 2 }
    2) '1' was inserted: true
    3) After insertion: [4] { 1 2 3 4 }
    4) After insertion: [5] { 0 1 2 3 4 }
    5) After insertion: [9] { 13 12 11 10 4 3 2 1 0 }
    6) After insertion: [13] { 23 22 13 12 11 10 21 4 20 3 2 1 0 }
    7) After insertion: [14] { 42 23 22 13 12 11 10 21 4 20 3 2 1 0 }
    8) After insertion: [15] { 43 42 23 22 13 12 11 10 21 4 20 3 2 1 0 }
```

### Veja também

[ emplace](<#/doc/container/unordered_set/emplace>) | constrói elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/unordered_set/emplace_hint>) | constrói elementos no local usando um hint
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido do argumento
(modelo de função)