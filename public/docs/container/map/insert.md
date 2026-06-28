# std::map&lt;Key,T,Compare,Allocator&gt;::insert

```cpp
std::pair<iterator, bool> insert( const value_type& value );  // (1)
template< class P >
std::pair<iterator, bool> insert( P&& value );  // (2) (desde C++11)
std::pair<iterator, bool> insert( value_type&& value );  // (3) (desde C++17)
  // (4)
iterator insert( iterator pos, const value_type& value );  // (até C++11)
iterator insert( const_iterator pos, const value_type& value );  // (desde C++11)
template< class P >
iterator insert( const_iterator pos, P&& value );  // (5) (desde C++11)
iterator insert( const_iterator pos, value_type&& value );  // (6) (desde C++17)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (7)
void insert( std::initializer_list<value_type> ilist );  // (8) (desde C++11)
insert_return_type insert( node_type&& nh );  // (9) (desde C++17)
iterator insert( const_iterator pos, node_type&& nh );  // (10) (desde C++17)
```

  
Insere elemento(s) no container, se o container ainda não contiver um elemento com uma chave equivalente.

1-3) Insere o valor.

A sobrecarga (2) é equivalente a emplace([std::forward](<#/doc/utility/forward>)&lt;P&gt;(value)) e só participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true.

4-6) Insere o valor na posição o mais próximo possível da posição imediatamente anterior a pos.

A sobrecarga (5) é equivalente a emplace_hint(hint, [std::forward](<#/doc/utility/forward>)&lt;P&gt;(value)) e só participa da resolução de sobrecarga se [std::is_constructible](<#/doc/types/is_constructible>)<value_type, P&&>::value == true.

7) Insere elementos do range `[`first`, `last`)`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

8) Insere elementos da initializer list ilist. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

9) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por nh no container, se o container ainda não contiver um elemento com uma chave equivalente a nh.key(). O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

10) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o iterator `end`. Caso contrário, insere o elemento possuído por nh no container, se o container ainda não contiver um elemento com uma chave equivalente a nh.key(), e retorna o iterator apontando para o elemento com chave equivalente a nh.key() (independentemente de a inserção ter sido bem-sucedida ou falha). Se a inserção for bem-sucedida, nh é movido, caso contrário, ele retém a propriedade do elemento. O elemento é inserido o mais próximo possível da posição imediatamente anterior a pos. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

Nenhum iterator ou referência é invalidado. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtidos enquanto ele estava no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos. (desde C++17)

### Parâmetros

pos  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
---|---|---
value  |  \-  |  valor do elemento a ser inserido   
first, last  |  \-  |  range de elementos a serem inseridos   
ilist  |  \-  |  initializer list da qual os valores serão inseridos   
nh  |  \-  |  um [node handle](<#/doc/container/node_handle>) compatível  
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Valor de retorno

1-3) Um pair consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como `true` se e somente se a inserção ocorreu.

4-6) Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

7,8) (nenhum)

9) Um objeto de [`insert_return_type`](<#/doc/container/map>) com os membros inicializados da seguinte forma: 

  * Se nh estiver vazio, `inserted` é `false`, `position` é `end()`, e `node` está vazio. 
  * Caso contrário, se a inserção ocorreu, `inserted` é `true`, `position` aponta para o elemento inserido, e `node` está vazio. 
  * Se a inserção falhou, `inserted` é `false`, `node` tem o valor anterior de nh, e `position` aponta para um elemento com uma chave equivalente a nh.key().

10) Iterator `end` se nh estava vazio, iterator apontando para o elemento inserido se a inserção ocorreu, e iterator apontando para um elemento com uma chave equivalente a nh.key() se falhou.

### Exceções

1-6) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

| Esta seção está incompleta  
Razão: casos 7-10   
  
### Complexidade

1-3) Logarítmica no tamanho do container, `O(log(size()))`.

4-6) Constante amortizada se a inserção ocorrer na posição imediatamente _depois_ (até C++11) _antes_ (desde C++11) de pos, logarítmica no tamanho do container caso contrário.

7,8) `O(N·log(size() + N))`, onde `N` é o número de elementos a serem inseridos.

9) Logarítmica no tamanho do container, `O(log(size()))`.

10) Constante amortizada se a inserção ocorrer na posição imediatamente _antes_ de pos, logarítmica no tamanho do container caso contrário.

### Notas

A inserção com hint (4-6) não retorna um booleano para ser compatível em assinatura com a inserção posicional em containers sequenciais, como [std::vector::insert](<#/doc/container/vector/insert>). Isso torna possível criar inserters genéricos como [std::inserter](<#/doc/iterator/inserter>). Uma maneira de verificar o sucesso de uma inserção com hint é comparar [`size()`](<#/doc/container/map/size>) antes e depois. 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <map>
    #include <string>
    using namespace std::literals;
     
    template<typename It>
    void print_insertion_status(It it, bool success)
    {
        std::cout << "Insertion of " << it->first
                  << (success ? " succeeded\n" : " failed\n");
    }
     
    int main()
    {
        std::map<std::string, float> heights;
     
        // Overload 3: insert from rvalue reference
        const auto [it_hinata, success] = heights.insert({"Hinata"s, 162.8});
        print_insertion_status(it_hinata, success);
     
        {
            // Overload 1: insert from lvalue reference
            const auto [it, success2] = heights.insert(*it_hinata);
            print_insertion_status(it, success2);
        }
        {
            // Overload 2: insert via forwarding to emplace
            const auto [it, success] = heights.insert(std::pair{"Kageyama", 180.6});
            print_insertion_status(it, success);
        }
        {
            // Overload 6: insert from rvalue reference with positional hint
            const std::size_t n = std::size(heights);
            const auto it = heights.insert(it_hinata, {"Azumane"s, 184.7});
            print_insertion_status(it, std::size(heights) != n);
        }
        {
            // Overload 4: insert from lvalue reference with positional hint
            const std::size_t n = std::size(heights);
            const auto it = heights.insert(it_hinata, *it_hinata);
            print_insertion_status(it, std::size(heights) != n);
        }
        {
            // Overload 5: insert via forwarding to emplace with positional hint
            const std::size_t n = std::size(heights);
            const auto it = heights.insert(it_hinata, std::pair{"Tsukishima", 188.3});
            print_insertion_status(it, std::size(heights) != n);
        }
     
        auto node_hinata = heights.extract(it_hinata);
        std::map<std::string, float> heights2;
     
        // Overload 7: insert from iterator range
        heights2.insert(std::begin(heights), std::end(heights));
     
        // Overload 8: insert from initializer_list
        heights2.insert({{"Kozume"s, 169.2}, {"Kuroo", 187.7}});
     
        // Overload 9: insert node
        const auto status = heights2.insert(std::move(node_hinata));
        print_insertion_status(status.position, status.inserted);
     
        node_hinata = heights2.extract(status.position);
        {
            // Overload 10: insert node with positional hint
            const std::size_t n = std::size(heights2);
            const auto it = heights2.insert(std::begin(heights2), std::move(node_hinata));
            print_insertion_status(it, std::size(heights2) != n);
        }
     
        // Print resulting map
        std::cout << std::left << '\n';
        for (const auto& [name, height] : heights2)
            std::cout << std::setw(10) << name << " | " << height << "cm\n";
    }
```

Saída: 
```
    Insertion of Hinata succeeded
    Insertion of Hinata failed
    Insertion of Kageyama succeeded
    Insertion of Azumane succeeded
    Insertion of Hinata failed
    Insertion of Tsukishima succeeded
    Insertion of Hinata succeeded
    Insertion of Hinata succeeded
     
    Azumane    | 184.7cm
    Hinata     | 162.8cm
    Kageyama   | 180.6cm
    Kozume     | 169.2cm
    Kuroo      | 187.7cm
    Tsukishima | 188.3cm
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 233](<https://cplusplus.github.io/LWG/issue233>) | C++98  | pos era apenas um hint, podia ser totalmente ignorado  | a inserção é exigida para ser o mais próximo possível da posição imediatamente anterior a pos  
[LWG 264](<https://cplusplus.github.io/LWG/issue264>) | C++98  | a complexidade da sobrecarga (7) era exigida como linear se o range `[`first`, `last`)` fosse ordenado de acordo com `Compare` | removeu o requisito linear neste caso especial   
[LWG 316](<https://cplusplus.github.io/LWG/issue316>) | C++98  | no valor de retorno da sobrecarga (1), não era especificado qual valor booleano indicava uma inserção bem-sucedida  | o sucesso é indicado por `true`  
[LWG 2005](<https://cplusplus.github.io/LWG/issue2005>) | C++11  | as sobrecargas (2,5) eram mal descritas  | melhorou a descrição   
  
### Veja também

[ emplace](<#/doc/container/map/emplace>)(C++11) |  constrói o elemento no local   
(função membro pública)  
[ emplace_hint](<#/doc/container/map/emplace_hint>)(C++11) |  constrói elementos no local usando um hint   
(função membro pública)  
[ insert_or_assign](<#/doc/container/map/insert_or_assign>)(C++17) |  insere um elemento ou atribui ao elemento atual se a chave já existe   
(função membro pública)  
[ inserter](<#/doc/iterator/inserter>) |  cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) do tipo inferido a partir do argumento   
(function template)