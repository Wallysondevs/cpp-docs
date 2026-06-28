# std::map&lt;Key,T,Compare,Allocator&gt;::insert_or_assign

```cpp
template< class M >
std::pair<iterator, bool> insert_or_assign( const Key& k, M&& obj );  // (1) (desde C++17)
template< class M >
std::pair<iterator, bool> insert_or_assign( Key&& k, M&& obj );  // (2) (desde C++17)
template< class K, class M >
std::pair<iterator, bool> insert_or_assign( K&& k, M&& obj );  // (3) (desde C++26)
template< class M >
iterator insert_or_assign( const_iterator hint, const Key& k, M&& obj );  // (4) (desde C++17)
template< class M >
iterator insert_or_assign( const_iterator hint, Key&& k, M&& obj );  // (5) (desde C++17)
template< class K, class M >
iterator insert_or_assign( const_iterator hint, K&& k, M&& obj );  // (6) (desde C++26)
```

  
1,4) Se uma chave equivalente a k já existe no container, atribui [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj) ao [`mapped_type`](<#/doc/container/map>) correspondente à chave k. Se a chave não existe, insere o novo valor como se por [`insert`](<#/doc/container/map/insert>), construindo-o a partir de value_type(k, [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)).

2,5) O mesmo que (1,4), exceto que o valor mapeado é construído a partir de value_type(std::move(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)).

3,6) Se uma chave equivalente a k já existe no container, atribui [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj) ao [`mapped_type`](<#/doc/container/map>) correspondente à chave k. Se a chave não existe, constrói um objeto `u` do tipo `value_type` com [std::forward](<#/doc/utility/forward>)&lt;K&gt;(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)), então insere `u` em *this. Se equal_range(u.first) == equal_range(k) for falso, o comportamento é indefinido. O `value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `map` a partir de [std::forward](<#/doc/utility/forward>)&lt;K&gt;(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj). Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

O comportamento é indefinido (até C++20) O programa é malformado (desde C++20) se [std::is_assignable_v](<#/doc/types/is_assignable>)<mapped_type&, M&&> for falso. 

Nenhum iterator ou referência é invalidado. 

### Parâmetros

k  |  \-  |  a chave usada tanto para procurar quanto para inserir se não encontrada   
---|---|---
hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
obj  |  \-  |  o valor a ser inserido ou atribuído   
  
### Valor de retorno

1-3) O componente bool é true se a inserção ocorreu e false se a atribuição ocorreu. O componente iterator aponta para o elemento que foi inserido ou atualizado.

4-6) Iterator apontando para o elemento que foi inserido ou atualizado.

### Complexidade

1-3) O mesmo que para [`emplace`](<#/doc/container/map/emplace>).

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/map/emplace_hint>).

### Observações

`insert_or_assign` retorna mais informações do que [`operator`](<#/doc/container/map/operator_at>)[] e não exige a construtibilidade padrão (default-constructibility) do tipo mapeado. 

Macro de teste de recurso  | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_map_try_emplace`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [std::map::try_emplace](<#/doc/container/map/try_emplace>), `std::map::insert_or_assign`  
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers](<#/doc/container>) associativos [ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). Sobrecargas ([3](<#/doc/container/map/insert_or_assign>)) e ([6](<#/doc/container/map/insert_or_assign>)).   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <map>
     
    void print_node(const auto& node)
    {
        std::cout << '[' << node.first << "] = " << node.second << '\n';
    }
     
    void print_result(auto const& pair)
    {
        std::cout << (pair.second ? "inserted: " : "assigned: ");
        print_node(*pair.first);
    }
     
    int main()
    {
        std::map<std::string, std::string> myMap;
     
        print_result(myMap.insert_or_assign("a", "apple"));
        print_result(myMap.insert_or_assign("b", "banana"));
        print_result(myMap.insert_or_assign("c", "cherry"));
        print_result(myMap.insert_or_assign("c", "clementine"));
     
        for (const auto& node : myMap)
            print_node(node);
    }
```

Output: 
```
    inserted: [a] = apple
    inserted: [b] = banana
    inserted: [c] = cherry
    assigned: [c] = clementine
    [a] = apple
    [b] = banana
    [c] = clementine
```

### Veja também

[ operator[]](<#/doc/container/map/operator_at>) |  acessa ou insere o elemento especificado   
(função membro pública)  
[ at](<#/doc/container/map/at>) |  acessa o elemento especificado com verificação de limites   
(função membro pública)  
[ insert](<#/doc/container/map/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)  
[ emplace](<#/doc/container/map/emplace>)(C++11) |  constrói o elemento no local   
(função membro pública)