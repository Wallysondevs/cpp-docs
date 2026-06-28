# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::try_emplace

```cpp
template< class... Args >
std::pair<iterator, bool> try_emplace( const Key& k, Args&&... args );  // (1) (desde C++17)
template< class... Args >
std::pair<iterator, bool> try_emplace( Key&& k, Args&&... args );  // (2) (desde C++17)
template< class K, class... Args >
std::pair<iterator, bool> try_emplace( K&& k, Args&&... args );  // (3) (desde C++26)
template< class... Args >
iterator try_emplace( const_iterator hint, const Key& k, Args&&... args );  // (4) (desde C++17)
template< class... Args >
iterator try_emplace( const_iterator hint, Key&& k, Args&&... args );  // (5) (desde C++17)
template< class K, class... Args >
iterator try_emplace( const_iterator hint, K&& k, Args&&... args );  // (6) (desde C++26)
```

  
Se uma chave equivalente a `k` já existe no container, não faz nada. Caso contrário, insere um novo elemento no container com a chave `k` e o valor construído com `args`. Nesse caso: 

1) Comporta-se como [`emplace`](<#/doc/container/unordered_map/emplace>), exceto que o elemento é construído como  
value_type([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(k),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...))

2) Comporta-se como [`emplace`](<#/doc/container/unordered_map/emplace>), exceto que o elemento é construído como  
value_type([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(std::move(k)),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...))

3) Comporta-se como [`emplace`](<#/doc/container/unordered_map/emplace>), exceto que o elemento é construído como  
value_type([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;K&gt;(k)),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...))

4) Comporta-se como [`emplace_hint`](<#/doc/container/unordered_map/emplace_hint>), exceto que o elemento é construído como  
value_type([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(k),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...))

5) Comporta-se como [`emplace_hint`](<#/doc/container/unordered_map/emplace_hint>), exceto que o elemento é construído como  
value_type([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(std::move(k)),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...))

6) Comporta-se como [`emplace_hint`](<#/doc/container/unordered_map/emplace_hint>), exceto que o elemento é construído como  
value_type([std::piecewise_construct](<#/doc/utility/piecewise_construct_t>),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;K&gt;(k)),  

[std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...))

1-6) Se `value_type` não for [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `unordered_map` a partir da expressão correspondente, o comportamento é indefinido.

3) Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: 

  * [std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, const_iterator> e [std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, iterator> são ambos falsos. 
  * `Hash::is_transparent` e `KeyEqual::is_transparent` são válidos e cada um denota um tipo.

Se `hash_function()(u.first) != hash_function()(k) || contains(u.first)` for verdadeiro, o comportamento é indefinido, onde `u` é o novo elemento a ser inserido.

6) Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem ambos válidos e cada um denotar um tipo.

Se `hash_function()(u.first) != hash_function()(k) || contains(u.first)` for verdadeiro, o comportamento é indefinido, onde `u` é o novo elemento a ser inserido.

Se após a operação o novo número de elementos for maior que o antigo [`max_load_factor()`](<#/doc/container/unordered_map/max_load_factor>)` *` `[`bucket_count()`](<#/doc/container/unordered_map/bucket_count>), um rehashing ocorre. Se o rehashing ocorrer (devido à inserção), todos os iterators são invalidados. Caso contrário (sem rehashing), os iterators não são invalidados. 

### Parâmetros

k  |  \-  |  a chave usada tanto para procurar quanto para inserir se não encontrada   
---|---|---
hint  |  \-  |  iterator para a posição antes da qual o novo elemento será inserido   
args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

1-3) O mesmo que para [`emplace`](<#/doc/container/unordered_map/emplace>):  
Um pair consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como true se e somente se a inserção ocorreu.

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/unordered_map/emplace_hint>):  
Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

### Complexidade

1-3) O mesmo que para [`emplace`](<#/doc/container/unordered_map/emplace>):  
Constante amortizada em média, pior caso linear no tamanho do container.

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/unordered_map/emplace_hint>):  
Constante amortizada em média, pior caso linear no tamanho do container.

### Observações

Ao contrário de [`insert`](<#/doc/container/unordered_map/insert>) ou [`emplace`](<#/doc/container/unordered_map/emplace>), essas funções não movem de argumentos rvalue se a inserção não ocorrer, o que facilita a manipulação de mapas cujos valores são tipos move-only, como [std::unordered_map](<#/doc/container/unordered_map>)<[std::string](<#/doc/string/basic_string>), [std::unique_ptr](<#/doc/memory/unique_ptr>)&lt;foo&gt;>. Além disso, `try_emplace` trata a chave e os argumentos para o `mapped_type` separadamente, ao contrário de [`emplace`](<#/doc/container/unordered_map/emplace>), que requer os argumentos para construir um `value_type` (ou seja, um [std::pair](<#/doc/utility/pair>)). 

As sobrecargas (3,6) podem ser chamadas sem construir um objeto do tipo `Key`. 

Macro de teste de recurso  | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_unordered_map_try_emplace`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | `std::unordered_map::try_emplace`,  
[std::unordered_map::insert_or_assign](<#/doc/container/unordered_map/insert_or_assign>)  
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers](<#/doc/container>) associativos [ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). Sobrecargas ([3](<#/doc/container/unordered_map/try_emplace>)) e ([6](<#/doc/container/unordered_map/try_emplace>)).   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <unordered_map>
    #include <utility>
    
    void print_node(const auto& node)
    {
        std::cout << '[' << node.first << "] = " << node.second << '\n';
    }
    
    void print_result(auto const& pair)
    {
        std::cout << (pair.second ? "inserted: " : "ignored:  ");
        print_node(*pair.first);
    }
    
    int main()
    {
        using namespace std::literals;
        std::unordered_map<std::string, std::string> m;
    
        print_result(m.try_emplace("a", "a"s));
        print_result(m.try_emplace("b", "abcd"));
        print_result(m.try_emplace("c", 10, 'c'));
        print_result(m.try_emplace("c", "Won't be inserted"));
    
        for (const auto& p : m)
            print_node(p);
    }
```

Saída possível: 
```
    inserted: [a] = a
    inserted: [b] = abcd
    inserted: [c] = cccccccccc
    ignored:  [c] = cccccccccc
    [a] = a
    [b] = abcd
    [c] = cccccccccc
```

### Ver também

[ emplace](<#/doc/container/unordered_map/emplace>) |  constrói elemento no local   
(função membro pública)  
[ emplace_hint](<#/doc/container/unordered_map/emplace_hint>) |  constrói elementos no local usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/unordered_map/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)