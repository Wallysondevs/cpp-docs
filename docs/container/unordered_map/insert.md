# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::insert

```cpp
std::pair<iterator, bool> insert( const value_type& value );  // (1) (desde C++11)
std::pair<iterator, bool> insert( value_type&& value );  // (2) (desde C++17)
template< class P >
std::pair<iterator, bool> insert( P&& value );  // (3) (desde C++11)
iterator insert( const_iterator hint, const value_type& value );  // (4) (desde C++11)
iterator insert( const_iterator hint, value_type&& value );  // (5) (desde C++17)
template< class P >
iterator insert( const_iterator hint, P&& value );  // (6) (desde C++11)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (7) (desde C++11)
void insert( std::initializer_list<value_type> ilist );  // (8) (desde C++11)
insert_return_type insert( node_type&& nh );  // (9) (desde C++17)
iterator insert( const_iterator hint, node_type&& nh );  // (10) (desde C++17)
```

  
Insere elemento(s) no container, se o container ainda não contiver um elemento com uma chave equivalente.

1-3) Insere `value`.

A sobrecarga (3) é equivalente a emplace([std::forward](<#/doc/utility/forward>)&lt;P&gt;(value)) e só participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true.

4-6) Insere `value`, usando `hint` como uma sugestão não vinculativa de onde a busca deve começar.

A sobrecarga (6) é equivalente a emplace_hint(hint, [std::forward](<#/doc/utility/forward>)&lt;P&gt;(value)) e só participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true.

7) Insere elementos do range `[`first`, `last`)`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

Se `[`first`, `last`)` não for um [range válido](<#/doc/iterator>), ou `first` e/ou `last` forem iterators para *this, o comportamento é indefinido.

8) Insere elementos da initializer list `ilist`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

9) Se `nh` for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por `nh` no container, se o container ainda não contiver um elemento com uma chave equivalente a `nh.key()`. O comportamento é indefinido se `nh` não estiver vazio e `get_allocator() != nh.get_allocator()`.

10) Se `nh` for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o iterator `end`. Caso contrário, insere o elemento possuído por `nh` no container, se o container ainda não contiver um elemento com uma chave equivalente a `nh.key()`, e retorna o iterator apontando para o elemento com chave equivalente a `nh.key()` (independentemente de a inserção ter sido bem-sucedida ou falha). Se a inserção for bem-sucedida, `nh` é movido, caso contrário, ele retém a posse do elemento. `hint` é usado como uma sugestão não vinculativa de onde a busca deve começar. O comportamento é indefinido se `nh` não estiver vazio e `get_allocator() != nh.get_allocator()`.

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_map/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_map/bucket_count>), um rehashing ocorre.
Se um rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtidos enquanto ele é mantido no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos. (desde C++17)

### Parâmetros

hint  |  \-  |  iterator, usado como uma sugestão de onde inserir o conteúdo   
---|---|---
value  |  \-  |  valor do elemento a ser inserido   
first, last  |  \-  |  range de elementos a serem inseridos   
ilist  |  \-  |  initializer list de onde inserir os valores   
nh  |  \-  |  um [node handle](<#/doc/container/node_handle>) compatível  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Valor de retorno

1-3) Um par consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como `true` se e somente se a inserção ocorreu.

4-6) Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

7,8) (nenhum)

9) Um objeto de [`insert_return_type`](<#/doc/container/unordered_map>) com os membros inicializados da seguinte forma: 

  * Se `nh` estiver vazio, `inserted` é `false`, `position` é `end()`, e `node` está vazio. 
  * Caso contrário, se a inserção ocorreu, `inserted` é `true`, `position` aponta para o elemento inserido, e `node` está vazio. 
  * Se a inserção falhou, `inserted` é `false`, `node` tem o valor anterior de `nh`, e `position` aponta para um elemento com uma chave equivalente a `nh.key()`.

10) Iterator `end` se `nh` estava vazio, iterator apontando para o elemento inserido se a inserção ocorreu, e iterator apontando para um elemento com uma chave equivalente a `nh.key()` se falhou.

### Exceções

1-6) Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

7,8) Nenhuma garantia de segurança de exceção.

9,10) Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

1-6) Caso médio: `O(1)`, pior caso `O(size())`.

7,8) Caso médio: `O(N)`, onde N é o número de elementos a serem inseridos. Pior caso: `O(N * size() + N)`.

9,10) Caso médio: `O(1)`, pior caso `O(size())`.

### Notas

A inserção com `hint` (4-6) não retorna um booleano para ser compatível em assinatura com a inserção posicional em containers sequenciais, como [std::vector::insert](<#/doc/container/vector/insert>). Isso torna possível criar inserters genéricos como [std::inserter](<#/doc/iterator/inserter>). Uma maneira de verificar o sucesso de uma inserção com `hint` é comparar [`size()`](<#/doc/container/unordered_map/size>) antes e depois. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <unordered_map>
     
    int main ()
    {
        std::unordered_map<int, std::string> dict = {{1, "one"}, {2, "two"}};
        dict.insert({3, "three"});
        dict.insert(std::make_pair(4, "four"));
        dict.insert({{4, "another four"}, {5, "five"}});
     
        const bool ok = dict.insert({1, "another one"}).second;
        std::cout << "inserting 1 => \"another one\" "
                  << (ok ? "succeeded" : "failed") << '\n';
     
        std::cout << "contents:\n";
        for (auto& p : dict)
            std::cout << ' ' << p.first << " => " << p.second << '\n';
    }
```

Saída possível: 
```
    inserting 1 => "another one" failed
    contents:
     5 => five
     1 => one
     2 => two
     3 => three
     4 => four
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2005](<https://cplusplus.github.io/LWG/issue2005>) | C++11  | sobrecargas (3,6) só participariam da resolução de sobrecarga se `P` fosse implicitamente conversível para `value_type` | só participa se `value_type` for construtível a partir de `P&&`  
  
### Veja também

[ emplace](<#/doc/container/unordered_map/emplace>) |  constrói elemento no local   
(função membro pública)  
[ emplace_hint](<#/doc/container/unordered_map/emplace_hint>) |  constrói elementos no local usando um hint   
(função membro pública)  
[ insert_or_assign](<#/doc/container/unordered_map/insert_or_assign>)(C++17) |  insere um elemento ou atribui ao elemento atual se a chave já existe   
(função membro pública)  
[ inserter](<#/doc/iterator/inserter>) |  cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento   
(template de função)