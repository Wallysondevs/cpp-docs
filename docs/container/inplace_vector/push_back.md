# std::inplace_vector&lt;T,N&gt;::push_back

```cpp
constexpr reference push_back( const T& value );  // (1) (desde C++26)
constexpr reference push_back( T&& value );  // (2) (desde C++26)
```

  
Adiciona o valor do elemento fornecido ao final do container.

1) O novo elemento é inicializado como uma cópia de value.

2) value é movido para o novo elemento.

Nenhum iterator ou referência é invalidado, exceto [`end()`](<#/doc/container/inplace_vector/end>), que é invalidado se a inserção ocorrer.

### Parâmetros

value  |  \-  |  o valor do elemento a ser adicionado   
Requisitos de tipo   
-`T` deve atender aos requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).   
-`T` deve atender aos requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).   
  
### Valor de retorno

[`back()`](<#/doc/container/inplace_vector/back>), ou seja, uma referência para o elemento inserido.

### Complexidade

Constante.

### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se size() == capacity() antes da invocação. 
  * Qualquer exceção lançada pela inicialização do elemento inserido. 

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança forte de exceção](<#/doc/language/exceptions>)). 

### Exemplo

Execute este código
```
    #include <inplace_vector>
    #include <new>
    #include <print>
    #include <string>
     
    int main()
    {
        std::inplace_vector<std::string, 2> fauna;
        std::string dog{"\N{DOG}"};
     
        fauna.push_back("\N{CAT}"); // overload (1)
        fauna.push_back(std::move(dog)); // overload (2)
        std::println("fauna = {}", fauna);
     
        try
        {
            fauna.push_back("\N{BUG}"); // throws: there is no space
        }
        catch(const std::bad_alloc& ex)
        {
            std::println("{}", ex.what());
        }
        std::println("fauna = {}", fauna);
    }
```

Saída possível: 
```
    fauna = ["🐈", "🐕"]
    std::bad_alloc
    fauna = ["🐈", "🐕"]
```

### Veja também

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
[ unchecked_push_back](<#/doc/container/inplace_vector/unchecked_push_back>) | adiciona incondicionalmente um elemento ao final   
(função membro pública)  
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) | constrói incondicionalmente um elemento no local no final   
(função membro pública)  
[ pop_back](<#/doc/container/inplace_vector/pop_back>) | remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(modelo de função)