# std::list&lt;T,Allocator&gt;::push_back

```cpp
void push_back( const T& value );  // (1)
void push_back( T&& value );  // (2) (desde C++11)
```

  
Adiciona o valor do elemento fornecido ao final do container.

1) O novo elemento é inicializado como uma cópia de value.

2) value é movido para o novo elemento.

Nenhum iterator ou referência é invalidado.

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado   
Requisitos de tipo   
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).   
-`T` deve satisfazer os requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exceções

Se uma exceção for lançada (o que pode ser devido a `Allocator::allocate()` ou ao construtor/operador de atribuição de cópia/movimentação do elemento), esta função não tem efeito ([garantia de exceção forte](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <list>
     
    int main()
    {
        std::list<std::string> letters;
     
        letters.push_back("abc");
        std::string s{"def"};
        letters.push_back(std::move(s));
     
        std::cout << "std::list letters holds: ";
        for (auto&& e : letters)
            std::cout << std::quoted(e) << ' ';
     
        std::cout << "\nMoved-from string s holds: " << std::quoted(s) << '\n';
    }
```

Saída possível: 
```
    std::list letters holds: "abc" "def"
    Moved-from string s holds: ""
```

### Veja também

[ emplace_back](<#/doc/container/list/emplace_back>)(C++11) |  constrói um elemento no local no final   
(public member function)  
[ push_front](<#/doc/container/list/push_front>) |  insere um elemento no início   
(public member function)  
[ pop_back](<#/doc/container/list/pop_back>) |  remove o último elemento   
(public member function)  
[ back_inserter](<#/doc/iterator/back_inserter>) |  cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(function template)