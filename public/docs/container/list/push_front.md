# std::list&lt;T,Allocator&gt;::push_front

```cpp
void push_front( const T& value );  // (1)
void push_front( T&& value );  // (2) (desde C++11)
```

  
Adiciona o valor do elemento fornecido ao início do container.

Nenhum iterator ou referência é invalidado.

### Parameters

value  |  \-  |  o valor do elemento a ser adicionado ao início   
  
### Return value

(nenhum) 

### Complexity

Constante. 

### Exceptions

Se uma exceção for lançada por qualquer motivo, estas funções não terão efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)). 

### Example

Run this code
```
    #include <list>
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::list<std::string> letters;
     
        letters.push_front("abc");
        std::string s{"def"};
        letters.push_front(std::move(s));
     
        std::cout << "std::list letters holds: ";
        for (auto&& e : letters)
            std::cout << std::quoted(e) << ' ';
     
        std::cout << "\nMoved-from string s holds: " << std::quoted(s) << '\n';
    }
```

Saída possível: 
```
    std::list letters holds: "def" "abc"
    Moved-from string s holds: ""
```

### See also

[ emplace_front](<#/doc/container/list/emplace_front>)(C++11) |  constrói um elemento no local no início   
(função membro pública)  
[ push_back](<#/doc/container/list/push_back>) |  adiciona um elemento ao final   
(função membro pública)  
[ pop_front](<#/doc/container/list/pop_front>) |  remove o primeiro elemento   
(função membro pública)  
[ front_inserter](<#/doc/iterator/front_inserter>) |  cria um [std::front_insert_iterator](<#/doc/iterator/front_insert_iterator>) de tipo inferido a partir do argumento   
(modelo de função)