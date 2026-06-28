# std::vector&lt;T,Allocator&gt;::push_back

```cpp
void push_back( const T& value ); |  (1)  |  (constexpr desde C++20)
void push_back( T&& value );  // (2) (desde C++11)
(constexpr desde C++20)
```

  
Adiciona o elemento value fornecido ao final do container.

1) O novo elemento é inicializado como uma cópia de value.

2) value é movido para o novo elemento.

Se após a operação o novo [`size()`](<#/doc/container/vector/size>) for maior que o antigo [`capacity()`](<#/doc/container/vector/capacity>), uma realocação ocorre, caso em que todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados. Caso contrário, apenas o iterator [`end()`](<#/doc/container/vector/end>) é invalidado. 

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado   
Requisitos de tipo   
-`T` deve atender aos requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).   
-`T` deve atender aos requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante amortizada. 

### Exceções

Se uma exceção for lançada (o que pode ser devido a `Allocator::allocate()` ou ao construtor/atribuição de cópia/movimentação do elemento), esta função não tem efeito ([garantia de exceção forte](<#/doc/language/exceptions>)). 

```cpp
Se o move constructor de `T` não for noexcept e `T` não for CopyInsertable neste *this, o vector usará o move constructor que lança exceções. Se ele lançar, a garantia é dispensada e os efeitos são não especificados.  // (desde C++11)
```
  
### Observações

Algumas implementações lançam [std::length_error](<#/doc/error/length_error>) quando `push_back` causa uma realocação que excede [max_size](<#/doc/container/vector/max_size>) (devido a uma chamada implícita a um equivalente de [reserve](<#/doc/container/vector/reserve>)`(`[size](<#/doc/container/vector/size>)`() + 1))`. 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <vector>
     
    int main()
    {
        std::vector<std::string> letters;
     
        letters.push_back("abc");
        std::string s{"def"};
        letters.push_back(std::move(s));
     
        std::cout << "std::vector letters holds: ";
        for (auto&& e : letters)
            std::cout << std::quoted(e) << ' ';
     
        std::cout << "\nMoved-from string s holds: " << std::quoted(s) << '\n';
    }
```

Saída possível: 
```
    std::vector letters holds: "abc" "def"
    Moved-from string s holds: ""
```

### Veja também

[ emplace_back](<#/doc/container/vector/emplace_back>)(C++11) |  constrói um elemento no local no final   
(função membro pública)  
[ pop_back](<#/doc/container/vector/pop_back>) |  remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) |  cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(function template)