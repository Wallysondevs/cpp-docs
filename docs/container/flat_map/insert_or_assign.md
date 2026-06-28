# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::insert_or_assign

```cpp
template< class M >
std::pair<iterator, bool> insert_or_assign( const key_type& k, M&& obj );  // (1) (desde C++23)
template< class M >
std::pair<iterator, bool> insert_or_assign( key_type&& k, M&& obj );  // (2) (desde C++23)
template< class K, class M >
std::pair<iterator, bool> insert_or_assign( K&& k, M&& obj );  // (3) (desde C++23)
template< class M >
iterator insert_or_assign( const_iterator hint, const key_type& k, M&& obj );  // (4) (desde C++23)
template< class M >
iterator insert_or_assign( const_iterator hint, key_type&& k, M&& obj );  // (5) (desde C++23)
template< class K, class M >
iterator insert_or_assign( const_iterator hint, K&& k, M&& obj );  // (6) (desde C++23)
```

  
1,2) Se uma chave equivalente a `k` já existe no container, atribui [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj) ao [`mapped_type`](<#/doc/container/flat_map>) correspondente à chave `k`. Se a chave não existe, insere o novo valor como se por 

  * (1,2) try_emplace([std::forward](<#/doc/utility/forward>)<decltype(k)>(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)), 
  * (4,5) try_emplace(hint, [std::forward](<#/doc/utility/forward>)<decltype(k)>(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)).

O programa é malformado se [std::is_assignable_v](<#/doc/types/is_assignable>)<mapped_type&, M> ou [std::is_constructible_v](<#/doc/types/is_constructible>)<mapped_type, M> for falso.

3,6) Se uma chave equivalente a `k` já existe no container, atribui [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj) ao [`mapped_type`](<#/doc/container/flat_map>) correspondente à chave `k`. Caso contrário, é equivalente a 

  * (3) try_emplace([std::forward](<#/doc/utility/forward>)&lt;K&gt;(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)), 
  * (6) try_emplace(hint, [std::forward](<#/doc/utility/forward>)&lt;K&gt;(k), [std::forward](<#/doc/utility/forward>)&lt;M&gt;(obj)).

A conversão de `k` para `key_type` deve construir um objeto `u`, para o qual `find(k) == find(u)` é verdadeiro. Caso contrário, o comportamento é indefinido.

Essas sobrecargas participam da resolução de sobrecarga apenas se: 

  * O qualified-id `Compare::is_transparent` é válido e denota um tipo. 
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<key_type, K> for verdadeiro. 
  * [std::is_assignable_v](<#/doc/types/is_assignable>)<mapped_type&, M> for verdadeiro. 
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<mapped_type, M> for verdadeiro.

| As informações sobre invalidação de iterator são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

k  |  \-  |  a chave usada tanto para procurar quanto para inserir se não encontrada   
---|---|---
hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
obj  |  \-  |  o valor a ser inserido ou atribuído   
  
### Valor de retorno

1-3) O componente `bool` é verdadeiro se a inserção ocorreu e falso se a atribuição ocorreu. O componente `iterator` aponta para o elemento que foi inserido ou atualizado.

4-6) Iterator apontando para o elemento que foi inserido ou atualizado.

### Complexidade

1-3) O mesmo que para [`emplace`](<#/doc/container/flat_map/emplace>).

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/flat_map/emplace_hint>).

### Observações

`insert_or_assign` retorna mais informações do que [`operator`](<#/doc/container/flat_map/operator_at>)[] e não exige a construtibilidade padrão do tipo mapeado. 

### Exemplo

Execute este código
```cpp
    #include <flat_map>
    #include <iostream>
    #include <string>
    
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
        std::flat_map<std::string, std::string> map;
    
        print_result(map.insert_or_assign("a", "apple"));
        print_result(map.insert_or_assign("b", "banana"));
        print_result(map.insert_or_assign("c", "cherry"));
        print_result(map.insert_or_assign("c", "clementine"));
    
        for (const auto& node : map)
            print_node(node);
    }
```

Saída: 
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

[ operator[]](<#/doc/container/flat_map/operator_at>) | acessa ou insere o elemento especificado   
(função membro pública)  
[ at](<#/doc/container/flat_map/at>) | acessa o elemento especificado com verificação de limites   
(função membro pública)  
[ insert](<#/doc/container/flat_map/insert>) | insere elementos   
(função membro pública)  
[ emplace](<#/doc/container/flat_map/emplace>) | constrói o elemento no local   
(função membro pública)  
[ try_emplace](<#/doc/container/flat_map/try_emplace>) | insere no local se a chave não existe, não faz nada se a chave existe   
(função membro pública)