# std::set&lt;Key,Compare,Allocator&gt;::insert

```cpp
std::pair<iterator, bool> insert( const value_type& value );  // (1)
std::pair<iterator, bool> insert( value_type&& value );  // (2) (desde C++11)
  // (3)
iterator insert( iterator pos, const value_type& value );  // (até C++11)
iterator insert( const_iterator pos, const value_type& value );  // (desde C++11)
iterator insert( const_iterator pos, value_type&& value );  // (4) (desde C++11)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (5)
void insert( std::initializer_list<value_type> ilist );  // (6) (desde C++11)
insert_return_type insert( node_type&& nh );  // (7) (desde C++17)
iterator insert( const_iterator pos, node_type&& nh );  // (8) (desde C++17)
template< class K >
std::pair<iterator, bool> insert( K&& x );  // (9) (desde C++23)
template< class K >
iterator insert( const_iterator pos, K&& x );  // (10) (desde C++23)
```

  
Insere elemento(s) no container, se o container ainda não contiver um elemento com uma chave equivalente.

1,2) Insere value.

3,4) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos.

5) Insere elementos do range `[`first`, `last`)`. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

6) Insere elementos da initializer list ilist. Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

7) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada. Caso contrário, insere o elemento possuído por nh no container, se o container ainda não contiver um elemento com uma chave equivalente a nh.key(). O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

8) Se nh for um [node handle](<#/doc/container/node_handle>) vazio, não faz nada e retorna o iterator end. Caso contrário, insere o elemento possuído por nh no container, se o container ainda não contiver um elemento com uma chave equivalente a nh.key(), e retorna o iterator apontando para o elemento com chave equivalente a nh.key()(independentemente de a inserção ter sido bem-sucedida ou falhado). Se a inserção for bem-sucedida, nh é movido, caso contrário, ele retém a propriedade do elemento. O elemento é inserido o mais próximo possível da posição imediatamente anterior a pos. O comportamento é indefinido se nh não estiver vazio e get_allocator() != nh.get_allocator().

9) Se *this já contiver um elemento que se compara transparentemente como _equivalente_ a x, não faz nada. Caso contrário, constrói um objeto `u` do [`value_type`](<#/doc/container/set>) com [std::forward](<#/doc/utility/forward>)&lt;K&gt;(x) e então insere `u` em *this. Se equal_range(u) == equal_range(x) for falso, o comportamento é indefinido. O `value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `set` a partir de [std::forward](<#/doc/utility/forward>)&lt;K&gt;(x). Esta sobrecarga participa da resolução de sobrecarga somente se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

10) Se *this já contiver um elemento que se compara transparentemente como _equivalente_ a x, não faz nada. Caso contrário, constrói um objeto `u` do [`value_type`](<#/doc/container/set>) com [std::forward](<#/doc/utility/forward>)&lt;K&gt;(x) e então insere `u` em *this na posição o mais próximo possível da posição imediatamente anterior a pos. Se equal_range(u) == equal_range(x) for falso, o comportamento é indefinido. O `value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `set` a partir de [std::forward](<#/doc/utility/forward>)&lt;K&gt;(x). Esta sobrecarga participa da resolução de sobrecarga somente se: 

  * [std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, const_iterator> e [std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, iterator> forem ambos falsos, e 
  * o qualified-id Compare::is_transparent for válido e denotar um tipo, 

o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

Nenhum iterator ou referência é invalidado. Se a inserção for bem-sucedida, ponteiros e referências para o elemento obtidos enquanto ele está contido no node handle são invalidados, e ponteiros e referências obtidos para esse elemento antes de ser extraído tornam-se válidos.(desde C++17)

### Parâmetros

pos  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
---|---|---
value  |  \-  |  valor do elemento a ser inserido   
first, last  |  \-  |  range de elementos a serem inseridos   
ilist  |  \-  |  initializer list da qual inserir os valores   
nh  |  \-  |  um [node handle](<#/doc/container/node_handle>) compatível  
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
  
### Valor de retorno

1,2) Um pair consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor bool definido como true se e somente se a inserção ocorreu.

3,4) Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

5,6) (nenhum)

7) Um objeto de [`insert_return_type`](<#/doc/container/set>) com os membros inicializados da seguinte forma: 

  * Se nh estiver vazio, `inserted` é false, `position` é end(), e `node` está vazio. 
  * Caso contrário, se a inserção ocorreu, `inserted` é true, `position` aponta para o elemento inserido, e `node` está vazio. 
  * Se a inserção falhou, `inserted` é false, `node` tem o valor anterior de nh, e `position` aponta para um elemento com uma chave equivalente a nh.key().

8) Iterator end se nh estava vazio, iterator apontando para o elemento inserido se a inserção ocorreu, e iterator apontando para um elemento com uma chave equivalente a nh.key() se falhou.

9) Um pair consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor bool definido como true se e somente se a inserção ocorreu.

10) Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

### Exceções

1-4) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

| Esta seção está incompleta  
Razão: casos 5-8, 9, 10   
  
### Complexidade

1,2) Logarítmica no tamanho do container, `O(log(size()))`.

3,4) Constante amortizada se a inserção ocorrer na posição imediatamente _depois_(até C++11)_antes_(desde C++11) de pos, logarítmica no tamanho do container caso contrário.

5,6) `O(N·log(size() + N))`, onde `N` é o número de elementos a serem inseridos.

7) Logarítmica no tamanho do container, `O(log(size()))`.

8) Constante amortizada se a inserção ocorrer na posição imediatamente _antes_ de pos, logarítmica no tamanho do container caso contrário.

9) Logarítmica no tamanho do container, `O(log(size()))`.

10) Constante amortizada se a inserção ocorrer na posição imediatamente _antes_ de pos, logarítmica no tamanho do container caso contrário.

### Notas

A inserção com hint (3,4) não retorna um booleano para ser compatível em assinatura com a inserção posicional em containers sequenciais, como [std::vector::insert](<#/doc/container/vector/insert>). Isso torna possível criar inserters genéricos como [std::inserter](<#/doc/iterator/inserter>). Uma maneira de verificar o sucesso de uma inserção com hint é comparar [`size()`](<#/doc/container/set/size>) antes e depois. 

As sobrecargas ([5,6](<#/doc/container/set/insert>)) são frequentemente implementadas como um loop que chama a sobrecarga ([3](<#/doc/container/set/insert>)) com [end()](<#/doc/container/set/end>) como hint; elas são otimizadas para anexar uma sequência ordenada (como outro [std::set](<#/doc/container/set>)) cujo menor elemento é maior que o último elemento em *this. 

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em containers associativos [ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). ([9,10](<#/doc/container/set/insert>))  
  
### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <iostream>
    #include <set>
    
    int main()
    {
        std::set<int> set;
    
        auto result_1 = set.insert(3);
        assert(result_1.first != set.end()); // it is a valid iterator
        assert(*result_1.first == 3);
        if (result_1.second)
            std::cout << "insert done\n";
    
        auto result_2 = set.insert(3);
        assert(result_2.first == result_1.first); // same iterator
        assert(*result_2.first == 3);
        if (!result_2.second)
            std::cout << "no insertion\n";
    }
```

Saída: 
```
    insert done
    no insertion
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 233](<https://cplusplus.github.io/LWG/issue233>) | C++98  | pos era apenas um hint, podia ser totalmente ignorado  | a inserção é exigida para ser o mais próximo possível da posição imediatamente anterior a pos  
[LWG 264](<https://cplusplus.github.io/LWG/issue264>) | C++98  | a complexidade da sobrecarga (5) era exigida como linear se o range `[`first`, `last`)` fosse ordenado de acordo com `Compare` | removeu o requisito linear neste caso especial   
[LWG 316](<https://cplusplus.github.io/LWG/issue316>) | C++98  | no valor de retorno da sobrecarga (1), não era especificado qual valor bool indicava uma inserção bem-sucedida  | o sucesso é indicado por true  
  
### Veja também

[ emplace](<#/doc/container/set/emplace>)(desde C++11) |  constrói elemento no local   
(função membro pública)  
[ emplace_hint](<#/doc/container/set/emplace_hint>)(desde C++11) |  constrói elementos no local usando um hint   
(função membro pública)  
[ inserter](<#/doc/iterator/inserter>) |  cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento   
(function template)