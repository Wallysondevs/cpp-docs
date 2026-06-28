# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::insert_or_assign

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

  
1,4) Se uma chave equivalente a k já existe no container, atribui [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj) ao [`mapped_type`](<#/doc/container/unordered_map>) correspondente à chave k. Se a chave não existe, insere o novo valor como se por [`insert`](<#/doc/container/unordered_map/insert>), construindo-o a partir de value_type(k, [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)).

2,5) O mesmo que (1,4), exceto que o valor mapeado é construído a partir de value_type(std::move(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)).

3,6) Se uma chave equivalente a k já existe no container, atribui [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj) ao [`mapped_type`](<#/doc/container/unordered_map>) correspondente à chave k. Se a chave não existe, constrói um objeto `u` do tipo `value_type` com [std::forward](<#/doc/utility/forward>)&lt;K&gt;(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)), então insere `u` em *this. Se hash_function()(u.first) != hash_function()(k) || contains(u.first) for verdadeiro, o comportamento é indefinido. O `value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_map` a partir de [std::forward](<#/doc/utility/forward>)&lt;K&gt;(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj). Esta sobrecarga participa da resolução de sobrecarga apenas se Hash::is_transparent e KeyEqual::is_transparent forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, em conjunto, permite chamar esta função sem construir uma instância de `Key`.

O comportamento é indefinido(ate C++20)O programa é malformado(desde C++20) se [std::is_assignable_v](<#/doc/types/is_assignable>)<mapped_type&, M&&> for falso. 

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_map/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_map/bucket_count>), um rehashing ocorre.  
Se ocorrer rehashing (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. 

### Parameters

k  |  \-  |  a chave usada tanto para procurar quanto para inserir se não encontrada   
---|---|---
hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
obj  |  \-  |  o valor a ser inserido ou atribuído   
  
### Return value

1-3) O componente bool é verdadeiro se a inserção ocorreu e falso se a atribuição ocorreu. O componente iterator aponta para o elemento que foi inserido ou atualizado.

4-6) Iterator apontando para o elemento que foi inserido ou atualizado.

### Complexity

1-3) O mesmo que para [`emplace`](<#/doc/container/unordered_map/emplace>).

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/unordered_map/emplace_hint>).

### Notes

`insert_or_assign` retorna mais informações do que [`operator`](<#/doc/container/unordered_map/operator_at>)[] e não requer a construtibilidade padrão do tipo mapeado. 

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_unordered_map_try_emplace`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | [std::unordered_map::try_emplace](<#/doc/container/unordered_map/try_emplace>),  
`std::unordered_map::insert_or_assign`  
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers] associativos [ordenados] e [não ordenados]. Sobrecargas ([3](<#/doc/container/unordered_map/insert_or_assign>)) e ([6](<#/doc/container/unordered_map/insert_or_assign>)).   
  
### Example

Execute este código
```
    #include <iostream>
    #include <string>
    #include <unordered_map>
     
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
        std::unordered_map<std::string, std::string> myMap;
     
        print_result(myMap.insert_or_assign("a", "apple"));
        print_result(myMap.insert_or_assign("b", "banana"));
        print_result(myMap.insert_or_assign("c", "cherry"));
        print_result(myMap.insert_or_assign("c", "clementine"));
     
        for (const auto& node : myMap)
            print_node(node);
    }
```

Saída possível: 
```
    inserted: [a] = apple
    inserted: [b] = banana
    inserted: [c] = cherry
    assigned: [c] = clementine
    [c] = clementine
    [a] = apple
    [b] = banana
```

### See also

[ operator[]](<#/doc/container/unordered_map/operator_at>) |  acessa ou insere o elemento especificado   
(função membro pública)  
[ at](<#/doc/container/unordered_map/at>) |  acessa o elemento especificado com verificação de limites   
(função membro pública)  
[ insert](<#/doc/container/unordered_map/insert>) |  insere elementos ou nós(desde C++17)   
(função membro pública)  
[ emplace](<#/doc/container/unordered_map/emplace>) |  constrói o elemento no local   
(função membro pública)