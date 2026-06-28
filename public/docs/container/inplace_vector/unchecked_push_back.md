# std::inplace_vector&lt;T,N&gt;::unchecked_push_back

```cpp
constexpr reference unchecked_push_back( const T& value );  // (1) (desde C++26)
constexpr reference unchecked_push_back( T&& value );  // (2) (desde C++26)
```

  
Adiciona o `value` do elemento fornecido ao final do container.

Equivalente a: `return *try_push_back([std::forward](<#/doc/utility/forward>)<decltype(value)>(value));`

1) O novo elemento é inicializado como uma cópia de `value`.

2) `value` é movido para o novo elemento.

Antes da chamada a essas funções, `size() < capacity()` deve ser verdadeiro. Caso contrário, o comportamento é indefinido.

Nenhum iterator ou referência é invalidado, exceto [`end()`](<#/doc/container/inplace_vector/end>), que é invalidado se a inserção ocorrer.

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado   
Requisitos de tipo   
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).   
-`T` deve satisfazer os requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).   
  
### Valor de retorno

[`back()`](<#/doc/container/inplace_vector/back>), ou seja, uma referência ao elemento inserido.

### Complexidade

Constante.

### Exceções

Qualquer exceção lançada pela inicialização do elemento inserido.

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Observações

| Esta seção está incompleta  
Razão: Explicar o propósito desta API.   
  
### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <inplace_vector>
    #include <string>
    
    int main()
    {
        std::inplace_vector<std::string, 2> fauna;
        std::string dog{"dog"};
    
        auto& r1 = fauna.unchecked_push_back("cat"); // overload (1)
        assert(r1 == "cat" and fauna.size() == 1);
        auto& r2 = fauna.unchecked_push_back(std::move(dog)); // overload (2)
        assert(r2 == "dog" and fauna.size() == 2);
        assert(fauna[0] == "cat" and fauna[1] == "dog");
        // fauna.unchecked_push_back("bug"); // undefined behavior: there is no space
    }
```

### Veja também

[ push_back](<#/doc/container/inplace_vector/push_back>) | adiciona um elemento ao final   
(função membro pública)  
[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) | constrói um elemento no local no final   
(função membro pública)  
[ append_range](<#/doc/container/inplace_vector/append_range>) | adiciona um range de elementos ao final   
(função membro pública)  
[ try_push_back](<#/doc/container/inplace_vector/try_push_back>) | tenta adicionar um elemento ao final   
(função membro pública)  
[ try_emplace_back](<#/doc/container/inplace_vector/try_emplace_back>) | tenta construir um elemento no local no final   
(função membro pública)  
[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) | tenta adicionar um range de elementos ao final   
(função membro pública)  
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) | constrói incondicionalmente um elemento no local no final   
(função membro pública)  
[ pop_back](<#/doc/container/inplace_vector/pop_back>) | remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(modelo de função)