# std::multimap&lt;Key,T,Compare,Allocator&gt;::insert

```cpp
iterator insert( const value_type& value );  // (1)
iterator insert( value_type&& value );  // (2) (desde C++17)
template< class P >
iterator insert( P&& value );  // (3) (desde C++11)
  // (4)
iterator insert( iterator pos, const value_type& value );  // (até C++11)
iterator insert( const_iterator pos, const value_type& value );  // (desde C++11)
iterator insert( const_iterator pos, value_type&& value );  // (5) (desde C++17)
template< class P >
iterator insert( const_iterator pos, P&& value );  // (6) (desde C++11)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (7)
void insert( std::initializer_list<value_type> ilist );  // (8) (desde C++11)
iterator insert( node_type&& nh );  // (9) (desde C++17)
iterator insert( const_iterator pos, node_type&& nh );  // (10) (desde C++17)
```

  
Insere elemento(s) no container. 

1-3) Insere `value`. Se o container tiver elementos com chave equivalente, insere no limite superior desse range.

A sobrecarga (3) é equivalente a `emplace([std::forward](<#/doc/utility/forward>)<P>(value))` e só participa da resolução de sobrecarga se `[std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true`.

4-6) Insere `value` na posição o mais próximo possível da posição imediatamente anterior a `pos`.

A sobrecarga (6) é equivalente a `emplace_hint(hint, [std::forward](<#/doc/utility/forward>)<P>(value))` e só participa da resolução de sobrecarga se `[std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true`.

7) Insere elementos do range `[`first`, `last`)`.

8) Insere elementos da initializer list `ilist`.

9) Se `nh` for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento de propriedade de `nh` no container e retorna um iterator apontando para o elemento inserido. Se um range contendo elementos com chaves equivalentes a `nh.key()` existir no container, o elemento é inserido no final desse range. O comportamento é indefinido se `nh` não estiver vazio e `get_allocator() != nh.get_allocator()`.

10) Se `nh` for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o iterator `end`. Caso contrário, insere o elemento de propriedade de `nh` no container e retorna o iterator apontando para o elemento com chave equivalente a `nh.key()`. O elemento é inserido o mais próximo possível da posição imediatamente anterior a `pos`. O comportamento é indefinido se `nh` não estiver vazio e `get_allocator() != nh.get_allocator()`.

Nenhum iterator ou referência é invalidado. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtidos enquanto ele estava no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos. (desde C++17)

### Parameters

pos  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
---|---|---
value  |  \-  |  valor do elemento a ser inserido   
first, last  |  \-  |  range de elementos a serem inseridos   
ilist  |  \-  |  initializer list da qual os valores serão inseridos   
nh  |  \-  |  um [node handle](<#/doc/container/node_handle>) compatível  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Return value

1-6) Um iterator para o elemento inserido.

7,8) (nenhum)

9,10) Iterator `end` se `nh` estava vazio, iterator apontando para o elemento inserido caso contrário.

### Exceptions

1-6) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

7,8) Nenhuma garantia de segurança contra exceções.

9,10) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

### Complexity

1-3) `O(log(size()))`

4-6) Constante amortizada se a inserção ocorrer na posição imediatamente anterior a `pos`, `O(log(size()))` caso contrário.

7,8) `O(N·log(size() + N))`, onde `N` é o número de elementos a serem inseridos.

9) `O(log(size()))`

10) Constante amortizada se a inserção ocorrer na posição imediatamente anterior a `pos`, `O(log(size()))` caso contrário.

### Example

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <map>
    #include <string>
    #include <string_view>
    #include <utility>
    
    template<class M>
    void print(const std::string_view rem, const M& mmap)
    {
        std::cout << rem << ' ';
        for (const auto& e : mmap)
            std::cout << '{' << e.first << ',' << e.second << "} ";
        std::cout << '\n';
    }
    
    int main()
    {
        // list-initialize
        std::multimap<int, std::string, std::greater<int>> mmap
            {{2, "foo"}, {2, "bar"}, {3, "baz"}, {1, "abc"}, {5, "def"}};
        print("#1", mmap);
    
        // insert using value_type
        mmap.insert(decltype(mmap)::value_type(5, "pqr"));
        print("#2", mmap);
    
        // insert using pair
        mmap.insert(std::pair{6, "uvw"});
        print("#3", mmap);
    
        mmap.insert({7, "xyz"});
        print("#4", mmap);
    
        // insert using initializer_list
        mmap.insert({{5, "one"}, {5, "two"}});
        print("#5", mmap);
    
        // insert using a pair of iterators
        mmap.clear();
        const auto il = {std::pair{1, "ä"}, {2, "ё"}, {2, "ö"}, {3, "ü"}};
        mmap.insert(il.begin(), il.end());
        print("#6", mmap);
    }
```

Saída: 
```
    #1 {5,def} {3,baz} {2,foo} {2,bar} {1,abc}
    #2 {5,def} {5,pqr} {3,baz} {2,foo} {2,bar} {1,abc}
    #3 {6,uvw} {5,def} {5,pqr} {3,baz} {2,foo} {2,bar} {1,abc}
    #4 {7,xyz} {6,uvw} {5,def} {5,pqr} {3,baz} {2,foo} {2,bar} {1,abc}
    #5 {7,xyz} {6,uvw} {5,def} {5,pqr} {5,one} {5,two} {3,baz} {2,foo} {2,bar} {1,abc}
    #6 {3,ü} {2,ё} {2,ö} {1,ä}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 233](<https://cplusplus.github.io/LWG/issue233>) | C++98  | `pos` era apenas uma dica, podia ser totalmente ignorado  | a inserção é exigida para ser o mais próximo possível da posição imediatamente anterior a `pos`  
[LWG 264](<https://cplusplus.github.io/LWG/issue264>) | C++98  | a complexidade da sobrecarga (5) era exigida como linear se o range `[`first`, `last`)` fosse ordenado de acordo com `Compare` | removeu o requisito linear neste caso especial   
[LWG 371](<https://cplusplus.github.io/LWG/issue371>) | C++98  | a ordem dos elementos equivalentes não era garantida de ser preservada  | exigida de ser preservada   
[LWG 2005](<https://cplusplus.github.io/LWG/issue2005>) | C++11  | as sobrecargas (3,6) eram mal descritas  | descrição aprimorada   
  
### Veja também

[ emplace](<#/doc/container/multimap/emplace>)(C++11) |  constrói elemento no local   
(função membro pública)  
[ emplace_hint](<#/doc/container/multimap/emplace_hint>)(C++11) |  constrói elementos no local usando uma dica   
(função membro pública)  
[ inserter](<#/doc/iterator/inserter>) |  cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento   
(template de função)