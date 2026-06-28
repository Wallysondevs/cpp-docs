# std::deque&lt;T,Allocator&gt;::push_front

```cpp
void push_front( const T& value );  // (1)
void push_front( T&& value );  // (2) (desde C++11)
```

  
Adiciona o valor do elemento fornecido ao início do container.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Nenhuma referência é invalidada.

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado ao início   
  
### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <deque>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::deque<std::string> letters;
    
        letters.push_front("abc");
        std::string s{"def"};
        letters.push_front(std::move(s));
    
        std::cout << "std::deque letters holds: ";
        for (auto&& e : letters)
            std::cout << std::quoted(e) << ' ';
    
        std::cout << "\nMoved-from string s holds: " << std::quoted(s) << '\n';
    }
```

Saída possível:
```
    std::deque letters holds: "def" "abc"
    Moved-from string s holds: ""
```

### Veja também

[ emplace_front](<#/doc/container/deque/emplace_front>)(C++11) |  constrói um elemento no local no início   
(função membro pública)  
[ push_back](<#/doc/container/deque/push_back>) |  adiciona um elemento ao final   
(função membro pública)  
[ pop_front](<#/doc/container/deque/pop_front>) |  remove o primeiro elemento   
(função membro pública)  
[ front_inserter](<#/doc/iterator/front_inserter>) |  cria um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) de tipo inferido a partir do argumento   
(template de função)