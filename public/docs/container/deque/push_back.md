# std::deque&lt;T,Allocator&gt;::push_back

```cpp
void push_back( const T& value );  // (1)
void push_back( T&& value );  // (2) (desde C++11)
```

  
Adiciona o `value` do elemento fornecido ao final do container.

1) O novo elemento é inicializado como uma cópia de `value`.

2) `value` é movido para o novo elemento.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Nenhuma referência é invalidada.

### Parameters

value  |  \-  |  o valor do elemento a ser adicionado   
Requisitos de tipo   
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).   
-`T` deve satisfazer os requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).   
  
### Return value

(nenhum) 

### Complexity

Constante. 

### Exceptions

Se uma exceção for lançada (o que pode ser devido a `Allocator::allocate()` ou ao construtor/atribuição de cópia/movimentação do elemento), esta função não tem efeito ([garantia de exceção forte](<#/doc/language/exceptions>)). 

### Example

Execute este código
```cpp 
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <deque>
    
    int main()
    {
        std::deque<std::string> letters;
    
        letters.push_back("abc");
        std::string s{"def"};
        letters.push_back(std::move(s));
    
        std::cout << "std::deque letters holds: ";
        for (auto&& e : letters)
            std::cout << std::quoted(e) << ' ';
    
        std::cout << "\nMoved-from string s holds: " << std::quoted(s) << '\n';
    }
```

Saída possível: 
```
    std::deque letters holds: "abc" "def"
    Moved-from string s holds: ""
```

### See also

[ emplace_back](<#/doc/container/deque/emplace_back>)(C++11) |  constrói um elemento no local no final   
(função membro pública)  
[ push_front](<#/doc/container/deque/push_front>) |  insere um elemento no início   
(função membro pública)  
[ pop_back](<#/doc/container/deque/pop_back>) |  remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) |  cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(template de função)