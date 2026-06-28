# std::forward_list&lt;T,Allocator&gt;::push_front

```cpp
void push_front( const T& value );  // (1) (desde C++11)
void push_front( T&& value );  // (2) (desde C++11)
```

  
Adiciona o valor do elemento fornecido ao início do container.

Nenhum iterator ou referência é invalidado.

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado ao início   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exceções

Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)). 

### Exemplo

Run this code
```
    #include <forward_list>
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::forward_list<std::string> letters;
     
        letters.push_front("abc");
        std::string s{"def"};
        letters.push_front(std::move(s));
     
        std::cout << "std::forward_list letters holds: ";
        for (auto&& e : letters)
            std::cout << std::quoted(e) << ' ';
     
        std::cout << "\nMoved-from string s holds: " << std::quoted(s) << '\n';
    }
```

Saída possível: 
```
    std::forward_list letters holds: "def" "abc"
    Moved-from string s holds: ""
```

### Veja também

[ emplace_front](<#/doc/container/forward_list/emplace_front>) |  constrói um elemento no local no início   
(função membro pública)  
[ pop_front](<#/doc/container/forward_list/pop_front>) |  remove o primeiro elemento   
(função membro pública)  
[ front_inserter](<#/doc/iterator/front_inserter>) |  cria um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) de tipo inferido a partir do argumento   
(modelo de função)