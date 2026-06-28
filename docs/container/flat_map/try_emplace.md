# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::try_emplace

```cpp
template< class... Args >
std::pair<iterator, bool> try_emplace( const key_type& k, Args&&... args );  // (1) (desde C++23)
template< class... Args >
std::pair<iterator, bool> try_emplace( key_type&& k, Args&&... args );  // (2) (desde C++23)
template< class K, class... Args >
std::pair<iterator, bool> try_emplace( K&& k, Args&&... args );  // (3) (desde C++23)
template< class... Args >
iterator try_emplace( const_iterator hint, const key_type& k, Args&&... args );  // (4) (desde C++23)
template< class... Args >
iterator try_emplace( const_iterator hint, key_type&& k, Args&&... args );  // (5) (desde C++23)
template< class K, class... Args >
iterator try_emplace( const_iterator hint, K&& k, Args&&... args );  // (6) (desde C++23)
```

  
Se uma chave equivalente a k já existe no container, não faz nada. Caso contrário, insere um novo elemento nos containers subjacentes `_c_`[`<../flat_map.html#Member_objects> "cpp/container/flat map"`] com a chave k e o valor construído com args. 

1,2,4,5) Equivalente a: 
```cpp
    auto key_it = ranges::upper_bound(c.keys, k, compare);
    auto value_it = c.values.begin() + std::distance(c.keys.begin(), key_it);
    c.keys.insert(key_it, std::forward<decltype(k)>(k));
    c.values.emplace(value_it, std::forward<Args>(args)...);
```

3,6) Equivalente a: 
```cpp
    auto key_it = ranges::upper_bound(c.keys, k, compare);
    auto value_it = c.values.begin() + std::distance(c.keys.begin(), key_it);
    c.keys.emplace(key_it, std::forward<K>(k));
    c.values.emplace(value_it, std::forward<Args>(args)...);
```

A conversão de k para `key_type` deve construir um objeto u, para o qual `find(k) == find(u)` seja verdadeiro. Caso contrário, o comportamento é indefinido.

Essas sobrecargas participam da resolução de sobrecarga apenas se: 

  * O qualified-id `Compare::is_transparent` é válido e denota um tipo. 
  * `[std::is_constructible_v](<#/doc/types/is_constructible>)<key_type, K>` é verdadeiro. 
  * `[std::is_assignable_v](<#/doc/types/is_assignable>)<mapped_type&, Args...>` é verdadeiro. 
  * Apenas para (3), `[std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, const_iterator>` e `[std::is_convertible_v](<#/doc/types/is_convertible>)<K&&, iterator>` são ambos falsos.

| Informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parâmetros

k  |  \-  |  a chave usada tanto para procurar quanto para inserir se não for encontrada   
---|---|---
hint  |  \-  |  iterador para a posição antes da qual o novo elemento será inserido   
args  |  \-  |  argumentos para encaminhar para o construtor do elemento   
  
### Valor de retorno

1-3) O mesmo que para [`emplace`](<#/doc/container/flat_map/emplace>).

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/flat_map/emplace_hint>).

### Complexidade

1-3) O mesmo que para [`emplace`](<#/doc/container/flat_map/emplace>).

4-6) O mesmo que para [`emplace_hint`](<#/doc/container/flat_map/emplace_hint>).

### Observações

Ao contrário de [`insert`](<#/doc/container/flat_map/insert>) ou [`emplace`](<#/doc/container/flat_map/emplace>), essas funções não movem de argumentos rvalue se a inserção não ocorrer, o que facilita a manipulação de mapas cujos valores são tipos *move-only*, como `[std::flat_map](<#/doc/container/flat_map>)<[std::string](<#/doc/string/basic_string>), [std::unique_ptr](<#/doc/memory/unique_ptr>)<foo>>`. Além disso, `try_emplace` trata a chave e os argumentos para o `mapped_type` separadamente, ao contrário de [`emplace`](<#/doc/container/flat_map/emplace>), que exige que os argumentos construam um `value_type` (ou seja, um `[std::pair](<#/doc/utility/pair>)`). 

As sobrecargas ([3,6](<#/doc/container/flat_map/try_emplace>)) podem ser chamadas sem construir um objeto do tipo `key_type`. 

### Exemplo

Execute este código
```cpp 
    #include <flat_map>
    #include <iostream>
    #include <string>
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
        std::map<std::string, std::string> m;
    
        print_result(m.try_emplace( "a", "a"s));
        print_result(m.try_emplace( "b", "abcd"));
        print_result(m.try_emplace( "c", 10, 'c'));
        print_result(m.try_emplace( "c", "Won't be inserted"));
    
        for (const auto& p : m)
            print_node(p);
    }
```

Saída: 
```
    inserted: [a] = a
    inserted: [b] = abcd
    inserted: [c] = cccccccccc
    ignored:  [c] = cccccccccc
    [a] = a
    [b] = abcd
    [c] = cccccccccc
```

### Veja também

[ emplace](<#/doc/container/flat_map/emplace>) | constrói elemento no local   
(função membro pública)  
[ emplace_hint](<#/doc/container/flat_map/emplace_hint>) | constrói elementos no local usando uma dica   
(função membro pública)  
[ insert](<#/doc/container/flat_map/insert>) | insere elementos   
(função membro pública)  
[ insert_or_assign](<#/doc/container/flat_map/insert_or_assign>) | insere um elemento ou atribui ao elemento atual se a chave já existe   
(função membro pública)  