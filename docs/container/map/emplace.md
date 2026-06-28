# std::map&lt;Key,T,Compare,Allocator&gt;::emplace

```cpp
template< class... Args >
std::pair<iterator, bool> emplace( Args&&... args );  // (desde C++11)
```

  
Insere um novo elemento no container, construído in-place com os `args` fornecidos, se não houver um elemento com a chave no container.

O construtor do novo elemento (ou seja, [std::pair](<#/doc/utility/pair>)&lt;const Key, T&gt;) é chamado com exatamente os mesmos argumentos fornecidos a `emplace`, encaminhados via [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args).... O elemento pode ser construído mesmo que já exista um elemento com a chave no container, caso em que o elemento recém-construído será destruído imediatamente (veja [`try_emplace()`](<#/doc/container/map/try_emplace>) se este comportamento for indesejável).

O uso cuidadoso de `emplace` permite que o novo elemento seja construído, evitando operações de cópia ou move desnecessárias.

Nenhum iterator ou referência é invalidado.

### Parâmetros

args  |  \-  |  argumentos a serem encaminhados para o construtor do elemento   
  
### Valor de retorno

Um pair consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como true se e somente se a inserção ocorreu.

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
        std::map<std::string, std::string> m;
     
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

Saída: 
```
    a => a
    b => abcd
    c => cccccccccc
    d => ddd
```

### Veja também

[ emplace_hint](<#/doc/container/map/emplace_hint>)(desde C++11) | constrói elementos in-place usando uma dica   
(função membro pública)  
[ try_emplace](<#/doc/container/map/try_emplace>)(desde C++17) | insere in-place se a chave não existe, não faz nada se a chave existe   
(função membro pública)  
[ insert](<#/doc/container/map/insert>) | insere elementos ou nós(desde C++17)   
(função membro pública)