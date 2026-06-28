# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::emplace

```cpp
template< class... Args >
std::pair<iterator, bool> emplace( Args&&... args );  // (desde C++23)
```

  
Insere um novo elemento no container, construído no local com os `args` fornecidos, se não houver um elemento com a chave no container. 

Inicializa um objeto `t` do tipo [std::pair](<#/doc/utility/pair>)<key_type, mapped_type> com [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...; se o map já contiver um elemento cuja chave é equivalente a `t.first`, `*this` permanece inalterado. Caso contrário, equivalente a: 
```
    auto key_it = ranges::upper_bound(c.keys, t.first, compare);
    auto value_it = c.values.begin() + std::distance(c.keys.begin(), key_it);
    c.keys.insert(key_it, std::move(t.first));
    c.values.insert(value_it, std::move(t.second));
```

Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::pair](<#/doc/utility/pair>)<key_type, mapped_type>, Args...> for verdadeiro. 

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou `move` desnecessárias. 

| Informações sobre invalidação de `iterator` são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")  
  
### Parameters

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Return value

Um `pair` consistindo de um `iterator` para o elemento inserido (ou para o elemento que impediu a inserção) e um valor `bool` definido como `true` se e somente se a inserção ocorreu. 

### Exceptions

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). 

### Complexity

Se a inserção ocorrer, linear no tamanho do container, caso contrário, logarítmica no tamanho do container 

### Example

Execute este código
```
    #include <iostream>
    #include <string>
    #include <utility>
    #include <flat_map>
     
    int main()
    {
        std::flat_map<std::string, std::string> m;
     
        // uses pair's move constructor
        m.emplace(std::make_pair(std::string("a"), std::string("a")));
     
        // uses pair's converting move constructor
        m.emplace(std::make_pair("b", "abcd"));
     
        // uses pair's template constructor
        m.emplace("d", "ddd");
     
        // emplace with duplicate key has no effect
        m.emplace("d", "DDD");
     
        // uses pair's piecewise constructor
        m.emplace(std::piecewise_construct,
                  std::forward_as_tuple("c"),
                  std::forward_as_tuple(10, 'c'));
        // an alternative is: m.try_emplace("c", 10, 'c');
     
        for (const auto& p : m)
            std::cout << p.first << " => " << p.second << '\n';
    }
```

Output: 
```
    a => a
    b => abcd
    c => cccccccccc
    d => ddd
```

### See also

[ emplace_hint](<#/doc/container/flat_map/emplace_hint>) | constrói elementos no local usando uma dica   
(public member function)  
[ try_emplace](<#/doc/container/flat_map/try_emplace>) | insere no local se a chave não existir, não faz nada se a chave existir   
(public member function)  
[ insert](<#/doc/container/flat_map/insert>) | insere elementos   
(public member function)