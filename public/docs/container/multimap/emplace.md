# std::multimap&lt;Key,T,Compare,Allocator&gt;::emplace

```cpp
template< class... Args >
iterator emplace( Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, construído in-place com os `args` fornecidos.

O construtor do novo elemento (isto é, [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;) é chamado com exatamente os mesmos argumentos fornecidos a `emplace`, encaminhados via [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)....

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou movimentação desnecessárias.

Nenhum iterator ou referência é invalidado.

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um iterator para o elemento inserido.

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

Logarítmica no tamanho do container.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <utility>
    #include <map>
     
    int main()
    {
        std::multimap<std::string, std::string> m;
     
        // uses pair's move constructor
        m.emplace(std::make_pair(std::string("a"), std::string("a")));
     
        // uses pair's converting move constructor
        m.emplace(std::make_pair("b", "abcd"));
     
        // uses pair's template constructor
        m.emplace("d", "ddd");
     
        // emplace with duplicate key 
        m.emplace("d", "DDD");
     
        // uses pair's piecewise constructor
        m.emplace(std::piecewise_construct,
                  std::forward_as_tuple("c"),
                  std::forward_as_tuple(10, 'c'));
     
        for (const auto& p : m)
            std::cout << p.first << " => " << p.second << '\n';
    }
```

Saída: 
```
    a => a
    b => abcd
    c => cccccccccc
    d => ddd
    d => DDD
```

### Veja também

[ emplace_hint](<#/doc/container/multimap/emplace_hint>)(desde C++11) |  constrói elementos in-place usando uma dica   
(função membro pública)  
[ try_emplace](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/multimap/try_emplace&action=edit&redlink=1> "cpp/container/multimap/try emplace \(page does not exist\)") |  insere in-place se a chave não existe, não faz nada se a chave existe   
(função membro pública)  
[ insert](<#/doc/container/multimap/insert>) |  insere elementos ou nós (desde C++17)   
(função membro pública)